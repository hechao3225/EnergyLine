/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 只换起手旋转、不动布局的 par 重排工具。
 *
 * 目标：把 99 关里平台段与取舍关的 par 调到设计目标，
 * 瓦片的位置/类型/锁定状态一律不变，只改 rotation 与 switchClosed。
 *
 * 用法：
 *   npx tsx scripts/retune-par.ts           # 空跑，打印前后对照
 *   npx tsx scripts/retune-par.ts --write   # 写回 src/data/defaultLevels.ts
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { solveMinTaps, applyPlan } from './solve-min-par';
import { simulateCircuit } from '../src/utils/circuit';
import type { LevelConfig, Tile } from '../src/types/game';

/** 硬关：预算贴 par（20/40 留 1 步，其余零容错） */
const HARD = new Set([10, 20, 30, 40, 50, 60, 70, 80, 90, 99]);

/** 本轮目标 par（阶段 1：只换起手旋转） */
const TARGETS: Record<number, number> = {
  // 开局
  2: 9, 7: 11, 8: 10, 12: 12, 16: 11,
  // 章二开头的台阶
  21: 13, 22: 12, 23: 12, 24: 13,
  // 异常点
  25: 14, 30: 13,
  // 平台 A：L37–L48
  37: 15, 38: 15, 39: 16,
  40: 21,
  41: 14, 42: 15, 43: 15, 44: 16, 45: 16, 46: 17, 47: 17, 48: 17,
  49: 16, 51: 16, 52: 15, 53: 16, 54: 16, 55: 17, 56: 19, 57: 18, 58: 15, 59: 17,
  // 平台 B：L61–L72
  50: 16, 60: 24,
  61: 16, 62: 16, 63: 17, 64: 16, 65: 18, 66: 19, 67: 18, 68: 19, 69: 21, 70: 20, 71: 19, 72: 19,
  // 平台 C：L73–L91
  73: 20, 74: 18, 75: 20, 76: 18, 77: 20, 78: 22, 79: 21,
  80: 24,
  81: 19, 82: 18, 83: 20, 84: 19, 85: 21, 86: 21, 87: 22, 88: 19, 89: 19, 90: 20, 91: 18,
  // 收尾
  92: 21, 93: 22, 94: 22, 95: 22, 96: 23, 97: 23, 98: 24,
};

const TAP_CAP: Record<string, number> = { line: 1, corner: 3, t_shape: 3, diode: 3, switch: 2 };

/** 这三关的最便宜解法绕开了被打乱的必经树，换起手旋转抬不到目标；先取可达上限，阶段 2 改布局。 */
const ACCEPT_BEST = new Set([30, 80, 90]);

function makePrng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const norm = (r: number) => (((r % 360) + 360) % 360) as 0 | 90 | 180 | 270;

function signature(t: Tile) {
  return [t.id, t.row, t.col, t.type, t.locked ? 1 : 0, t.basePorts, t.axis ?? '', t.color ?? -1, t.label ?? ''].join('|');
}

/** 复刻 generate-99-levels 的打乱策略：只打乱通关必经的瓦片，每片 1..cap 步。 */
function scramble(solved: Tile[], required: Set<string>, target: number, seed: number): Tile[] {
  const rand = makePrng(seed);
  const movable = solved.filter((t) => !t.locked && required.has(t.id) && TAP_CAP[t.type] !== undefined);
  const caps = movable.map((t) => TAP_CAP[t.type]);
  const minTotal = movable.length;
  const maxTotal = caps.reduce((a, b) => a + b, 0);
  if (minTotal === 0) return solved.map((t) => ({ ...t, rotation: norm(t.rotation) }));
  const want = Math.max(minTotal, Math.min(maxTotal, Math.round(target)));
  const taps = new Array<number>(movable.length).fill(1);
  let extra = want - minTotal;
  while (extra > 0) {
    const open: number[] = [];
    for (let i = 0; i < taps.length; i++) if (taps[i] < caps[i]) open.push(i);
    if (open.length === 0) break;
    taps[open[Math.floor(rand() * open.length)]] += 1;
    extra -= 1;
  }
  const byId = new Map<string, number>();
  movable.forEach((t, i) => byId.set(t.id, taps[i]));
  return solved.map((t) => {
    const k = byId.get(t.id);
    if (k === undefined) return { ...t, rotation: norm(t.rotation) };
    if (t.type === 'switch') {
      return { ...t, rotation: norm(k >= 2 ? t.rotation + 90 : t.rotation), switchClosed: false };
    }
    // 顺时针转 -90k 后，玩家要再点 k 下才能转回；+90k 会变成 4-k 下。
    return { ...t, rotation: norm(t.rotation - 90 * k) };
  });
}

