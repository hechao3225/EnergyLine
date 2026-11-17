/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * L86 重设计：主路 T 的第三口 + 从终点绕回的支路。
 * 正确解：T 的第三口朝下（空），支路留缺口；错误解：T 的第三口朝上，接上支路就成环。
 * 错误解只要 1 步，正确解要 3 步——这是“看起来省步、接上就过载”的必经决策。
 *
 * 规则关的 par 用“锁定正确 T 朝向 + 解其余”的方式定价；不依赖无约束 solver。
 * 用法：npx tsx scripts/design-l86-onpath.ts [--write]
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { Direction, LevelConfig, Tile, TileType } from '../src/types/game';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from '../src/utils/circuit';
import { applyPlan, solveMinTaps } from '../src/utils/hint-solver';

const N = 6;
const key = (r: number, c: number) => r + ',' + c;
const norm = (r: number) => ((r % 360) + 360) % 360;
function dirBit(r1: number, c1: number, r2: number, c2: number): number {
  if (r2 === r1 - 1) return Direction.UP;
  if (c2 === c1 + 1) return Direction.RIGHT;
  if (r2 === r1 + 1) return Direction.DOWN;
  if (c2 === c1 - 1) return Direction.LEFT;
  throw new Error('not adjacent');
}
const pop = (m: number) => [1, 2, 4, 8].filter((b) => (m & b) !== 0).length;
function findRot(base: number, mask: number, extra?: (rot: number) => boolean): number {
  for (let k = 0; k < 4; k++) { const rot = k * 90; if (rotatePorts(base, rot) === mask && (!extra || extra(rot))) return rot; }
  throw new Error('no rotation base ' + base + ' mask ' + mask);
}
function inferType(mask: number): TileType {
  if (pop(mask) === 2) return mask === 5 || mask === 10 ? 'line' : 'corner';
  if (pop(mask) === 3) return 't_shape';
  if (pop(mask) === 4) return 'cross';
  throw new Error('bad degree ' + pop(mask));
}

const EDGES: number[][] = [
  [2,0,2,1],
  [2,1,1,1],[1,1,0,1],
  [2,1,3,1],[3,1,4,1],[4,1,4,0],[4,0,5,0],[5,0,5,1],[5,1,5,2],
  [2,1,2,2],[2,2,2,3],[2,3,2,4],
  [2,3,3,3],[3,3,4,3],
  [2,4,3,4],[3,4,4,4],[4,4,5,4],
  [2,4,1,4],[1,4,1,3],[1,3,1,2],
  [1,4,0,4],[0,4,0,3],[0,3,0,2],
];
const BATTERY = { r: 2, c: 0 };
const BULBS = [{ r: 0, c: 1 }, { r: 4, c: 3 }, { r: 5, c: 4 }, { r: 0, c: 2 }, { r: 5, c: 2 }];
const SPECIALS: { r: number; c: number; type: TileType; extra?: number }[] = [
  { r: 2, c: 1, type: 'cross' },
  { r: 2, c: 2, type: 't_shape', extra: Direction.DOWN },
  { r: 2, c: 3, type: 't_shape' },
  { r: 2, c: 4, type: 'cross' },
  { r: 3, c: 4, type: 'switch' },
  { r: 0, c: 3, type: 'switch' },
  { r: 5, c: 1, type: 'cross' },
  { r: 4, c: 1, type: 't_shape', extra: Direction.RIGHT },
  { r: 1, c: 2, type: 'corner', extra: Direction.DOWN },
  { r: 1, c: 1, type: 'switch' },
  { r: 3, c: 1, type: 'diode' },
  { r: 1, c: 4, type: 'cross' },
  { r: 3, c: 3, type: 'switch' },
];
const TRAPS = [
  { r: 2, c: 2, correct: 0, wrong: 180, taps: 3 },
  { r: 4, c: 1, correct: 180, wrong: 90, taps: 2 },
];

