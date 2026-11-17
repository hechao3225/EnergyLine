/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 重设计 L73（双色）/ L86（禁环）：手工拓扑 + 编译 + 精确求解复核。
 * 只替换这两关的 tiles/par/max/rules；布局按“机制先有论点”来画：
 *   L73：上下两条颜色带 + 中间两步才能接通的串色桥（开关+管道）。
 *   L86：一源分两枝 + 两座“看起来该接、接上就成环”的桥（管道 + 开关）。
 *
 * 用法：npx tsx scripts/design-rule-levels.ts [--write]
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { Direction, LevelConfig, LevelRules, Tile, TileType } from '../src/types/game';
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
  throw new Error('not adjacent ' + r1 + ',' + c1 + ' -> ' + r2 + ',' + c2);
}
const pop = (m: number) => [1, 2, 4, 8].filter((b) => (m & b) !== 0).length;
function findRot(base: number, mask: number, extra?: (rot: number) => boolean): number {
  for (let k = 0; k < 4; k++) {
    const rot = k * 90;
    if (rotatePorts(base, rot) === mask && (!extra || extra(rot))) return rot;
  }
  throw new Error('no rotation base ' + base + ' mask ' + mask);
}
function inferType(mask: number): TileType {
  if (pop(mask) === 2) return mask === 5 || mask === 10 ? 'line' : 'corner';
  if (pop(mask) === 3) return 't_shape';
  if (pop(mask) === 4) return 'cross';
  throw new Error('bad degree ' + pop(mask));
}

interface Spec {
  id: number;
  target: number;
  rules: LevelRules;
  edges: number[][];
  batteries: { r: number; c: number; color?: number }[];
  bulbs: { r: number; c: number; color?: number }[];
  specials: { r: number; c: number; type: TileType }[];
  decoys: { r: number; c: number; type: 'line' | 'switch' | 'corner'; rotation: number; trapRotation?: number }[];
}

const COLOR: Spec = {
  id: 73,
  target: 14,
  rules: { colors: 2 },
  edges: [
    [1,0,1,1],[1,1,1,2],[1,2,1,3],[1,3,0,3],[0,3,0,4],[0,4,0,5],[1,3,1,4],[1,4,1,5],
    [4,0,4,1],[4,1,4,2],[4,2,4,3],[4,3,5,3],[5,3,5,4],[5,4,5,5],[4,3,4,4],[4,4,4,5],
  ],
  batteries: [{ r: 1, c: 0, color: 0 }, { r: 4, c: 0, color: 1 }],
  bulbs: [{ r: 0, c: 5, color: 0 }, { r: 1, c: 5, color: 0 }, { r: 4, c: 5, color: 1 }, { r: 5, c: 5, color: 1 }],
  specials: [
    { r: 1, c: 1, type: 'switch' }, { r: 1, c: 2, type: 'diode' }, { r: 1, c: 3, type: 'cross' },
    { r: 4, c: 1, type: 'switch' }, { r: 4, c: 2, type: 'diode' }, { r: 4, c: 3, type: 'cross' },
  ],
  decoys: [
    { r: 2, c: 3, type: 'switch', rotation: 90 },
    { r: 3, c: 3, type: 'line', rotation: 0 },
  ],
};

