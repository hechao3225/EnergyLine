import type { LevelConfig } from "../types/game";

export interface ParkProgress {
  coins: number;
  gems: number;
  hints: number;
  rewardedLevels: number[];
  completedDate: string;
  claimedDate: string;
}
export interface StorageReader {
  getItem(key: string): string | null;
}
export const PARK_STORAGE_KEY = "energy_park_progress_v2";
export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function getStars(remaining: number, maximum: number): number {
  const ratio = remaining / maximum;
  return ratio >= 0.4 ? 3 : ratio >= 0.15 ? 2 : 1;
}
export function getBestStars(
  level: LevelConfig,
  cleared: number[],
  best: Record<number, number>,
): number {
  return cleared.includes(level.id)
    ? getStars(level.maxSteps - (best[level.id] ?? 0), level.maxSteps)
    : 0;
}
export function readParkProgress(storage: StorageReader): ParkProgress {
  const saved = storage.getItem(PARK_STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return {
    coins: Number(storage.getItem("energy_coins") ?? 0),
    gems: Number(storage.getItem("energy_gems") ?? 0),
    hints: Number(storage.getItem("energy_hints") ?? 3),
    rewardedLevels: Array.from({ length: 99 }, (_, i) => i + 1).filter(
      (id) => storage.getItem(`energy_reward_${id}`) === "1",
    ),
    completedDate: "",
    claimedDate: "",
  };
}
export function completeParkLevel(
  progress: ParkProgress,
  levelId: number,
  date: string,
): ParkProgress {
  const firstReward = !progress.rewardedLevels.includes(levelId);
  return {
    ...progress,
    coins: progress.coins + (firstReward ? 100 : 0),
    gems: progress.gems + (firstReward ? 10 : 0),
    rewardedLevels: firstReward
      ? [...progress.rewardedLevels, levelId]
      : progress.rewardedLevels,
    completedDate: date,
  };
}
export function claimDailyTask(
  progress: ParkProgress,
  date: string,
): ParkProgress {
  return progress.completedDate === date && progress.claimedDate !== date
    ? { ...progress, coins: progress.coins + 100, claimedDate: date }
    : progress;
}
export function buyHint(progress: ParkProgress): ParkProgress {
  return progress.coins >= 50
    ? { ...progress, coins: progress.coins - 50, hints: progress.hints + 1 }
    : progress;
}
export function consumeHint(progress: ParkProgress): ParkProgress {
  return progress.hints > 0
    ? { ...progress, hints: progress.hints - 1 }
    : progress;
}
export const CHAPTERS = [
  "失落乐园",
  "星光花园",
  "云端奇境",
  "虹彩天桥",
  "梦幻之巅",
];
export function chapterIndex(id: number): number {
  return Math.min(4, Math.floor((id - 1) / 20));
}
export function resumeLevel(cleared: number[]): number {
  return (
    Array.from({ length: 99 }, (_, i) => i + 1).find(
      (id) => !cleared.includes(id),
    ) ?? 99
  );
}