function buildSolved(): Tile[] {
  const tiles: Tile[] = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) tiles.push({ id: 't-' + r + '-' + c, row: r, col: c, type: 'empty', rotation: 0, basePorts: 0 });
  const mask = new Map<string, number>();
  const adj = new Map<string, string[]>();
  const bump = (r: number, c: number, bit: number) => { const k = key(r, c); mask.set(k, (mask.get(k) ?? 0) | bit); if (!adj.has(k)) adj.set(k, []); };
  for (const e of EDGES) {
    const [r1, c1, r2, c2] = e;
    bump(r1, c1, dirBit(r1, c1, r2, c2));
    bump(r2, c2, dirBit(r2, c2, r1, c1));
    adj.get(key(r1, c1))!.push(key(r2, c2));
    adj.get(key(r2, c2))!.push(key(r1, c1));
  }
  const parent = new Map<string, string>();
  const dist = new Map<string, number>();
  const q = [key(BATTERY.r, BATTERY.c)];
  dist.set(q[0], 0);
  while (q.length) {
    const k = q.shift()!;
    for (const nk of adj.get(k) ?? []) if (!dist.has(nk)) { dist.set(nk, (dist.get(k) ?? 0) + 1); parent.set(nk, k); q.push(nk); }
  }
  const put = (r: number, c: number, t: Tile) => { const i = tiles.findIndex((x) => x.row === r && x.col === c); tiles[i] = t; };
  for (const [k, m0] of mask) {
    const [r, c] = k.split(',').map(Number);
    const battery = BATTERY.r === r && BATTERY.c === c;
    const bulb = BULBS.find((b) => b.r === r && b.c === c);
    const special = SPECIALS.find((s) => s.r === r && s.c === c);
    const m = m0 | (special?.extra ?? 0);
    if (battery) { const base = getDefaultBasePorts('battery'); put(r, c, { id: key(r, c), row: r, col: c, type: 'battery', rotation: findRot(base, m), basePorts: base, locked: true }); continue; }
    if (bulb) { put(r, c, { id: key(r, c), row: r, col: c, type: 'bulb', rotation: 0, basePorts: getDefaultBasePorts('bulb'), locked: true }); continue; }
    if (special) {
      const base = getDefaultBasePorts(special.type);
      if (special.type === 'cross') { put(r, c, { id: key(r, c), row: r, col: c, type: 'cross', rotation: 0, basePorts: 15 }); continue; }
      if (special.type === 'diode') {
        const pk = parent.get(k)!;
        const [pr, pc] = pk.split(',').map(Number);
        const toParent = dirBit(r, c, pr, pc);
        const rot = findRot(base, m, (rr) => rotatePorts(Direction.LEFT, rr) === toParent);
        put(r, c, { id: key(r, c), row: r, col: c, type: 'diode', rotation: rot, basePorts: base });
        continue;
      }
      put(r, c, { id: key(r, c), row: r, col: c, type: special.type, rotation: findRot(base, m), basePorts: base });
      continue;
    }
    const type = inferType(m);
    const base = getDefaultBasePorts(type);
    put(r, c, { id: key(r, c), row: r, col: c, type, rotation: findRot(base, m), basePorts: base });
  }
  return tiles;
}

function prng(seed: number) { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; }
function scramble(solved: Tile[], required: Set<string>, target: number, seed: number): Tile[] | null {
  const movable = solved.filter((t) => required.has(key(t.row, t.col)) && !t.locked && t.type !== 'empty' && t.type !== 'cross');
  const caps = movable.map((t) => (t.type === 'line' ? 1 : t.type === 'switch' ? 2 : 3));
  const max = caps.reduce((a, b) => a + b, 0);
  if (target < movable.length || target > max) return null;
  const taps = movable.map(() => 1);
  let extra = target - movable.length;
  const rand = prng(seed);
  while (extra > 0) {
    const open = taps.map((v, i) => (v < caps[i] ? i : -1)).filter((i) => i >= 0);
    if (!open.length) return null;
    taps[open[Math.floor(rand() * open.length)]] += 1;
    extra -= 1;
  }
  const byId = new Map<string, number>();
  movable.forEach((t, i) => byId.set(key(t.row, t.col), taps[i]));
  return solved.map((t) => {
    const k = byId.get(key(t.row, t.col));
    if (!k) return { ...t };
    if (t.type === 'switch') return { ...t, rotation: norm(t.rotation - 90 * (k - 1)), switchClosed: false };
    return { ...t, rotation: norm(t.rotation - 90 * k) };
  });
}
type TrapMode = 'solved' | 'play' | 'wrong1' | 'wrong2';
function withTraps(tiles: Tile[], mode: TrapMode): Tile[] {
  return tiles.map((t) => {
    const i = TRAPS.findIndex((x) => x.r === t.row && x.c === t.col);
    if (i < 0) return t;
    const trap = TRAPS[i];
    if (mode === 'solved') return { ...t, rotation: trap.correct, locked: true };
    if (mode === 'play') return { ...t, rotation: i === 0 ? 90 : 0, locked: false };
    const wrongIdx = mode === 'wrong1' ? 0 : 1;
    if (i !== wrongIdx) return { ...t, rotation: trap.correct, locked: true };
    return { ...t, rotation: trap.wrong, locked: false };
  });
}
function sim(tiles: Tile[], rules: any) { return simulateCircuit(tiles, N, N, rules); }

