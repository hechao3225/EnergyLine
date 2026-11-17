/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 5 关 6×9 分叉原型：单源 → T 分叉 → 主路/绕路 → T 合并 → 双灯；绕路可通但更费步。
 * 用法：npx tsx scripts/fork-proto69.ts [--write] [--board=16]
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { solveMinTaps, applyPlan } from './solve-min-par';
import { getDefaultBasePorts } from '../src/utils/circuit';
import type { LevelConfig, Tile } from '../src/types/game';

const SPECS = [
  { id: 16, par: 11, tries: 8000 },
  { id: 22, par: 12, tries: 8000 },
  { id: 23, par: 12, tries: 8000 },
  { id: 24, par: 13, tries: 12000 },
  { id: 25, par: 14, tries: 30000 },
];
const R = 6, C = 9, SR = 3;

function set(tiles: Tile[], r: number, c: number, type: Tile['type'], rotation: number, locked = false) {
  const i = tiles.findIndex((t) => t.row === r && t.col === c);
  tiles[i] = { ...tiles[i], type, rotation, basePorts: getDefaultBasePorts(type), locked };
}
function buildSolved(): Tile[] {
  const tiles: Tile[] = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) tiles.push({ id: 't-' + r + '-' + c, row: r, col: c, type: 'empty', rotation: 0, basePorts: 0 });
  set(tiles, SR, 0, 'battery', 0, true);
  set(tiles, SR, 1, 't_shape', 180);
  for (let c = 2; c <= C - 3; c++) set(tiles, SR, c, 'line', 0);
  set(tiles, SR, 3, 't_shape', 0);
  set(tiles, SR, C - 2, 't_shape', 180);
  set(tiles, SR, C - 1, 'bulb', 0, true);
  set(tiles, SR + 1, 3, 'corner', 270);
  set(tiles, SR + 1, 4, 't_shape', 0);
  for (let c = 5; c <= C - 2; c++) set(tiles, SR + 1, c, 'line', 0);
  set(tiles, SR + 1, C - 1, 'bulb', 0, true);
  set(tiles, SR - 1, 1, 'corner', 0);
  set(tiles, SR - 1, 2, 't_shape', 180);
  for (let c = 3; c <= C - 3; c++) set(tiles, SR - 1, c, 'line', 0);
  set(tiles, SR - 1, C - 2, 'corner', 90);
  set(tiles, SR - 2, 2, 'line', 90);
  set(tiles, SR + 2, 4, 'line', 90);
  return tiles;
}
function tapsFor(initial: Tile[], solved: Tile[], cells: string[]) {
  let taps = 0;
  const plan: { id: string; rotateTaps: number; toggle: boolean }[] = [];
  for (const key of cells) {
    const [r, c] = key.split(',').map(Number);
    const i = initial.find((t) => t.row === r && t.col === c)!;
    const s = solved.find((t) => t.row === r && t.col === c)!;
    let k = ((s.rotation - i.rotation) % 360 + 360) % 360 / 90;
    if (i.type === 'line' && k === 3) k = 1;
    if (k > 0) { taps += k; plan.push({ id: s.id, rotateTaps: k, toggle: false }); }
  }
  return { taps, plan };
}
const solved = buildSolved();
const write = process.argv.includes('--write');
const boardId = Number((process.argv.find((a) => a.startsWith('--board=')) ?? '--board=0').split('=')[1]);
const SYM: Record<string, string> = { battery: 'B', bulb: 'O', switch: 'S', diode: 'D', cross: '╋', line: '─', corner: '┐', t_shape: 'T', empty: '·' };
const altCells = ['3,1','2,1','2,2','2,3','2,4','2,5','2,6','2,7','3,7','3,6','3,5','3,4','3,3','4,3','4,4','4,5','4,6','4,7'];
let changed = 0;
for (const spec of SPECS) {
  const level = DEFAULT_LEVELS.find((l) => l.id === spec.id)!;
  let found: { tiles: Tile[]; alt: number } | null = null;
  const max = Math.max(spec.par + 5, Math.ceil(spec.par * 1.5));
  for (let seed = 0; seed < spec.tries; seed++) {
    let s = seed * 7919 + spec.id * 131 + 7;
    const rand = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
    const tiles = solved.map((t) => ({ ...t }));
    for (const t of tiles) {
      if (t.locked || t.type === 'empty') continue;
      const opts = t.type === 'line' ? [0, 90] : [0, 90, 180, 270];
      t.rotation = opts[Math.floor(rand() * opts.length)];
    }
    const cand: LevelConfig = { ...level, gridRows: R, gridCols: C, tiles, parSteps: 0, maxSteps: 9999, goal: undefined };
    let par;
    try { par = solveMinTaps(cand).par; } catch { continue; }
    if (par !== spec.par) continue;
    const alt = tapsFor(tiles, solved, altCells);
    if (alt.taps <= spec.par || alt.taps > max) continue;
    const replay = applyPlan(cand, alt.plan);
    if (replay.lit < replay.total) continue;
    found = { tiles, alt: alt.taps };
    break;
  }
  console.log('L' + spec.id, 'target', spec.par, found ? ('FOUND alt ' + found.alt) : 'MISS');
  if (!found) continue;
  level.gridRows = R; level.gridCols = C;
  level.tiles = found.tiles;
  level.parSteps = spec.par;
  level.maxSteps = max;
  level.goal = undefined;
  changed++;
  if (boardId === spec.id) {
    console.log('== L' + spec.id + ' par ' + spec.par + ' alt ' + found.alt + ' ==');
    for (let r = 0; r < R; r++) { let line = ''; for (let c = 0; c < C; c++) line += (SYM[found.tiles.find((t) => t.row === r && t.col === c)!.type] ?? '?') + ' '; console.log(line); }
  }
}
console.log('changed', changed, '/', SPECS.length);
if (write && changed === SPECS.length) {
  const path = 'src/data/defaultLevels.ts';
  const text = fs.readFileSync(path, 'utf8');
  const i = text.indexOf('= ['); const end = text.lastIndexOf('];');
  fs.writeFileSync(path, text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1), 'utf8');
  console.log('written', path);
} else console.log(write ? 'not all found' : 'dry run');