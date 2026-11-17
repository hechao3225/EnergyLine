/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 5 关分叉原型：单源 → T 分叉 → 主路 / 绕路 → T 合并 → 双灯；
 * 主路最优，绕路可通但多 4 步；另挂 2 条死端。
 * 用法：npx tsx scripts/fork-proto.ts [--write] [--board=16]
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { solveMinTaps, applyPlan } from './solve-min-par';
import { getDefaultBasePorts, getTilePorts, simulateCircuit } from '../src/utils/circuit';
import type { LevelConfig, Tile } from '../src/types/game';

const SPECS: { id: number; sr: number; par: number }[] = [
  { id: 16, sr: 2, par: 11 },
  { id: 22, sr: 3, par: 12 },
  { id: 23, sr: 2, par: 12 },
  { id: 24, sr: 3, par: 13 },
  { id: 25, sr: 2, par: 14 },
];
const OPP: Record<number, number> = { 1: 4, 2: 8, 4: 1, 8: 2 };
const norm = (r: number) => (((r % 360) + 360) % 360) as 0 | 90 | 180 | 270;

function set(tiles: Tile[], r: number, c: number, type: Tile['type'], rotation: number, locked = false) {
  const i = tiles.findIndex((t) => t.row === r && t.col === c);
  tiles[i] = { ...tiles[i], type, rotation, basePorts: getDefaultBasePorts(type), locked };
}
function tapToSolved(initRot: number, solvedRot: number) { return ((solvedRot - initRot + 360) % 360) / 90; }

function buildSolved(sr: number): Tile[] {
  const tiles: Tile[] = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) tiles.push({ id: 't-' + r + '-' + c, row: r, col: c, type: 'empty', rotation: 0, basePorts: 0 });
  const B = getDefaultBasePorts('battery'), L = getDefaultBasePorts('line'), C = getDefaultBasePorts('corner'), T = getDefaultBasePorts('t_shape'), O = getDefaultBasePorts('bulb');
  // 源 → 分叉 T → 主路 / 绕路 → 合并 T → 双灯
  set(tiles, sr, 0, 'battery', 0, true);
  set(tiles, sr, 1, 't_shape', 180);          // U,R,L
  set(tiles, sr, 2, 'line', 0);               // L,R
  set(tiles, sr, 3, 't_shape', 0);            // L,R,D → 第二盏灯
  set(tiles, sr, 4, 't_shape', 180);          // U,R,L
  set(tiles, sr, 5, 'bulb', 0, true);
  set(tiles, sr + 1, 3, 'corner', 270);       // U,R
  set(tiles, sr + 1, 4, 't_shape', 0);        // L,R,D → 死端 + 灯
  set(tiles, sr + 1, 5, 'bulb', 0, true);
  // 绕路（上一行）
  set(tiles, sr - 1, 1, 'corner', 0);         // D,R
  set(tiles, sr - 1, 2, 't_shape', 180);      // U,L,R → 死端
  set(tiles, sr - 1, 3, 'line', 0);           // L,R
  set(tiles, sr - 1, 4, 'corner', 90);        // L,D
  // 两条死端
  set(tiles, sr - 2, 2, 'line', 90);          // U,D
  set(tiles, sr + 2, 4, 'line', 90);          // U,D
  void B; void L; void C; void T; void O;
  return tiles;
}

