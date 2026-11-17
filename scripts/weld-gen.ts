/**
 * 焊死实验关生成器（W1–W3）。
 * 规则：已经通电的格子不能再转 —— 必须从最远的设施往回修。
 * 校验：精确 par + 解回放 + 焊死顺序可行（无焊死最优计划本身就要能按顺序执行，par 才成立）。
 */
import fs from 'node:fs';
import { Direction, type LevelConfig, type Tile, type TileType } from '../src/types/game';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from '../src/utils/circuit';
import { solveWithAxes } from './axis-solver';
import { weldFeasible } from './weld-order';

const ROWS = 6;
const COLS = 6;
const SOURCE = { row: 3, col: 0 };
const DIRS = [
  [-1, 0, Direction.UP],
  [0, 1, Direction.RIGHT],
  [1, 0, Direction.DOWN],
  [0, -1, Direction.LEFT],
] as const;

function makeRng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
type Rng = () => number;
const pick = <T,>(rng: Rng, arr: T[]): T => arr[Math.floor(rng() * arr.length)];
const key = (r: number, c: number) => `${r},${c}`;
const inGrid = (r: number, c: number) => r >= 0 && r < ROWS && c >= 0 && c < COLS;
const popcount = (mask: number) => {
  let n = 0;
  for (let i = 1; i <= 8; i <<= 1) if (mask & i) n++;
  return n;
};

function growTree(rng: Rng, size: number) {
  const ports = new Map<string, number>();
  const order: [number, number][] = [[SOURCE.row, SOURCE.col]];
  ports.set(key(SOURCE.row, SOURCE.col), 0);
  let guard = 0;
  while (ports.size < size && guard++ < 6000) {
    const [r, c] = pick(rng, order);
    if (r === SOURCE.row && c === SOURCE.col && (ports.get(key(r, c)) ?? 0) !== 0) continue;
    const options = DIRS.map(([dr, dc, dir]) => ({ r: r + dr, c: c + dc, dir })).filter(
      (o) => inGrid(o.r, o.c) && !ports.has(key(o.r, o.c)),
    );
    if (!options.length) continue;
    const o = pick(rng, options);
    const back =
      o.dir === Direction.UP ? Direction.DOWN
      : o.dir === Direction.DOWN ? Direction.UP
      : o.dir === Direction.LEFT ? Direction.RIGHT
      : Direction.LEFT;
    ports.set(key(r, c), (ports.get(key(r, c)) ?? 0) | o.dir);
    ports.set(key(o.r, o.c), (ports.get(key(o.r, o.c)) ?? 0) | back);
    order.push([o.r, o.c]);
  }
  return ports;
}

function typeOf(ports: number): TileType {
  const n = popcount(ports);
  if (n === 1) return 'line';
  if (n === 2) {
    const horizontal = (ports & Direction.LEFT) && (ports & Direction.RIGHT);
    const vertical = (ports & Direction.UP) && (ports & Direction.DOWN);
    return horizontal || vertical ? 'line' : 'corner';
  }
  return n === 3 ? 't_shape' : 'cross';
}

function solvedRotation(type: TileType, want: number): number {
  const base = getDefaultBasePorts(type);
  for (const r of [0, 90, 180, 270]) if (rotatePorts(base, r) === want) return r;
  throw new Error(`${type} 无法朝向 ${want}`);
}

interface Spec {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  hint: string;
  win: string;
  cells: number;
  bulbs: number;
  par: [number, number];
  tolerance: number;
  minTapped: number;
}

const SPECS: Spec[] = [
  {
    id: 931,
    code: 'W1',
    title: '焊死 · 先远后近',
    subtitle: '顺序',
    hint: '通电的管子会焊死，不能再转。先修离源最远的那盏，再一路往回接。',
    win: '试验通过：从远往近修，才修得完。',
    cells: 19,
    bulbs: 3,
    par: [8, 11],
    tolerance: 2,
    minTapped: 3,
  },
  {
    id: 932,
    code: 'W2',
    title: '焊死 · 别急着接源头',
    subtitle: '忍住',
    hint: '源头附近一接通就焊住了。中间那条捷径看着最顺，接了就没法回头。',
    win: '试验通过：先接通的地方，最后才碰。',
    cells: 23,
    bulbs: 4,
    par: [11, 15],
    tolerance: 2,
    minTapped: 4,
  },
  {
    id: 933,
    code: 'W3',
    title: '焊死 · 一次都不能错',
    subtitle: '承诺',
    hint: '四盏灯，预算只比最少步数多三步。每一下都要先想清楚它会不会把后面的路焊死。',
    win: '试验通过：每一步都算过。',
    cells: 26,
    bulbs: 4,
    par: [14, 19],
    tolerance: 3,
    minTapped: 5,
  },
];

