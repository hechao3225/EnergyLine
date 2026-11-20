# 乐园修复图鉴与荣誉称号实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将关卡选择与藏品图鉴合并为“乐园修复图鉴”，并把现有成就扩展为可解锁、可佩戴的荣誉称号系统。

**架构：** 99 个关卡继续通过 `levelId` 关联 99 件藏品。`RepairAtlasModal` 负责章节、设施卡片和详情，`HonorProfile` 负责称号墙与成就进度；成就仍是唯一解锁来源，`ParkProgress` 只保存当前佩戴称号。通关时由 `App` 捕获新成就并显示新称号，`CandyThemeShell` 负责界面协调。

**技术栈：** React 19、TypeScript、Vite、Playwright、tsx、现有糖果主题 CSS 与容器查询。

---

## 文件结构

### 创建

- `src/types/honor.ts`：称号 ID、分类与目录条目类型。
- `src/data/honorTitles.ts`：12 个称号目录、成就关联和纯查询函数。
- `src/components/RepairAtlasModal.tsx`：合并后的章节图鉴、设施卡片和设施详情。
- `src/components/HonorProfile.tsx`：修复师档案、称号墙和成就进度。
- `scripts/test_honor_titles.ts`：称号目录、解锁、自动佩戴和进度测试。
- `scripts/test_repair_atlas_honors_ui.ts`：合并图鉴与称号系统的真实浏览器测试。

### 修改

- `src/types/achievement.ts`：成就增加称号奖励字段。
- `src/utils/achievements.ts`：新增 7 个成就、进度和判定，关联现有成就与称号。
- `src/utils/parkProgress.ts`：保存佩戴称号，提供共享星级和章节锁定计算。
- `src/App.tsx`：捕获通关成就，生成新称号，自动佩戴首个可用称号。
- `src/components/CandyThemeShell.tsx`：接入图鉴、档案、结算，移除独立图鉴。
- `src/index.css`：图鉴卡片、详情、称号墙、成就进度和结算样式。
- `scripts/test_theme_content.ts`：更新成就目录兼容断言。
- `scripts/test_park_progress.ts`：覆盖旧存档、称号佩戴和共享星级。
- `scripts/test_park_ui.ts`：更新入口文案、图鉴测试和首关称号测试。
- `scripts/test_park_victory_layout.ts`：覆盖称号缎带加入后的结算布局。
- `package.json`：增加称号测试入口，并把新浏览器测试加入 `test:ui`。

### 不修改

- 99 关盘面、难度、最优步数和章节解锁规则。
- 首通奖励、星级算法、提示、商店、无尽挑战和关卡工坊。
- 现有成就 ID 与已落盘的解锁时间。

---

## 任务 1：建立称号目录与纯查询层

**文件：**

- 创建：`src/types/honor.ts`
- 创建：`src/data/honorTitles.ts`
- 创建：`scripts/test_honor_titles.ts`
- 修改：`package.json:8`

- [ ] **步骤 1：编写失败的称号目录测试**

创建 `scripts/test_honor_titles.ts`：

```ts
import assert from "node:assert/strict";
import {
  HONOR_TITLES,
  chooseAutoEquipHonorTitle,
  getHonorTitle,
  getHonorTitleForAchievement,
  getNewHonorTitles,
  resolveEquippedHonorTitle,
} from "../src/data/honorTitles";

let passed = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`通过：${name}`);
  passed += 1;
}

test("首版称号目录包含 12 个唯一条目", () => {
  assert.equal(HONOR_TITLES.length, 12);
  assert.equal(new Set(HONOR_TITLES.map((title) => title.id)).size, 12);
  assert.equal(
    new Set(HONOR_TITLES.map((title) => title.achievementId)).size,
    12,
  );
});

test("每个称号都能按 ID 和成就反查", () => {
  for (const title of HONOR_TITLES) {
    assert.equal(getHonorTitle(title.id)?.id, title.id);
    assert.equal(
      getHonorTitleForAchievement(title.achievementId)?.id,
      title.id,
    );
  }
  assert.equal(getHonorTitle("missing-title"), null);
  assert.equal(getHonorTitleForAchievement("missing-achievement"), null);
});

test("只把本次新解锁且有称号的成就转换成称号", () => {
  const titles = getNewHonorTitles([
    { id: "first_spark" },
    { id: "ten_steps_clear" },
  ]);
  assert.deepEqual(
    titles.map((title) => title.id),
    ["first_light"],
  );
});

test("自动佩戴按 order 选择本次最高称号", () => {
  const titles = getNewHonorTitles([
    { id: "levels_30" },
    { id: "chapter_garden_complete" },
  ]);
  assert.equal(chooseAutoEquipHonorTitle(titles)?.id, "garden_watcher");
});

test("佩戴中的称号必须真实存在且对应成就是已解锁状态", () => {
  assert.equal(
    resolveEquippedHonorTitle("first_light", {
      first_spark: 1,
    })?.id,
    "first_light",
  );
  assert.equal(resolveEquippedHonorTitle("first_light", {}), null);
  assert.equal(
    resolveEquippedHonorTitle("missing-title", { first_spark: 1 }),
    null,
  );
});

console.log(`称号测试通过：${passed} 项`);
```

在 `package.json` 增加独立测试入口，不改现有 `test` 长命令：

```json
"test:honors": "tsx scripts/test_honor_titles.ts"
```

- [ ] **步骤 2：运行测试确认失败**

运行：

```bash
npx tsx scripts/test_honor_titles.ts
```

预期：FAIL，报错指向 `src/data/honorTitles.ts` 不存在。

- [ ] **步骤 3：创建称号类型**

创建 `src/types/honor.ts`：

```ts
export type HonorTitleId =
  | "first_light"
  | "park_trainee"
  | "starlight_engineer"
  | "park_guardian"
  | "lamplighter"
  | "garden_watcher"
  | "cloud_guide"
  | "rainbow_tuner"
  | "park_reviver"
  | "precision_calibrator"
  | "steady_calibrator"
  | "perfect_circuit_master";

export type HonorTitleCategory = "growth" | "chapter" | "mastery";

export interface HonorTitle {
  id: HonorTitleId;
  name: string;
  description: string;
  category: HonorTitleCategory;
  achievementId: string;
  order: number;
}
```

- [ ] **步骤 4：创建称号目录和查询函数**

创建 `src/data/honorTitles.ts`：

```ts
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
  return typeof value === "string" ? (BY_ID.get(value as HonorTitleId) ?? null) : null;
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
```

- [ ] **步骤 5：运行测试确认通过**

运行：

```bash
npx tsx scripts/test_honor_titles.ts
```

预期：PASS，输出 `称号测试通过：5 项`。

- [ ] **步骤 6：提交**

```bash
git add src/types/honor.ts src/data/honorTitles.ts scripts/test_honor_titles.ts
git add -p package.json
git commit -m "feat: 建立荣誉称号目录"
```

`package.json` 当前已有与本功能无关的未提交修改。交互式暂存时只选择新增 `test:honors` 的行，不暂存其他 hunk。

---

## 任务 2：扩展成就规则与实时进度

**文件：**

- 修改：`src/types/achievement.ts:12-21`
- 修改：`src/utils/achievements.ts:13-141`
- 修改：`src/utils/achievements.ts:201-333`
- 修改：`src/utils/achievements.ts:362-505`
- 修改：`scripts/test_theme_content.ts:97-121`
- 创建：`scripts/test_achievement_honors.ts`
- 修改：`package.json:8`

- [ ] **步骤 1：编写失败的成就规则测试**

创建 `scripts/test_achievement_honors.ts`：

```ts
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
  clearedLevelIds: [],
  threeStarLevelIds: [],
  consecutivePerfect: 0,
  consecutivePerfectLevelIds: [],
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
  assert.deepEqual(ALL_ACHIEVEMENTS.slice(0, 14).map((item) => item.id), prefix);
  assert.deepEqual(ALL_ACHIEVEMENTS.slice(14).map((item) => item.id), [
    "levels_30",
    "levels_50",
    "chapter_garden_complete",
    "chapter_cloud_complete",
    "chapter_rainbow_complete",
    "chapter_peak_complete",
    "perfect_20",
  ]);
});

test("累计 30 关和 50 关成就正确解锁", () => {
  seed(Array.from({ length: 29 }, (_, i) => i + 1));
  assert.ok(victory(30).includes("levels_30"));

  seed(Array.from({ length: 49 }, (_, i) => i + 1));
  assert.ok(victory(50).includes("levels_50"));
});

test("完成星光花园时解锁章节成就", () => {
  seed(Array.from({ length: 19 }, (_, i) => i + 21));
  assert.ok(victory(40).includes("chapter_garden_complete"));
});

test("20 个不同三星关卡解锁完美回路师成就", () => {
  seed(
    Array.from({ length: 19 }, (_, i) => i + 1),
    Array.from({ length: 19 }, (_, i) => i + 1),
  );
  assert.ok(victory(20, 3).includes("perfect_20"));
});

test("新称号成就提供准确进度标签", () => {
  const stats = {
    ...emptyStats(),
    totalClearedLevels: 24,
    clearedLevelIds: Array.from({ length: 24 }, (_, i) => i + 1),
    threeStarLevelIds: Array.from({ length: 8 }, (_, i) => i + 1),
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
  seed(Array.from({ length: 29 }, (_, i) => i + 1));
  assert.ok(victory(30).includes("levels_30"));
  assert.equal(victory(30).includes("levels_30"), false);
});

console.log(`成就称号测试通过：${passed} 项`);
```

