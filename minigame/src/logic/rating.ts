/**
 * 4 星评分模型 —— 与 H5 版 src/utils/rating.ts 逐行对齐
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { LevelConfig } from '../types/game';

export const MAX_STARS = 4;
export type StarLevel = 0 | 1 | 2 | 3 | 4;

export interface StarThresholds {
  four: number;
  three: number;
  two: number;
  par: number;
}

export function getParSteps(level: Pick<LevelConfig, 'maxSteps' | 'parSteps'>): number {
  if (level.parSteps !== undefined && level.parSteps > 0) return level.parSteps;
  return Math.max(1, Math.round(level.maxSteps * 0.5));
}

export function getStarThresholds(
  level: Pick<LevelConfig, 'maxSteps' | 'parSteps'>
): StarThresholds {
  const par = getParSteps(level);
  const budget = Math.max(level.maxSteps, par + 2);
  const span = budget - par;
  return {
    par,
    four: par,
    three: par + Math.max(1, Math.round(span * 0.34)),
    two: par + Math.max(2, Math.round(span * 0.68)),
  };
}

export function getStarsForSteps(
  stepsUsed: number,
  level: Pick<LevelConfig, 'maxSteps' | 'parSteps'>
): StarLevel {
  const t = getStarThresholds(level);
  if (stepsUsed <= t.four) return 4;
  if (stepsUsed <= t.three) return 3;
  if (stepsUsed <= t.two) return 2;
  return 1;
}

export function getStarsForRecord(
  bestSteps: number | undefined | null,
  level: Pick<LevelConfig, 'maxSteps' | 'parSteps'>,
  isCleared: boolean
): StarLevel {
  if (!isCleared) return 0;
  if (bestSteps === undefined || bestSteps === null || bestSteps <= 0) return 1;
  return getStarsForSteps(bestSteps, level);
}