const solved = buildSolved();
const solvedLevel: LevelConfig = { id: 86, code: '86', totalLevels: 99, gridRows: N, gridCols: N, maxSteps: 999, parSteps: 0, rules: { noCycle: true }, tiles: withTraps(solved, 'solved') };
const required = new Set(solveMinTaps(solvedLevel).usedCells);
const SCRAMBLE_TARGET = 18;

let best: any = null;
const stats: any = { scramble: 0, solve: 0, parMatch: 0, lit: 0, init: 0, wrong: 0, maxPar: 0 };
for (let seed = 1; seed <= 12000; seed++) {
  const rest = scramble(solved, required, SCRAMBLE_TARGET, seed);
  if (!rest) continue;
  stats.scramble++;
  const correctLevel: LevelConfig = { ...solvedLevel, tiles: withTraps(rest, 'solved') };
  let res;
  try { res = solveMinTaps(correctLevel); } catch { stats.solve++; continue; }
  stats.maxPar = Math.max(stats.maxPar, res.par);
  if (res.par < 10) continue;
  if (best && res.par <= best.res.par) continue;
  stats.parMatch++;
  const applied = applyPlan(correctLevel, res.plan);
  const okSim = sim(applied.tiles, { noCycle: true });
  if (okSim.litCount !== BULBS.length || okSim.overloaded) { stats.lit++; continue; }
  const playTiles = withTraps(rest, 'play');
  const initSim = sim(playTiles, { noCycle: true });
  if (initSim.overloaded) { stats.init++; continue; }
  const wrong1 = sim(withTraps(applied.tiles, 'wrong1'), { noCycle: true });
  const wrong2 = sim(withTraps(applied.tiles, 'wrong2'), { noCycle: true });
  if (!wrong1.overloaded || !wrong2.overloaded) { stats.wrong++; continue; }
  best = { seed, rest, res, playTiles, totalPar: res.par + 5, correctTiles: applied.tiles, wrongOverload: wrong1.overloaded && wrong2.overloaded, initLit: initSim.litCount };
  if (res.par >= 16) break;
}

function render(tiles: Tile[]) {
  const glyph = (t: Tile) => {
    if (t.type === 'empty') return '.';
    if (t.type === 'battery') return 'S';
    if (t.type === 'bulb') return 'O';
    if (t.type === 'switch') return 'S';
    if (t.type === 'diode') return 'D';
    if (t.type === 'cross') return '+';
    if (t.type === 't_shape') return 'T';
    if (t.type === 'corner') return 'L';
    if (t.type === 'line') return t.rotation % 180 === 0 ? '-' : '|';
    return '?';
  };
  return Array.from({ length: N }, (_, r) => Array.from({ length: N }, (_, c) => glyph(tiles.find((t) => t.row === r && t.col === c)!)).join(' ')).join('\n');
}

if (!best) { console.log(JSON.stringify({ ok: false, stats })); process.exit(1); }
const maxSteps = Math.max(best.totalPar + 5, Math.ceil(best.totalPar * 1.5));
if (process.argv.includes('--write')) {
  const level = DEFAULT_LEVELS.find((l) => l.id === 86)!;
  level.tiles = best.playTiles;
  level.parSteps = best.totalPar;
  level.maxSteps = maxSteps;
  level.rules = { noCycle: true };
  delete level.goal;
  const path = 'src/data/defaultLevels.ts';
  const text = fs.readFileSync(path, 'utf8');
  const i = text.indexOf('= [');
  const end = text.lastIndexOf('];');
  fs.writeFileSync(path, text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1), 'utf8');
  console.log('written ' + path);
}
console.log(JSON.stringify({ ok: true, seed: best.seed, par: best.totalPar, max: maxSteps, wrongOverload: best.wrongOverload, initLit: best.initLit, solvedBoard: render(best.correctTiles), playBoard: render(best.playTiles) }));