const NOCYCLE: Spec = {
  id: 86,
  target: 19,
  rules: { noCycle: true },
  edges: [
    [2,0,2,1],
    [2,1,1,1],[1,1,0,1],[0,1,0,2],[0,2,0,3],[0,3,0,4],[0,4,1,4],[1,4,1,5],
    [2,1,3,1],[3,1,3,2],[3,2,3,3],[3,3,3,4],[3,4,3,5],[3,5,4,5],[4,5,5,5],
    [1,1,1,0],
    [3,2,4,2],
    [2,1,2,2],[2,2,2,3],
  ],
  batteries: [{ r: 2, c: 0 }],
  bulbs: [{ r: 1, c: 0 }, { r: 1, c: 5 }, { r: 2, c: 3 }, { r: 4, c: 2 }, { r: 5, c: 5 }],
  specials: [
    { r: 2, c: 1, type: 'cross' },
    { r: 1, c: 1, type: 't_shape' },
    { r: 0, c: 3, type: 't_shape' },
    { r: 1, c: 4, type: 't_shape' },
    { r: 3, c: 2, type: 't_shape' },
    { r: 3, c: 4, type: 't_shape' },
    { r: 4, c: 5, type: 't_shape' },
  ],
  decoys: [
    { r: 1, c: 3, type: 'corner', rotation: 90, trapRotation: 270 },
    { r: 4, c: 4, type: 'corner', rotation: 90, trapRotation: 270 },
  ],
};

function build(spec: Spec) {
  const tiles: Tile[] = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) tiles.push({ id: 't-' + r + '-' + c, row: r, col: c, type: 'empty', rotation: 0, basePorts: 0 });
  const mask = new Map<string, number>();
  const adj = new Map<string, string[]>();
  const bump = (r: number, c: number, bit: number) => { const k = key(r, c); mask.set(k, (mask.get(k) ?? 0) | bit); if (!adj.has(k)) adj.set(k, []); };
  for (const e of spec.edges) {
    const [r1, c1, r2, c2] = e;
    bump(r1, c1, dirBit(r1, c1, r2, c2));
    bump(r2, c2, dirBit(r2, c2, r1, c1));
    adj.get(key(r1, c1))!.push(key(r2, c2));
    adj.get(key(r2, c2))!.push(key(r1, c1));
  }
  const uf = new Map<string, string>();
  const findUf = (x: string): string => {
    const p = uf.get(x);
    if (p === undefined) { uf.set(x, x); return x; }
    if (p !== x) { const r = findUf(p); uf.set(x, r); return r; }
    return x;
  };
  for (const e of spec.edges) {
    const ra = findUf(key(e[0], e[1]));
    const rb = findUf(key(e[2], e[3]));
    if (ra === rb) throw new Error('cycle in tree');
    uf.set(ra, rb);
  }
  if (mask.size !== spec.edges.length + spec.batteries.length) throw new Error('tree edges/nodes mismatch');
  // 强制 T/十字朝向诱饵：把“看起来该接的那一格”作为额外端口，陷阱才真的能接通。
  for (const s of spec.specials) {
    if (s.type !== 't_shape' && s.type !== 'cross') continue;
    for (const d of spec.decoys) {
      if (Math.abs(d.r - s.r) + Math.abs(d.c - s.c) === 1) {
        const k = key(s.r, s.c);
        mask.set(k, (mask.get(k) ?? 0) | dirBit(s.r, s.c, d.r, d.c));
      }
    }
  }
  const parent = new Map<string, string>();
  const dist = new Map<string, number>();
  const q: string[] = [];
  for (const b of spec.batteries) { const k = key(b.r, b.c); dist.set(k, 0); q.push(k); }
  while (q.length) {
    const k = q.shift()!;
    for (const nk of adj.get(k) ?? []) if (!dist.has(nk)) { dist.set(nk, (dist.get(k) ?? 0) + 1); parent.set(nk, k); q.push(nk); }
  }
  if (dist.size !== mask.size) throw new Error('tree not connected');
  const put = (r: number, c: number, t: Tile) => { const i = tiles.findIndex((x) => x.row === r && x.col === c); tiles[i] = t; };
  for (const [k, m] of mask) {
    const [r, c] = k.split(',').map(Number);
    const battery = spec.batteries.find((b) => b.r === r && b.c === c);
    const bulb = spec.bulbs.find((b) => b.r === r && b.c === c);
    const special = spec.specials.find((s) => s.r === r && s.c === c);
    if (battery) {
      const base = getDefaultBasePorts('battery');
      put(r, c, { id: key(r, c), row: r, col: c, type: 'battery', rotation: findRot(base, m), basePorts: base, locked: true, color: battery.color });
      continue;
    }
    if (bulb) {
      put(r, c, { id: key(r, c), row: r, col: c, type: 'bulb', rotation: 0, basePorts: getDefaultBasePorts('bulb'), locked: true, color: bulb.color });
      continue;
    }
    if (special) {
      const base = getDefaultBasePorts(special.type);
      if (special.type === 'cross') { put(r, c, { id: key(r, c), row: r, col: c, type: 'cross', rotation: 0, basePorts: 15 }); continue; }
      if (special.type === 'diode') {
        const pk = parent.get(k);
        if (!pk) throw new Error('diode has no parent ' + k);
        const [pr, pc] = pk.split(',').map(Number);
        const toParent = dirBit(r, c, pr, pc);
        const rot = findRot(base, m, (rr) => rotatePorts(Direction.LEFT, rr) === toParent);
        put(r, c, { id: key(r, c), row: r, col: c, type: 'diode', rotation: rot, basePorts: base });
        continue;
      }
      put(r, c, { id: key(r, c), row: r, col: c, type: special.type, rotation: findRot(base, m), basePorts: base, switchClosed: special.type === 'switch' ? undefined : undefined });
      continue;
    }
    const type = inferType(m);
    const base = getDefaultBasePorts(type);
    put(r, c, { id: key(r, c), row: r, col: c, type, rotation: findRot(base, m), basePorts: base });
  }
  for (const d of spec.decoys) {
    const base = getDefaultBasePorts(d.type);
    put(d.r, d.c, { id: key(d.r, d.c), row: d.r, col: d.c, type: d.type, rotation: d.rotation, basePorts: base, switchClosed: d.type === 'switch' ? false : undefined });
  }
  return { tiles, required: new Set(mask.keys()) };
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

