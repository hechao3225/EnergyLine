/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 「提示引擎」用的精确求解器（从 scripts/solve-min-par.ts 抽出的纯逻辑）。
 * 输入当前盘面，输出「哪几格各转几次、要不要扳闸」，由 UI 取第一步做提示。
 *
 * 求解目标：用最少点击把能量接到 goal 处设施（缺省全亮）。
 */

import { Direction, LevelConfig, Tile } from '../types/game';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from './circuit';
const INF = 1 << 24;
const P_COUNT = 5; // 0 = 无父端口（树根），1..4 = 父端口方向

interface DirSpec {
  d: Direction;
  dr: number;
  dc: number;
  opp: Direction;
}

const DIRS: DirSpec[] = [
  { d: Direction.UP, dr: -1, dc: 0, opp: Direction.DOWN },
  { d: Direction.RIGHT, dr: 0, dc: 1, opp: Direction.LEFT },
  { d: Direction.DOWN, dr: 1, dc: 0, opp: Direction.UP },
  { d: Direction.LEFT, dr: 0, dc: -1, opp: Direction.RIGHT },
];

const pOf = (d: Direction) => DIRS.findIndex((x) => x.d === d) + 1;

export interface Opt {
  mask: number;
  cost: number;
  rotateTaps: number;
  toggle: boolean;
  rotation: number;
}

function basePortsOf(t: Tile): number {
  return t.basePorts || getDefaultBasePorts(t.type);
}

/** 单格：所有可实现的（端口组合 → 最少点击次数） */
export function tileOptions(t: Tile): Opt[] {
  if (t.type === 'empty') return [];
  const base = basePortsOf(t);
  const needToggle = t.type === 'switch' && t.switchClosed === false;

  if (t.locked) {
    return [{ mask: rotatePorts(base, t.rotation), cost: 0, rotateTaps: 0, toggle: false, rotation: t.rotation }];
  }

  const best = new Map<number, Opt>();
  for (let k = 0; k < 4; k++) {
    const rotation = t.rotation + 90 * k;
    const mask = rotatePorts(base, rotation);
    const cost = k + (needToggle ? 1 : 0);
    const opt: Opt = { mask, cost, rotateTaps: k, toggle: needToggle, rotation };
    // 单向管的端口组合不区分方向，不能按 mask 去重，否则会丢掉反向导通的那个姿态
    if (t.type === 'diode') {
      best.set(k, opt);
      continue;
    }
    const prev = best.get(mask);
    if (prev && prev.cost <= cost) continue;
    best.set(mask, opt);
  }
  return [...best.values()];
}

interface Board {
  cells: Tile[];
  optLists: Opt[][];
  neighbor: (i: number, d: Direction) => number;
  bulbBit: Map<number, number>;
  S_COUNT: number;
  n: number;
  idx: (v: number, p: number, s: number) => number;
}

function buildBoard(level: LevelConfig): Board {
  const cells = level.tiles.filter((t) => t.type !== 'empty');
  const posIndex = new Map<string, number>();
  cells.forEach((t, i) => posIndex.set(`${t.row},${t.col}`, i));

  const wrap = level.rules?.wrap === true;
  const rows = level.gridRows;
  const cols = level.gridCols;
  const norm = (value: number, size: number) => ((value % size) + size) % size;
  const neighbor = (i: number, d: Direction) => {
    const t = cells[i];
    const spec = DIRS.find((x) => x.d === d)!;
    const row = wrap ? norm(t.row + spec.dr, rows) : t.row + spec.dr;
    const col = wrap ? norm(t.col + spec.dc, cols) : t.col + spec.dc;
    const j = posIndex.get(`${row},${col}`);
    return j === undefined ? -1 : j;
  };

  const bulbBit = new Map<number, number>();
  let b = 0;
  cells.forEach((t, i) => {
    if (t.type === 'bulb') bulbBit.set(i, 1 << b++);
  });

  const optLists = cells.map(tileOptions);
  const S_COUNT = 1 << b;
  return {
    cells,
    optLists,
    neighbor,
    bulbBit,
    S_COUNT,
    n: cells.length,
    idx: (v: number, p: number, s: number) => (v * P_COUNT + p) * S_COUNT + s,
  };
}

