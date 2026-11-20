import type { LevelConfig } from "../types/game";
import type {
  CosmeticId,
  EquippedMood,
  EquippedOutfit,
  EquippedTheme,
  SupplyId,
} from "../types/shop";
import {
  getCosmeticItem,
  getSupplyItem,
  isCosmeticId,
} from "../data/shopCatalog";
import { getStarsForRecord } from "./rating";
import { CENTER_DISTRICTS } from "../content/zones";

/** 首通奖励。存档字段仍叫 coins，界面统一叫「钻石」——只改显示，不动存档结构。 */
export const FIRST_CLEAR_COINS = 100;
export const HELL_CLEAR_COINS = 150;
/** 提示灯泡单价——合并货币以后这是唯一的经济出口。 */
export const HINT_PRICE = getSupplyItem("hint")!.price;
/** 老存档里独立的钻石字段并入统一货币的折算率（10 钻本来就是一关的奖励）。 */
export const GEM_TO_COIN = 10;

export interface ParkProgress {
  coins: number;
  hints: number;
  lenses: number;
  rewindTokens: number;
  stepTokens: number;
  ownedCosmetics: CosmeticId[];
  equippedCosmetics: {
    mood: EquippedMood;
    outfit: EquippedOutfit;
    exhibitId: number | null;
    theme: EquippedTheme;
  };
  rewardedLevels: number[];
  completedDate: string;
  claimedDate: string;
}
export interface StorageReader {
  getItem(key: string): string | null;
  setItem?(key: string, value: string): void;
}
export const PARK_STORAGE_KEY = "energy_park_progress_v2";
export const RESHAPE_COMPENSATION_KEY = "honeycomb_reshape_compensation_v1";
export const RESHAPE_COMPENSATION_PER_LEVEL = 50;
export const RESHAPE_COMPENSATION_CAP = 4950;
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
const DEFAULT_PROGRESS: ParkProgress = {
  coins: 0,
  hints: 3,
  lenses: 0,
  rewindTokens: 0,
  stepTokens: 0,
  ownedCosmetics: [],
  equippedCosmetics: {
    mood: "default",
    outfit: "default",
    exhibitId: null,
    theme: "default",
  },
  rewardedLevels: [],
  completedDate: "",
  claimedDate: "",
};
/** 计数类字段：任意脏数据都落回默认值，绝不让 NaN / 负数进存档。 */
function asCount(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
}
/**
 * 把存档洗成当前 schema：缺字段补默认值、脏字段丢弃。
 * 旧版本存档、被截断的 JSON、被手动改坏的 localStorage 都走这里，
 * 否则任何一次 schema 变更都会让老玩家开屏崩溃。
 */
export function sanitizeProgress(raw: unknown): ParkProgress {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;
  const rewarded = Array.isArray(source.rewardedLevels)
    ? source.rewardedLevels
    : [];
  const ownedCosmetics = Array.from(
    new Set(
      (Array.isArray(source.ownedCosmetics) ? source.ownedCosmetics : []).filter(
        isCosmeticId,
      ),
    ),
  );
  const equipped =
    source.equippedCosmetics &&
    typeof source.equippedCosmetics === "object"
      ? (source.equippedCosmetics as Record<string, unknown>)
      : {};
  const owns = (id: CosmeticId) => ownedCosmetics.includes(id);
  const exhibitId = equipped.exhibitId;
  return {
    // 钻石已并入金币：老存档按 10 钻 = 100 币折算，不丢价值
    coins:
      asCount(source.coins, DEFAULT_PROGRESS.coins) +
      asCount(source.gems, 0) * GEM_TO_COIN,
    hints: asCount(source.hints, DEFAULT_PROGRESS.hints),
    lenses: asCount(source.lenses, DEFAULT_PROGRESS.lenses),
    rewindTokens: asCount(
      source.rewindTokens,
      DEFAULT_PROGRESS.rewindTokens,
    ),
    stepTokens: asCount(source.stepTokens, DEFAULT_PROGRESS.stepTokens),
    ownedCosmetics,
    equippedCosmetics: {
      mood:
        owns("joy-greeting") && equipped.mood === "joy" ? "joy" : "default",
      outfit:
        owns("starlight-outfit") && equipped.outfit === "starlight"
          ? "starlight"
          : "default",
      exhibitId:
        owns("exhibit-display") &&
        typeof exhibitId === "number" &&
        Number.isInteger(exhibitId) &&
        exhibitId >= 1 &&
        exhibitId <= 99
          ? exhibitId
          : null,
      theme:
        owns("calm-theme") && equipped.theme === "calm" ? "calm" : "default",
    },
    rewardedLevels: Array.from(
      new Set(
        rewarded.filter(
          (id): id is number =>
            typeof id === "number" && Number.isInteger(id) && id > 0 && id <= 99,
        ),
      ),
    ),
    completedDate:
      typeof source.completedDate === "string" ? source.completedDate : "",
    claimedDate:
      typeof source.claimedDate === "string" ? source.claimedDate : "",
  };
}
/** 老版本把货币散在 energy_* 键上，没有 v2 存档时从这里迁移。 */
function migrateLegacyProgress(storage: StorageReader): ParkProgress {
  return sanitizeProgress({
    coins:
      Number(storage.getItem("energy_coins") ?? 0) +
      Number(storage.getItem("energy_gems") ?? 0) * GEM_TO_COIN,
    hints: storage.getItem("energy_hints") ?? 3,
    rewardedLevels: Array.from({ length: 99 }, (_, i) => i + 1).filter(
      (id) => storage.getItem(`energy_reward_${id}`) === "1",
    ),
  });
}

