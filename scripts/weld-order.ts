/**
 * 焊死关的「操作顺序」校验与还原。
 *
 * 求解器给的是「每组齿轮转几下 + 每格转几下」，不考虑顺序；
 * 这里按焊死规则回放 —— 已经通电的格子不能再转，齿轮组只要有一格通电，整组就锁住。
 *
 * 注意：焊死只会减少可能性，所以「无焊死的最优计划本身可行」⇒ 这一关的焊死 par 等于原 par。
 */
import type { LevelConfig } from '../src/types/game';
import { simulateCircuit } from '../src/utils/circuit';

export interface ClickStep {
  /** 齿轮组 id：点一下整组按各自方向转 90° */
  axis?: string;
  /** 单格 id */
  id?: string;
  taps: number;
}

/** 把求解结果摊平成点击计划：先列齿轮组（按相位），再列单格。 */
export function weldPlanSteps(
  phases: Record<string, number>,
  plan: { id: string; rotateTaps: number }[],
): ClickStep[] {
  const steps: ClickStep[] = [];
  for (const [axis, taps] of Object.entries(phases)) if (taps > 0) steps.push({ axis, taps });
  for (const step of plan) if (step.rotateTaps > 0) steps.push({ id: step.id, taps: step.rotateTaps });
  return steps;
}

export function weldStepsOrder(
  level: LevelConfig,
  steps: ClickStep[],
  cap = 300000,
): ClickStep[] | null {
  const remaining = steps.map((step) => step.taps);
  const start = level.tiles.map((t) => ({ ...t }));
  const seen = new Set<string>();
  const path: ClickStep[] = [];
  let nodes = 0;

  const keyOf = (tiles: typeof start, rem: number[]) =>
    tiles.map((t) => t.id + ':' + (((t.rotation % 360) + 360) % 360)).join(',') + '|' + rem.join(',');

  const apply = (tiles: typeof start, step: ClickStep) => {
    if (step.axis) {
      return tiles.map((t) =>
        t.axis === step.axis ? { ...t, rotation: t.rotation + 90 * (t.axisDir ?? 1) } : t,
      );
    }
    return tiles.map((t) => (t.id === step.id ? { ...t, rotation: t.rotation + 90 } : t));
  };

  const dfs = (tiles: typeof start, rem: number[]): boolean => {
    if (nodes++ > cap) return false;
    if (rem.every((v) => v <= 0)) return true;
    const key = keyOf(tiles, rem);
    if (seen.has(key)) return false;
    seen.add(key);
    const sim = simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules);
    for (let i = 0; i < steps.length; i++) {
      if (rem[i] <= 0) continue;
      const step = steps[i];
      const blocked = step.axis
        ? tiles.some((t) => t.axis === step.axis && sim.poweredTileIds.has(t.id))
        : Boolean(step.id && sim.poweredTileIds.has(step.id));
      if (blocked) continue;
      const nextRem = [...rem];
      nextRem[i] -= 1;
      path.push(step);
      if (dfs(apply(tiles, step), nextRem)) return true;
      path.pop();
    }
    return false;
  };

  return dfs(start, remaining) ? path : null;
}

/** 单格计划的老入口，保留给只转单格的关。 */
export function weldFeasible(
  level: LevelConfig,
  plan: { id: string; rotateTaps: number }[],
  cap = 300000,
): boolean {
  return weldStepsOrder(level, weldPlanSteps({}, plan), cap) !== null;
}