把 `package.json` 的测试入口扩展为：

```json
"test:honors": "tsx scripts/test_honor_titles.ts && tsx scripts/test_achievement_honors.ts"
```

- [ ] **步骤 2：运行测试确认失败**

运行：

```bash
npx tsx scripts/test_achievement_honors.ts
```

预期：FAIL，新增成就缺失或数量不符。

- [ ] **步骤 3：给成就类型增加称号奖励字段**

修改 `src/types/achievement.ts`：

```ts
import type { HonorTitleId } from "./honor";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "efficiency" | "skill" | "progress" | "endless";
  icon: string;
  rarity: AchievementRarity;
  hint: string;
  unlockedAt?: number;
  progress?: AchievementProgressInfo;
  rewardTitleId?: HonorTitleId;
}
```

- [ ] **步骤 4：关联现有成就并增加 7 个成就**

在 `src/utils/achievements.ts` 的现有条目上增加：

```ts
{ id: "first_spark", rewardTitleId: "first_light" }
{ id: "master_engineer", rewardTitleId: "park_trainee" }
{ id: "circuit_grandmaster", rewardTitleId: "lamplighter" }
{ id: "speed_optimizer", rewardTitleId: "precision_calibrator" }
{ id: "perfectionist", rewardTitleId: "steady_calibrator" }
```

实际实现时是在对应现有对象字面量内加入字段，例如：

```ts
{
  id: "first_spark",
  title: "第一束星光",
  description: "首次完成任意一处设施的修复",
  category: "progress",
  icon: "Sparkles",
  rarity: "common",
  hint: "点亮第一处设施",
  rewardTitleId: "first_light",
},
```

在 `hall_of_fame` 后追加：

```ts
{
  id: "levels_30",
  title: "星光工程师",
  description: "累计完成 30 个关卡",
  category: "progress",
  icon: "Award",
  rarity: "epic",
  hint: "继续修复乐园中心",
  rewardTitleId: "starlight_engineer",
},
{
  id: "levels_50",
  title: "乐园守护者",
  description: "累计完成 50 个关卡",
  category: "progress",
  icon: "Shield",
  rarity: "epic",
  hint: "让更多区域重新亮起",
  rewardTitleId: "park_guardian",
},
{
  id: "chapter_garden_complete",
  title: "花期守望者",
  description: "完成星光花园 21–40 关",
  category: "progress",
  icon: "Sparkles",
  rarity: "epic",
  hint: "修复星光花园的全部设施",
  rewardTitleId: "garden_watcher",
},
{
  id: "chapter_cloud_complete",
  title: "云桥引路人",
  description: "完成云端奇境 41–60 关",
  category: "progress",
  icon: "Compass",
  rarity: "epic",
  hint: "修复云端奇境的全部设施",
  rewardTitleId: "cloud_guide",
},
{
  id: "chapter_rainbow_complete",
  title: "虹光调校师",
  description: "完成虹彩天桥 61–80 关",
  category: "progress",
  icon: "Crown",
  rarity: "epic",
  hint: "修复虹彩天桥的全部设施",
  rewardTitleId: "rainbow_tuner",
},
{
  id: "chapter_peak_complete",
  title: "乐园复兴师",
  description: "完成梦幻之巅 81–99 关",
  category: "progress",
  icon: "Trophy",
  rarity: "legendary",
  hint: "修复乐园中心的最后一处设施",
  rewardTitleId: "park_reviver",
},
{
  id: "perfect_20",
  title: "完美回路师",
  description: "在 20 个不同关卡获得三星及以上",
  category: "skill",
  icon: "Star",
  rarity: "legendary",
  hint: "在 20 关取得高星评价",
  rewardTitleId: "perfect_circuit_master",
},
```

- [ ] **步骤 5：实现进度计算**

在 `calculateAchievementProgress` 的 `switch` 中加入：

```ts
case "levels_30":
  max = 30;
  current = Math.min(stats.clearedLevelIds.length, max);
  unit = "关";
  label = `通关进度 ${current}/30 关`;
  break;

case "levels_50":
  max = 50;
  current = Math.min(stats.clearedLevelIds.length, max);
  unit = "关";
  label = `通关进度 ${current}/50 关`;
  break;

case "chapter_garden_complete":
case "chapter_cloud_complete":
case "chapter_rainbow_complete":
case "chapter_peak_complete": {
  const ranges = {
    chapter_garden_complete: [21, 40, "星光花园"],
    chapter_cloud_complete: [41, 60, "云端奇境"],
    chapter_rainbow_complete: [61, 80, "虹彩天桥"],
    chapter_peak_complete: [81, 99, "梦幻之巅"],
  } as const;
  const [start, end, name] = ranges[achId];
  max = end - start + 1;
  current = stats.clearedLevelIds.filter(
    (id) => id >= start && id <= end,
  ).length;
  unit = "关";
  label = `${name} ${current}/${max} 关`;
  break;
}

case "perfect_20":
  max = 20;
  current = Math.min(stats.threeStarLevelIds.length, max);
  unit = "关";
  label = `三星关卡 ${current}/20 关`;
  break;
```

- [ ] **步骤 6：实现成就解锁判定**

在 `checkVictoryAchievements` 的 `hall_of_fame` 判定前加入：

```ts
if (stats.clearedLevelIds.length >= 30) {
  unlockCandidate("levels_30");
}
if (stats.clearedLevelIds.length >= 50) {
  unlockCandidate("levels_50");
}

const chapterRanges = [
  [21, 40, "chapter_garden_complete"],
  [41, 60, "chapter_cloud_complete"],
  [61, 80, "chapter_rainbow_complete"],
  [81, 99, "chapter_peak_complete"],
] as const;
for (const [start, end, achievementId] of chapterRanges) {
  const complete = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index,
  ).every((id) => stats.clearedLevelIds.includes(id));
  if (complete) unlockCandidate(achievementId);
}

if (stats.threeStarLevelIds.length >= 20) {
  unlockCandidate("perfect_20");
}
```

- [ ] **步骤 7：更新主题内容兼容测试**

在 `scripts/test_theme_content.ts` 中把成就数组改为：

```ts
const LEGACY_ACHIEVEMENT_IDS = [
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
const NEW_ACHIEVEMENT_IDS = [
  "levels_30",
  "levels_50",
  "chapter_garden_complete",
  "chapter_cloud_complete",
  "chapter_rainbow_complete",
  "chapter_peak_complete",
  "perfect_20",
];
const ACHIEVEMENT_IDS = [
  ...LEGACY_ACHIEVEMENT_IDS,
  ...NEW_ACHIEVEMENT_IDS,
];
```

保留现有顺序断言，并检查每个 `rewardTitleId` 都能在称号目录中查到。

在 import 区加入：

```ts
import { getHonorTitle } from "../src/data/honorTitles";
```

在现有成就检查后加入：

```ts
for (const achievement of ALL_ACHIEVEMENTS) {
  if (achievement.rewardTitleId) {
    check(
      getHonorTitle(achievement.rewardTitleId)?.achievementId ===
        achievement.id,
      `${achievement.id} 的称号关联不一致`,
    );
  }
}
```

- [ ] **步骤 8：运行成就与主题测试**

运行：

```bash
npx tsx scripts/test_honor_titles.ts
npx tsx scripts/test_achievement_honors.ts
npx tsx scripts/test_theme_content.ts
```

预期：三项 PASS。已有 14 个 ID 顺序不变，新增 7 个 ID 完整。

- [ ] **步骤 9：提交**

```bash
git add src/types/achievement.ts src/utils/achievements.ts scripts/test_achievement_honors.ts scripts/test_theme_content.ts
git add -p package.json
git commit -m "feat: 扩展章节与技艺成就"
```

只暂存 `test:honors` 的本次修改，保留 `package.json` 中其他未提交工作。

