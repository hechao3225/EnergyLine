/**
 * 把 CombSpec 编译成关卡：建格 → 邻接推类型/朝向 → 分配点击数命中目标 par → 精确求解复核。
 */
import fs from 'node:fs';
import path from 'node:path';
import { Direction, LevelConfig, Tile, TileType } from '../src/types/game';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from '../src/utils/circuit';
import { solveWithAxes } from './axis-solver';
import { COMBS, CombSpec } from './axis-maps';

const ROWS = 6, COLS = 6;
const DIRS = [[-1, 0, Direction.UP], [0, 1, Direction.RIGHT], [1, 0, Direction.DOWN], [0, -1, Direction.LEFT]] as const;
const OPP: Record<number, number> = {
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT,
};

function solvedRotation(type: TileType, want: number): number {
  const base = getDefaultBasePorts(type);
  for (const r of [0, 90, 180, 270]) if (rotatePorts(base, r) === want) return r;
  throw new Error(`${type} 无法朝向 ${want}`);
}
function popcount(mask: number) {
  let n = 0;
  for (const d of [1, 2, 4, 8]) if (mask & d) n++;
  return n;
}

/** 由参数生成两张格子图 */
function grids(spec: CombSpec) {
  const map = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => '.'));
  const axes = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => '.'));
  map[3][0] = 'S';
  for (let c = 1; c <= spec.trunkTo; c++) map[3][c] = '#';
  if (spec.rightBulb) map[3][spec.trunkTo + 1] = 'B';
  for (const c of spec.up) {
    map[2][c] = '#';
    map[1][c] = '#';
    map[0][c] = 'B';
  }
  for (const c of spec.down) {
    map[4][c] = '#';
    map[5][c] = 'B';
  }
  spec.groups.forEach((group, i) => {
    const mark = String.fromCharCode(97 + i);
    for (const [r, c] of group) {
      if (map[r][c] !== '#') throw new Error(`轴 ${mark} 落在非管道格 (${r},${c})=${map[r][c]}`);
      axes[r][c] = mark;
    }
  });
  return { map: map.map((row) => row.join('')), axes: axes.map((row) => row.join('')) };
}

interface Cell { row: number; col: number; ports: number; kind: 'pipe' | 'source' | 'bulb' }

function parse(map: string[]) {
  const at = (r: number, c: number) => (r >= 0 && r < ROWS && c >= 0 && c < COLS ? map[r][c] : '.');
  const cells: Cell[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const ch = at(r, c);
      if (ch === '.') continue;
      let ports = 0;
      for (const [dr, dc, dir] of DIRS) {
        if (at(r + dr, c + dc) !== '.') ports |= dir;
      }
      cells.push({ row: r, col: c, ports, kind: ch === 'S' ? 'source' : ch === 'B' ? 'bulb' : 'pipe' });
    }
  }
  return cells;
}

function validate(cells: Cell[]) {
  const byKey = new Map(cells.map((c) => [`${c.row},${c.col}`, c]));
  const source = cells.find((c) => c.kind === 'source');
  if (!source) throw new Error('缺少泉眼');
  if (popcount(source.ports) !== 1) throw new Error(`泉眼接了 ${popcount(source.ports)} 根管子`);
  const seen = new Set([`${source.row},${source.col}`]);
  const queue = [source];
  while (queue.length) {
    const cur = queue.shift()!;
    for (const [dr, dc, dir] of DIRS) {
      if (!(cur.ports & dir)) continue;
      const k = `${cur.row + dr},${cur.col + dc}`;
      const nb = byKey.get(k);
      if (!nb || seen.has(k)) continue;
      seen.add(k);
      queue.push(nb);
    }
  }
  const bad = cells.filter((c) => !seen.has(`${c.row},${c.col}`));
  if (bad.length) throw new Error(`接不到泉眼：${bad.map((c) => `${c.row},${c.col}`).join(' ')}`);
  for (const b of cells.filter((c) => c.kind === 'bulb')) {
    if (popcount(b.ports) !== 1) throw new Error(`设施 (${b.row},${b.col}) 接了 ${popcount(b.ports)} 根`);
  }
  const stubs = cells.filter((c) => c.kind === 'pipe' && popcount(c.ports) === 1);
  if (stubs.length > 1) throw new Error(`死头管子超过一节：${stubs.map((c) => `${c.row},${c.col}`).join(' ')}`);
}

