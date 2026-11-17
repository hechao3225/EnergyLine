/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 诱饵强化：把解树之外的“空余头”向外接一格，让断头远离主路、朝向最近的灯泡。
 * 只加在空地上，不接灯泡/主路；每关改完用求解器复核 par 不变。
 * 用法：npx tsx scripts/strengthen-decoys.ts [--write] [--board=56]
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { solveMinTaps } from './solve-min-par';
import { getDefaultBasePorts, getTilePorts, simulateCircuit } from '../src/utils/circuit';
import type { LevelConfig, Tile } from '../src/types/game';

const OPP: Record<number, number> = { 1: 4, 2: 8, 4: 1, 8: 2 };
const STEP: Record<number, [number, number]> = { 1: [-1, 0], 2: [0, 1], 4: [1, 0], 8: [0, -1] };
const DIRS = [1, 2, 4, 8];

function at(level: LevelConfig, r: number, c: number) {
  return level.tiles.find((t) => t.row === r && t.col === c) ?? null;
}
function ports(t: Tile) { return getTilePorts(t); }
function links(level: LevelConfig, t: Tile) {
  const out: Tile[] = [];
  const p = ports(t);
  for (const bit of DIRS) {
    if (!(p & bit)) continue;
    const [dr, dc] = STEP[bit];
    const o = at(level, t.row + dr, t.col + dc);
    if (o && o.type !== 'empty' && (ports(o) & OPP[bit])) out.push(o);
  }
  return out;
}
function cornerPorts(rot: number) { return getTilePorts({ type: 'corner', rotation: rot, basePorts: getDefaultBasePorts('corner'), id: '', row: 0, col: 0 } as Tile); }
function linePorts(rot: number) { return getTilePorts({ type: 'line', rotation: rot, basePorts: getDefaultBasePorts('line'), id: '', row: 0, col: 0 } as Tile); }

function decoyComponents(level: LevelConfig, used: Set<string>): Tile[][] {
  const cand = level.tiles.filter((t) => t.type !== 'empty' && !t.locked && t.type !== 'bulb' && t.type !== 'battery' && !used.has(t.id));
  const seen = new Set<string>();
  const comps: Tile[][] = [];
  for (const t of cand) {
    if (seen.has(t.id)) continue;
    const comp: Tile[] = [];
    const q = [t];
    seen.add(t.id);
    while (q.length) {
      const cur = q.pop()!;
      comp.push(cur);
      for (const other of links(level, cur)) {
        if (!cand.some((x) => x.id === other.id) || seen.has(other.id)) continue;
        seen.add(other.id);
        q.push(other);
      }
    }
    comps.push(comp);
  }
  return comps;
}

function nearestBulb(level: LevelConfig, r: number, c: number) {
  let best = 99;
  for (const b of level.tiles.filter((t) => t.type === 'bulb')) best = Math.min(best, Math.abs(b.row - r) + Math.abs(b.col - c));
  return best;
}

interface Plan { level: LevelConfig; added: number; comps: number; }