---

## 任务 3：保存佩戴称号并提供共享进度计算

**文件：**

- 修改：`src/utils/parkProgress.ts:17-55`
- 修改：`src/utils/parkProgress.ts:87-171`
- 修改：`src/utils/parkProgress.ts:390-410`
- 修改：`scripts/test_park_progress.ts:1-50`
- 修改：`scripts/test_park_progress.ts:200-380`

- [ ] **步骤 1：编写失败存档测试**

在 `scripts/test_park_progress.ts` 的 import 中加入：

```ts
import {
  equipHonorTitle,
  getStoredLevelStars,
  isChapterLocked,
  resetParkProgress,
} from "../src/utils/parkProgress";
```

追加测试：

```ts
test("旧存档缺少佩戴称号时补为空", () => {
  const p = readParkProgress(
    store({
      [PARK_STORAGE_KEY]: JSON.stringify({
        coins: 0,
        hints: 3,
        rewardedLevels: [],
        completedDate: "",
        claimedDate: "",
      }),
    }),
  );
  assert.equal(p.equippedTitleId, null);
});

test("只允许佩戴已存在且已解锁的称号", () => {
  const start = fresh();
  assert.equal(
    equipHonorTitle(start, "first_light", {}),
    start,
  );
  const unlocked = { first_spark: 1 };
  const equipped = equipHonorTitle(start, "first_light", unlocked);
  assert.equal(equipped.equippedTitleId, "first_light");
  assert.equal(
    equipHonorTitle(equipped, "missing-title", unlocked),
    equipped,
  );
});

test("非法佩戴 ID 在读取存档时回落为空", () => {
  const p = readParkProgress(
    store({
      [PARK_STORAGE_KEY]: JSON.stringify({
        equippedTitleId: "missing-title",
        rewardedLevels: [],
      }),
    }),
  );
  assert.equal(p.equippedTitleId, null);
});

test("章节锁定与共享星级计算保持现有规则", () => {
  assert.equal(isChapterLocked(0, [], false), false);
  assert.equal(isChapterLocked(1, [], false), true);
  assert.equal(isChapterLocked(1, [20], false), false);
  assert.equal(isChapterLocked(4, [], true), false);

  const level = DEFAULT_LEVELS[0];
  assert.equal(
    getStoredLevelStars(level, [], {}, {}),
    0,
  );
  assert.equal(
    getStoredLevelStars(level, [1], { 1: level.maxSteps }, {}),
    1,
  );
});

test("重置存档同时清除佩戴称号与成就记录", () => {
  const entries = new Map<string, string>([
    ["energy_park_progress_v2", '{"equippedTitleId":"first_light"}'],
    ["honeycomb_achievements_v1", '{"first_spark":1}'],
  ]);
  const storage = {
    get length() {
      return entries.size;
    },
    key: (index: number) => [...entries.keys()][index] ?? null,
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => entries.set(key, value),
    removeItem: (key: string) => entries.delete(key),
  } as Storage;
  resetParkProgress(storage);
  assert.equal(entries.size, 0);
});
```

- [ ] **步骤 2：运行测试确认失败**

运行：

```bash
npx tsx scripts/test_park_progress.ts
```

预期：FAIL，函数不存在且 `equippedTitleId` 未定义。

- [ ] **步骤 3：扩展存档结构**

在 `ParkProgress` 中加入：

```ts
equippedTitleId: string | null;
```

在 `DEFAULT_PROGRESS` 中加入：

```ts
equippedTitleId: null,
```

在 `sanitizeProgress` 返回对象中加入：

```ts
equippedTitleId: getHonorTitle(source.equippedTitleId)
  ? String(source.equippedTitleId)
  : null,
```

在文件顶部加入：

```ts
import { getHonorTitle, resolveEquippedHonorTitle } from "../data/honorTitles";
```

- [ ] **步骤 4：实现称号佩戴和共享计算**

在 `parkProgress.ts` 中加入：

```ts
export function equipHonorTitle(
  progress: ParkProgress,
  titleId: string | null,
  unlockedAchievements: Record<string, number>,
): ParkProgress {
  if (titleId === null) {
    return progress.equippedTitleId === null
      ? progress
      : { ...progress, equippedTitleId: null };
  }
  if (!resolveEquippedHonorTitle(titleId, unlockedAchievements)) {
    return progress;
  }
  return progress.equippedTitleId === titleId
    ? progress
    : { ...progress, equippedTitleId: titleId };
}

export function getStoredLevelStars(
  level: LevelConfig,
  cleared: number[],
  bestSteps: Record<number, number>,
  bestLights: Record<number, number>,
): number {
  if (level.goal !== undefined) {
    const totalBulbs = level.tiles.filter((tile) => tile.type === "bulb").length;
    return getStarsForLights(
      level.goal,
      totalBulbs,
      bestLights[level.id] ??
        (cleared.includes(level.id) ? level.goal : 0),
    );
  }
  return getBestStars(level, cleared, bestSteps);
}

export function isChapterLocked(
  chapter: number,
  clearedLevels: number[],
  unlockAll: boolean,
): boolean {
  const district = CENTER_DISTRICTS[chapter];
  if (!district) return true;
  if (unlockAll || chapter === 0) return false;
  const [start, end] = district.range;
  const previousBoss = start - 1;
  return (
    !clearedLevels.includes(previousBoss) &&
    !clearedLevels.some((id) => id >= start && id <= end)
  );
}
```

`getStoredLevelStars` 需要从 `rating` 导入 `getStarsForLights`。

- [ ] **步骤 5：更新所有默认进度断言**

在测试中已有的 `deepEqual(p, ...)` 和显式对象里补上 `equippedTitleId: null`。不要放宽断言。

- [ ] **步骤 6：运行进度测试**

运行：

```bash
npx tsx scripts/test_park_progress.ts
```

预期：PASS。旧商店、货币、星级、迁移和补偿测试全部保持通过。

- [ ] **步骤 7：提交**

```bash
git add src/utils/parkProgress.ts scripts/test_park_progress.ts
git commit -m "feat: 保存荣誉称号与共享进度"
```

---

## 任务 4：实现乐园修复图鉴组件

**文件：**

- 创建：`src/components/RepairAtlasModal.tsx`
- 修改：`src/index.css:1805-2015`
- 创建：`scripts/test_repair_atlas_honors_ui.ts`

- [ ] **步骤 1：先写浏览器验收测试**

创建 `scripts/test_repair_atlas_honors_ui.ts` 的第一部分：

```ts
import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import { openFreshHome } from "./park_test_player";

const base = process.env.PARK_TEST_URL || "http://localhost:3000";
const output = path.resolve(
  process.env.PARK_QA_DIR || "docs/QA/repair-atlas-honors-2026-11-20",
);
fs.mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

await openFreshHome(page, base);
await page.evaluate(() => {
  localStorage.setItem("honeycomb_onboarding_v1", "1");
  localStorage.setItem("honeycomb_story_seen_v1", "1");
  localStorage.setItem("honeycomb_cleared_levels", "[1,2,3]");
  localStorage.setItem("honeycomb_best_steps", '{"1":5,"2":7,"3":8}');
});
await page.reload();
await page.locator(".park-home").waitFor();

await page
  .getByRole("navigation")
  .getByRole("button", { name: "关卡", exact: true })
  .click();

await expect(page.getByRole("heading", { name: "乐园修复图鉴" })).toBeVisible();
await expect(
  page.getByRole("button", { name: "修复第1处设施", exact: true }),
).toBeVisible();
assert.equal(
  await page.getByRole("button", { name: "乐园图鉴", exact: true }).count(),
  0,
);

await page
  .getByRole("button", { name: "修复第1处设施", exact: true })
  .click();
await expect(page.getByText("迎宾门", { exact: true })).toBeVisible();
await expect(page.getByText("第 1 关 · 失落乐园", { exact: true })).toBeVisible();
await expect(
  page.getByRole("button", { name: "再次挑战", exact: true }),
).toBeVisible();
await page.screenshot({ path: path.join(output, "atlas-detail-390x844.png") });

await page
  .getByRole("button", { name: "返回本章图鉴", exact: true })
  .click();
await page.screenshot({ path: path.join(output, "atlas-390x844.png") });

await browser.close();
console.log("修复图鉴 UI 测试通过");
```

把脚本加入：

```json
"test:ui": "tsx scripts/test_repair_atlas_honors_ui.ts && tsx scripts/test_park_ui.ts && tsx scripts/test_park_star_upgrade.ts && tsx scripts/test_park_victory_layout.ts"
```

- [ ] **步骤 2：启动开发服务并确认测试失败**

终端 A：

