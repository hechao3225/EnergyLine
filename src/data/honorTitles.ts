import type { HonorTitle, HonorTitleId } from "../types/honor";

export const HONOR_TITLES: HonorTitle[] = [
  {
    id: "first_light",
    name: "初亮星火",
    description: "完成第一处设施修复",
    category: "growth",
    achievementId: "first_spark",
    order: 10,
  },
  {
    id: "park_trainee",
    name: "巡园修复师",
    description: "完成第 10 关",
    category: "growth",
    achievementId: "master_engineer",
    order: 20,
  },
  {
    id: "starlight_engineer",
    name: "星光工程师",
    description: "累计完成 30 个关卡",
    category: "growth",
    achievementId: "levels_30",
    order: 30,
  },
  {
    id: "park_guardian",
    name: "乐园守护者",
    description: "累计完成 50 个关卡",
    category: "growth",
    achievementId: "levels_50",
    order: 40,
  },
  {
    id: "lamplighter",
    name: "引灯人",
    description: "完成失落乐园的全部关卡",
    category: "chapter",
    achievementId: "circuit_grandmaster",
    order: 50,
  },
  {
    id: "garden_watcher",
    name: "花期守望者",
    description: "完成星光花园的全部关卡",
    category: "chapter",
    achievementId: "chapter_garden_complete",
    order: 60,
  },
  {
    id: "cloud_guide",
    name: "云桥引路人",
    description: "完成云端奇境的全部关卡",
    category: "chapter",
    achievementId: "chapter_cloud_complete",
    order: 70,
  },
  {
    id: "rainbow_tuner",
    name: "虹光调校师",
    description: "完成虹彩天桥的全部关卡",
    category: "chapter",
    achievementId: "chapter_rainbow_complete",
    order: 80,
  },
  {
    id: "park_reviver",
    name: "乐园复兴师",
    description: "完成梦幻之巅与全部主线关卡",
    category: "chapter",
    achievementId: "chapter_peak_complete",
    order: 90,
  },
  {
    id: "precision_calibrator",
    name: "零误差校准师",
    description: "在任一关卡获得四星",
    category: "mastery",
    achievementId: "speed_optimizer",
    order: 100,
  },
  {
    id: "steady_calibrator",
    name: "稳态校准师",
    description: "在 5 个不同关卡获得三星及以上",
    category: "mastery",
    achievementId: "perfectionist",
    order: 110,
  },
  {
    id: "perfect_circuit_master",
    name: "完美回路师",
    description: "在 20 个不同关卡获得三星及以上",
    category: "mastery",
    achievementId: "perfect_20",
    order: 120,
  },
];

const BY_ID = new Map(HONOR_TITLES.map((title) => [title.id, title]));
const BY_ACHIEVEMENT = new Map(
  HONOR_TITLES.map((title) => [title.achievementId, title]),
);

export function getHonorTitle(value: unknown): HonorTitle | null {
  return typeof value === "string"
    ? (BY_ID.get(value as HonorTitleId) ?? null)
    : null;
}

export function getHonorTitleForAchievement(
  achievementId: string,
): HonorTitle | null {
  return BY_ACHIEVEMENT.get(achievementId) ?? null;
}

export function getNewHonorTitles(
  achievements: ReadonlyArray<{ id: string }>,
): HonorTitle[] {
  return achievements
    .map((achievement) => getHonorTitleForAchievement(achievement.id))
    .filter((title): title is HonorTitle => Boolean(title))
    .sort((a, b) => a.order - b.order);
}

export function chooseAutoEquipHonorTitle(
  titles: ReadonlyArray<HonorTitle>,
): HonorTitle | null {
  return [...titles].sort((a, b) => b.order - a.order)[0] ?? null;
}

export function resolveEquippedHonorTitle(
  equippedTitleId: string | null,
  unlockedAchievements: Record<string, number>,
): HonorTitle | null {
  const title = getHonorTitle(equippedTitleId);
  return title && unlockedAchievements[title.achievementId] ? title : null;
}
