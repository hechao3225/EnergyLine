/**
 * 联动轴关卡生成器：随机生长一棵树 → 挑设施 → 分配轴组 → 打乱 → 用精确求解器校验。
 * 只产出“有解且 par 落在目标区间”的关卡，解一并输出给端到端回归使用。
 */
import { Direction, LevelConfig, Tile, TileType } from '../src/types/game';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from '../src/utils/circuit';
import { solveWithAxes } from './axis-solver';

export const ROWS = 6;
export const COLS = 6;
const SOURCE = { row: 3, col: 0 };
const DIRS = [
  [-1, 0, Direction.UP],
  [0, 1, Direction.RIGHT],
  [1, 0, Direction.DOWN],
  [0, -1, Direction.LEFT],
] as const;

export function makeRng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
type Rng = () => number;
const pick = <T,>(rng: Rng, arr: T[]): T => arr[Math.floor(rng() * arr.length)];
const inGrid = (r: number, c: number) => r >= 0 && r < ROWS && c >= 0 && c < COLS;

function popcount(mask: number) {
  let n = 0;
  for (let i = 1; i <= 8; i <<= 1) if (mask & i) n++;
  return n;
}

function solvedRotation(type: TileType, want: number): number {
  const base = getDefaultBasePorts(type);
  for (const r of [0, 90, 180, 270]) if (rotatePorts(base, r) === want) return r;
  throw new Error(`${type} 无法朝向 ${want}`);
}

/** 从泉眼随机生长一棵 contiguity==true 的树 */
function growTree(rng: Rng, size: number) {
  const ports = new Map<string, number>();
  const key = (r: number, c: number) => `${r},${c}`;
  ports.set(key(SOURCE.row, SOURCE.col), 0);
  const order: [number, number][] = [[SOURCE.row, SOURCE.col]];
  let guard = 0;
  while (ports.size < size && guard++ < 5000) {
    const [r, c] = pick(rng, order);
    // 泉眼只有单口，长出第一根管子后就不能再当生长点
    if (r === SOURCE.row && c === SOURCE.col && (ports.get(key(r, c)) ?? 0) !== 0) continue;
    const options = DIRS.filter(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      return inGrid(nr, nc) && !ports.has(key(nr, nc));
    });
    if (!options.length) continue;
    const [dr, dc, dir] = pick(rng, options as unknown as (typeof DIRS)[number][]);
    const nr = r + dr;
    const nc = c + dc;
    ports.set(key(r, c), (ports.get(key(r, c)) ?? 0) | dir);
    ports.set(key(nr, nc), (ports.get(key(nr, nc)) ?? 0) | (dir === Direction.UP ? Direction.DOWN : dir === Direction.DOWN ? Direction.UP : dir === Direction.LEFT ? Direction.RIGHT : Direction.LEFT));
    order.push([nr, nc]);
  }
  return ports;
}

export interface GenSpec {
  id: number;
  code: string;
  title: string;
  hint: string;
  cells: number;
  bulbs: number;
  groups: number[];
  decoys: number;
  par: [number, number];
  tolerance: number;
  seed: number;
  /** 齿轮模式：组内相邻格反向转（axisDir 交替 ±1） */
  gear?: boolean;
  /** 焊死：通电的格子锁住（只写规则，par 仍由求解器算） */
  weld?: boolean;
}

export interface GenResult {
  level: LevelConfig;
  /** 兼容字段：部分调用方按 phase 读取（恒为 0） */
  phase?: number;
  phases: Record<string, number>;
  groups: { axis: string; cells: string[] }[];
  individual: { id: string; taps: number }[];
}

export function parWithAxes(level: LevelConfig) {
  return solveWithAxes(level);
}