```bash
npm run dev
```

终端 B：

```bash
npx tsx scripts/test_repair_atlas_honors_ui.ts
```

预期：FAIL，标题仍为“乐园关卡”或设施卡片没有藏品图。

- [ ] **步骤 3：定义组件接口**

创建 `src/components/RepairAtlasModal.tsx`，接口为：

```tsx
import type { LevelConfig } from "../types/game";
import { CENTER_DISTRICTS, getCollectionEntry } from "../content";
import { getHonorTitle } from "../data/honorTitles";
import { ParkButton, ParkExhibit, Stars } from "./ParkArt";
import {
  getStoredLevelStars,
  isChapterLocked,
} from "../utils/parkProgress";

interface RepairAtlasProps {
  levels: LevelConfig[];
  chapter: number;
  currentLevelId: number;
  exhibitId: number | null;
  clearedLevels: number[];
  bestSteps: Record<number, number>;
  bestLights: Record<number, number>;
  unlockAll: boolean;
  onChapterChange: (chapter: number) => void;
  onExhibitChange: (levelId: number | null) => void;
  onToggleUnlockAll: () => void;
  onSelectLevel: (levelId: number) => void;
  onOpenEndless: () => void;
  onOpenEditor: () => void;
  onOpenWorld: () => void;
}
```

- [ ] **步骤 4：实现章节、卡片和详情**

组件主体：

```tsx
export function RepairAtlasModal(p: RepairAtlasProps) {
  const district = CENTER_DISTRICTS[p.chapter] ?? CENTER_DISTRICTS[0];
  const levels = p.levels.filter(
    (level) =>
      level.id >= district.range[0] && level.id <= district.range[1],
  );
  const cleared = levels.filter((level) =>
    p.clearedLevels.includes(level.id),
  ).length;
  const stars = levels.reduce(
    (sum, level) =>
      sum +
      getStoredLevelStars(
        level,
        p.clearedLevels,
        p.bestSteps,
        p.bestLights,
      ),
    0,
  );
  const entry =
    p.exhibitId === null ? null : getCollectionEntry(p.exhibitId);
  const level =
    p.exhibitId === null
      ? null
      : p.levels.find((item) => item.id === p.exhibitId) ?? null;
  const locked = isChapterLocked(
    p.chapter,
    p.clearedLevels,
    p.unlockAll,
  );

  if (entry && level) {
    return (
      <div className="park-atlas-detail" aria-label={`${entry.name}设施详情`}>
        <ParkExhibit
          entry={entry}
          unlocked={p.clearedLevels.includes(level.id)}
          large
        />
        <h3>{entry.name}</h3>
        <p className="park-atlas-alias">{entry.alias}</p>
        <p className="park-atlas-location">
          第 {level.id} 关 · {district.name}
        </p>
        <p>
          {p.clearedLevels.includes(level.id)
            ? entry.lore
            : `完成第 ${level.id} 关后收录完整故事与祝福。`}
        </p>
        <div className="park-atlas-stars">
          <Stars
            value={getStoredLevelStars(
              level,
              p.clearedLevels,
              p.bestSteps,
              p.bestLights,
            )}
          />
          <span>
            {p.clearedLevels.includes(level.id)
              ? `最佳 ${p.bestSteps[level.id] ?? 0} 步`
              : "尚未修复"}
          </span>
        </div>
        <div className="park-atlas-mechanics">
          {(level.mechanicTags ?? ["basic"]).slice(0, 3).map((tag) => (
            <span key={tag}>{mechanicLabel(tag)}</span>
          ))}
        </div>
        <ParkButton onClick={() => p.onSelectLevel(level.id)}>
          {p.clearedLevels.includes(level.id) ? "再次挑战" : "开始修复"}
        </ParkButton>
        <button
          className="park-text-link"
          onClick={() => p.onExhibitChange(null)}
        >
          返回本章图鉴
        </button>
      </div>
    );
  }

  return (
    <div className="park-atlas">
      <div className="park-chapter-tabs">
        {CENTER_DISTRICTS.map((item, index) => (
          <button
            key={item.id}
            className={`${p.chapter === index ? "selected" : ""} ${
              isChapterLocked(index, p.clearedLevels, p.unlockAll)
                ? "is-locked"
                : ""
            }`}
            onClick={() => {
              p.onExhibitChange(null);
              p.onChapterChange(index);
            }}
          >
            {index + 1}章
            {isChapterLocked(index, p.clearedLevels, p.unlockAll)
              ? " 🔒"
              : ""}
          </button>
        ))}
      </div>

      <button
        className={`park-unlock-toggle ${p.unlockAll ? "is-on" : ""}`}
        type="button"
        onClick={p.onToggleUnlockAll}
      >
        {p.unlockAll
          ? "已全解锁 · 点击恢复锁定"
          : "章节锁定中 · 点击临时全解锁"}
      </button>

      <div className="park-atlas-heading">
        <div>
          <h3>{district.name}</h3>
          <p>{district.subtitle}</p>
        </div>
        <strong>
          {cleared}/{levels.length} 处设施
          <span>★ {stars}/{levels.length * 4}</span>
        </strong>
      </div>

      {locked ? (
        <div className="park-locked-hint">
          <strong>第 {p.chapter + 1} 章尚未解锁</strong>
          <p>完成第 {district.range[0] - 1} 关后开放。</p>
        </div>
      ) : (
        <>
          <div className="park-atlas-grid">
            {levels.map((item) => {
              const exhibit = getCollectionEntry(item.id);
              if (!exhibit) return null;
              const repaired = p.clearedLevels.includes(item.id);
              return (
                <button
                  key={item.id}
                  className={`park-atlas-card ${
                    repaired ? "is-repaired" : "is-unrepaired"
                  } ${p.currentLevelId === item.id ? "is-current" : ""}`}
                  onClick={() => p.onExhibitChange(item.id)}
                  aria-label={`修复第${item.id}处设施`}
                >
                  <span className="park-atlas-number">{item.id}</span>
                  {item.tier === "hell" && (
                    <em className="park-hell-badge">地狱</em>
                  )}
                  <ParkExhibit entry={exhibit} unlocked={repaired} />
                  <b>{exhibit.name}</b>
                  <Stars
                    value={getStoredLevelStars(
                      item,
                      p.clearedLevels,
                      p.bestSteps,
                      p.bestLights,
                    )}
                  />
                </button>
              );
            })}
          </div>
          {cleared === levels.length && (
            <div className="park-chapter-honor">
              <span>章节修复完成</span>
              <strong>
                {getHonorTitle(CHAPTER_TITLE_IDS[p.chapter])?.name ??
                  "章节荣誉"}
              </strong>
            </div>
          )}
        </>
      )}

      <div className="park-mode-links">
        <ParkButton purple onClick={p.onOpenEndless}>
          无尽挑战
        </ParkButton>
        <ParkButton purple onClick={p.onOpenEditor}>
          关卡工坊
        </ParkButton>
      </div>
      <button className="park-text-link" onClick={p.onOpenWorld}>
        世界地图
      </button>
    </div>
  );
}
```

在文件内补上：

```tsx
const CHAPTER_TITLE_IDS = [
  "lamplighter",
  "garden_watcher",
  "cloud_guide",
  "rainbow_tuner",
  "park_reviver",
];

function mechanicLabel(tag: string): string {
  const labels: Record<string, string> = {
    basic: "基础管道",
    cross: "十字管",
    "multi-source": "多源",
    decoy: "诱饵",
    switch: "能量闸",
    diode: "单向阀",
    axis: "联动轴",
    wrap: "环面",
    goal: "取舍",
    weld: "焊死",
    gear: "齿轮",
    colors: "双色",
    noCycle: "禁环",
    "7x7": "大型盘面",
  };
  return labels[tag] ?? "综合";
}
```

- [ ] **步骤 5：增加图鉴 CSS**

在 `src/index.css` 现有 `.park-level-grid` 附近加入：