function optionAllowed(board: Board, v: number, p: number, opt: Opt): boolean {
  if (opt.mask === 0) return false;
  const cell = board.cells[v];
  if (p === 0) return cell.type !== 'diode';
  if (!(opt.mask & DIRS[p - 1].d)) return false;
  if (cell.type === 'diode' && rotatePorts(Direction.LEFT, opt.rotation) !== DIRS[p - 1].d) return false;
  return true;
}

/** 以电池为根的有根树 DP */
function buildTable(board: Board): Int32Array {
  const { cells, optLists, neighbor, bulbBit, S_COUNT, n, idx } = board;
  const R = new Int32Array(n * P_COUNT * S_COUNT).fill(INF);

  for (let v = 0; v < n; v++) {
    if (cells[v].type !== 'bulb') continue;
    const bit = bulbBit.get(v)!;
    for (let p = 1; p < P_COUNT; p++) R[idx(v, p, bit)] = 0;
  }

  const scratch = new Int32Array(S_COUNT);
  const nextTable = new Int32Array(S_COUNT);
  let changed = true;
  let sweeps = 0;

  while (changed && sweeps < 500) {
    changed = false;
    sweeps++;
    const order = [...Array(n).keys()];
    if (sweeps % 2 === 0) order.reverse();

    for (const v of order) {
      const cell = cells[v];
      if (cell.type === 'bulb') continue;
      for (let p = 0; p < P_COUNT; p++) {
        if (cell.type === 'battery' && p !== 0) continue; // 电池只能做树根
        const baseBit = bulbBit.get(v) ?? 0;
        scratch.fill(INF);

        for (const opt of optLists[v]) {
          if (!optionAllowed(board, v, p, opt)) continue;
          let cur: Int32Array | null = null;
          for (const spec of DIRS) {
            if (!(opt.mask & spec.d)) continue;
            if (p !== 0 && spec.d === DIRS[p - 1].d) continue; // 不走回父节点
            const u = neighbor(v, spec.d);
            if (u < 0 || cells[u].type === 'battery') continue;
            if (cur === null) {
              cur = new Int32Array(S_COUNT).fill(INF);
              cur[baseBit] = 0;
            }
            const cp = pOf(spec.opp);
            nextTable.set(cur);
            for (let s0 = 0; s0 < S_COUNT; s0++) {
              const c0 = cur[s0];
              if (c0 >= INF) continue;
              for (let sd = 0; sd < S_COUNT; sd++) {
                if (sd & s0) continue;
                const cv = R[idx(u, cp, sd)];
                if (cv >= INF) continue;
                if (c0 + cv < nextTable[s0 | sd]) nextTable[s0 | sd] = c0 + cv;
              }
            }
            cur = nextTable.slice();
          }
          if (cur === null) {
            if (opt.cost < scratch[baseBit]) scratch[baseBit] = opt.cost;
          } else {
            for (let s = 0; s < S_COUNT; s++) {
              const c0 = cur[s];
              if (c0 >= INF) continue;
              if (c0 + opt.cost < scratch[s]) scratch[s] = c0 + opt.cost;
            }
          }
        }

        for (let s = 0; s < S_COUNT; s++) {
          const t = scratch[s];
          if (t < INF && t < R[idx(v, p, s)]) {
            R[idx(v, p, s)] = t;
            changed = true;
          }
        }
      }
    }
  }
  if (changed) throw new Error('DP 未收敛');
  return R;
}

