/**
 * 带联动轴的精确求解：枚举每组轴各自的相位（4^g），把该组格子按相位旋转后临时锁死，
 * 交给现成的 solveMinTaps 求其余格子的最少点击；总代价 = 各组相位之和 + 解。
 * 注意：每组相位互相独立——所有组一起转是错的。
 */
import type { LevelConfig } from '../src/types/game';
import { solveRuleLevel } from '../src/utils/rule-solver';

export interface AxisSolution {
  par: number;
  phases: Record<string, number>;
  tiles: LevelConfig["tiles"];
  plan: { id: string; rotateTaps: number; toggle?: boolean }[];
}

export function solveWithAxes(level: LevelConfig): AxisSolution | null {
  const solved = solveRuleLevel(level);
  if (!solved) return null;
  const phasedTiles = level.tiles.map((tile) => {
    const phase = tile.axis ? solved.phases[tile.axis] ?? 0 : 0;
    return tile.axis
      ? {
          ...tile,
          rotation: tile.rotation + phase * 90 * (tile.axisDir ?? 1),
          locked: true,
        }
      : { ...tile };
  });
  return {
    par: solved.par,
    phases: solved.phases,
    tiles: phasedTiles,
    plan: solved.plan,
  };
}