```css
.park-atlas {
  display: grid;
  gap: 3cqw;
}
.park-atlas-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2cqw;
}
.park-atlas-heading h3 {
  margin: 0;
}
.park-atlas-heading p {
  margin: 0.5cqw 0 0;
  font-size: 3cqw;
}
.park-atlas-heading > strong {
  display: grid;
  justify-items: end;
  white-space: nowrap;
  font-size: 3.2cqw;
}
.park-atlas-heading > strong span {
  color: #9a5a76;
}
.park-atlas-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2.5cqw 1.8cqw;
}
.park-atlas-card {
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto auto;
  min-width: 0;
  min-height: 27cqw;
  padding: 2cqw 1cqw 1.5cqw;
  border-radius: 4cqw;
  background: linear-gradient(#f7e8f7, #e8cfe9);
  color: #633a70;
  box-shadow:
    inset 0 0 0 0.35cqw #fef8e4,
    0 0.7cqw 0 #aa84b7;
}
.park-atlas-card.is-repaired {
  background: linear-gradient(#fff0be, #f1c9de);
}
.park-atlas-card.is-current {
  box-shadow:
    inset 0 0 0 0.7cqw #fbdd84,
    0 0 3cqw #face7a;
}
.park-atlas-card .park-collection-flower {
  width: 16cqw;
  height: 16cqw;
  margin: auto;
}
.park-atlas-card b {
  min-width: 0;
  font-size: 2.8cqw;
  line-height: 1.25;
  text-align: center;
}
.park-atlas-card .park-stars {
  transform: scale(0.76);
  transform-origin: center;
  margin: -1cqw auto -1cqw;
}
.park-atlas-number {
  position: absolute;
  top: 1.4cqw;
  left: 1.4cqw;
  z-index: 2;
  min-width: 5.5cqw;
  padding: 0.35cqw 0.8cqw;
  border-radius: 2cqw;
  background: #714481;
  color: #fff9e8;
  font-size: 2.4cqw;
  font-weight: 900;
}
.park-atlas-card .park-hell-badge {
  top: 1.2cqw;
  right: 0.8cqw;
  left: auto;
}
.park-atlas-detail {
  text-align: center;
}
.park-atlas-detail > .park-collection-flower {
  width: min(52cqw, 260px);
  height: min(52cqw, 260px);
  margin: auto;
}
.park-atlas-location,
.park-atlas-alias {
  margin: 1cqw 0;
}
.park-atlas-location {
  font-size: 3.2cqw;
  color: #8a567d;
}
.park-atlas-stars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3cqw;
  margin: 2cqw 0;
}
.park-atlas-mechanics {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5cqw;
  margin-bottom: 3cqw;
}
.park-atlas-mechanics span {
  padding: 0.8cqw 2cqw;
  border-radius: 3cqw;
  background: #ead7ee;
  font-size: 2.8cqw;
  font-weight: 700;
}
.park-chapter-honor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2cqw;
  padding: 2.2cqw 3cqw;
  border-radius: 3.5cqw;
  background: linear-gradient(#ffe9a8, #f8bfd8);
  color: #7b416d;
  box-shadow: inset 0 0 0 0.4cqw #f9d77f;
}
.park-chapter-honor strong {
  font-size: 3.8cqw;
}

@media (max-width: 360px) {
  .park-atlas-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2cqw 1.3cqw;
  }
  .park-atlas-card {
    min-height: 26cqw;
    padding-inline: 0.6cqw;
  }
  .park-atlas-card b {
    font-size: 2.6cqw;
  }
}
```

旧 `.park-level-grid`、`.park-level-card` 保留到任务 6 集成完成后再删除。

- [ ] **步骤 6：运行 TypeScript 与 UI 测试**

运行：

```bash
npm run lint
npx tsx scripts/test_repair_atlas_honors_ui.ts
```

预期：当前任务结束时组件已能渲染，但独立入口尚未接入，UI 测试仍可能停在弹窗标题。若测试依赖主页面集成，先完成组件编译检查，完成任务 6 后再要求 UI 测试全绿。

- [ ] **步骤 7：提交**

```bash
git add src/components/RepairAtlasModal.tsx src/index.css scripts/test_repair_atlas_honors_ui.ts package.json
git commit -m "feat: 建立乐园修复图鉴组件"
```

---

## 任务 5：实现称号墙与成就档案

**文件：**

- 创建：`src/components/HonorProfile.tsx`
- 修改：`src/index.css:1939-1985`
- 修改：`scripts/test_repair_atlas_honors_ui.ts`

- [ ] **步骤 1：追加失败的档案 UI 测试**

在 `scripts/test_repair_atlas_honors_ui.ts` 重新打开首页并写入称号数据：

```ts
await page.getByRole("button", { name: "关闭", exact: true }).click();
await page.evaluate(() => {
  localStorage.setItem(
    "honeycomb_achievements_v1",
    JSON.stringify({ first_spark: 1700000000000 }),
  );
  localStorage.setItem(
    "honeycomb_player_stats_v1",
    JSON.stringify({
      totalClearedLevels: 1,
      clearedLevelIds: [1],
      threeStarLevelIds: [],
      consecutivePerfect: 0,
      consecutivePerfectLevelIds: [],
      maxConsecutivePerfect: 0,
      totalUndos: 0,
      maxEndlessStreak: 0,
      tenStepClearCount: 0,
    }),
  );
  const progress = JSON.parse(
    localStorage.getItem("energy_park_progress_v2") || "{}",
  );
  progress.equippedTitleId = "first_light";
  localStorage.setItem(
    "energy_park_progress_v2",
    JSON.stringify(progress),
  );
});
await page.reload();
await page.getByRole("button", { name: "修复师档案", exact: true }).click();
await expect(page.getByRole("heading", { name: "修复师档案" })).toBeVisible();
await expect(page.getByText("初亮星火", { exact: true }).first()).toBeVisible();
await page.getByRole("tab", { name: "成就", exact: true }).click();
await expect(page.getByText("巡园修复师", { exact: true })).toBeVisible();
await expect(page.getByText("通关进度 1/10 关", { exact: true })).toBeVisible();
await page.screenshot({ path: path.join(output, "honors-390x844.png") });
```

- [ ] **步骤 2：运行测试确认失败**

运行：

```bash
npx tsx scripts/test_repair_atlas_honors_ui.ts
```

预期：FAIL，找不到“修复师档案”和称号墙。

- [ ] **步骤 3：实现组件接口**

创建 `src/components/HonorProfile.tsx`：

```tsx
import { useState } from "react";
import type { Achievement } from "../types/achievement";
import type { HonorTitle } from "../types/honor";
import { HONOR_TITLES, getHonorTitle } from "../data/honorTitles";
import { Art, Icon } from "./ParkArt";

interface HonorProfileProps {
  completed: number;
  totalStars: number;
  achievements: Achievement[];
  unlockedAchievements: Record<string, number>;
  equippedTitle: HonorTitle | null;
  onEquipTitle: (titleId: string) => void;
}
```

- [ ] **步骤 4：实现档案、称号墙和成就页**

组件主体：

```tsx
export function HonorProfile(p: HonorProfileProps) {
  const [tab, setTab] = useState<"titles" | "achievements">("titles");
  const earnedCount = Object.keys(p.unlockedAchievements).length;

  return (
    <div className="park-honor-profile">
      <div className="park-profile-intro">
        <Art name="sheep" />
        <div>
          <h3>乐园修复师</h3>
          <strong className="park-equipped-title">
            {p.equippedTitle?.name ?? "尚未佩戴称号"}
          </strong>
          <p>已修复 {p.completed} 处设施</p>
          <p>收集星星 {p.totalStars} 颗</p>
          <p>
            成就 {earnedCount}/{p.achievements.length}
          </p>
        </div>
      </div>

      <div className="park-honor-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "titles"}
          className={tab === "titles" ? "selected" : ""}
          onClick={() => setTab("titles")}
        >
          称号墙
        </button>
        <button
          role="tab"
          aria-selected={tab === "achievements"}
          className={tab === "achievements" ? "selected" : ""}
          onClick={() => setTab("achievements")}
        >
          成就
        </button>
      </div>

      {tab === "titles" ? (
        <div className="park-title-wall">
          {HONOR_TITLES.map((title) => {
            const achievement = p.achievements.find(
              (item) => item.id === title.achievementId,
            );
            const unlocked = Boolean(
              achievement?.unlockedAt,
            );
            const equipped = p.equippedTitle?.id === title.id;
            return (
              <button
                key={title.id}
                className={`park-title-card is-${title.category} ${
                  unlocked ? "is-earned" : "is-locked"
                } ${equipped ? "is-equipped" : ""}`}
                disabled={!unlocked}
                onClick={() => p.onEquipTitle(title.id)}
              >
                <Icon name={unlocked ? "crown" : "lock"} />
                <span>
                  <b>{title.name}</b>
                  <small>{title.description}</small>
                </span>
                <em>
                  {equipped
                    ? "佩戴中"
                    : unlocked
                      ? "佩戴"
                      : achievement?.progress?.label ?? "尚未解锁"}
                </em>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="park-achievement-groups">
          {(["progress", "skill", "efficiency", "endless"] as const).map(
            (category) => (
              <section key={category}>
                <h3>{categoryLabel(category)}</h3>
                {p.achievements
                  .filter((item) => item.category === category)
                  .map((achievement) => {
                    const earned = Boolean(achievement.unlockedAt);
                    const rewardTitle = achievement.rewardTitleId
                      ? getHonorTitle(achievement.rewardTitleId)
                      : null;
                    return (
                      <div
                        key={achievement.id}
                        className={`park-achievement-card ${
                          earned ? "earned" : ""
                        }`}
                      >
                        <Icon name={earned ? "star" : "lock"} />
                        <span>
                          <b>{achievement.title}</b>
                          <small>{achievement.description}</small>
                          {rewardTitle && (
                            <strong className="park-achievement-reward">
                              称号 · {rewardTitle.name}
                            </strong>
                          )}
                          <span className="park-achievement-progress">
                            <i
                              style={{
                                width: `${achievement.progress?.percent ?? 0}%`,
                              }}
                            />
                          </span>
                          <em>
                            {achievement.progress?.label ??
                              (earned ? "已达成" : "尚未达成")}
                          </em>
                        </span>
                      </div>
                    );
                  })}
              </section>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function categoryLabel(category: Achievement["category"]): string {
  return {
    progress: "乐园成长",
    skill: "修复技艺",
    efficiency: "效率挑战",
    endless: "无尽挑战",
  }[category];
}
```