function tryLevel(spec: Spec, tiles: Tile[], target: number) {
  const level: LevelConfig = { id: spec.id, code: String(spec.id), totalLevels: 99, gridRows: N, gridCols: N, maxSteps: 999, parSteps: 0, rules: spec.rules, tiles };
  let res;
  try { res = solveMinTaps(level); } catch { return { reason: 'solve' as const }; }
  if (res.par !== target) return { reason: 'par' as const, par: res.par };
  const applied = applyPlan(level, res.plan);
  const sim = simulateCircuit(applied.tiles, N, N, spec.rules);
  if (sim.litCount !== spec.bulbs.length) return { reason: 'lit' as const, lit: sim.litCount };
  if (sim.overloaded) return { reason: 'over' as const };
  const init = simulateCircuit(tiles, N, N, spec.rules);
  if (init.litCount > 0) return { reason: 'init-lit' as const, lit: init.litCount };
  if (init.overloaded) return { reason: 'init-over' as const };
  return { ok: true as const, level, res, applied, sim };
}

function teeth(spec: Spec, applied: Tile[]) {
  let mix = 0;
  let over = 0;
  for (const t of applied) {
    if (t.locked || t.type === 'empty' || t.type === 'cross') continue;
    const states: Tile[][] = [];
    if (t.type === 'switch') states.push(applied.map((x) => (x.id === t.id ? { ...x, switchClosed: !x.switchClosed } : x)));
    else for (let k = 1; k <= 3; k++) states.push(applied.map((x) => (x.id === t.id ? { ...x, rotation: x.rotation + 90 * k } : x)));
    for (const s of states) {
      const sim = simulateCircuit(s, N, N, spec.rules);
      if (spec.rules.colors && sim.tileColors && [...sim.tileColors.values()].some((v) => v === 3)) mix++;
      if (spec.rules.noCycle && sim.overloaded) over++;
    }
  }
  return { mix, over };
}