function initialLit(level: LevelConfig) {
  const sim = simulateCircuit(level.tiles, level.gridRows, level.gridCols);
  return { lit: sim.litCount, goal: level.goal ?? sim.totalBulbs };
}

function main() {
  const write = process.argv.includes('--write');
  const onlyArg = process.argv.find((a) => a.startsWith('--only='));
  const only = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',').map(Number)) : null;
  const SEEDS = 240;
  const rows: string[] = [];
  const skipped: string[] = [];
  let changed = 0;

  for (const key of Object.keys(TARGETS)) {
    const id = Number(key);
    if (only && !only.has(id)) continue;
    const target = TARGETS[id];
    const level = DEFAULT_LEVELS.find((l) => l.id === id);
    if (!level) throw new Error('missing level ' + id);
    const before = { tiles: level.tiles.map((t) => ({ ...t })), par: level.parSteps ?? 0, max: level.maxSteps };

    const base = solveMinTaps(level);
    const applied = applyPlan(level, base.plan);
    const solved = applied.tiles.map((t) => ({ ...t, rotation: norm(t.rotation) }));
    const required = new Set(base.usedCells);

    let best: { tiles: Tile[]; par: number; diff: number; movable: number; maxTotal: number } | null = null;
    const movableCount = solved.filter((t) => !t.locked && required.has(t.id) && TAP_CAP[t.type] !== undefined).length;
    const maxTotal = solved
      .filter((t) => !t.locked && required.has(t.id) && TAP_CAP[t.type] !== undefined)
      .reduce((s, t) => s + TAP_CAP[t.type], 0);

    for (let k = 0; k < SEEDS; k++) {
      const tiles = scramble(solved, required, target, id * 7919 + k * 1013 + 4242);
      const cand: LevelConfig = { ...level, tiles, parSteps: 0, maxSteps: 9999 };
      let res;
      try {
        res = solveMinTaps(cand);
      } catch {
        continue;
      }
      const par = res.par;
      if (par <= 0) continue;
      const diff = Math.abs(par - target);
      if (!best || diff < best.diff) best = { tiles, par, diff, movable: movableCount, maxTotal };
      if (diff === 0) break;
    }

    if (!best || (best.diff > 2 && !ACCEPT_BEST.has(id))) {
      skipped.push(`L${id} target ${target} best ${best ? best.par : 'none'}`);
      continue;
    }

    level.tiles = best.tiles;
    level.parSteps = best.par;
    // 硬关（章底取舍关 / 全亮关 / 地狱关）预算贴 par：通过即最优，零容错是刻意的。
    level.maxSteps = HARD.has(id)
      ? id === 20 || id === 40
        ? best.par + 1
        : best.par
      : Math.max(best.par + 5, Math.ceil(best.par * 1.5));

    // ---- verify ----
    const check = solveMinTaps(level);
    if (check.par !== level.parSteps) throw new Error(`L${id} par mismatch ${check.par} vs ${level.parSteps}`);
    const replay = applyPlan(level, check.plan);
    if (replay.taps !== level.parSteps) throw new Error(`L${id} replay taps ${replay.taps} vs ${level.parSteps}`);
    const goal = level.goal ?? replay.total;
    if (replay.lit < goal) throw new Error(`L${id} replay lit ${replay.lit}/${goal}`);
    const init = initialLit(level);
    if (init.lit >= init.goal) throw new Error(`L${id} starts already won`);
    if (level.maxSteps < level.parSteps) throw new Error(`L${id} budget < par`);
    if (before.tiles.length !== level.tiles.length) throw new Error(`L${id} tile count changed`);
    for (let i = 0; i < level.tiles.length; i++) {
      if (signature(before.tiles[i]) !== signature(level.tiles[i])) throw new Error(`L${id} layout changed at ${level.tiles[i].id}`);
    }

    changed++;
    rows.push(
      [id, target, `${before.par}/${before.max}`, `${level.parSteps}/${level.maxSteps}`, best.diff === 0 ? 'exact' : `+${best.diff}`, best.movable, best.maxTotal, `${init.lit}/${init.goal}`].join('\t')
    );
  }

  console.log('id\ttarget\tbefore par/max\tafter par/max\tmatch\tmovable\tmaxTotal\tinit lit');
  console.log(rows.join('\n'));
  if (skipped.length) console.log('\nSKIPPED:\n' + skipped.join('\n'));
  console.log(`\nchanged ${changed} / ${Object.keys(TARGETS).length}`);

  if (write) {
    const path = 'src/data/defaultLevels.ts';
    const text = fs.readFileSync(path, 'utf8');
    const i = text.indexOf('= [');
    const end = text.lastIndexOf('];');
    if (i < 0 || end < 0) throw new Error('array markers not found');
    const next = text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1);
    fs.writeFileSync(path, next, 'utf8');
    console.log('written', path);
  } else {
    console.log('dry run (add --write to save)');
  }
}

main();