- [ ] **步骤 5：增加档案 CSS**

在现有 `.park-profile-intro` 和 `.park-achievements` 规则附近加入：

```css
.park-equipped-title {
  display: inline-block;
  margin: 0.8cqw 0;
  padding: 0.7cqw 2.2cqw;
  border-radius: 3cqw;
  background: linear-gradient(#ffe49b, #f5b95d);
  color: #713e68;
  font-size: 3.3cqw;
}
.park-honor-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2cqw;
  margin: 4cqw 0 3cqw;
}
.park-honor-tabs button {
  min-height: 44px;
  border-radius: 3.5cqw;
  background: #ead8e9;
  font-size: 3.8cqw;
  font-weight: 800;
}
.park-honor-tabs button.selected {
  background: linear-gradient(#cc82ef, #904fc8);
  color: white;
  box-shadow: inset 0 0 0 0.4cqw #fce3af;
}
.park-title-wall {
  display: grid;
  gap: 2.2cqw;
}
.park-title-card {
  display: grid;
  grid-template-columns: 10cqw 1fr auto;
  align-items: center;
  gap: 2cqw;
  min-height: 15cqw;
  padding: 2.2cqw;
  border-radius: 3.5cqw;
  text-align: left;
  background: #e9dde8;
  color: #71466f;
}
.park-title-card.is-earned {
  background: linear-gradient(#fff0b7, #f8d9e1);
  box-shadow: inset 0 0 0 0.4cqw #efc66f;
}
.park-title-card.is-chapter {
  border-left: 1cqw solid #ba70d0;
}
.park-title-card.is-mastery {
  border-left: 1cqw solid #65b99e;
}
.park-title-card.is-equipped {
  box-shadow:
    inset 0 0 0 0.6cqw #f4a53e,
    0 0 2cqw #ffd66e;
}
.park-title-card .park-icon {
  width: 8.5cqw;
  height: 8.5cqw;
}
.park-title-card span {
  display: grid;
  gap: 0.4cqw;
  min-width: 0;
}
.park-title-card b {
  font-size: 3.8cqw;
}
.park-title-card small,
.park-title-card em {
  font-size: 2.8cqw;
  font-style: normal;
}
.park-title-card em {
  color: #a05482;
  white-space: nowrap;
}
.park-achievement-groups {
  display: grid;
  gap: 4cqw;
}
.park-achievement-card {
  display: flex;
  align-items: flex-start;
  gap: 2cqw;
  margin: 2cqw 0;
  padding: 2.5cqw;
  border-radius: 3cqw;
  background: #e9dde8;
}
.park-achievement-card.earned {
  background: linear-gradient(#fef0be, #fde1ce);
  box-shadow: inset 0 0 0 0.4cqw #e6c588;
}
.park-achievement-card .park-icon {
  width: 9cqw;
  height: 9cqw;
}
.park-achievement-card > span {
  display: grid;
  flex: 1;
  gap: 0.6cqw;
}
.park-achievement-card b {
  font-size: 3.7cqw;
}
.park-achievement-reward {
  color: #9b4f8d;
  font-size: 3cqw;
}
.park-achievement-card small,
.park-achievement-card em {
  font-size: 2.9cqw;
  font-style: normal;
}
.park-achievement-progress {
  height: 1.8cqw;
  border-radius: 2cqw;
  overflow: hidden;
  background: #cdbad2;
}
.park-achievement-progress i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #a96bd0, #f3b758);
}
```

- [ ] **步骤 6：运行 TypeScript**

运行：

```bash
npm run lint
```

预期：PASS。组件尚未接入时 UI 测试失败是预期状态。

- [ ] **步骤 7：提交**

```bash
git add src/components/HonorProfile.tsx src/index.css scripts/test_repair_atlas_honors_ui.ts
git commit -m "feat: 建立荣誉称号档案"
```

---

## 任务 6：整合页面、结算并移除独立图鉴

**文件：**

- 修改：`src/App.tsx:88-115`
- 修改：`src/App.tsx:145-220`
- 修改：`src/App.tsx:470-510`
- 修改：`src/components/CandyThemeShell.tsx:36-130`
- 修改：`src/components/CandyThemeShell.tsx:140-380`
- 修改：`src/components/CandyThemeShell.tsx:727-810`
- 修改：`src/components/CandyThemeShell.tsx:775-1225`
- 修改：`scripts/test_park_ui.ts:225-265`
- 修改：`scripts/test_park_victory_layout.ts`

- [ ] **步骤 1：更新浏览器测试预期**

在 `scripts/test_park_ui.ts` 中：

- 把 `“修复手册”` 按钮改为 `“修复师档案”`。
- 删除首页 `“乐园图鉴”` 入口测试。
- 改为点击底部 `“关卡”`，验证 `“乐园修复图鉴”`。
- 打开第一张设施卡，验证藏品名、详情和“再次挑战”。
- 第一关通关后验证 `“初亮星火”` 出现在结算页，并检查进度存档：

```ts
const honorProgress = await page.evaluate(() =>
  JSON.parse(localStorage.getItem("energy_park_progress_v2")!),
);
assert.equal(honorProgress.equippedTitleId, "first_light");
await expect(page.getByText("初亮星火", { exact: true })).toBeVisible();
```

把新手图鉴段改为：

```ts
await close(page);
await page
  .getByRole("navigation")
  .getByRole("button", { name: "关卡", exact: true })
  .click();
await expect(page.getByRole("heading", { name: "乐园修复图鉴" })).toBeVisible();
await page
  .getByRole("button", { name: "修复第1处设施", exact: true })
  .click();
await expect(page.getByText("迎宾门", { exact: true })).toBeVisible();
await close(page);
await page.getByRole("button", { name: "修复师档案", exact: true }).click();
await capture(page, "profile-390x844");
await close(page);
```

- [ ] **步骤 2：运行 UI 测试确认失败**

先启动 `npm run dev`，再运行：

```bash
npx tsx scripts/test_park_ui.ts
```

预期：FAIL，弹窗标题仍为“乐园关卡”，首页仍有独立图鉴，结算没有称号。

- [ ] **步骤 3：在 App 中捕获新称号**

在 `App.tsx` 中加入：

```ts
import { loadUnlockedAchievements } from "./utils/achievements";
import {
  chooseAutoEquipHonorTitle,
  getNewHonorTitles,
  resolveEquippedHonorTitle,
} from "./data/honorTitles";
import type { HonorTitle } from "./types/honor";
import { equipHonorTitle } from "./utils/parkProgress";
```

增加状态：

```ts
const [victoryHonorTitles, setVictoryHonorTitles] = useState<HonorTitle[]>([]);
```

把现有 `checkVictoryAchievements(...)` 调用替换为：

```ts
const achievementResult =
  mode !== "editor" && mode !== "lab"
    ? checkVictoryAchievements({
        levelId: level.id,
        stepsUsed,
        remainingSteps: nextRemaining,
        maxSteps: level.maxSteps,
        parSteps: level.parSteps,
        levelUndosUsed: stats.current.undos,
        hasUsedTimelineJump: stats.current.jumped,
        hasToggledSwitch: stats.current.switched,
        stars: earnedStars,
        isEndless: mode === "endless",
        endlessStreak: endless.current.streak,
      })
    : { newlyUnlocked: [], updatedStats: null };

const newTitles = getNewHonorTitles(achievementResult.newlyUnlocked);
setVictoryHonorTitles(newTitles);

if (newTitles.length > 0) {
  const unlocked = loadUnlockedAchievements();
  const progress = readParkProgress(localStorage);
  if (!resolveEquippedHonorTitle(progress.equippedTitleId, unlocked)) {
    const autoTitle = chooseAutoEquipHonorTitle(newTitles);
    if (autoTitle) {
      localStorage.setItem(
        PARK_STORAGE_KEY,
        JSON.stringify(
          equipHonorTitle(progress, autoTitle.id, unlocked),
        ),
      );
    }
  }
}
```

