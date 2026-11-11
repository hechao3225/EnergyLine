import type { LevelConfig } from "../types/game";
import { getStarsForRecord } from "./rating";

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
export function getBestStars(
  level: LevelConfig,
  cleared: number[],
  best: Record<number, number>,
): number {
  return getStarsForRecord(best[level.id], level, cleared.includes(level.id));
}
export const PROGRESS_VERSION_KEY = "honeycomb_progress_version";
export const PROGRESS_VERSION = "4";
function readStored<T>(storage: StorageReader, key: string, fallback: T): T {
  try {
    return JSON.parse(storage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
}
export function readStoryProgress(storage: StorageReader, levels: LevelConfig[]) {
  const ids = readStored<unknown>(storage, "honeycomb_cleared_levels", []);
  const cleared: number[] = Array.isArray(ids) ? [...new Set(ids.filter(id => typeof id === "number" && levels.some(level => level.id === id)))] : [];
  const saved: Record<number, number> = storage.getItem(PROGRESS_VERSION_KEY) === PROGRESS_VERSION
    ? readStored(storage, "honeycomb_best_steps", {}) : {};
  const best = Object.fromEntries(Object.entries(saved).filter(([id, value]) => {
    const level = levels.find((item) => item.id === Number(id));
    return level && cleared.includes(level.id) && Number.isInteger(value) && value >= (level.parSteps ?? 1);
  }));
  // 保留已完成的自由演练关卡；新版初始盘面变化后，只迁移对应版本的步数成绩。
  return { cleared, best };
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
