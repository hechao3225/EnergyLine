/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 竖版 6×8 迷宫分叉原型：随机连通块 + 环路 + 死端，灯泡拉开；
 * 只铺参与通路的格子，其余留空。仅改 L16/L22/L23/L24/L25。
 * 用法：npx tsx scripts/maze-proto.ts [--write] [--board=16]
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { solveMinTaps } from './solve-min-par';
import { getDefaultBasePorts, getTilePorts } from '../src/utils/circuit';
import type { LevelConfig, Tile } from '../src/types/game';

const R = 8, C = 6;
const SPECS = [
  { id: 16, par: 11, cells: 28 },
  { id: 22, par: 12, cells: 28 },
  { id: 23, par: 12, cells: 30 },
  { id: 24, par: 13, cells: 30 },
  { id: 25, par: 14, cells: 32 },
];
const DIRS = [[1,0,-1],[2,0,1],[4,1,0],[8,-1,0]] as const;
const OPP: Record<number, number> = { 1:4, 2:8, 4:1, 8:2 };

function buildGraph(seed: number, targetCells: number) {
  let s = seed; const rand = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  const key = (r: number, c: number) => r + ',' + c;
  const cells = new Set<string>([key(7,0), key(7,1)]);
  const adj = new Map<string, Set<string>>();
  const addEdge = (a: string, b: string) => { if (!adj.has(a)) adj.set(a, new Set()); if (!adj.has(b)) adj.set(b, new Set()); adj.get(a)!.add(b); adj.get(b)!.add(a); };
  addEdge(key(7,0), key(7,1));
  while (cells.size < targetCells) {
    const cand: { from: string; to: string }[] = [];
    for (const k of cells) {
      const [r, c] = k.split(',').map(Number);
      for (const [bit, dr, dc] of DIRS) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        const nk = key(nr, nc);
        if (cells.has(nk)) continue;
        if (k === key(7,0) && nk !== key(7,1)) continue;
        cand.push({ from: k, to: nk });
      }
    }
    if (!cand.length) break;
    const pick = cand[Math.floor(rand() * cand.length)];
    cells.add(pick.to);
    addEdge(pick.from, pick.to);
  }
  // 加 3 条环路（相邻但未连的格子）
  const loops: [string, string][] = [];
  for (const k of cells) {
    const [r, c] = k.split(',').map(Number);
    for (const [, dr, dc] of DIRS) {
      const nk = key(r + dr, c + dc);
      if (!cells.has(nk)) continue;
      if (adj.get(k)!.has(nk)) continue;
      if (k < nk) loops.push([k, nk]);
    }
  }
  for (let i = 0; i < 3 && loops.length; i++) {
    const pick = loops.splice(Math.floor(rand() * loops.length), 1)[0];
    addEdge(pick[0], pick[1]);
  }
  // 加 3 条死端
  let spurs = 0;
  for (const k of [...cells]) {
    if (spurs >= 3) break;
    const [r, c] = k.split(',').map(Number);
    const dirs = DIRS.slice().sort(() => rand() - 0.5);
    for (const [, dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
      const nk = key(nr, nc);
      if (cells.has(nk)) continue;
      if (k === key(7,0)) continue;
      cells.add(nk); addEdge(k, nk); spurs++; break;
    }
  }
  return { cells, adj, loops: 3 - Math.max(0, loops.length), spurs };
}

function maskOf(adj: Map<string, Set<string>>, k: string) {
  const [r, c] = k.split(',').map(Number);
  let mask = 0;
  for (const [bit, dr, dc] of DIRS) if (adj.get(k)?.has((r + dr) + ',' + (c + dc))) mask |= bit;
  return mask;
}

function pickBulbs(cells: Set<string>, adj: Map<string, Set<string>>) {
  const dist = new Map<string, number>();
  const q = ['7,0']; dist.set('7,0', 0);
  while (q.length) {
    const k = q.shift()!;
    for (const nk of adj.get(k) ?? []) { if (!dist.has(nk)) { dist.set(nk, dist.get(k)! + 1); q.push(nk); } }
  }
  const list = [...cells].filter((k) => {
    if (k === '7,0') return false;
    const [r, c] = k.split(',').map(Number);
    if (r > 5 || c < 1) return false;
    return (dist.get(k) ?? 0) >= 7;
  });
  let best: { a: string; b: string; s: number } | null = null;
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const [ar, ac] = list[i].split(',').map(Number); const [br, bc] = list[j].split(',').map(Number);
    const d = Math.abs(ar - br) + Math.abs(ac - bc);
    if (d < 4) continue;
    if (Math.abs(ar - br) <= 1 && Math.abs(ac - bc) <= 1) continue;
    const s = Math.min(dist.get(list[i])!, dist.get(list[j])!) * 2 + d;
    if (!best || s > best.s) best = { a: list[i], b: list[j], s };
  }
  return best;
}