在传给 `CandyThemeShell` 的属性中加入：

```tsx
victoryHonorTitles={victoryHonorTitles}
```

- [ ] **步骤 4：接入修复图鉴与档案组件**

在 `CandyThemeShell.tsx` 中：

```tsx
import { RepairAtlasModal } from "./RepairAtlasModal";
import { HonorProfile } from "./HonorProfile";
import { getDecoratedAchievements } from "../utils/achievements";
import {
  resolveEquippedHonorTitle,
} from "../data/honorTitles";
import type { HonorTitle } from "../types/honor";
import {
  equipHonorTitle,
  getStoredLevelStars,
  isChapterLocked,
} from "../utils/parkProgress";
```

Props 增加：

```ts
victoryHonorTitles: HonorTitle[];
```

删除 `Modal` 中的 `"flora"` 和 `TITLES.flora`。修改：

```ts
levels: "乐园修复图鉴",
profile: "修复师档案",
```

替换重复星级公式：

```ts
const starsOf = (level: LevelConfig) =>
  getStoredLevelStars(
    level,
    p.clearedLevels,
    p.bestSteps,
    p.bestLights,
  );
```

替换章节锁定：

```ts
const chapterLocked = (index: number) =>
  isChapterLocked(index, p.clearedLevels, unlockAll);
```

删除 `collectionPage` 状态，保留 `chapter` 和 `exhibitId`。加入：

```tsx
const openAtlas = (focusLevelId: number | null = null) => {
  const id = focusLevelId ?? p.level.id;
  setChapter(chapterIndex(id));
  setExhibitId(focusLevelId);
  p.onOpenLevels();
};
```

底部导航仍使用：

```ts
{ icon: "map", text: "关卡", action: () => openAtlas(null) }
```

局内顶部图鉴按钮改为：

```tsx
onClick={() => openAtlas(p.level.id)}
```

- [ ] **步骤 5：替换关卡弹窗主体**

把现有 `activeModal === "levels"` 大段 JSX 替换为：

```tsx
{activeModal === "levels" && (
  <RepairAtlasModal
    levels={p.levels}
    chapter={chapter}
    currentLevelId={p.level.id}
    exhibitId={exhibitId}
    clearedLevels={p.clearedLevels}
    bestSteps={p.bestSteps}
    bestLights={p.bestLights}
    unlockAll={unlockAll}
    onChapterChange={setChapter}
    onExhibitChange={setExhibitId}
    onToggleUnlockAll={toggleUnlockAll}
    onSelectLevel={select}
    onOpenEndless={() => {
      close();
      open("endless");
    }}
    onOpenEditor={() => {
      close();
      open("editor");
    }}
    onOpenWorld={() => {
      close();
      open("world");
    }}
  />
)}
```

`select` 应用 `exhibitId` 中选中的关卡，不再依赖卡片点击参数：

```ts
const select = (id: number) => {
  if (chapterLocked(chapterIndex(id))) return;
  const sameLevel = p.screen === "play" && id === p.level.id;
  setExhibitId(null);
  if (sameLevel) {
    p.onCloseLevels();
    setModal("none");
    return;
  }
  close();
  p.onSelectLevel(id);
};
```

- [ ] **步骤 6：接入修复师档案**

在渲染组件前计算：

```ts
const achievements = getDecoratedAchievements();
const unlockedAchievements = loadUnlockedAchievements();
const equippedHonorTitle = resolveEquippedHonorTitle(
  progress.equippedTitleId,
  unlockedAchievements,
);
```

把 `activeModal === "profile"` 的主体替换为：

```tsx
{activeModal === "profile" && (
  <HonorProfile
    completed={completed}
    totalStars={totalStars}
    achievements={achievements}
    unlockedAchievements={unlockedAchievements}
    equippedTitle={equippedHonorTitle}
    onEquipTitle={(titleId) => {
      const next = equipHonorTitle(
        progress,
        titleId,
        unlockedAchievements,
      );
      if (next !== progress) save(next);
    }}
  />
)}
```

头像按钮文案改为 `修复师档案`。

- [ ] **步骤 7：删除首页和关卡内独立图鉴入口**

删除首页侧边操作数组中的：

```ts
{ icon: "map", label: "乐园图鉴", modal: "flora" },
```

删除关卡页原有的：

```tsx
<button
  className="park-text-link"
  onClick={() => {
    p.onCloseLevels();
    open("flora");
  }}
>
  查看乐园图鉴
</button>
```

删除整个 `activeModal === "flora"` JSX 分支。

从大弹窗判断中移除 `activeModal === "flora"`。

- [ ] **步骤 8：在结算中加入图鉴收录与称号**

在 `park-victory-panel` 中、奖励标题之前加入：

```tsx
{p.gameMode === "story" && reward.coins > 0 && collection && (
  <div className="park-atlas-unlock">
    <span>图鉴收录 +1</span>
    <strong>{collection.name}</strong>
  </div>
)}

{p.victoryHonorTitles.length > 0 && (
  <div className="park-victory-honors">
    <span>获得荣誉称号</span>
    {p.victoryHonorTitles.map((title) => (
      <strong key={title.id}>{title.name}</strong>
    ))}
  </div>
)}
```

在“返回乐园”之前加入次级入口：

```tsx
<button
  className="park-text-link"
  onClick={() => openAtlas(p.level.id)}
>
  查看本次藏品
</button>
```

注意：`openAtlas` 依赖 `p.levelSelectOpen`，在 victory 页面调用时与现有弹窗体系一致；关闭后回到结算页。

- [ ] **步骤 9：增加结算样式**

在 `src/index.css` 的 `.park-victory-panel` 附近加入：

```css
.park-atlas-unlock,
.park-victory-honors {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2cqw;
  margin: 2.5cqw 0;
  padding: 2cqw 3cqw;
  border-radius: 3.5cqw;
  background: linear-gradient(#fff2be, #f8d7e4);
  color: #773e6d;
  box-shadow: inset 0 0 0 0.4cqw #f0ca7e;
}
.park-atlas-unlock span,
.park-victory-honors > span {
  font-size: 3cqw;
}
.park-atlas-unlock strong,
.park-victory-honors strong {
  font-size: 3.8cqw;
}
.park-victory-honors {
  align-items: flex-start;
  flex-direction: column;
  gap: 0.8cqw;
}
```

同步扩展 `scripts/test_park_victory_layout.ts` 的矩形检查：

```ts
const rects = await page.evaluate(() => {
  return Object.fromEntries([
    ["sign", ".park-red-sign"],
    ["list", ".park-repair-detail ul"],
    ["atlas", ".park-atlas-unlock"],
    ["honors", ".park-victory-honors"],
    ["title", ".park-reward-title"],
    ["rewards", ".park-rewards"],
    ["score", ".park-result-score"],
    ["panel", ".park-victory-panel"],
    ["actions", ".park-victory-actions"],
  ].map(([key, selector]) => {
    const r = document.querySelector(selector)!.getBoundingClientRect();
    return [
      key,
      { top: r.top, bottom: r.bottom, left: r.left, right: r.right },
    ];
  }));
});
assert.ok(
  rects.list.bottom <= rects.atlas.top + 1,
  `${label} 修复清单遮挡图鉴收录`,
);
assert.ok(
  rects.atlas.bottom <= rects.honors.top + 1,
  `${label} 图鉴收录遮挡称号`,
);
assert.ok(
  rects.honors.bottom <= rects.title.top + 1,
  `${label} 称号遮挡奖励牌`,
);
```

保留原有修复牌、奖励、成绩、面板和操作按钮断言。

- [ ] **步骤 10：删除旧的关卡和图鉴样式**

在 UI 测试和截图确认不再引用后，删除：

- `.park-level-grid`
- `.park-level-card`
- `.park-flower-grid`
- `.park-flower-detail`
- `.park-pagination`

保留 `.park-collection-flower`，它被新图鉴卡片继续使用。

- [ ] **步骤 11：运行目标 UI 测试**

运行：

```bash
npx tsx scripts/test_repair_atlas_honors_ui.ts
npx tsx scripts/test_park_ui.ts
npx tsx scripts/test_park_victory_layout.ts
```