export function compile(spec: CombSpec, seedNum = 1) {
  const { map, axes } = grids(spec);
  const cells = parse(map);
  validate(cells);

  const groups = new Map<string, { row: number; col: number }[]>();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const mark = axes[r][c];
      if (mark === '.') continue;
      if (!groups.has(mark)) groups.set(mark, []);
      groups.get(mark)!.push({ row: r, col: c });
    }
  }

  const solved: { cell: Cell; type: TileType; rotation: number; axis?: string }[] = [];
  for (const cell of cells) {
    const mark = axes[cell.row][cell.col];
    const axis = mark === '.' ? undefined : mark;
    if (cell.kind === 'bulb') { solved.push({ cell, type: 'bulb', rotation: 0 }); continue; }
    if (cell.kind === 'source') { solved.push({ cell, type: 'battery', rotation: solvedRotation('battery', cell.ports) }); continue; }
    const n = popcount(cell.ports);
    let type: TileType;
    let want = cell.ports;
    if (n === 1) { type = 'line'; want = cell.ports | OPP[cell.ports]; }
    else if (n === 2) {
      const straight = (cell.ports & Direction.UP && cell.ports & Direction.DOWN) || (cell.ports & Direction.LEFT && cell.ports & Direction.RIGHT);
      type = straight ? 'line' : 'corner';
    } else if (n === 3) type = 't_shape';
    else type = 'cross';
    solved.push({ cell, type, rotation: solvedRotation(type, want), axis });
  }

  const capOf = (s: (typeof solved)[number]) => (s.type === 'line' ? 1 : s.type === 'cross' ? 0 : 3);
  const groupPhase = new Map<string, number>();
  for (const mark of groups.keys()) groupPhase.set(mark, 1);
  let used = groupPhase.size;
  const pool = solved.filter((s) => s.cell.kind === 'pipe' && !s.axis);
  const capacity = pool.reduce((a, s) => a + capOf(s), 0) + groups.size * 2;
  if (spec.par < used) throw new Error(`par 目标 ${spec.par} 低于组相位总和 ${used}`);
  if (spec.par > used + capacity) throw new Error(`par 目标 ${spec.par} 超出上限 ${used + capacity}`);
  let remaining = spec.par - used;
  for (const mark of groups.keys()) {
    while (remaining > 0 && groupPhase.get(mark)! < 3) { groupPhase.set(mark, groupPhase.get(mark)! + 1); remaining--; }
  }
  const tapsOf = new Map<string, number>();
  let guard = 0;
  while (remaining > 0 && guard++ < 1000) {
    const cand = pool.filter((s) => (tapsOf.get(`${s.cell.row},${s.cell.col}`) ?? 0) < capOf(s));
    if (!cand.length) break;
    const s = cand[(seedNum * 7 + guard * 13) % cand.length];
    const k = `${s.cell.row},${s.cell.col}`;
    tapsOf.set(k, (tapsOf.get(k) ?? 0) + 1);
    remaining--;
  }
  if (remaining > 0) throw new Error(`par 目标差 ${remaining} 步无法分配`);

  const tiles: Tile[] = solved.map((s) => {
    const taps = s.axis ? groupPhase.get(s.axis)! : (tapsOf.get(`${s.cell.row},${s.cell.col}`) ?? 0);
    return {
      id: `t-${s.cell.row}-${s.cell.col}`,
      row: s.cell.row,
      col: s.cell.col,
      type: s.type,
      rotation: ((s.rotation - 90 * taps) % 360 + 360) % 360,
      basePorts: getDefaultBasePorts(s.type),
      ...(s.cell.kind !== 'pipe' ? { locked: true } : {}),
      ...(s.axis ? { axis: `ax-${s.axis}` } : {}),
    };
  });

  const level: LevelConfig = {
    id: spec.id, code: String(spec.id), totalLevels: 99,
    title: spec.title, hintText: spec.hint, winText: '修复完成。',
    parSteps: 0, maxSteps: 1, gridRows: ROWS, gridCols: COLS, tiles,
  };

  if (simulateCircuit(tiles, ROWS, COLS).isAllLit) throw new Error('初始即通关');
  const sol = solveWithAxes(level);
  if (!sol) throw new Error('无解');
  const applied = sol.tiles.map((t) => {
    const st = sol.plan.find((p: any) => p.id === t.id);
    return st ? { ...t, rotation: t.rotation + (st.rotateTaps ?? 0) * 90 } : { ...t };
  });
  if (!simulateCircuit(applied, ROWS, COLS).isAllLit) throw new Error('回放未点亮');
  level.parSteps = sol.par;
  level.maxSteps = sol.par + spec.tolerance;

  return {
    level,
    designed: spec.par,
    map,
    solutions: {
      phases: sol.phases,
      groups: [...groups.entries()].map(([mark, list]) => ({ axis: `ax-${mark}`, cells: list.map((c) => `t-${c.row}-${c.col}`) })),
      individual: sol.plan.filter((p: any) => p.rotateTaps > 0).map((p: any) => ({ id: p.id, taps: p.rotateTaps })),
    },
  };
}

const results: any[] = [];
let failed = 0;
for (const spec of COMBS) {
  try {
    const out = compile(spec, spec.id);
    results.push(out);
    const bulbs = out.level.tiles.filter((t) => t.type === 'bulb').length;
    const flag = out.level.parSteps === spec.par ? '' : `（设计 ${spec.par}）`;
    console.log(`✓ L${spec.id} ${spec.title}：par ${out.level.parSteps}${flag} 预算 ${out.level.maxSteps} 设施 ${bulbs} 轴 ${out.solutions.groups.length} 组`);
  } catch (e) {
    failed++;
    console.log(`✗ L${spec.id} ${(e as Error).message}`);
  }
}

if (!process.argv.includes('--dry')) {
  fs.writeFileSync(
    path.resolve('src/data/axisTrialLevels.ts'),
    `import type { LevelConfig } from "../types/game";

/** 由 scripts/generate-axis-trial.ts 生成，勿手改。44–50。 */
export const AXIS_TRIAL_LEVELS: LevelConfig[] = ${JSON.stringify(results.map((r) => r.level), null, 2)};
`,
  );
  fs.writeFileSync(
    path.resolve('scripts/fixtures/axis-solutions.json'),
    JSON.stringify(Object.fromEntries(results.map((r) => [String(r.level.id), r.solutions])), null, 2),
  );
  console.log(`写出 ${results.length} 关`);
}
process.exitCode = failed;
