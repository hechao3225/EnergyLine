/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 精确求解「本关最少步数」（par）：点亮全部花蕾所需的最少点击次数。
 *
 * ── 旧逻辑的缺陷 ──
 * 旧 par 来自生成器的 computeParSteps()：只算「把盘面还原成设计图」需要点几下。
 * 那只是众多可行解里的一个，玩家常能找到更短的等价解（设计图 13 步，实际 10 步即可），
 * 于是结算界面出现「仅用 10 步，正好是最少步数」和「本关最少步数 13 步」自相矛盾。
 *
 * ── 本求解器 ──
 * 求「任意合法解中的最少点击次数」：
 *   · 一次点击 = 顺时针旋转 90° 或 水闸合闸，均计 1 步
 *   · 每格枚举「端口组合 → 最少点击次数」
 *   · 点亮全部花蕾 ⟺ 存在一片含电池与全部花蕾的导通区域（取其生成树即可）
 *     → 以电池为根的有根树 DP：R[v][父端口][花蕾集合]，格子代价只付一次
 *   · 灵梭（diode）单向导通：父端口必须等于它的允许入流方向
 *   · 多电池 = Steiner 森林，按花蕾集合划分合并
 *
 * 用法：
 *   npx tsx scripts/solve-min-par.ts            # 只体检，打印差异
 *   npx tsx scripts/solve-min-par.ts --write    # 把新 par 写回关卡数据
 *   npx tsx scripts/solve-min-par.ts --level=3  # 只算一关
 */

import fs from 'fs';
import path from 'path';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { Direction, LevelConfig, Tile } from '../src/types/game';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from '../src/utils/circuit';

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
    // 灵梭的端口组合不区分方向，不能按 mask 去重，否则会丢掉反向导通的那个姿态
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

  const neighbor = (i: number, d: Direction) => {
    const t = cells[i];
    const spec = DIRS.find((x) => x.d === d)!;
    const j = posIndex.get(`${t.row + spec.dr},${t.col + spec.dc}`);
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

/** 给定 (格子, 父端口, 花蕾集合, 选项)，拆出子节点分配；返回 null 表示该选项不可行 */
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

export function solveMinTaps(level: LevelConfig): SolveResult {
  const board = buildBoard(level);
  const { cells, optLists, S_COUNT } = board;
  const R = buildTable(board);
  const full = S_COUNT - 1;
  const batteryIdx = cells.map((t, i) => (t.type === 'battery' ? i : -1)).filter((i) => i >= 0);

  const costOf = (b: number, s: number) => R[board.idx(b, 0, s)];

  // 多电池 = Steiner 森林：把花蕾集合划分给各电池
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

  if (dp[full] >= INF) throw new Error(`L${level.id} 求解失败`);

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

  let cursor = full;
  for (let i = batteryIdx.length - 1; i >= 0; i--) {
    const prev = choicePrev[i][cursor];
    const take = choiceTake[i][cursor];
    if (prev < 0 || take < 0) continue;
    const b = batteryIdx[i];
    if (!descend(b, 0, take, R[board.idx(b, 0, take)])) {
      throw new Error(`L${level.id} 回溯失败（电池 ${b} / 花蕾 ${take}）`);
    }
    cursor = prev;
  }

  return {
    par: dp[full],
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
  const sim = simulateCircuit(tiles, level.gridRows, level.gridCols);
  return { tiles, taps, isAllLit: sim.isAllLit, lit: sim.litCount, total: sim.totalBulbs };
}

async function main() {
  const args = process.argv.slice(2);
  const shouldWrite = args.includes('--write');
  const levelArg = args.find((a) => a.startsWith('--level='));
  const onlyLevel = levelArg ? Number(levelArg.split('=')[1]) : 0;
  const dataArg = (args.find((a) => a.startsWith('--data=')) || '--data=src').split('=')[1];
  const isMiniGame = dataArg === 'minigame';

  const levels: LevelConfig[] = isMiniGame
    ? ((await import('../minigame/src/logic/data/defaultLevels')) as any).DEFAULT_LEVELS
    : DEFAULT_LEVELS;

  const rows: string[] = [];
  const newPars = new Map<number, number>();
  let changed = 0;
  let failed = 0;
  const bigger: string[] = [];
  const trivial: string[] = [];
  let slowest = 0;

  for (const level of levels) {
    if (onlyLevel && level.id !== onlyLevel) {
      newPars.set(level.id, level.parSteps ?? 0);
      continue;
    }
    const t0 = Date.now();
    let res: SolveResult;
    try {
      res = solveMinTaps(level);
    } catch (e) {
      failed++;
      rows.push(`❌ L${level.id} ${level.title} 求解异常：${(e as Error).message}`);
      continue;
    }
    const applied = applyPlan(level, res.plan);
    const ok = applied.isAllLit && applied.taps === res.par;
    const ms = Date.now() - t0;
    slowest = Math.max(slowest, ms);
    newPars.set(level.id, res.par);
    const oldPar = level.parSteps ?? 0;

    if (!ok) {
      failed++;
      rows.push(
        `❌ L${level.id} ${level.title} 复核失败：方案点击 ${applied.taps} 步（声明 ${res.par}），点亮 ${applied.lit}/${applied.total}`
      );
      continue;
    }
    if (res.par <= 5) trivial.push(`L${level.id}（${res.par} 步）`);
    if (res.par === oldPar) continue;
    changed++;
    const delta = oldPar - res.par;
    if (delta < 0) bigger.push(`L${level.id} ${level.title}: ${oldPar} → ${res.par}`);
    rows.push(
      `L${String(level.id).padStart(2, '0')} ${level.title}  旧 par ${oldPar} → 新 par ${res.par}  (${delta > 0 ? '-' : '+'}${Math.abs(delta)} 步)`
    );
  }

  console.log(rows.join('\n'));
  console.log(`\n合计 ${levels.length} 关：需修正 ${changed} 关，复核失败 ${failed} 关，单关最慢 ${slowest}ms`);
  if (bigger.length) {
    console.log('\n真实最少步数比旧 par 更大的关卡（旧值偏乐观，玩家原本拿不到 4★）：');
    bigger.forEach((r) => console.log('  ' + r));
  }
  if (trivial.length) {
    console.log(`\n⚠️ 真正的「一/几点击穿」关卡 ${trivial.length} 关：${trivial.join(' ')}`);
    console.log('   （这些关的开局盘面几乎已经导通，属关卡设计问题，不是显示问题）');
  }

  if (!shouldWrite || failed > 0) return;

  const target = path.resolve(
    process.cwd(),
    isMiniGame ? 'minigame/src/logic/data/defaultLevels.ts' : 'src/data/defaultLevels.ts'
  );
  const importLine = isMiniGame
    ? "import { LevelConfig } from '../../types/game';"
    : "import { LevelConfig } from '../types/game';";
  const updated = levels.map((l) => ({ ...l, parSteps: newPars.get(l.id) ?? l.parSteps }));
  const header = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

${importLine}

`;
  fs.writeFileSync(target, header + `export const DEFAULT_LEVELS: LevelConfig[] = ${JSON.stringify(updated, null, 2)};\n`, 'utf8');
  console.log(`\n已写入 ${target}`);
}

if (process.argv[1] && process.argv[1].endsWith('solve-min-par.ts')) void main();
