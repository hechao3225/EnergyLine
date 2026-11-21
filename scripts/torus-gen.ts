/**
 * 环面实验关生成器（T1–T3）。
 * 在 6×6 甜甜圈上长树：左右、上下边界相接，路线会从一边穿出去、从对面回来。
 * 校验：精确 par（求解器按 wrap 邻居算）、解回放必须点亮、且最优解必须真的用过一次边界。
 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { Direction, type LevelConfig, type Tile, type TileType } from '../src/types/game';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from '../src/utils/circuit';
import { solveWithAxes } from './axis-solver';

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
const wrapR = (r: number) => ((r % ROWS) + ROWS) % ROWS;
const wrapC = (c: number) => ((c % COLS) + COLS) % COLS;
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
    const options = DIRS.map(([dr, dc, dir]) => ({ r: wrapR(r + dr), c: wrapC(c + dc), dir })).filter(
      (o) => !ports.has(key(o.r, o.c)),
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

export interface TorusGenSpec {
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
  seed: number;
}

const SPECS: TorusGenSpec[] = [
  {
    id: 921,
    code: 'T1',
    title: '环面 · 从左边出去',
    subtitle: '出界',
    hint: '盘面是卷起来的：从右边出去，会从左边回来；从上边下去，会从下边上来。别按屏幕上的距离算。',
    win: '试验通过：走出边界，又回来了。',
    // 预览关：4–8 步的量级，第一下就该逼玩家跨一次缝
    cells: 17,
    bulbs: 2,
    par: [6, 8],
    tolerance: 2,
    seed: 1,
  },
  {
    id: 922,
    code: 'T2',
    title: '环面 · 绕一圈回来',
    subtitle: '绕行',
    hint: '最短的路可能是穿过边界的那条；角落的管子常常有两套接法。',
    win: '试验通过：绕了一圈，反而更近。',
    // 第二条缝：9–11 步，比预览深一档，但仍在一口气能想完的范围里
    cells: 20,
    bulbs: 3,
    par: [9, 11],
    tolerance: 2,
    seed: 1,
  },
  {
    id: 923,
    code: 'T3',
    title: '环面 · 别按距离算',
    subtitle: '错觉',
    hint: '这一关的近路都在对面：先想清楚“穿出去”落在哪一格，再动手。',
    win: '试验通过：距离是假的。',
    cells: 27,
    bulbs: 4,
    par: [16, 21],
    tolerance: 3,
    seed: 1,
  },
];

function build(spec: TorusGenSpec, seed: number): LevelConfig | null {
  const rng = makeRng(seed);
  const tree = growTree(rng, spec.cells);
  if (tree.size < spec.cells) return null;
  // 源点必须至少有一个端口，否则电池无法定向（旧实现在此直接抛异常）。
  if ((tree.get(key(SOURCE.row, SOURCE.col)) ?? 0) === 0) return null;
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
      else if (type === 'line') taps = rng() < 0.72 ? 1 : 0;
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
    rules: { wrap: true },
    tiles,
  };
  const init = simulateCircuit(tiles, ROWS, COLS, level.rules);
  if (init.isAllLit || init.litCount > 0) return null;
  const sol = solveWithAxes(level);
  if (!sol) return null;
  const [lo, hi] = spec.par;
  if (sol.par < lo || sol.par > hi) return null;
  // 回放：按解把每格转到目标朝向
  const applied = tiles.map((t) => {
    const step = sol.plan.find((p) => p.id === t.id);
    return step ? { ...t, rotation: t.rotation + step.rotateTaps * 90 } : { ...t };
  });
  const done = simulateCircuit(applied, ROWS, COLS, level.rules);
  if (!done.isAllLit) return null;
  // 最优解里必须真的用到了环面接缝
  const seam = [...done.poweredEdges].some((edge) => {
    const [from, to] = edge.split('->');
    const [r1, c1] = from.split(',').map(Number);
    const [r2, c2] = to.split(',').map(Number);
    return Math.abs(r1 - r2) > 1 || Math.abs(c1 - c2) > 1;
  });
  if (!seam) return null;
  return { ...level, parSteps: sol.par, maxSteps: sol.par + spec.tolerance };
}

export function generateTorusLevel(
  spec: TorusGenSpec,
  seed: number,
): LevelConfig | null {
  return build(spec, seed);
}

function main() {
  const out: LevelConfig[] = [];
  for (const spec of SPECS) {
    let hit: LevelConfig | null = null;
    for (let seed = spec.seed; seed < spec.seed + 4000 && !hit; seed++) hit = build(spec, seed);
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
      '/** 由 scripts/torus-gen.ts 生成，勿手改。环面实验关 T1–T3（id 921–923）。 */\n' +
      'import type { LevelConfig } from "../types/game";\n\n' +
      'export const TORUS_TEST_LEVELS: LevelConfig[] = ' +
      JSON.stringify(out, null, 2) +
      ';\n';
    fs.writeFileSync('src/data/torusLevels.ts', text);
    console.log('写入 src/data/torusLevels.ts（' + out.length + ' 关）');
  } else {
    console.log('未写文件：' + out.length + '/' + SPECS.length);
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
