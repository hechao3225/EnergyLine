/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface AchievementProgressInfo {
  current: number;
  max: number;
  percent: number;
  unit: string;
  label: string;
  isCompleted: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'efficiency' | 'skill' | 'progress' | 'endless';
  icon: string; // e.g. 'Zap', 'Undo2', 'Flame', 'Award', 'Cpu', 'Sparkles', 'Shield', 'RotateCcw'
  rarity: AchievementRarity;
  hint: string;
  unlockedAt?: number; // timestamp when unlocked
  progress?: AchievementProgressInfo;
}

export interface PlayerStats {
  totalClearedLevels: number;
  clearedLevelIds: number[];
  threeStarLevelIds: number[];
  consecutivePerfect: number; // consecutive 3-star clears in story mode
  maxConsecutivePerfect: number;
  totalUndos: number;
  maxEndlessStreak: number;
  tenStepClearCount: number;
}