预期：PASS。首页无独立图鉴；关卡入口打开修复图鉴；当前设施详情可打开；首关通关获得称号；结算无溢出。

- [ ] **步骤 12：提交**

```bash
git add src/App.tsx src/components/CandyThemeShell.tsx src/index.css scripts/test_park_ui.ts scripts/test_park_victory_layout.ts
git commit -m "feat: 合并关卡图鉴并接入荣誉称号"
```

---

## 任务 7：补齐图鉴、称号和兼容性细节测试

**文件：**

- 修改：`scripts/test_repair_atlas_honors_ui.ts`
- 修改：`scripts/test_park_progress.ts`
- 修改：`scripts/test_park_ui.ts`

- [ ] **步骤 1：加入多状态与持久化断言**

在 UI 测试中加入：

```ts
await page
  .getByRole("button", { name: "修复第1处设施", exact: true })
  .click();
await expect(page.getByText("再次挑战", { exact: true })).toBeVisible();
await page
  .getByRole("button", { name: "返回本章图鉴", exact: true })
  .click();
await expect(
  page.locator(".park-atlas-card.is-current").getByText("4", {
    exact: true,
  }),
).toBeVisible();
await expect(
  page.locator(".park-atlas-card.is-repaired").getByText("1", {
    exact: true,
  }),
).toBeVisible();
await expect(
  page.locator(".park-atlas-card.is-unrepaired").getByText("4", {
    exact: true,
  }),
).toBeVisible();
```

称号持久化：

```ts
await page.getByRole("tab", { name: "称号墙", exact: true }).click();
await page
  .getByRole("button", { name: /初亮星火/ })
  .click();
await page.reload();
await page.getByRole("button", { name: "修复师档案", exact: true }).click();
await expect(page.getByText("佩戴中", { exact: true })).toBeVisible();
```

- [ ] **步骤 2：加入旧存档兼容测试**

在 `scripts/test_park_progress.ts` 保留并强化：

```ts
test("旧成就存档不影响称号字段迁移", () => {
  const p = readParkProgress(
    store({
      honeycomb_cleared_levels: JSON.stringify(
        Array.from({ length: 99 }, (_, i) => i + 1),
      ),
      [PARK_STORAGE_KEY]: JSON.stringify({
        coins: 4950,
        hints: 3,
        rewardedLevels: Array.from({ length: 99 }, (_, i) => i + 1),
        completedDate: "2026-11-20",
        claimedDate: "2026-11-20",
      }),
      honeycomb_achievements_v1: JSON.stringify({
        first_spark: 1700000000000,
      }),
    }),
  );
  assert.equal(p.coins, 4950 + 4950);
  assert.equal(p.equippedTitleId, null);
});
```

预期总钻石按现有补偿规则计算，称号字段不改变旧货币和奖励。

- [ ] **步骤 3：运行指定测试**

运行：

```bash
npx tsx scripts/test_park_progress.ts
npx tsx scripts/test_achievement_honors.ts
npx tsx scripts/test_repair_atlas_honors_ui.ts
npx tsx scripts/test_park_ui.ts
```

预期：PASS。

- [ ] **步骤 4：提交**

```bash
git add scripts/test_repair_atlas_honors_ui.ts scripts/test_park_progress.ts scripts/test_park_ui.ts
git commit -m "test: 覆盖图鉴与称号完整流程"
```

---

## 任务 8：移动端视觉验收与全量回归

**文件：**

- 修改：`src/index.css`
- 产出：`docs/QA/repair-atlas-honors-2026-11-20/*.png`
- 产出：`docs/QA/repair-atlas-honors-2026-11-20/README.md`

- [ ] **步骤 1：生成 360px 与 390px 截图**

在 UI 测试中增加双视口循环：

```ts
for (const viewport of [
  { width: 360, height: 800, suffix: "360x800" },
  { width: 390, height: 844, suffix: "390x844" },
]) {
  await page.setViewportSize(viewport);
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "关卡", exact: true })
    .click();
  await page.screenshot({
    path: path.join(output, `atlas-${viewport.suffix}.png`),
  });
  await page
    .getByRole("button", { name: "修复第1处设施", exact: true })
    .click();
  await page.screenshot({
    path: path.join(output, `atlas-detail-${viewport.suffix}.png`),
  });
  await page.getByRole("button", { name: "关闭", exact: true }).click();
  await page.getByRole("button", { name: "修复师档案", exact: true }).click();
  await page.screenshot({
    path: path.join(output, `honors-${viewport.suffix}.png`),
  });
  await page.getByRole("button", { name: "关闭", exact: true }).click();
}
```

- [ ] **步骤 2：运行 UI 脚本并检查截图**

运行：

```bash
npx tsx scripts/test_repair_atlas_honors_ui.ts
```

按游戏美术视觉审查技能逐张检查：

- 设施名称完整，无截字。
- 4 列卡片没有横向滚动。
- 未修复剪影与修复图中心点一致。
- 当前关卡描边不遮挡星级和地狱标记。
- 称号名称与“佩戴中”状态可读。
- 成就进度条与文字没有重叠。
- 结算中的图鉴收录与新称号不挤出操作按钮。

如果发现布局问题，调整 `.park-atlas-card`、`.park-title-card` 或结算面板的最小高度、字号、间距，然后重新运行截图。

- [ ] **步骤 3：写 QA 报告**

创建 `docs/QA/repair-atlas-honors-2026-11-20/README.md`：

```md
# 乐园修复图鉴与荣誉称号验收

日期：2026-11-20
视口：360×800、390×844

## 验收页面

- 乐园修复图鉴
- 设施详情
- 未修复 / 已修复 / 当前关卡状态
- 修复师档案 · 称号墙
- 修复师档案 · 成就
- 首次称号解锁结算

## 功能结果

- 关卡与图鉴共用同一入口。
- 99 个关卡保持对应 99 件藏品。
- 12 个称号可解锁、佩戴并在刷新后保留。
- 旧存档继续读取现有通关、星级、货币和成就。

## 视觉结果

记录逐视口文字完整性、卡片裁切、图片边缘、描边层级和按钮可见性。
```

报告只写产品验收结果，不写实现推理。

- [ ] **步骤 4：运行完整自动化检查**

运行：

```bash
npm run lint
npm run test:honors
npm test
npm run test:ui
npm run test:pipes
npm run build
```

预期：

- `lint` 无 TypeScript 错误。
- 数据测试全部通过。
- UI 测试全部通过。
- 管道与对齐测试通过。
- Vite 生产构建成功。

- [ ] **步骤 5：检查工作区并提交**

运行：

```bash
git status --short
git diff --check
```

只暂存本次任务的代码、测试和 QA 文件：

```bash
git add src/App.tsx src/components/CandyThemeShell.tsx src/components/RepairAtlasModal.tsx src/components/HonorProfile.tsx src/index.css src/data/honorTitles.ts src/types/honor.ts src/types/achievement.ts src/utils/achievements.ts src/utils/parkProgress.ts scripts/test_honor_titles.ts scripts/test_achievement_honors.ts scripts/test_repair_atlas_honors_ui.ts scripts/test_theme_content.ts scripts/test_park_progress.ts scripts/test_park_ui.ts scripts/test_park_victory_layout.ts docs/QA/repair-atlas-honors-2026-11-20
git add -p package.json
git commit -m "fix: 完成图鉴与称号视觉验收"
```

只暂存本次功能涉及的显式文件，并继续排除 `package.json` 中与荣誉称号无关的未提交 hunk。

---

## 执行检查点

- 任务 1–3 完成后，不启动 UI 开发，先运行三项纯数据测试。
- 任务 4–5 完成后，只检查组件编译，不要求完整页面测试通过。
- 任务 6 完成后，修复图鉴与档案必须能通过真实浏览器流程。
- 任务 7 完成后，旧存档、重复通关和多状态必须通过。
- 任务 8 完成后，才能给出视觉与功能交付报告。

## 计划自检

- 规格第 4.1–4.4 的合并图鉴、卡片、详情和入口移除由任务 4、6 覆盖。
- 规格第 5.1–5.5 的 12 个称号、成就映射、称号墙和自动佩戴由任务 1、2、3、5、6 覆盖。
- 规格第 6 节的图鉴收录和称号结算由任务 6 覆盖。
- 规格第 7 节的数据模型由任务 1–3 覆盖。
- 规格第 8 节的组件边界由任务 4、5、6 覆盖。
- 规格第 9 节的交互流程由任务 4、5、6、7 覆盖。
- 规格第 10–11 节的视觉和测试要求由任务 7、8 覆盖。
- 所有新增类型、函数和属性都在首次使用的任务之前定义。
- 计划中没有未决项、模糊测试或未定义接口。