function armTraps(spec: Spec, applied: Tile[]) {
  const armed = applied.map((t) => {
    const d = spec.decoys.find((x) => x.r === t.row && x.c === t.col);
    if (!d) return t;
    if (d.type === 'switch') return { ...t, switchClosed: true };
    return { ...t, rotation: d.trapRotation ?? t.rotation + 90 };
  });
  const sim = simulateCircuit(armed, N, N, spec.rules);
  if (spec.rules.colors) return { hit: !!(sim.tileColors && [...sim.tileColors.values()].some((v) => v === 3)), lit: sim.litCount };
  return { hit: sim.overloaded, lit: sim.litCount };
}

function search(spec: Spec) {
  const { tiles: solved, required } = build(spec);
  const stats: any = { parMatch: 0, lit: 0, over: 0, initLit: 0, initOver: 0, solve: 0, minPar: 999, maxPar: 0, closest: null as any };
  for (let seed = 1; seed <= 6000; seed++) {
    const tiles = scramble(solved, required, spec.target, seed);
    if (!tiles) continue;
    const got: any = tryLevel(spec, tiles, spec.target);
    if (got.ok) {
      return { ok: true, seed, ...got, teeth: teeth(spec, got.applied.tiles), trap: armTraps(spec, got.applied.tiles) };
    }
    if (got.reason === 'solve') { stats.solve++; continue; }
    const par = got.par;
    if (got.reason === 'par') {
      stats.minPar = Math.min(stats.minPar, par);
      stats.maxPar = Math.max(stats.maxPar, par);
      const diff = Math.abs(par - spec.target);
      if (!stats.closest || diff < stats.closest.diff) stats.closest = { par, diff };
      continue;
    }
    stats.parMatch++;
    if (got.reason === 'lit') stats.lit++;
    else if (got.reason === 'over') stats.over++;
    else if (got.reason === 'init-lit') stats.initLit++;
    else if (got.reason === 'init-over') stats.initOver++;
  }
  return { ok: false, stats, solvedBoard: render(solved) };
}

function glyph(t: Tile) {
  if (t.type === 'empty') return '.';
  if (t.type === 'battery') return t.color === 0 ? 'R' : t.color === 1 ? 'B' : 'S';
  if (t.type === 'bulb') return t.color === 0 ? 'r' : t.color === 1 ? 'b' : 'O';
  if (t.type === 'switch') return 'S';
  if (t.type === 'diode') return 'D';
  if (t.type === 'cross') return '+';
  if (t.type === 't_shape') return 'T';
  if (t.type === 'corner') return 'L';
  if (t.type === 'line') return (t.rotation % 180 === 0) ? '-' : '|';
  return '?';
}
function render(tiles: Tile[]) {
  const rows: string[] = [];
  for (let r = 0; r < N; r++) {
    let line = '';
    for (let c = 0; c < N; c++) {
      const t = tiles.find((x) => x.row === r && x.col === c)!;
      line += glyph(t) + ' ';
    }
    rows.push(line);
  }
  return rows.join('\n');
}

const results: any[] = [];
for (const spec of [COLOR, NOCYCLE]) {
  const got: any = search(spec);
  if (!got.ok) { results.push({ id: spec.id, ok: false, stats: got.stats, board: got.solvedBoard }); continue; }
  const max = Math.max(got.res.par + 5, Math.ceil(got.res.par * 1.5));
  results.push({ id: spec.id, ok: true, seed: got.seed, par: got.res.par, max, teeth: got.teeth, trap: got.trap, board: render(got.applied.tiles), initial: render(got.level.tiles) });
  if (process.argv.includes('--write')) {
    const level = DEFAULT_LEVELS.find((l) => l.id === spec.id)!;
    level.tiles = got.level.tiles;
    level.parSteps = got.res.par;
    level.maxSteps = max;
    level.rules = spec.rules;
    delete level.goal;
  }
}
if (process.argv.includes('--write')) {
  const path = 'src/data/defaultLevels.ts';
  const text = fs.readFileSync(path, 'utf8');
  const i = text.indexOf('= [');
  const end = text.lastIndexOf('];');
  fs.writeFileSync(path, text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1), 'utf8');
  console.log('written ' + path);
}
console.log(JSON.stringify(results));