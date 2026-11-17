/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 把空格填成装饰管，消掉“一眼看出哪里没路”的空洞。
 * 优先选能接上邻管的朝向；每格填完跑解析器，par 变了就换朝向/留空。
 * 用法：npx tsx scripts/fill-empty.ts [--write] [--board=22]
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { solveMinTaps } from './solve-min-par';
import { getDefaultBasePorts, getTilePorts, simulateCircuit } from '../src/utils/circuit';
import type { LevelConfig, Tile } from '../src/types/game';

const OPP: Record<number, number> = { 1: 4, 2: 8, 4: 1, 8: 2 };
const STEP: Record<number, [number, number]> = { 1: [-1, 0], 2: [0, 1], 4: [1, 0], 8: [0, -1] };
const DIRS = [1, 2, 4, 8];

function at(l: LevelConfig, r: number, c: number) { return l.tiles.find((t) => t.row === r && t.col === c) ?? null; }
function ports(t: Tile) { return getTilePorts(t); }

function degree(l: LevelConfig, r: number, c: number, type: 'line' | 'corner', rotation: number) {
  const tmp = { id: 'tmp', row: r, col: c, type, rotation, basePorts: getDefaultBasePorts(type) } as Tile;
  let d = 0;
  for (const bit of DIRS) {
    if (!(ports(tmp) & bit)) continue;
    const [dr, dc] = STEP[bit];
    const o = at(l, r + dr, c + dc);
    if (o && o.type !== 'empty' && (ports(o) & OPP[bit])) d++;
  }
  return d;
}

const write = process.argv.includes('--write');
const boardId = Number((process.argv.find((a) => a.startsWith('--board=')) ?? '--board=0').split('=')[1]);
const SYM: Record<string, string> = { battery: 'B', bulb: 'O', switch: 'S', diode: 'D', cross: '╋', line: '─', corner: '┐', t_shape: 'T', empty: '·' };
const rows: string[] = [];
let changed = 0, filled = 0, left = 0, reverts = 0;
for (const level of DEFAULT_LEVELS) {
  if (level.id <= 6) continue;
  const before = solveMinTaps(level);
  const beforeEmpty = level.tiles.filter((t) => t.type === 'empty').length;
  if (beforeEmpty === 0) continue;
  const tiles = level.tiles.map((t) => ({ ...t }));
  const work: LevelConfig = { ...level, tiles };
  let placed = 0;
  for (const cell of tiles.filter((t) => t.type === 'empty')) {
    const cands: { type: 'line' | 'corner'; rotation: number; d: number }[] = [];
    for (const type of ['line', 'corner'] as const) {
      for (const rotation of [0, 90, 180, 270]) cands.push({ type, rotation, d: degree(work, cell.row, cell.col, type, rotation) });
    }
    cands.sort((a, b) => b.d - a.d);
    const slot = tiles.findIndex((t) => t.row === cell.row && t.col === cell.col);
    const orig = tiles[slot];
    let done = false;
    for (const cand of cands) {
      tiles[slot] = { ...orig, type: cand.type, rotation: cand.rotation, basePorts: getDefaultBasePorts(cand.type) };
      let res;
      try { res = solveMinTaps(work); } catch { tiles[slot] = orig; continue; }
      if (res.par === before.par) { done = true; placed++; break; }
      tiles[slot] = orig;
    }
    if (!done) tiles[slot] = orig;
  }
  const after = solveMinTaps(work);
  if (after.par !== before.par) { reverts++; rows.push('L' + level.id + ' REVERT ' + before.par + '->' + after.par); continue; }
  const init = simulateCircuit(tiles, level.gridRows, level.gridCols);
  if (init.litCount >= (level.goal ?? init.totalBulbs)) { reverts++; rows.push('L' + level.id + ' REVERT lit'); continue; }
  level.tiles = tiles;
  changed++; filled += placed;
  const remain = tiles.filter((t) => t.type === 'empty').length;
  left += remain;
  rows.push('L' + level.id + ' filled ' + placed + '/' + beforeEmpty + ', left ' + remain);
  if (boardId === level.id) {
    console.log('== L' + level.id + ' empty ' + beforeEmpty + ' -> ' + remain + ' ==');
    for (let r = 0; r < level.gridRows; r++) { let line = ''; for (let c = 0; c < level.gridCols; c++) line += (SYM[at(level, r, c)!.type] ?? '?') + ' '; console.log(line); }
  }
}
console.log(rows.join('\n'));
console.log('changed ' + changed + ' levels, filled ' + filled + ' cells, left empty ' + left + ', reverts ' + reverts);
if (write) {
  const path = 'src/data/defaultLevels.ts';
  const text = fs.readFileSync(path, 'utf8');
  const i = text.indexOf('= ['); const end = text.lastIndexOf('];');
  fs.writeFileSync(path, text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1), 'utf8');
  console.log('written', path);
} else console.log('dry run (add --write to save)');