function buildInitial(solved: Tile[], sr: number, par: number, seed: number) {
  const tiles = solved.map((t) => ({ ...t }));
  const rand = (() => { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; })();
  const taps = new Map<string, number>();
  // 分叉/合并固定 3 步，保证绕路不会更便宜
  taps.set(sr + ',1', 3);
  taps.set(sr + ',4', 3);
  const others = [sr + ',2', sr + ',3', sr + 1 + ',3', sr + 1 + ',4'];
  const caps = [1, 3, 3, 3];
  let extra = par - 6 - others.length;
  for (const key of others) taps.set(key, 1);
  while (extra > 0) {
    const open = others.map((k, i) => ({ k, i })).filter((x) => taps.get(x.k)! < caps[x.i]);
    if (!open.length) break;
    const pick = open[Math.floor(rand() * open.length)];
    taps.set(pick.k, taps.get(pick.k)! + 1);
    extra--;
  }
  // 绕路：1+2+1+1 = 5 步，主路直管 1 步，绕路比主路多 4 步
  taps.set(sr - 1 + ',1', 1);
  taps.set(sr - 1 + ',2', 2);
  taps.set(sr - 1 + ',3', 1);
  taps.set(sr - 1 + ',4', 1);
  taps.set(sr - 2 + ',2', 1);
  taps.set(sr + 2 + ',4', 1);
  for (const [key, k] of taps) {
    const [r, c] = key.split(',').map(Number);
    const t = tiles.find((x) => x.row === r && x.col === c)!;
    t.rotation = norm(t.rotation - 90 * k);
  }
  return tiles;
}

function altPlan(solved: Tile[], initial: Tile[], sr: number) {
  const cells = [sr + ',1', sr - 1 + ',1', sr - 1 + ',2', sr - 1 + ',3', sr - 1 + ',4', sr + ',4', sr + ',3', sr + 1 + ',3', sr + 1 + ',4'];
  let taps = 0;
  const plan: { id: string; rotateTaps: number; toggle: boolean }[] = [];
  for (const key of cells) {
    const [r, c] = key.split(',').map(Number);
    const s = solved.find((x) => x.row === r && x.col === c)!;
    const i = initial.find((x) => x.row === r && x.col === c)!;
    const k = tapToSolved(i.rotation, s.rotation);
    if (k > 0) { taps += k; plan.push({ id: s.id, rotateTaps: k, toggle: false }); }
  }
  return { taps, plan };
}

const write = process.argv.includes('--write');
const boardId = Number((process.argv.find((a) => a.startsWith('--board=')) ?? '--board=0').split('=')[1]);
const SYM: Record<string, string> = { battery: 'B', bulb: 'O', switch: 'S', diode: 'D', cross: '╋', line: '─', corner: '┐', t_shape: 'T', empty: '·' };
let changed = 0;
for (const spec of SPECS) {
  const level = DEFAULT_LEVELS.find((l) => l.id === spec.id)!;
  const solved = buildSolved(spec.sr);
  const initial = buildInitial(solved, spec.sr, spec.par, spec.id * 7919 + 13);
  const patched: LevelConfig = { ...level, tiles: initial, parSteps: spec.par, maxSteps: Math.max(spec.par + 5, Math.ceil(spec.par * 1.5)) };
  let res;
  try { res = solveMinTaps(patched); } catch (e) { console.log('L' + spec.id, 'SOLVE FAIL', (e as Error).message); continue; }
  const alt = altPlan(solved, initial, spec.sr);
  const replay = applyPlan(patched, alt.plan);
  const goal = patched.goal ?? replay.total;
  console.log('L' + spec.id, 'par', res.par, '/ target', spec.par, 'alt cost', alt.taps, 'alt lit', replay.lit + '/' + replay.total, 'alt ok', replay.lit >= goal);
  if (res.par !== spec.par) continue;
  level.tiles = initial;
  level.parSteps = spec.par;
  level.maxSteps = Math.max(spec.par + 5, Math.ceil(spec.par * 1.5));
  changed++;
  if (boardId === spec.id) {
    console.log('== L' + spec.id + ' ==');
    for (let r = 0; r < 6; r++) { let line = ''; for (let c = 0; c < 6; c++) line += (SYM[initial.find((t) => t.row === r && t.col === c)!.type] ?? '?') + ' '; console.log(line); }
  }
}
console.log('changed', changed, '/', SPECS.length);
if (write && changed > 0) {
  const path = 'src/data/defaultLevels.ts';
  const text = fs.readFileSync(path, 'utf8');
  const i = text.indexOf('= ['); const end = text.lastIndexOf('];');
  fs.writeFileSync(path, text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1), 'utf8');
  console.log('written', path);
} else console.log('dry run');