/** 给定 (格子, 父端口, 设施集合, 选项)，拆出子节点分配；返回 null 表示该选项不可行 */
function splitChildren(
  board: Board,
  R: Int32Array,
  v: number,
  p: number,
  s: number,
  opt: Opt
): { children: { u: number; cp: number; sd: number }[]; value: number } | null {
  const { cells, neighbor, bulbBit, S_COUNT, idx } = board;
  const baseBit = bulbBit.get(v) ?? 0;
  const stages: { u: number; cp: number; before: Int32Array }[] = [];
  let cur: Int32Array = new Int32Array(S_COUNT).fill(INF);
  cur[baseBit] = 0;

  for (const spec of DIRS) {
    if (!(opt.mask & spec.d)) continue;
    if (p !== 0 && spec.d === DIRS[p - 1].d) continue;
    const u = neighbor(v, spec.d);
    if (u < 0 || cells[u].type === 'battery') continue;
    const cp = pOf(spec.opp);
    const nxt = new Int32Array(S_COUNT).fill(INF);
    nxt.set(cur);
    for (let s0 = 0; s0 < S_COUNT; s0++) {
      const c0 = cur[s0];
      if (c0 >= INF) continue;
      for (let sd = 0; sd < S_COUNT; sd++) {
        if (sd & s0) continue;
        const cv = R[idx(u, cp, sd)];
        if (cv >= INF) continue;
        if (c0 + cv < nxt[s0 | sd]) nxt[s0 | sd] = c0 + cv;
      }
    }
    stages.push({ u, cp, before: cur });
    cur = nxt;
  }

  const value = cur[s];
  if (value >= INF) return null;

  const children: { u: number; cp: number; sd: number }[] = [];
  let rest = s;
  for (let k = stages.length - 1; k >= 0; k--) {
    const after = k === stages.length - 1 ? cur : stages[k + 1].before;
    const before = stages[k].before;
    if (before[rest] === after[rest]) continue; // 该方向未接子节点
    let hit = false;
    for (let sd = 0; sd < S_COUNT; sd++) {
      if (sd & ~rest) continue;
      const s0 = rest & ~sd;
      if (before[s0] >= INF) continue;
      const cv = R[idx(stages[k].u, stages[k].cp, sd)];
      if (cv >= INF) continue;
      if (before[s0] + cv === after[rest]) {
        children.push({ u: stages[k].u, cp: stages[k].cp, sd });
        rest = s0;
        hit = true;
        break;
      }
    }
    if (!hit) return null;
  }
  if (rest !== baseBit) return null;
  return { children, value };
}

export interface SolveResult {
  par: number;
  plan: { id: string; rotateTaps: number; toggle: boolean }[];
  usedCells: string[];
}