function rotationFor(type: 'line' | 'corner' | 't_shape' | 'cross', mask: number) {
  for (const r of [0, 90, 180, 270]) {
    const t = { id: 'x', row: 0, col: 0, type, rotation: r, basePorts: getDefaultBasePorts(type) } as Tile;
    if (getTilePorts(t) === mask) return r;
  }
  return null;
}

function buildSolved(graph: { cells: Set<string>; adj: Map<string, Set<string>> }, bulbs: { a: string; b: string }): Tile[] | null {
  const tiles: Tile[] = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) tiles.push({ id: 't-' + r + '-' + c, row: r, col: c, type: 'empty', rotation: 0, basePorts: 0 });
  for (const k of graph.cells) {
    const [r, c] = k.split(',').map(Number);
    const mask = maskOf(graph.adj, k);
    const i = tiles.findIndex((t) => t.row === r && t.col === c);
    if (k === '7,0') { tiles[i] = { ...tiles[i], type: 'battery', rotation: 0, basePorts: getDefaultBasePorts('battery'), locked: true }; continue; }
    if (k === bulbs.a || k === bulbs.b) { tiles[i] = { ...tiles[i], type: 'bulb', rotation: 0, basePorts: getDefaultBasePorts('bulb'), locked: true }; continue; }
    let type: 'line' | 'corner' | 't_shape' | 'cross';
    if (mask === 15) type = 'cross';
    else if (mask === 14 || mask === 13 || mask === 11 || mask === 7) type = 't_shape';
    else if (mask === 10 || mask === 5) type = 'line';
    else if (mask === 6 || mask === 12 || mask === 9 || mask === 3) type = 'corner';
    else if (mask === 2) type = 'line';
    else if (mask === 1 || mask === 4 || mask === 8) type = 'corner';
    else return null;
    let m = mask;
    if (type === 'line' && (mask === 1 || mask === 2 || mask === 4 || mask === 8)) m = mask | OPP[mask];
    if (type === 'corner' && (mask === 1 || mask === 4 || mask === 8)) m = mask | (mask === 1 ? 8 : mask === 4 ? 2 : 4);
    const rot = rotationFor(type, m);
    if (rot === null) return null;
    tiles[i] = { ...tiles[i], type, rotation: rot, basePorts: getDefaultBasePorts(type) };
  }
  return tiles;
}

const write = process.argv.includes('--write');
const boardId = Number((process.argv.find((a) => a.startsWith('--board=')) ?? '--board=0').split('=')[1]);
const SYM: Record<string, string> = { battery: 'B', bulb: 'O', switch: 'S', diode: 'D', cross: '╋', line: '─', corner: '┐', t_shape: 'T', empty: '·' };
let changed = 0;
for (const spec of SPECS) {
  const level = DEFAULT_LEVELS.find((l) => l.id === spec.id)!;
  let found: Tile[] | null = null; let meta: any = null;
  for (let seed = 0; seed < 400; seed++) {
    const graph = buildGraph(spec.id * 100003 + seed * 7919, spec.cells);
    const bulbs = pickBulbs(graph.cells, graph.adj);
    if (!bulbs) continue;
    const solved = buildSolved(graph, bulbs);
    if (!solved) continue;
    // 随机打乱
    let s = seed * 31 + spec.id; const rand = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
    const tiles = solved.map((t) => ({ ...t }));
    for (const t of tiles) {
      if (t.locked || t.type === 'empty') continue;
      const opts = t.type === 'line' ? [0, 90] : [0, 90, 180, 270];
      t.rotation = opts[Math.floor(rand() * opts.length)];
    }
    const cand: LevelConfig = { ...level, gridRows: R, gridCols: C, tiles, parSteps: 0, maxSteps: 9999, goal: undefined };
    let par; try { par = solveMinTaps(cand).par; } catch { continue; }
    if (par !== spec.par) continue;
    found = tiles; meta = { bulbs, cells: graph.cells.size };
    break;
  }
  console.log('L' + spec.id, 'target', spec.par, found ? 'FOUND cells ' + meta.cells : 'MISS');
  if (!found) continue;
  level.gridRows = R; level.gridCols = C; level.tiles = found;
  level.parSteps = spec.par; level.maxSteps = Math.max(spec.par + 5, Math.ceil(spec.par * 1.5)); level.goal = undefined;
  changed++;
  if (boardId === spec.id) {
    console.log('== L' + spec.id + ' par ' + spec.par + ' bulbs ' + meta.bulbs.a + ' / ' + meta.bulbs.b + ' ==');
    for (let r = 0; r < R; r++) { let line = ''; for (let c = 0; c < C; c++) line += (SYM[found.find((t) => t.row === r && t.col === c)!.type] ?? '?') + ' '; console.log(line); }
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