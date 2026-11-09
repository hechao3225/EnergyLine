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
  icon: string;
  rarity: AchievementRarity;
  hint: string;
  unlockedAt?: number;
  progress?: AchievementProgressInfo;
}

export interface PlayerStats {
  totalClearedLevels: number;
  clearedLevelIds: number[];
  threeStarLevelIds: number[];
  consecutivePerfect: number;
  maxConsecutivePerfect: number;
  totalUndos: number;
  maxEndlessStreak: number;
  tenStepClearCount: number;
}
