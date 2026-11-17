/**
 * 实验关 / 生成关的 par 体检与复核。
 */
import { LAB_LEVELS } from '../src/data/labLevels';
import { solveWithAxes } from './axis-solver';
import { simulateCircuit } from '../src/utils/circuit';
import { weldPlanSteps, weldStepsOrder } from './weld-order';

let bad = 0;
for (const level of LAB_LEVELS) {
  const axes = new Set(level.tiles.map((t) => t.axis).filter(Boolean));
  const sol = solveWithAxes(level);
  const declared = level.parSteps ?? 0;
  if (!sol) {
    console.log(`✗ ${level.code} 无解`);
    bad++;
    continue;
  }
  const applied = sol.tiles.map((t) => {
    const step = sol.plan.find((p) => p.id === t.id);
    return step ? { ...t, rotation: t.rotation + (step.rotateTaps ?? 0) * 90 } : { ...t };
  });
  const lit = simulateCircuit(applied, level.gridRows, level.gridCols, level.rules).isAllLit;
  const weldOk = level.rules?.weld
    ? weldStepsOrder(
        level,
        weldPlanSteps(
          sol.phases,
          (sol.plan as { id: string; rotateTaps: number }[]).map((p) => ({
            id: p.id,
            rotateTaps: p.rotateTaps,
          })),
        ),
        200000,
      ) !== null
    : true;
  const ok = lit && weldOk;
  const match = declared === sol.par;
  if (!match || !ok) bad++;
  console.log(
    `${ok && match ? '✓' : '✗'} ${level.code} ${level.title}（${axes.size} 组）：par ${sol.par}，数据 ${declared}${match ? '' : ' ✗'}${weldOk ? '' : ' 焊死顺序不可行'}，相位 ${JSON.stringify(sol.phases)}，预算 ${level.maxSteps}`,
  );
}
process.exitCode = bad;