function strengthen(level: LevelConfig, used: Set<string>): Plan {
  const comps = decoyComponents(level, used);
  const tiles = level.tiles.map((t) => ({ ...t }));
  const occupied = new Set(tiles.filter((t) => t.type !== 'empty').map((t) => t.row + ',' + t.col));
  let added = 0;
  const work: LevelConfig = { ...level, tiles };
  const ranked = comps
    .map((comp) => ({
      comp,
      attached: comp.some((t) => links(level, t).some((o) => used.has(o.id))),
      near: comp.some((t) => DIRS.some((bit) => {
        const [dr, dc] = STEP[bit];
        const o = at(level, t.row + dr, t.col + dc);
        return !!o && used.has(o.id);
      })),
      len: comp.length,
    }))
    .filter((x) => x.attached || x.near)
    .sort((a, b) => (b.attached ? 1 : 0) - (a.attached ? 1 : 0) || a.len - b.len);
  for (const item of ranked) {
    if (added >= 4) break;
    const comp = item.comp;
    let best: { tile: Tile; cap: number; out: number; score: number } | null = null;
    for (const t of comp) {
      const p = ports(t);
      for (const cap of DIRS) {
        if (!(p & cap)) continue;
        const [dr, dc] = STEP[cap];
        const nr = t.row + dr, nc = t.col + dc;
        const back = OPP[cap];
        if (nr < 0 || nr >= level.gridRows || nc < 0 || nc >= level.gridCols) continue;
        const cell = at(work, nr, nc);
        if (!cell || cell.type !== 'empty' || occupied.has(nr + ',' + nc)) continue;
        for (const out of DIRS) {
          if (out === back) continue;
          const [or, oc] = STEP[out];
          const tr = nr + or, tc = nc + oc;
          const target = tr < 0 || tr >= level.gridRows || tc < 0 || tc >= level.gridCols ? null : at(work, tr, tc);
          if (target && target.type !== 'empty') continue;
          const straight = out === OPP[back];
          const p2 = straight ? (out === 1 || out === 4 ? 5 : 10) : 0;
          if (!straight) {
            let ok = false;
            for (const rot of [0, 90, 180, 270]) { const cp = cornerPorts(rot); if ((cp & back) && (cp & out)) { ok = true; break; } }
            if (!ok) continue;
          }
          const score = nearestBulb(work, tr < 0 ? nr : tr, tc < 0 ? nc : tc);
          if (!best || score < best.score) best = { tile: t, cap, out, score };
        }
      }
    }
    if (!best) continue;
    const t = best.tile;
    const [dr, dc] = STEP[best.cap];
    const nr = t.row + dr, nc = t.col + dc;
    const back = OPP[best.cap];
    const out = best.out;
    const straight = out === OPP[back];
    let type: 'line' | 'corner' = straight ? 'line' : 'corner';
    let rotation = 0;
    if (type === 'line') rotation = out === 1 || out === 4 ? 90 : 0;
    else {
      for (const rot of [0, 90, 180, 270]) { const cp = cornerPorts(rot); if ((cp & back) && (cp & out)) { rotation = rot; break; } }
    }
    const slot = tiles.findIndex((x) => x.row === nr && x.col === nc && x.type === 'empty');
    if (slot < 0) continue;
    tiles[slot] = { ...tiles[slot], type, rotation, basePorts: getDefaultBasePorts(type) };
    occupied.add(nr + ',' + nc);
    added++;
  }
  return { level: work, added, comps: comps.length };
}

const write = process.argv.includes('--write');
const boardArg = process.argv.find((a) => a.startsWith('--board='));
const boardId = boardArg ? Number(boardArg.split('=')[1]) : 0;
const SYM: Record<string, string> = { battery: 'B', bulb: 'O', switch: 'S', diode: 'D', cross: '╋', line: '─', corner: '┐', t_shape: 'T', empty: '·' };
const rows: string[] = [];
let changedLevels = 0, totalAdded = 0, reverts = 0;
for (const level of DEFAULT_LEVELS) {
  if (level.id <= 6) continue;
  const before = solveMinTaps(level);
  const used = new Set(before.usedCells);
  const plan = strengthen(level, used);
  if (plan.added === 0) continue;
  const after = solveMinTaps(plan.level);
  if (after.par !== before.par) { reverts++; rows.push('L' + level.id + ' REVERT par ' + before.par + ' -> ' + after.par); continue; }
  const init = simulateCircuit(plan.level.tiles, plan.level.gridRows, plan.level.gridCols);
  const goal = plan.level.goal ?? init.totalBulbs;
  if (init.litCount >= goal) { reverts++; rows.push('L' + level.id + ' REVERT starts won'); continue; }
  const originEmpty = new Set(level.tiles.filter((t) => t.type === 'empty').map((t) => t.row + ',' + t.col));
  level.tiles = plan.level.tiles;
  changedLevels++; totalAdded += plan.added;
  rows.push('L' + level.id + ' +' + plan.added + ' tiles (decoys ' + plan.comps + ')');
  if (boardId === level.id) {
    console.log('== L' + level.id + ' after +' + plan.added + ' ==');
    for (let r = 0; r < level.gridRows; r++) {
      let line = '';
      for (let c = 0; c < level.gridCols; c++) { const t = at(level, r, c)!; line += (SYM[t.type] ?? '?') + (used.has(t.id) ? '*' : originEmpty.has(t.row + ',' + t.col) && t.type !== 'empty' ? '+' : ' ') + ' '; }
      console.log(line);
    }
  }
}
console.log(rows.join('\n'));
console.log('changed ' + changedLevels + ' levels, added ' + totalAdded + ' tiles, reverts ' + reverts);
if (write) {
  const path = 'src/data/defaultLevels.ts';
  const text = fs.readFileSync(path, 'utf8');
  const i = text.indexOf('= [');
  const end = text.lastIndexOf('];');
  fs.writeFileSync(path, text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1), 'utf8');
  console.log('written', path);
} else console.log('dry run (add --write to save)');