function build(spec: Spec, seed: number): LevelConfig | null {
  const rng = makeRng(seed);
  const tree = growTree(rng, spec.cells);
  if (tree.size < spec.cells) return null;
  const cells = [...tree.keys()].map((k) => {
    const [row, col] = k.split(',').map(Number);
    return { row, col, ports: tree.get(k)! };
  });
  const leaves = cells.filter(
    (c) => popcount(c.ports) === 1 && !(c.row === SOURCE.row && c.col === SOURCE.col),
  );
  if (leaves.length < spec.bulbs) return null;
  leaves.sort((a, b) => b.row + b.col - (a.row + a.col));
  const bulbs = leaves.slice(0, spec.bulbs);
  const tiles: Tile[] = cells.map((c) => {
    const isBulb = bulbs.includes(c);
    const isSource = c.row === SOURCE.row && c.col === SOURCE.col;
    const type: TileType = isBulb ? 'bulb' : isSource ? 'battery' : typeOf(c.ports);
    const opp =
      c.ports === Direction.UP ? Direction.DOWN
      : c.ports === Direction.DOWN ? Direction.UP
      : c.ports === Direction.LEFT ? Direction.RIGHT
      : c.ports === Direction.RIGHT ? Direction.LEFT
      : 0;
    const want =
      isBulb ? Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT
      : type === 'line' && popcount(c.ports) === 1 ? c.ports | opp
      : c.ports;
    const rotation = solvedRotation(type, want);
    let taps = 0;
    if (!isBulb && !isSource) {
      if (type === 'cross') taps = 0;
      else if (type === 'line') taps = rng() < 0.7 ? 1 : 0;
      else taps = pick(rng, [1, 1, 1, 2, 2, 3]);
    }
    return {
      id: `t-${c.row}-${c.col}`,
      row: c.row,
      col: c.col,
      type,
      rotation: ((rotation - 90 * taps) % 360 + 360) % 360,
      basePorts: getDefaultBasePorts(type),
      ...(isBulb || isSource ? { locked: true } : {}),
    };
  });
  const level: LevelConfig = {
    id: spec.id,
    code: spec.code,
    totalLevels: 99,
    title: spec.title,
    subtitle: spec.subtitle,
    hintText: spec.hint,
    winText: spec.win,
    parSteps: 0,
    maxSteps: 1,
    gridRows: ROWS,
    gridCols: COLS,
    rules: { weld: true },
    tiles,
  };
  const init = simulateCircuit(tiles, ROWS, COLS, level.rules);
  if (init.isAllLit || init.litCount > 0) return null;
  const sol = solveWithAxes(level);
  if (!sol) return null;
  const [lo, hi] = spec.par;
  if (sol.par < lo || sol.par > hi) return null;
  const applied = tiles.map((t) => {
    const step = sol.plan.find((p) => p.id === t.id);
    return step ? { ...t, rotation: t.rotation + step.rotateTaps * 90 } : { ...t };
  });
  const done = simulateCircuit(applied, ROWS, COLS, level.rules);
  if (!done.isAllLit) return null;
  const tapped = sol.plan.filter((p) => p.rotateTaps > 0).length;
  if (tapped < spec.minTapped) return null;
  if (!weldFeasible(level, sol.plan as { id: string; rotateTaps: number }[])) return null;
  return { ...level, parSteps: sol.par, maxSteps: sol.par + spec.tolerance };
}

const out: LevelConfig[] = [];
for (const spec of SPECS) {
  let hit: LevelConfig | null = null;
  for (let seed = 1; seed < 5000 && !hit; seed++) hit = build(spec, seed);
  if (!hit) {
    console.log('✗ ' + spec.code + ' 没有找到合格盘面');
    process.exitCode = 1;
    continue;
  }
  out.push(hit);
  console.log('✓ ' + spec.code + ' ' + spec.title + ' —— par ' + hit.parSteps + ' / 预算 ' + hit.maxSteps);
  const chars: Record<number, string> = { 1: '╵', 2: '╶', 3: '└', 4: '╷', 5: '│', 6: '┌', 7: '├', 8: '╴', 9: '┘', 10: '─', 11: '┴', 12: '┐', 13: '┤', 14: '┬', 15: '┼' };
  for (let r = 0; r < ROWS; r++) {
    let line = '';
    for (let c = 0; c < COLS; c++) {
      const t = hit.tiles.find((x) => x.row === r && x.col === c);
      if (!t) { line += ' ·'; continue; }
      if (t.type === 'battery') { line += ' S'; continue; }
      if (t.type === 'bulb') { line += ' O'; continue; }
      line += ' ' + (chars[rotatePorts(t.basePorts, t.rotation) % 16] ?? '?');
    }
    console.log(line);
  }
}

if (out.length === SPECS.length && !process.argv.includes('--dry')) {
  const text =
    '/** 由 scripts/weld-gen.ts 生成，勿手改。焊死实验关 W1–W3（id 931–933）。 */\n' +
    'import type { LevelConfig } from "../types/game";\n\n' +
    'export const WELD_TEST_LEVELS: LevelConfig[] = ' +
    JSON.stringify(out, null, 2) +
    ';\n';
  fs.writeFileSync('src/data/weldLevels.ts', text);
  console.log('写入 src/data/weldLevels.ts（' + out.length + ' 关）');
} else {
  console.log('未写文件：' + out.length + '/' + SPECS.length);
}
