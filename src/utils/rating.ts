/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelConfig } from '../types/game';

/**
 * 4-star rating (开心消消乐 style)
 *
 *  ★   通关即可
 *  ★★  比较从容
 *  ★★★ 步数控制不错
 *  ★★★★ 达到关卡设计的最少步数（parSteps）
 *
 * All thresholds are measured in *real taps* (rotations + sluice toggles),
 * never in "remaining budget", so topping up +10 steps can no longer fake a
 * better score.
 */
export const MAX_STARS = 4;

export type StarLevel = 0 | 1 | 2 | 3 | 4;

export interface StarThresholds {
  four: number;
  three: number;
  two: number;
  /** The 4-star (minimum) step budget for this level */
  par: number;
}

export function getParSteps(level: Pick<LevelConfig, 'maxSteps' | 'parSteps'>): number {
  if (level.parSteps !== undefined && level.parSteps > 0) return level.parSteps;
  // Fallback for hand-made / custom levels without a stored par
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

/** Stars earned by clearing a level in `stepsUsed` real taps */
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

/**
 * Stars for an already-cleared level based on its persisted best record.
 * A cleared level without a trustworthy step record only earns 1 star
 * (we never invent a rating we have no evidence for).
 */
export function getStarsForRecord(
  bestSteps: number | undefined | null,
  level: Pick<LevelConfig, 'maxSteps' | 'parSteps'>,
  isCleared: boolean
): StarLevel {
  if (!isCleared) return 0;
  if (bestSteps === undefined || bestSteps === null || bestSteps <= 0) return 1;
  return getStarsForSteps(bestSteps, level);
}
