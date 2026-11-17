/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 诱饵体检：统计每关解树之外的空余头（挂枝/孤立短管），只读。
 * 用法：npx tsx scripts/audit-decoys.ts [--board=56]
 */
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { solveMinTaps } from './solve-min-par';
import { getTilePorts } from '../src/utils/circuit';
import type { LevelConfig, Tile } from '../src/types/game';

const OPP: Record<number, number> = { 1: 4, 2: 8, 4: 1, 8: 2 };
const STEP: Record<number, [number, number]> = { 1: [-1, 0], 2: [0, 1], 4: [1, 0], 8: [0, -1] };

function at(level: LevelConfig, r: number, c: number) {
  return level.tiles.find((t) => t.row === r && t.col === c) ?? null;
}
function ports(t: Tile) { return getTilePorts(t); }
function links(level: LevelConfig, t: Tile) {
  const out: { dir: number; other: Tile }[] = [];
  const p = ports(t);
  for (const bit of [1, 2, 4, 8]) {
    if (!(p & bit)) continue;
    const [dr, dc] = STEP[bit];
    const o = at(level, t.row + dr, t.col + dc);
    if (o && o.type !== 'empty' && (ports(o) & OPP[bit])) out.push({ dir: bit, other: o });
  }
  return out;
}
function glyph(t: Tile) {
  if (t.type === 'empty') return '·';
  if (t.type === 'battery') return 'B';
  if (t.type === 'bulb') return 'O';
  if (t.type === 'cross') return '╋';
  if (t.type === 'switch') return 'S';
  if (t.type === 'diode') return 'D';
  if (t.locked) return 'X';
  const p = ports(t);
  const key = [1, 2, 4, 8].map((b) => (p & b ? 1 : 0)).join('');
  const map: Record<string, string> = {
    '1010': '│', '0101': '─', '1000': '╵', '0100': '╶', '0010': '╷', '0001': '╴',
    '0011': '┐', '0110': '┌', '1100': '└', '1001': '┘',
    '0111': '┬', '1011': '┴', '1101': '┤', '1110': '├', '1111': '┼',
  };
  return map[key] ?? '?';
}

interface Deco { tiles: Tile[]; attached: boolean; length: number; caps: number; }

function decoys(level: LevelConfig, used: Set<string>): Deco[] {
  const cand = level.tiles.filter((t) => t.type !== 'empty' && !t.locked && t.type !== 'bulb' && t.type !== 'battery' && !used.has(t.id));
  const seen = new Set<string>();
  const list: Deco[] = [];
  for (const t of cand) {
    if (seen.has(t.id)) continue;
    const comp: Tile[] = [];
    const q = [t];
    seen.add(t.id);
    while (q.length) {
      const cur = q.pop()!;
      comp.push(cur);
      for (const { other } of links(level, cur)) {
        if (!cand.some((x) => x.id === other.id)) continue;
        if (seen.has(other.id)) continue;
        seen.add(other.id);
        q.push(other);
      }
    }
    const attached = comp.some((x) => links(level, x).some(({ other }) => used.has(other.id)));
    let caps = 0;
    for (const x of comp) for (const bit of [1, 2, 4, 8]) if (ports(x) & bit) {
      const [dr, dc] = STEP[bit];
      const o = at(level, x.row + dr, x.col + dc);
      if (!o || o.type === 'empty' || !(ports(o) & OPP[bit])) caps++;
    }
    list.push({ tiles: comp, attached, length: comp.length, caps });
  }
  return list;
}

const boardArg = process.argv.find((a) => a.startsWith('--board='));
const boardId = boardArg ? Number(boardArg.split('=')[1]) : 0;
const rows: string[] = [];
let levelsWithStub = 0, totalIsolated = 0, totalStub = 0;
for (const level of DEFAULT_LEVELS) {
  const res = solveMinTaps(level);
  const used = new Set(res.usedCells);
  const ds = decoys(level, used);
  const isolated = ds.filter((d) => !d.attached).length;
  const stubs = ds.filter((d) => d.attached && d.length === 1).length;
  const branches = ds.filter((d) => d.attached && d.length >= 2).length;
  if (stubs + branches > 0) levelsWithStub++;
  totalIsolated += isolated;
  totalStub += stubs;
  if (boardId && level.id === boardId) {
    console.log('== L' + level.id + ' par ' + res.par + ' used ' + used.size + ' ==');
    for (let r = 0; r < level.gridRows; r++) {
      let line = '';
      for (let c = 0; c < level.gridCols; c++) {
        const t = at(level, r, c)!;
        line += glyph(t) + (used.has(t.id) ? '*' : ' ') + ' ';
      }
      console.log(line);
    }
    for (const d of ds) console.log('  ' + (d.attached ? 'attached' : 'isolated') + ' len ' + d.length + ' caps ' + d.caps + ': ' + d.tiles.map((x) => x.row + ',' + x.col + ':' + x.type).join(' '));
  }
  rows.push([level.id, res.par, isolated, stubs, branches, ds.length, ds.reduce((s, d) => s + d.caps, 0)].join('\t'));
}
console.log('levels with decoy branches: ' + levelsWithStub + '/99; isolated total ' + totalIsolated + ', single stubs total ' + totalStub);
console.log('id\tpar\tisolated\tstub1\tbranch2+\tdecoys\tcaps');
console.log(rows.join('\n'));