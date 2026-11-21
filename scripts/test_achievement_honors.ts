import assert from "node:assert/strict";

const data = new Map<string, string>();
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => data.set(key, value),
    removeItem: (key: string) => data.delete(key),
  },
});

const {
  ALL_ACHIEVEMENTS,
  calculateAchievementProgress,
  checkVictoryAchievements,
} = await import("../src/utils/achievements");

const emptyStats = () => ({
  totalClearedLevels: 0,
  clearedLevelIds: [] as number[],
  threeStarLevelIds: [] as number[],
  consecutivePerfect: 0,
  consecutivePerfectLevelIds: [] as number[],
  maxConsecutivePerfect: 0,
  totalUndos: 0,
  maxEndlessStreak: 0,
  tenStepClearCount: 0,
});

function seed(cleared: number[], threeStar: number[] = []) {
  data.clear();
  data.set(
    "honeycomb_player_stats_v1",
    JSON.stringify({
      ...emptyStats(),
      totalClearedLevels: cleared.length,
      clearedLevelIds: cleared,
      threeStarLevelIds: threeStar,
    }),
  );
}

function victory(levelId: number, stars = 2) {
  return checkVictoryAchievements({
    levelId,
    stepsUsed: 20,
    remainingSteps: 0,
    maxSteps: 20,
    levelUndosUsed: 0,
    hasUsedTimelineJump: false,
    hasToggledSwitch: false,
    stars,
  }).newlyUnlocked.map((achievement) => achievement.id);
}

let passed = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`通过：${name}`);
  passed += 1;
}

test("新成就目录保留旧 ID 前缀并增加 7 个目标", () => {
  const prefix = [
    "ten_steps_clear",
    "undo_master",
    "consecutive_perfect",
    "first_spark",
    "circuit_adept",
    "master_engineer",
    "circuit_grandmaster",
    "switch_operator",
    "time_traveler",
    "speed_optimizer",
    "perfectionist",
    "endless_scout",
    "endless_champion",
    "hall_of_fame",
  ];
  assert.deepEqual(
    ALL_ACHIEVEMENTS.slice(0, 14).map((item) => item.id),
    prefix,
  );
  assert.deepEqual(
    ALL_ACHIEVEMENTS.slice(14).map((item) => item.id),
    [
      "levels_30",
      "levels_50",
      "chapter_garden_complete",
      "chapter_cloud_complete",
      "chapter_rainbow_complete",
      "chapter_peak_complete",
      "perfect_20",
    ],
  );
});

test("累计 30 关和 50 关成就正确解锁", () => {
  seed(Array.from({ length: 29 }, (_, index) => index + 1));
  assert.ok(victory(30).includes("levels_30"));

  seed(Array.from({ length: 49 }, (_, index) => index + 1));
  assert.ok(victory(50).includes("levels_50"));
});

test("完成星光花园时解锁章节成就", () => {
  seed(Array.from({ length: 19 }, (_, index) => index + 21));
  assert.ok(victory(40).includes("chapter_garden_complete"));
});

test("20 个不同三星关卡解锁完美回路师成就", () => {
  seed(
    Array.from({ length: 19 }, (_, index) => index + 1),
    Array.from({ length: 19 }, (_, index) => index + 1),
  );
  assert.ok(victory(20, 3).includes("perfect_20"));
});

test("新称号成就提供准确进度标签", () => {
  const stats = {
    ...emptyStats(),
    totalClearedLevels: 24,
    clearedLevelIds: Array.from({ length: 24 }, (_, index) => index + 1),
    threeStarLevelIds: Array.from({ length: 8 }, (_, index) => index + 1),
  };
  assert.equal(
    calculateAchievementProgress("levels_30", stats, {}).label,
    "通关进度 24/30 关",
  );
  assert.equal(
    calculateAchievementProgress("chapter_garden_complete", stats, {}).label,
    "星光花园 4/20 关",
  );
  assert.equal(
    calculateAchievementProgress("perfect_20", stats, {}).label,
    "三星关卡 8/20 关",
  );
});

test("重复通关不会重复返回同一称号成就", () => {
  seed(Array.from({ length: 29 }, (_, index) => index + 1));
  assert.ok(victory(30).includes("levels_30"));
  assert.equal(victory(30).includes("levels_30"), false);
});

console.log(`成就称号测试通过：${passed} 项`);
