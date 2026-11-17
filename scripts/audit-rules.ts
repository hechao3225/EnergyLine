/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 带规则关卡的求解复核：新机制不能只看能不能通关，还要看最优解在规则下是否成立。
 * - 双色：无约束最优解必须每盏灯只收到自己那一色；
 * - 禁环：锁定正确 T 朝向解其余；每个陷阱的错误朝向必须过载。
 */
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { simulateCircuit } from '../src/utils/circuit';
import { applyPlan, solveMinTaps } from '../src/utils/hint-solver';

interface Trap { r: number; c: number; correct: number; wrong: number; taps: number }
const TRAPS: Record<number, Trap[]> = {
  86: [
    { r: 2, c: 2, correct: 0, wrong: 180, taps: 3 },
    { r: 4, c: 1, correct: 180, wrong: 90, taps: 2 },
  ],
};

let checked = 0;
let failed = 0;
for (const level of DEFAULT_LEVELS) {
  if (!level.rules) continue;
  if (level.tiles.some((t) => t.axis)) {
    console.log('[SKIP] L' + level.id + ' 联动轴（需要 axis-solver 接入）');
    continue;
  }
  checked++;
  try {
    const traps = TRAPS[level.id] ?? [];
    const base = traps.length
      ? { ...level, tiles: level.tiles.map((t) => { const tr = traps.find((x) => x.r === t.row && x.c === t.col); return tr ? { ...t, rotation: tr.correct, locked: true } : t; }) }
      : level;
    const res = solveMinTaps(base);
    const applied = applyPlan(base, res.plan);
    const sim = simulateCircuit(applied.tiles, level.gridRows, level.gridCols, level.rules);
    const goal = level.goal ?? sim.totalBulbs;
    if (sim.litCount < goal) throw new Error('只亮 ' + sim.litCount + '/' + goal);
    if (sim.overloaded) throw new Error('正确解过载');
    if (traps.length) {
      const taps = traps.reduce((s, tr) => s + tr.taps, 0);
      if (res.par + taps !== level.parSteps) throw new Error('par ' + (res.par + taps) + ' != ' + level.parSteps);
      for (const tr of traps) {
        const wrong = applied.tiles.map((t) => (t.row === tr.r && t.col === tr.c ? { ...t, rotation: tr.wrong, locked: false } : t));
        const wrongSim = simulateCircuit(wrong, level.gridRows, level.gridCols, level.rules);
        if (!wrongSim.overloaded) throw new Error('T(' + tr.r + ',' + tr.c + ') 错误朝向应过载');
      }
      console.log('[PASS] L' + level.id + ' ' + JSON.stringify(level.rules) + ' 正确解 par ' + level.parSteps + '，' + traps.length + ' 个陷阱错误朝向均过载');
    } else {
      if (res.par !== level.parSteps) throw new Error('par ' + res.par + ' != ' + level.parSteps);
      console.log('[PASS] L' + level.id + ' ' + JSON.stringify(level.rules) + ' par ' + res.par + ' 亮 ' + sim.litCount + '/' + goal);
    }
  } catch (e: any) {
    failed++;
    console.log('[FAIL] L' + level.id + ' ' + e.message);
  }
}
console.log('带规则关卡复核：' + (checked - failed) + '/' + checked + ' 通过');
if (failed) process.exit(1);