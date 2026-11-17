/** 脚本入口统一复用 src/utils/weld-order.ts。 */
import type { LevelConfig } from '../src/types/game';
import {
  replayWeldSteps,
  weldStepsOrder as findWeldOrder,
  type ClickStep,
} from '../src/utils/weld-order';

export type { ClickStep } from '../src/utils/weld-order';

/** 把求解结果摊平成点击计划：先列齿轮组（按相位），再列单格。 */
export function weldPlanSteps(
  phases: Record<string, number>,
  plan: { id: string; rotateTaps: number; toggle?: boolean }[],
): ClickStep[] {
  const steps: ClickStep[] = [];
  for (const [axis, taps] of Object.entries(phases)) if (taps > 0) steps.push({ axis, taps });
  for (const step of plan) if (step.rotateTaps > 0) steps.push({ id: step.id, taps: step.rotateTaps });
  for (const step of plan) if (step.toggle) steps.push({ id: step.id, taps: 1, toggle: true });
  return steps;
}

export function weldStepsOrder(
  level: LevelConfig,
  steps: ClickStep[],
  cap = 300000,
): ClickStep[] | null {
  return findWeldOrder(level, steps, cap);
}

/** 单格计划的老入口，保留给只转单格的关。 */
export function weldFeasible(
  level: LevelConfig,
  plan: { id: string; rotateTaps: number }[],
  cap = 300000,
): boolean {
  return weldStepsOrder(level, weldPlanSteps({}, plan), cap) !== null;
}

export { replayWeldSteps };
