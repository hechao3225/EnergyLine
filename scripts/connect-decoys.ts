/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 把完全孤立的诱饵浮管接到主路/已挂枝上，做成真分支。
 * 只走空地；每关接完跑解析器，par 不变才保留。
 * 用法：npx tsx scripts/connect-decoys.ts [--write] [--board=56] [--max=3]
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
function links(l: LevelConfig, t: Tile) {
  const out: Tile[] = [];
  const p = ports(t);
  for (const bit of DIRS) {
    if (!(p & bit)) continue;
    const [dr, dc] = STEP[bit];
    const o = at(l, t.row + dr, t.col + dc);
    if (o && o.type !== 'empty' && (ports(o) & OPP[bit])) out.push(o);
  }
  return out;
}

function components(l: LevelConfig, used: Set<string>) {
  const cand = l.tiles.filter((t) => t.type !== 'empty' && !t.locked && t.type !== 'bulb' && t.type !== 'battery' && !used.has(t.id));
  const seen = new Set<string>();
  const out: { tiles: Tile[]; attached: boolean }[] = [];
  for (const t of cand) {
    if (seen.has(t.id)) continue;
    const comp: Tile[] = [];
    const q = [t];
    seen.add(t.id);
    while (q.length) {
      const cur = q.pop()!;
      comp.push(cur);
      for (const o of links(l, cur)) {
        if (!cand.some((x) => x.id === o.id) || seen.has(o.id)) continue;
        seen.add(o.id);
        q.push(o);
      }
    }
    out.push({ tiles: comp, attached: comp.some((x) => links(l, x).some((o) => used.has(o.id))) });
  }
  return out;
}

function rotationFor(type: 'line' | 'corner', a: number, b: number): number | null {
  for (const r of [0, 90, 180, 270]) {
    const t = { type, rotation: r, basePorts: getDefaultBasePorts(type) } as Tile;
    const p = getTilePorts(t);
    if ((p & a) && (p & b)) {
      let bits = 0;
      for (const bit of DIRS) if (p & bit) bits++;
      if (bits === 2) return r;
    }
  }
  return null;
}

function tileBetween(prevDir: number, nextDir: number) {
  const back = OPP[prevDir];
  const forward = nextDir;
  const straight = forward === OPP[back];
  const type: 'line' | 'corner' = straight ? 'line' : 'corner';
  const rotation = rotationFor(type, back, forward);
  return rotation === null ? null : { type, rotation };
}

interface PathResult { cells: { r: number; c: number }[]; target: { r: number; c: number; kind: 'used' | 'attached' }; }

function findPath(l: LevelConfig, used: Set<string>, attachedIds: Set<string>, start: { r: number; c: number }, startDir: number, maxLen: number): PathResult | null {
  const isTarget = (r: number, c: number): { r: number; c: number; kind: 'used' | 'attached'; dir: number } | null => {
    for (const dir of DIRS) {
      const [dr, dc] = STEP[dir];
      const n = at(l, r + dr, c + dc);
      if (!n || n.type === 'empty' || n.type === 'bulb' || n.type === 'battery') continue;
      if (!(ports(n) & OPP[dir])) continue;
      if (used.has(n.id)) return { r: r + dr, c: c + dc, kind: 'used', dir };
      if (attachedIds.has(n.id)) return { r: r + dr, c: c + dc, kind: 'attached', dir };
    }
    return null;
  };
  if (start.r < 0 || start.r >= l.gridRows || start.c < 0 || start.c >= l.gridCols) return null;
  const st = at(l, start.r, start.c);
  if (!st || st.type !== 'empty') return null;
  const tgt = isTarget(start.r, start.c);
  if (tgt) return { cells: [start], target: { r: tgt.r, c: tgt.c, kind: tgt.kind } };
  const seen = new Set([start.r + ',' + start.c]);
  const prev = new Map<string, string>();
  let frontier: { r: number; c: number }[] = [start];
  for (let depth = 1; depth < maxLen; depth++) {
    const next: { r: number; c: number }[] = [];
    for (const cur of frontier) {
      for (const dir of DIRS) {
        if (dir === OPP[startDir] && depth === 1) continue;
        const [dr, dc] = STEP[dir];
        const nr = cur.r + dr, nc = cur.c + dc;
        if (nr < 0 || nr >= l.gridRows || nc < 0 || nc >= l.gridCols) continue;
        const key = nr + ',' + nc;
        if (seen.has(key)) continue;
        const cell = at(l, nr, nc);
        if (!cell || cell.type !== 'empty') continue;
        seen.add(key);
        prev.set(key, cur.r + ',' + cur.c);
        const hit = isTarget(nr, nc);
        if (hit) {
          const cells: { r: number; c: number }[] = [];
          let k = key;
          while (k) { const [r, c] = k.split(',').map(Number); cells.unshift({ r, c }); k = prev.get(k) ?? ''; }
          return { cells, target: { r: hit.r, c: hit.c, kind: hit.kind } };
        }
        next.push({ r: nr, c: nc });
      }
    }
    frontier = next;
    if (!frontier.length) break;
  }
  return null;
}