function applyReshapeCompensation(
  storage: StorageReader,
  progress: ParkProgress,
): ParkProgress {
  if (storage.getItem(RESHAPE_COMPENSATION_KEY) === "1") return progress;

  const cleared = readStored<unknown>(storage, "honeycomb_cleared_levels", []);
  const clearedCount = Array.isArray(cleared)
    ? new Set(
        cleared.filter(
          (id): id is number =>
            typeof id === "number" && Number.isInteger(id) && id > 0 && id <= 99,
        ),
      ).size
    : 0;
  const compensation = Math.min(
    clearedCount * RESHAPE_COMPENSATION_PER_LEVEL,
    RESHAPE_COMPENSATION_CAP,
  );
  const next =
    compensation > 0
      ? { ...progress, coins: progress.coins + compensation }
      : progress;

  storage.setItem?.(RESHAPE_COMPENSATION_KEY, "1");
  storage.setItem?.(PARK_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function readParkProgress(storage: StorageReader): ParkProgress {
  const saved = storage.getItem(PARK_STORAGE_KEY);
  if (saved) {
    try {
      const parsed: unknown = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        return applyReshapeCompensation(storage, sanitizeProgress(parsed));
      }
    } catch {
      // 损坏存档不能把人挡在门外：退回旧版本迁移值，后续写入会自动修复。
    }
  }
  return applyReshapeCompensation(storage, migrateLegacyProgress(storage));
}
/** 设置页的「重置存档」：清掉所有本作键，回到新玩家状态。 */
export function resetParkProgress(storage: Storage): void {
  const keys: string[] = [];
  for (let i = 0; i < storage.length; i += 1) {
    const key = storage.key(i);
    if (key && (key.startsWith("honeycomb_") || key.startsWith("energy_")))
      keys.push(key);
  }
  keys.forEach((key) => storage.removeItem(key));
}
export function completeParkLevel(
  progress: ParkProgress,
  levelId: number,
  date: string,
  coins = FIRST_CLEAR_COINS,
): ParkProgress {
  const firstReward = !progress.rewardedLevels.includes(levelId);
  return {
    ...progress,
    coins: progress.coins + (firstReward ? coins : 0),
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
export function buySupply(
  progress: ParkProgress,
  id: SupplyId,
): ParkProgress {
  const item = getSupplyItem(id);
  if (!item || progress.coins < item.price) return progress;
  return {
    ...progress,
    coins: progress.coins - item.price,
    [item.stockKey]: progress[item.stockKey] + 1,
  };
}
export function consumeSupply(
  progress: ParkProgress,
  id: SupplyId,
): ParkProgress {
  const item = getSupplyItem(id);
  if (!item || progress[item.stockKey] <= 0) return progress;
  return {
    ...progress,
    [item.stockKey]: progress[item.stockKey] - 1,
  };
}
export function buyCosmetic(
  progress: ParkProgress,
  id: CosmeticId,
  clearedCount: number,
): ParkProgress {
  const item = getCosmeticItem(id);
  if (
    !item ||
    progress.coins < item.price ||
    clearedCount < item.unlockAt ||
    progress.ownedCosmetics.includes(id)
  ) {
    return progress;
  }
  return {
    ...progress,
    coins: progress.coins - item.price,
    ownedCosmetics: [...progress.ownedCosmetics, id],
  };
}
export function equipCosmetic(
  progress: ParkProgress,
  id: CosmeticId,
  active: boolean,
): ParkProgress {
  if (!progress.ownedCosmetics.includes(id)) return progress;

  if (id === "joy-greeting") {
    const mood: EquippedMood = active ? "joy" : "default";
    return progress.equippedCosmetics.mood === mood
      ? progress
      : {
          ...progress,
          equippedCosmetics: { ...progress.equippedCosmetics, mood },
        };
  }
  if (id === "starlight-outfit") {
    const outfit: EquippedOutfit = active ? "starlight" : "default";
    return progress.equippedCosmetics.outfit === outfit
      ? progress
      : {
          ...progress,
          equippedCosmetics: { ...progress.equippedCosmetics, outfit },
        };
  }
  if (id === "calm-theme") {
    const theme: EquippedTheme = active ? "calm" : "default";
    return progress.equippedCosmetics.theme === theme
      ? progress
      : {
          ...progress,
          equippedCosmetics: { ...progress.equippedCosmetics, theme },
        };
  }
  return progress;
}
export function setHomeExhibit(
  progress: ParkProgress,
  exhibitId: number | null,
): ParkProgress {
  if (!progress.ownedCosmetics.includes("exhibit-display")) return progress;
  if (
    exhibitId !== null &&
    (!Number.isInteger(exhibitId) || exhibitId < 1 || exhibitId > 99)
  ) {
    return progress;
  }
  return progress.equippedCosmetics.exhibitId === exhibitId
    ? progress
    : {
        ...progress,
        equippedCosmetics: { ...progress.equippedCosmetics, exhibitId },
      };
}
export function isCosmeticEquipped(
  progress: ParkProgress,
  id: CosmeticId,
): boolean {
  switch (id) {
    case "joy-greeting":
      return progress.equippedCosmetics.mood === "joy";
    case "starlight-outfit":
      return progress.equippedCosmetics.outfit === "starlight";
    case "exhibit-display":
      return progress.equippedCosmetics.exhibitId !== null;
    case "calm-theme":
      return progress.equippedCosmetics.theme === "calm";
  }
}
export function buyHint(progress: ParkProgress): ParkProgress {
  return buySupply(progress, "hint");
}
export function consumeHint(progress: ParkProgress): ParkProgress {
  return consumeSupply(progress, "hint");
}
export const CHAPTERS = CENTER_DISTRICTS.map((district) => district.name);
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