export function solveMinTaps(
  level: LevelConfig,
  opts: { ignoreGoal?: boolean } = {},
): SolveResult {
  const board = buildBoard(level);
  const { cells, optLists, S_COUNT } = board;
  const R = buildTable(board);
  const full = S_COUNT - 1;
  // 胜利条件是「点亮 goal 盏」（缺省全亮）。par 必须按胜利条件算：
  // 取舍关只要点亮其中 goal 盏，逼玩家先去点亮全部设施会把最少步数算高。
  const bulbCount = cells.filter((t) => t.type === 'bulb').length;
  // ignoreGoal：达标关也要算出「全部保住」的代价，用来给预算留出取舍空间
  const need = opts.ignoreGoal
    ? bulbCount
    : Math.max(1, Math.min(bulbCount, level.goal ?? bulbCount));
  const batteryIdx = cells.map((t, i) => (t.type === 'battery' ? i : -1)).filter((i) => i >= 0);

  const allowedMaskFor = (b: number) => {
    if (!level.rules?.colors || level.rules.colors < 2) return S_COUNT - 1;
    const sourceColor = cells[b].color ?? 0;
    let allowed = 0;
    for (const [cellIndex, bit] of board.bulbBit) {
      if ((cells[cellIndex].color ?? 0) === sourceColor) allowed |= bit;
    }
    return allowed;
  };

  const costOf = (b: number, s: number) => {
    if (s & ~allowedMaskFor(b)) return INF;
    return R[board.idx(b, 0, s)];
  };

  // 多电池 = Steiner 森林：把设施集合划分给各电池
  const choicePrev: Int16Array[] = [];
  const choiceTake: Int16Array[] = [];
  let dp = new Int32Array(S_COUNT).fill(INF);
  dp[0] = 0;
  for (const b of batteryIdx) {
    const nxt = new Int32Array(S_COUNT).fill(INF);
    const prevArr = new Int16Array(S_COUNT).fill(-1);
    const takeArr = new Int16Array(S_COUNT).fill(-1);
    for (let used = 0; used < S_COUNT; used++) {
      if (dp[used] >= INF) continue;
      for (let t = 0; t < S_COUNT; t++) {
        if (t & used) continue;
        const c = costOf(b, t);
        if (c >= INF) continue;
        if (dp[used] + c < nxt[used | t]) {
          nxt[used | t] = dp[used] + c;
          prevArr[used | t] = used;
          takeArr[used | t] = t;
        }
      }
    }
    choicePrev.push(prevArr);
    choiceTake.push(takeArr);
    dp = nxt;
  }

  // 选「至少点亮 need 盏」里最便宜的那一组；need === 全亮时就是 full。
  let best = INF;
  let bestMask = -1;
  for (let mask = 0; mask < S_COUNT; mask++) {
    if (mask === 0) continue;
    let bits = 0;
    for (let x = mask; x; x &= x - 1) bits++;
    if (bits >= need && dp[mask] < best) {
      best = dp[mask];
      bestMask = mask;
    }
  }
  if (bestMask < 0) throw new Error(`L${level.id} 求解失败`);

  const plan = new Map<string, { rotateTaps: number; toggle: boolean }>();
  const usedSet = new Set<number>();
  const log: number[] = [];

  const descend = (v: number, p: number, s: number, budget: number): boolean => {
    const cell = cells[v];
    if (cell.type === 'bulb') return true;
    if (usedSet.has(v)) return false;

    const snapshot = log.length;
    usedSet.add(v);
    log.push(v);

    for (const opt of optLists[v]) {
      if (!optionAllowed(board, v, p, opt)) continue;
      const split = splitChildren(board, R, v, p, s, opt);
      if (!split) continue;
      if (split.value + opt.cost !== budget) continue;

      let ok = true;
      for (const c of split.children) {
        if (!descend(c.u, c.cp, c.sd, R[board.idx(c.u, c.cp, c.sd)])) {
          ok = false;
          break;
        }
      }
      if (!ok) {
        // 回滚到本格之前（保留 v 本身，继续尝试下一个端口选项）
        while (log.length > snapshot + 1) usedSet.delete(log.pop()!);
        continue;
      }
      if (opt.rotateTaps > 0 || opt.toggle) {
        plan.set(cell.id, { rotateTaps: opt.rotateTaps, toggle: opt.toggle });
      }
      return true;
    }

    usedSet.delete(v);
    log.pop();
    return false;
  };

  let cursor = bestMask;
  for (let i = batteryIdx.length - 1; i >= 0; i--) {
    const prev = choicePrev[i][cursor];
    const take = choiceTake[i][cursor];
    if (prev < 0 || take < 0) continue;
    const b = batteryIdx[i];
    if (!descend(b, 0, take, R[board.idx(b, 0, take)])) {
      throw new Error(`L${level.id} 回溯失败（电池 ${b} / 设施 ${take}）`);
    }
    cursor = prev;
  }

  return {
    par: best,
    plan: [...plan.entries()].map(([id, v]) => ({ id, ...v })),
    usedCells: [...usedSet].map((i) => cells[i].id),
  };
}

/** 按方案落盘并跑真实电路仿真，返回实际点击次数与点亮情况 */
export function applyPlan(level: LevelConfig, plan: SolveResult['plan']) {
  const byId = new Map(plan.map((p) => [p.id, p]));
  let taps = 0;
  const tiles = level.tiles.map((t) => {
    const p = byId.get(t.id);
    if (!p) return { ...t };
    taps += p.rotateTaps + (p.toggle ? 1 : 0);
    return {
      ...t,
      rotation: t.rotation + p.rotateTaps * 90,
      switchClosed: p.toggle ? true : t.switchClosed,
    };
  });
  const sim = simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules);
  return { tiles, taps, isAllLit: sim.isAllLit, lit: sim.litCount, total: sim.totalBulbs };
}