function connect(l: LevelConfig, used: Set<string>): { level: LevelConfig; added: number; connected: number; left: number } {
  const comps = components(l, used);
  const attached = comps.filter((c) => c.attached);
  const isolated = comps.filter((c) => !c.attached);
  const attachedIds = new Set(attached.flatMap((c) => c.tiles.map((t) => t.id)));
  const tiles = l.tiles.map((t) => ({ ...t }));
  const work: LevelConfig = { ...l, tiles };
  let added = 0, connected = 0;
  const maxConn = Number((process.argv.find((a) => a.startsWith('--max=')) ?? '--max=3').split('=')[1]);
  const maxLen = Number((process.argv.find((a) => a.startsWith('--len=')) ?? '--len=4').split('=')[1]);
  for (const comp of isolated) {
    if (connected >= maxConn) break;
    let best: { path: PathResult; cap: number } | null = null;
    for (const t of comp.tiles) {
      const p = ports(t);
      for (const cap of DIRS) {
        if (!(p & cap)) continue;
        const [dr, dc] = STEP[cap];
        const start = { r: t.row + dr, c: t.col + dc };
        const path = findPath(work, used, attachedIds, start, cap, maxLen);
        if (path && (!best || path.cells.length < best.path.cells.length)) best = { path, cap };
      }
    }
    if (!best) continue;
    const cells = best.path.cells;
    const prevTile = comp.tiles.find((t) => t.row === cells[0].r - STEP[best.cap][0] && t.col === cells[0].c - STEP[best.cap][1])!;
    let prevR = prevTile.row, prevC = prevTile.col;
    let ok = true;
    for (let i = 0; i < cells.length; i++) {
      const cur = cells[i];
      const nextR = i + 1 < cells.length ? cells[i + 1].r : best.path.target.r;
      const nextC = i + 1 < cells.length ? cells[i + 1].c : best.path.target.c;
      const back = direction(prevR, prevC, cur.r, cur.c);
      const fwd = direction(cur.r, cur.c, nextR, nextC);
      const spec = tileBetween(back, fwd);
      if (spec === null) { ok = false; break; }
      const slot = tiles.findIndex((t) => t.row === cur.r && t.col === cur.c && t.type === 'empty');
      if (slot < 0) { ok = false; break; }
      tiles[slot] = { ...tiles[slot], type: spec.type, rotation: spec.rotation, basePorts: getDefaultBasePorts(spec.type) };
      prevR = cur.r; prevC = cur.c;
    }
    if (!ok) continue;
    added += cells.length; connected++;
    attachedIds.add(comp.tiles[0].id);
  }
  return { level: work, added, connected, left: isolated.length - connected };
}

function direction(r1: number, c1: number, r2: number, c2: number) {
  const dr = r2 - r1, dc = c2 - c1;
  return dr === -1 ? 1 : dc === 1 ? 2 : dr === 1 ? 4 : 8;
}

const write = process.argv.includes('--write');
const boardId = Number((process.argv.find((a) => a.startsWith('--board=')) ?? '--board=0').split('=')[1]);
const SYM: Record<string, string> = { battery: 'B', bulb: 'O', switch: 'S', diode: 'D', cross: '╋', line: '─', corner: '┐', t_shape: 'T', empty: '·' };
const rows: string[] = [];
let changed = 0, totalAdded = 0, totalLeft = 0, reverts = 0;
const levelsArg = process.argv.find((a) => a.startsWith('--levels='));
const levelFilter = levelsArg ? new Set(levelsArg.slice('--levels='.length).split(',').map(Number)) : null;
for (const level of DEFAULT_LEVELS) {
  if (level.id <= 6) continue;
  if (levelFilter && !levelFilter.has(level.id)) continue;
  const before = solveMinTaps(level);
  const used = new Set(before.usedCells);
  const plan = connect(level, used);
  if (plan.added === 0) continue;
  let after;
  try { after = solveMinTaps(plan.level); } catch { reverts++; rows.push('L' + level.id + ' REVERT solve-fail'); continue; }
  if (after.par !== before.par) { reverts++; rows.push('L' + level.id + ' REVERT ' + before.par + '->' + after.par); continue; }
  const init = simulateCircuit(plan.level.tiles, plan.level.gridRows, plan.level.gridCols);
  if (init.litCount >= (plan.level.goal ?? init.totalBulbs)) { reverts++; rows.push('L' + level.id + ' REVERT lit'); continue; }
  level.tiles = plan.level.tiles;
  changed++; totalAdded += plan.added; totalLeft += plan.left;
  rows.push('L' + level.id + ' +' + plan.added + ' pipes, connected ' + plan.connected + ', left ' + plan.left);
  if (boardId === level.id) {
    console.log('== L' + level.id + ' after +' + plan.added + ' ==');
    for (let r = 0; r < level.gridRows; r++) { let line = ''; for (let c = 0; c < level.gridCols; c++) { const t = at(level, r, c)!; line += (SYM[t.type] ?? '?') + (used.has(t.id) ? '*' : ' ') + ' '; } console.log(line); }
  }
}
console.log(rows.join('\n'));
console.log('changed ' + changed + ' levels, added ' + totalAdded + ' pipes, still isolated ' + totalLeft + ', reverts ' + reverts);
if (write) {
  const path = 'src/data/defaultLevels.ts';
  const text = fs.readFileSync(path, 'utf8');
  const i = text.indexOf('= ['); const end = text.lastIndexOf('];');
  fs.writeFileSync(path, text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1), 'utf8');
  console.log('written', path);
} else console.log('dry run (add --write to save)');