export function generate(spec: GenSpec): GenResult | null {
  const rng = makeRng(spec.seed);
  const tree = growTree(rng, spec.cells);
  const cells = [...tree.keys()].map((k) => {
    const [row, col] = k.split(',').map(Number);
    return { row, col, ports: tree.get(k)! };
  });
  const byKey = new Map(cells.map((c) => [`${c.row},${c.col}`, c]));

  // 设施必须放在叶子，否则会截断电流
  const leaves = cells.filter((c) => popcount(c.ports) === 1 && !(c.row === SOURCE.row && c.col === SOURCE.col));
  if (leaves.length < spec.bulbs) return null;
  leaves.sort((a, b) => (b.row + b.col) - (a.row + a.col));
  const bulbCells = leaves.slice(0, spec.bulbs);

  // 轴组：挑路中间（度数 >= 2）的格子
  const candidates = cells.filter(
    (c) => popcount(c.ports) >= 2 && !bulbCells.includes(c) && !(c.row === SOURCE.row && c.col === SOURCE.col),
  );
  if (candidates.length < spec.groups.reduce((a, b) => a + b, 0)) return null;
  const keyOf = (c: { row: number; col: number }) => `${c.row},${c.col}`;
  const groupCells: string[][] = [];
  if (spec.gear) {
    // 齿轮必须是相邻的一串：贴着的两格才咬得住，点一下才看得出一顺一反。
    const pool = [...candidates];
    for (const size of spec.groups) {
      let chain: { row: number; col: number; ports: number }[] | null = null;
      for (let attempt = 0; attempt < 40 && !chain; attempt++) {
        const start = pick(rng, pool);
        const used = new Set<string>([keyOf(start)]);
        const path = [start];
        while (path.length < size) {
          const last = path[path.length - 1];
          const nexts = pool.filter(
            (c) =>
              !used.has(keyOf(c)) &&
              Math.abs(c.row - last.row) + Math.abs(c.col - last.col) === 1,
          );
          if (!nexts.length) break;
          const next = pick(rng, nexts);
          path.push(next);
          used.add(keyOf(next));
        }
        if (path.length === size) chain = path;
      }
      if (!chain) return null;
      chain.forEach((c) => pool.splice(pool.indexOf(c), 1));
      groupCells.push(chain.map(keyOf));
    }
  } else {
    const shuffled = [...candidates].sort(() => rng() - 0.5);
    let cursor = 0;
    for (const size of spec.groups) {
      groupCells.push(shuffled.slice(cursor, cursor + size).map((c) => `${c.row},${c.col}`));
      cursor += size;
    }
    if (cursor > shuffled.length) return null;
  }

  const axisOf = new Map<string, string>();
  groupCells.forEach((group, i) => group.forEach((k) => axisOf.set(k, `ax-${i + 1}`)));
  // 齿轮：组内按顺序交替 ±1，点一下就是“一咬一反”
  const axisDirOf = new Map<string, 1 | -1>();
  groupCells.forEach((group) =>
    group.forEach((k, j) => axisDirOf.set(k, spec.gear && j % 2 === 1 ? -1 : 1)),
  );

  // 先按“解”摆正，再统一打乱
  const typeOf = (c: { ports: number }) => {
    const n = popcount(c.ports);
    if (n === 1) return 'line' as TileType;
    if (n === 2) {
      const horizontal = (c.ports & Direction.LEFT) && (c.ports & Direction.RIGHT);
      const vertical = (c.ports & Direction.UP) && (c.ports & Direction.DOWN);
      return horizontal || vertical ? ('line' as TileType) : ('corner' as TileType);
    }
    return n === 3 ? ('t_shape' as TileType) : ('cross' as TileType);
  };

  const solved: { row: number; col: number; type: TileType; rotation: number; locked: boolean; axis?: string; axisDir?: 1 | -1 }[] = [];
  const groupK = new Map<string, number>();
  groupCells.forEach((group, i) => groupK.set(`ax-${i + 1}`, 1 + Math.floor(rng() * 3)));

  for (const c of cells) {
    const k = `${c.row},${c.col}`;
    const isBulb = bulbCells.includes(c);
    const isSource = c.row === SOURCE.row && c.col === SOURCE.col;
    const type: TileType = isBulb ? 'bulb' : isSource ? 'battery' : typeOf(c);
    // 度数为 1 的“断头”格子只有一根管子接进树，直管必须再补一个反向端口（朝空格，接不到任何东西）
    const opp =
      c.ports === Direction.UP ? Direction.DOWN
      : c.ports === Direction.DOWN ? Direction.UP
      : c.ports === Direction.LEFT ? Direction.RIGHT
      : c.ports === Direction.RIGHT ? Direction.LEFT
      : 0;
    const want = isBulb
      ? Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT
      : type === 'line' && popcount(c.ports) === 1
        ? c.ports | opp
        : c.ports;
    const rotation = solvedRotation(type, want);
    const axis = axisOf.get(k);
    let taps = 0;
    if (!isBulb && !isSource) {
      if (type === 'cross') taps = 0;
      else if (axis) taps = groupK.get(axis)!;
      else if (type === 'line') taps = rng() < 0.72 ? 1 : 0;
      else taps = pick(rng, [1, 1, 1, 2, 2, 3]);
    }
    const dir = axis ? (axisDirOf.get(k) ?? 1) : 1;
    solved.push({
      row: c.row,
      col: c.col,
      type,
      rotation: ((rotation - 90 * taps * dir) % 360 + 360) % 360,
      locked: isBulb || isSource,
      ...(axis ? { axis, axisDir: dir } : {}),
    });
  }

  // 诱饵：贴着主路但不在树上的空格
  const used = new Set(cells.map((c) => `${c.row},${c.col}`));
  const decoyCandidates: { row: number; col: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (used.has(`${r},${c}`)) continue;
      const touches = DIRS.some(([dr, dc]) => used.has(`${r + dr},${c + dc}`));
      if (touches) decoyCandidates.push({ row: r, col: c });
    }
  }
  const decoys = decoyCandidates.sort(() => rng() - 0.5).slice(0, spec.decoys);
  const decoyTiles = decoys.map((d, i) => {
    const type = pick(rng, ['line', 'corner', 't_shape'] as TileType[]);
    return {
      id: `t-${d.row}-${d.col}`,
      row: d.row,
      col: d.col,
      type,
      rotation: Math.floor(rng() * 4) * 90,
      basePorts: getDefaultBasePorts(type),
      axis: !spec.gear && i === 0 && spec.groups.length ? `ax-1` : undefined,
    } as Tile;
  });

  const tiles: Tile[] = [
    ...solved.map((s) => ({
      id: `t-${s.row}-${s.col}`,
      row: s.row,
      col: s.col,
      type: s.type,
      rotation: s.rotation,
      basePorts: getDefaultBasePorts(s.type),
      locked: s.locked,
      ...(s.axis ? { axis: s.axis, ...(s.axisDir ? { axisDir: s.axisDir } : {}) } : {}),
    })),
    ...decoyTiles,
  ];

  const draft: LevelConfig = {
    id: spec.id,
    code: spec.code,
    totalLevels: 99,
    title: spec.title,
    hintText: spec.hint,
    winText: '修复完成。',
    parSteps: 0,
    maxSteps: 1,
    gridRows: ROWS,
    gridCols: COLS,
    ...(spec.weld ? { rules: { weld: true } } : {}),
    tiles,
  };

  if (simulateCircuit(tiles, ROWS, COLS).isAllLit) return null;
  const solvedPar = parWithAxes(draft);
  if (!solvedPar) return null;
  const [lo, hi] = spec.par;
  if (solvedPar.par < lo || solvedPar.par > hi) return null;

  // 复核：按解回放必须真点亮
  const applied = solvedPar.tiles.map((t) => {
    const step = solvedPar.plan.find((p: any) => p.id === t.id);
    return step ? { ...t, rotation: t.rotation + step.rotateTaps * 90 } : { ...t };
  });
  if (!simulateCircuit(applied, ROWS, COLS).isAllLit) return null;

  const level: LevelConfig = {
    ...draft,
    parSteps: solvedPar.par,
    maxSteps: solvedPar.par + spec.tolerance,
  };

  const individual = solvedPar.plan
    .filter((p: any) => p.rotateTaps > 0)
    .map((p: any) => ({ id: p.id, taps: p.rotateTaps }));
  const groups = groupCells.map((group, i) => ({
    axis: `ax-${i + 1}`,
    cells: group.map((k) => `t-${k.replace(',', '-')}`),
  }));
  return { level, phase: 0, phases: solvedPar.phases, groups, individual };
}
