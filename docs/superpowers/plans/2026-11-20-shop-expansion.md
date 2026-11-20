# 乐园商店首批扩充实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 把商店从单一提示灯泡扩充为 4 件补给和 4 件装扮，并让交易、库存、局内使用、首页装扮和存档迁移形成真实闭环。

**架构：** 商品定义集中在声明式目录，`parkProgress` 负责交易与持久化，独立 `ShopModal` 负责货架，`CandyThemeShell` 只协调局内使用和首页表现。新素材生产放在独立确认闸门之后，未获确认不得调用图片生成。

**技术栈：** React 19、TypeScript、Vite、tsx、Playwright、现有本地存档与图片素材管线。

---

## 文件结构

- 创建：`src/types/shop.ts`，定义补给、装扮、商品分类与装备状态。
- 创建：`src/data/shopCatalog.ts`，保存 8 件商品的 ID、价格、用途、开放条件和展示资源。
- 创建：`scripts/test_shop_catalog.ts`，校验目录数量、唯一性、价格与开放条件。
- 修改：`src/utils/parkProgress.ts`，扩展存档、购买、库存、装备与展品选择。
- 修改：`scripts/test_park_progress.ts`，覆盖迁移和全部交易状态。
- 修改：`src/utils/hint-engine.ts`，增加连续提示序列。
- 修改：`scripts/test_hint_engine.ts`，验证连续提示每一步都在最优解上。
- 修改：`src/App.tsx`，增加本局额外回溯入口并保留真实步数统计。
- 创建：`src/components/ShopModal.tsx`，实现双页签货架和展品选择。
- 修改：`src/components/CandyThemeShell.tsx`，接入商店、背包使用、补步和额外回溯。
- 创建：`src/utils/parkTheme.ts`，统一默认主题与宁静夜灯的应用。
- 修改：`src/main.tsx`，启动时读取已装备主题。
- 修改：`src/index.css`，增加商店、首页表情、展台和装扮样式。
- 修改：`public/assets/park/manifest.json`，登记新增图标、表情和礼服资源。
- 修改：`scripts/prepare_park_assets.py`，处理现有表情并接入新礼服资源。
- 修改：`scripts/test_park_ui.ts`，增加真实购买、使用、装备、刷新恢复与视觉路径。
- 修改：`package.json`，将商品目录测试纳入 `pnpm test` 对应的 `test` 脚本。

## 任务 1：建立商品目录

**文件：**
- 创建：`src/types/shop.ts`
- 创建：`src/data/shopCatalog.ts`
- 创建：`scripts/test_shop_catalog.ts`
- 修改：`package.json:6`

- [ ] **步骤 1：编写目录需求测试**

```ts
import assert from "node:assert/strict";
import {
  COSMETIC_ITEMS,
  SUPPLY_ITEMS,
  getCosmeticItem,
  getSupplyItem,
} from "../src/data/shopCatalog";

assert.equal(SUPPLY_ITEMS.length, 4);
assert.equal(COSMETIC_ITEMS.length, 4);
assert.equal(new Set(SUPPLY_ITEMS.map((item) => item.id)).size, 4);
assert.equal(new Set(COSMETIC_ITEMS.map((item) => item.id)).size, 4);
assert.deepEqual(
  Object.fromEntries(SUPPLY_ITEMS.map((item) => [item.id, item.price])),
  { hint: 120, lens: 260, rewind: 180, step: 300 },
);
assert.deepEqual(
  Object.fromEntries(COSMETIC_ITEMS.map((item) => [item.id, item.unlockAt])),
  {
    "joy-greeting": 5,
    "starlight-outfit": 20,
    "exhibit-display": 10,
    "calm-theme": 40,
  },
);
assert.equal(getSupplyItem("lens")?.name, "火花透镜");
assert.equal(getCosmeticItem("calm-theme")?.name, "宁静夜灯");
console.log("商店目录验证通过");
```

- [ ] **步骤 2：运行测试确认失败**

运行：

```bash
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_shop_catalog.ts
```

预期：FAIL，提示无法找到 `src/data/shopCatalog.ts`。

- [ ] **步骤 3：定义商店类型**

```ts
export type SupplyId = "hint" | "lens" | "rewind" | "step";
export type CosmeticId =
  | "joy-greeting"
  | "starlight-outfit"
  | "exhibit-display"
  | "calm-theme";

export type ShopTab = "supply" | "cosmetic";
export type SupplyStockKey = "hints" | "lenses" | "rewindTokens" | "stepTokens";
export type EquippedMood = "default" | "joy";
export type EquippedOutfit = "default" | "starlight";
export type EquippedTheme = "default" | "calm";

export interface SupplyShopItem {
  id: SupplyId;
  name: string;
  description: string;
  price: number;
  stockKey: SupplyStockKey;
  iconArt: string;
}

export interface CosmeticShopItem {
  id: CosmeticId;
  name: string;
  description: string;
  price: number;
  unlockAt: number;
  previewArt: string;
  effect: "mood" | "outfit" | "exhibit" | "theme";
}
```

- [ ] **步骤 4：写入 8 件商品目录**

```ts
import type {
  CosmeticId,
  CosmeticShopItem,
  SupplyId,
  SupplyShopItem,
} from "../types/shop";

export const SUPPLY_ITEMS: SupplyShopItem[] = [
  {
    id: "hint",
    name: "提示灯泡",
    description: "查看当前局面下一步正确操作",
    price: 120,
    stockKey: "hints",
    iconArt: "icon-hint",
  },
  {
    id: "lens",
    name: "火花透镜",
    description: "连续查看接下来的 3 步正确操作",
    price: 260,
    stockKey: "lenses",
    iconArt: "icon-lens",
  },
  {
    id: "rewind",
    name: "时光回针",
    description: "当前这一局回溯次数 +1",
    price: 180,
    stockKey: "rewindTokens",
    iconArt: "icon-undo",
  },
  {
    id: "step",
    name: "应急线圈",
    description: "步数归零后补回 3 步",
    price: 300,
    stockKey: "stepTokens",
    iconArt: "icon-coil",
  },
];

export const COSMETIC_ITEMS: CosmeticShopItem[] = [
  {
    id: "joy-greeting",
    name: "开心问候",
    description: "三位伙伴在首页显示开心表情",
    price: 450,
    unlockAt: 5,
    previewArt: "mood-joy",
    effect: "mood",
  },
  {
    id: "starlight-outfit",
    name: "星愿礼服",
    description: "三位伙伴换上星光庆典装",
    price: 900,
    unlockAt: 20,
    previewArt: "outfit-sheep-starlight",
    effect: "outfit",
  },
  {
    id: "exhibit-display",
    name: "星空展台",
    description: "在乐园首页陈列一件已修复设施",
    price: 1200,
    unlockAt: 10,
    previewArt: "exhibit-carousel",
    effect: "exhibit",
  },
  {
    id: "calm-theme",
    name: "宁静夜灯",
    description: "深靛夜空与暖纸阅读界面主题",
    price: 1800,
    unlockAt: 40,
    previewArt: "theme-calm-preview",
    effect: "theme",
  },
];

export function getSupplyItem(id: string): SupplyShopItem | undefined {
  return SUPPLY_ITEMS.find((item) => item.id === id);
}

export function getCosmeticItem(id: string): CosmeticShopItem | undefined {
  return COSMETIC_ITEMS.find((item) => item.id === id);
}

export function isSupplyId(value: unknown): value is SupplyId {
  return typeof value === "string" && SUPPLY_ITEMS.some((item) => item.id === value);
}

export function isCosmeticId(value: unknown): value is CosmeticId {
  return typeof value === "string" && COSMETIC_ITEMS.some((item) => item.id === value);
}
```

- [ ] **步骤 5：运行测试确认通过**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_shop_catalog.ts`

预期：`商店目录验证通过`。

- [ ] **步骤 6：加入总测试并提交**

把 `tsx scripts/test_shop_catalog.ts` 加入 `test` 脚本的 `test_theme_content.ts` 之后。

```bash
git add src/types/shop.ts src/data/shopCatalog.ts scripts/test_shop_catalog.ts package.json
git commit -m "feat: 增加商店商品目录"
```

## 任务 2：扩展进度存档与交易函数

**文件：**
- 修改：`src/utils/parkProgress.ts:1-205`
- 修改：`scripts/test_park_progress.ts:1-180`

- [ ] **步骤 1：编写交易与迁移测试**

在 `scripts/test_park_progress.ts` 追加：

```ts
import {
  buyCosmetic,
  buySupply,
  consumeSupply,
  equipCosmetic,
  isCosmeticEquipped,
  setHomeExhibit,
} from "../src/utils/parkProgress";

test("新存档包含全部补给库存和默认装扮", () => {
  const p = fresh();
  assert.equal(p.lenses, 0);
  assert.equal(p.rewindTokens, 0);
  assert.equal(p.stepTokens, 0);
  assert.deepEqual(p.ownedCosmetics, []);
  assert.deepEqual(p.equippedCosmetics, {
    mood: "default",
    outfit: "default",
    exhibitId: null,
    theme: "default",
  });
});

test("补给购买扣费、增加库存，消耗不会为负数", () => {
  const start = { ...fresh(), coins: 1000 };
  const lens = buySupply(start, "lens");
  assert.equal(lens.coins, 740);
  assert.equal(lens.lenses, 1);
  assert.equal(consumeSupply(lens, "lens").lenses, 0);
  assert.equal(consumeSupply({ ...lens, lenses: 0 }, "lens").lenses, 0);
  const step = buySupply(start, "step");
  assert.equal(step.coins, 700);
  assert.equal(step.stepTokens, 1);
});

test("余额或开放条件不足时交易完全不变", () => {
  const poor = { ...fresh(), coins: 100 };
  assert.equal(buySupply(poor, "lens"), poor);
  assert.equal(buyCosmetic({ ...poor, coins: 5000 }, "joy-greeting", 4).coins, 5000);
});

test("装扮只购买一次并可装备与卸下", () => {
  const rich = { ...fresh(), coins: 5000 };
  const bought = buyCosmetic(rich, "joy-greeting", 5);
  assert.equal(bought.coins, 4550);
  assert.deepEqual(bought.ownedCosmetics, ["joy-greeting"]);
  assert.equal(buyCosmetic(bought, "joy-greeting", 5), bought);
  const equipped = equipCosmetic(bought, "joy-greeting", true);
  assert.equal(equipped.equippedCosmetics.mood, "joy");
  assert.equal(isCosmeticEquipped(equipped, "joy-greeting"), true);
  assert.equal(
    equipCosmetic(equipped, "joy-greeting", false).equippedCosmetics.mood,
    "default",
  );
});

test("未拥有装扮不能装备，展品可更换与收起", () => {
  assert.equal(equipCosmetic(fresh(), "calm-theme", true), fresh());
  const withDisplay = buyCosmetic({ ...fresh(), coins: 5000 }, "exhibit-display", 10);
  const selected = setHomeExhibit(withDisplay, 21);
  assert.equal(selected.equippedCosmetics.exhibitId, 21);
  assert.equal(setHomeExhibit(selected, null).equippedCosmetics.exhibitId, null);
});

test("旧存档缺少新字段时自动补齐", () => {
  const old = {
    coins: 300,
    hints: 2,
    rewardedLevels: [1],
    completedDate: "",
    claimedDate: "",
  };
  const p = readParkProgress(store({
    [PARK_STORAGE_KEY]: JSON.stringify(old),
    [RESHAPE_COMPENSATION_KEY]: "1",
  }));
  assert.equal(p.coins, 300);
  assert.equal(p.hints, 2);
  assert.equal(p.lenses, 0);
  assert.deepEqual(p.ownedCosmetics, []);
});

test("未知装扮 ID 和非法装备状态回落默认", () => {
  const p = readParkProgress(store({
    [PARK_STORAGE_KEY]: JSON.stringify({
      coins: 1,
      hints: 3,
      rewardedLevels: [],
      completedDate: "",
      claimedDate: "",
      ownedCosmetics: ["unknown", "calm-theme"],
      equippedCosmetics: {
        mood: "joy",
        outfit: "starlight",
        exhibitId: 101,
        theme: "calm",
      },
    }),
    [RESHAPE_COMPENSATION_KEY]: "1",
  }));
  assert.deepEqual(p.ownedCosmetics, ["calm-theme"]);
  assert.deepEqual(p.equippedCosmetics, {
    mood: "default",
    outfit: "default",
    exhibitId: null,
    theme: "default",
  });
});
```

- [ ] **步骤 2：运行确认失败**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_park_progress.ts`

预期：FAIL，`buySupply` 等函数不存在。

- [ ] **步骤 3：扩展进度类型与默认值**

在 `src/utils/parkProgress.ts` 增加：

```ts
import {
  getCosmeticItem,
  getSupplyItem,
  isCosmeticId,
} from "../data/shopCatalog";
import type {
  CosmeticId,
  EquippedMood,
  EquippedOutfit,
  EquippedTheme,
  SupplyId,
} from "../types/shop";

export interface ParkProgress {
  coins: number;
  hints: number;
  rewardedLevels: number[];
  completedDate: string;
  claimedDate: string;
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
}
```

```ts
const DEFAULT_PROGRESS: ParkProgress = {
  coins: 0,
  hints: 3,
  rewardedLevels: [],
  completedDate: "",
  claimedDate: "",
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
};
```

- [ ] **步骤 4：扩写 sanitizeProgress**

在返回对象中追加：

```ts
const ownedCosmetics = Array.from(
  new Set((Array.isArray(source.ownedCosmetics) ? source.ownedCosmetics : [])
    .filter(isCosmeticId)),
);
const rawEquipped =
  source.equippedCosmetics && typeof source.equippedCosmetics === "object"
    ? source.equippedCosmetics as Record<string, unknown>
    : {};
const rawExhibit = Number(rawEquipped.exhibitId);

return {
  // 保留现有 coins、hints、rewardedLevels、completedDate、claimedDate
  lenses: asCount(source.lenses, 0),
  rewindTokens: asCount(source.rewindTokens, 0),
  stepTokens: asCount(source.stepTokens, 0),
  ownedCosmetics,
  equippedCosmetics: {
    mood:
      ownedCosmetics.includes("joy-greeting") && rawEquipped.mood === "joy"
        ? "joy"
        : "default",
    outfit:
      ownedCosmetics.includes("starlight-outfit") &&
      rawEquipped.outfit === "starlight"
        ? "starlight"
        : "default",
    exhibitId:
      ownedCosmetics.includes("exhibit-display") &&
      Number.isInteger(rawExhibit) &&
      rawExhibit >= 1 &&
      rawExhibit <= 99
        ? rawExhibit
        : null,
    theme:
      ownedCosmetics.includes("calm-theme") && rawEquipped.theme === "calm"
        ? "calm"
        : "default",
  },
};
```

- [ ] **步骤 5：增加通用交易 API**

```ts
function addSupply(progress: ParkProgress, id: SupplyId, amount: number): ParkProgress {
  const item = getSupplyItem(id);
  if (!item) return progress;
  return {
    ...progress,
    [item.stockKey]: Math.max(0, progress[item.stockKey] + amount),
  } as ParkProgress;
}

export function buySupply(progress: ParkProgress, id: SupplyId): ParkProgress {
  const item = getSupplyItem(id);
  if (!item || progress.coins < item.price) return progress;
  return addSupply({ ...progress, coins: progress.coins - item.price }, id, 1);
}

export function consumeSupply(progress: ParkProgress, id: SupplyId): ParkProgress {
  const item = getSupplyItem(id);
  if (!item || progress[item.stockKey] <= 0) return progress;
  return addSupply(progress, id, -1);
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
  ) return progress;
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
    return {
      ...progress,
      equippedCosmetics: {
        ...progress.equippedCosmetics,
        mood: active ? "joy" : "default",
      },
    };
  }
  if (id === "starlight-outfit") {
    return {
      ...progress,
      equippedCosmetics: {
        ...progress.equippedCosmetics,
        outfit: active ? "starlight" : "default",
      },
    };
  }
  if (id === "calm-theme") {
    return {
      ...progress,
      equippedCosmetics: {
        ...progress.equippedCosmetics,
        theme: active ? "calm" : "default",
      },
    };
  }
  return progress;
}

export function setHomeExhibit(
  progress: ParkProgress,
  exhibitId: number | null,
): ParkProgress {
  if (!progress.ownedCosmetics.includes("exhibit-display")) return progress;
  if (exhibitId !== null && (!Number.isInteger(exhibitId) || exhibitId < 1 || exhibitId > 99)) {
    return progress;
  }
  return {
    ...progress,
    equippedCosmetics: {
      ...progress.equippedCosmetics,
      exhibitId,
    },
  };
}

export function isCosmeticEquipped(progress: ParkProgress, id: CosmeticId): boolean {
  if (id === "joy-greeting") return progress.equippedCosmetics.mood === "joy";
  if (id === "starlight-outfit") return progress.equippedCosmetics.outfit === "starlight";
  if (id === "exhibit-display") return progress.equippedCosmetics.exhibitId !== null;
  if (id === "calm-theme") return progress.equippedCosmetics.theme === "calm";
  return false;
}
```

保留兼容包装：

```ts
export function buyHint(progress: ParkProgress): ParkProgress {
  return buySupply(progress, "hint");
}

export function consumeHint(progress: ParkProgress): ParkProgress {
  return consumeSupply(progress, "hint");
}
```

- [ ] **步骤 6：运行进度测试与类型检查**

```bash
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_park_progress.ts
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsc --noEmit
```

预期：所有进度测试通过，TypeScript 无错误。

- [ ] **步骤 7：提交**

```bash
git add src/utils/parkProgress.ts scripts/test_park_progress.ts
git commit -m "feat: 扩展商店库存与装扮存档"
```

## 任务 3：实现连续提示

**文件：**
- 修改：`src/utils/hint-engine.ts:1-145`
- 修改：`scripts/test_hint_engine.ts:1-100`

- [ ] **步骤 1：追加连续提示测试**

```ts
import { findHintSequence } from "../src/utils/hint-engine";

function expectSequence(level: LevelConfig, count: number) {
  let tiles = level.tiles;
  let par = solveRuleLevel({ ...level, tiles })?.par;
  if (par === undefined) throw new Error(`${level.code} 无解`);
  const moves = findHintSequence(level, tiles, level.maxSteps, count);
  assert.ok(moves.length >= 1 && moves.length <= count);
  for (const move of moves) {
    tiles = applyHintAction(level, tiles, move);
    const next = solveRuleLevel({ ...level, tiles })?.par;
    assert.equal(next, par! - 1, `${level.code} 连续提示偏离最优解`);
    par = next;
  }
}

expectSequence(DEFAULT_LEVELS[0], 3);
expectSequence(DEFAULT_LEVELS.find((level) => level.primaryMechanic === "switch")!, 3);
expectSequence(DEFAULT_LEVELS.find((level) => level.primaryMechanic === "gear")!, 3);
assert.deepEqual(findHintSequence(DEFAULT_LEVELS[0], DEFAULT_LEVELS[0].tiles, 0, 3), []);
```

测试文件现有顶层没有 `assert`，同时加入 `import assert from "node:assert/strict";`。

- [ ] **步骤 2：运行确认失败**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_hint_engine.ts`

预期：FAIL，`findHintSequence` 不存在。

- [ ] **步骤 3：实现连续提示**

```ts
export function findHintSequence(
  level: LevelConfig,
  tiles: Tile[],
  remainingSteps: number,
  count: number,
): HintMove[] {
  const moves: HintMove[] = [];
  let working = tiles;
  for (let index = 0; index < count; index += 1) {
    const budget = remainingSteps - index;
    if (budget <= 0) break;
    const move = findHint(level, working, budget);
    if (!move || !move.reachable) break;
    moves.push(move);
    working = applyHintAction(level, working, move);
  }
  return moves;
}
```

- [ ] **步骤 4：运行提示测试与全量关卡回归**

```bash
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_hint_engine.ts
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/audit-mainline.ts
```

预期：连续提示每一步都让最优步数恰好减少 1；99 关审计通过。

- [ ] **步骤 5：提交**

```bash
git add src/utils/hint-engine.ts scripts/test_hint_engine.ts
git commit -m "feat: 增加连续三步提示"
```

## 任务 4：增加本局额外回溯

**文件：**
- 修改：`src/App.tsx:100-110`
- 修改：`src/App.tsx:349-360`
- 修改：`src/App.tsx:430-490`
- 修改：`src/components/CandyThemeShell.tsx:50-100`

- [ ] **步骤 1：在 App 增加回溯回调**

```tsx
const addRewind = () => {
  const current = attempt.current;
  if (winProcessed.current) return;
  const nextRewinds = current.rewinds + 1;
  attempt.current = { ...current, rewinds: nextRewinds };
  setRewinds(nextRewinds);
  sound.playSwitch();
  haptics.tapHeavy();
};
```

在 `CandyThemeShell` 属性中传入：

```tsx
onAddRewind={addRewind}
```

- [ ] **步骤 2：补充 Shell 属性**

```ts
/** 道具：本局额外回溯 +1 */
onAddRewind?: () => void;
```

- [ ] **步骤 3：类型检查**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsc --noEmit`

预期：PASS。

- [ ] **步骤 4：提交**

```bash
git add src/App.tsx src/components/CandyThemeShell.tsx
git commit -m "feat: 支持本局额外回溯"
```

## 任务 5：创建独立商店货架

**文件：**
- 创建：`src/components/ShopModal.tsx`
- 修改：`src/components/CandyThemeShell.tsx:938-968`
- 修改：`src/index.css:1758-1810`

- [ ] **步骤 1：定义组件输入**

```ts
import { useState } from "react";
import { COLLECTION } from "../content";
import {
  COSMETIC_ITEMS,
  SUPPLY_ITEMS,
} from "../data/shopCatalog";
import type { ParkProgress } from "../utils/parkProgress";
import { isCosmeticEquipped } from "../utils/parkProgress";
import type { CosmeticId, ShopTab, SupplyId } from "../types/shop";
import { Art, Icon, ParkButton, getExhibitArt } from "./ParkArt";

interface ShopModalProps {
  progress: ParkProgress;
  clearedCount: number;
  clearedLevels: number[];
  onBuySupply: (id: SupplyId) => void;
  onBuyCosmetic: (id: CosmeticId) => void;
  onEquipCosmetic: (id: CosmeticId, active: boolean) => void;
  onSelectExhibit: (id: number | null) => void;
}
```

- [ ] **步骤 2：实现双页签和商品状态**

组件核心代码：

```tsx
export function ShopModal({
  progress,
  clearedCount,
  clearedLevels,
  onBuySupply,
  onBuyCosmetic,
  onEquipCosmetic,
  onSelectExhibit,
}: ShopModalProps) {
  const [tab, setTab] = useState<ShopTab>("supply");
  const [pickingExhibit, setPickingExhibit] = useState(false);

  if (pickingExhibit) {
    return (
      <div className="park-exhibit-picker">
        <div className="park-exhibit-picker-head">
          <strong>选择陈列展品</strong>
          <button onClick={() => setPickingExhibit(false)}>返回</button>
        </div>
        <div className="park-exhibit-picker-grid">
          {COLLECTION.filter((entry) => clearedLevels.includes(entry.levelId)).map((entry) => (
            <button
              key={entry.id}
              className={progress.equippedCosmetics.exhibitId === entry.id ? "selected" : ""}
              onClick={() => {
                onSelectExhibit(entry.id);
                setPickingExhibit(false);
              }}
            >
              <Art name={getExhibitArt(entry)} />
              <span>{entry.name}</span>
            </button>
          ))}
        </div>
        {progress.equippedCosmetics.exhibitId !== null && (
          <ParkButton
            purple
            onClick={() => {
              onSelectExhibit(null);
              setPickingExhibit(false);
            }}
          >
            收起展品
          </ParkButton>
        )}
      </div>
    );
  }

  return (
    <div className="park-shop">
      <div className="park-shop-balance">
        <Icon name="gem" />
        <b>{progress.coins.toLocaleString()}</b>
      </div>
      <div className="park-shop-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "supply"}
          className={tab === "supply" ? "selected" : ""}
          onClick={() => setTab("supply")}
        >
          补给
        </button>
        <button
          role="tab"
          aria-selected={tab === "cosmetic"}
          className={tab === "cosmetic" ? "selected" : ""}
          onClick={() => setTab("cosmetic")}
        >
          装扮
        </button>
      </div>

      {tab === "supply" &&
        SUPPLY_ITEMS.map((item) => {
          const stock = progress[item.stockKey];
          return (
            <article className="park-shop-card" key={item.id}>
              <Art name={item.iconArt} className="park-shop-card-art" />
              <div className="park-shop-card-copy">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>库存 {stock}</span>
              </div>
              <button
                className="park-shop-card-action"
                disabled={progress.coins < item.price}
                onClick={() => onBuySupply(item.id)}
                aria-label={`购买${item.name}`}
              >
                <Icon name="gem" />
                {item.price}
              </button>
            </article>
          );
        })}

      {tab === "cosmetic" &&
        COSMETIC_ITEMS.map((item) => {
          const owned = progress.ownedCosmetics.includes(item.id);
          const unlocked = clearedCount >= item.unlockAt;
          const active = isCosmeticEquipped(progress, item.id);
          return (
            <article className={`park-shop-card ${!unlocked ? "is-locked" : ""}`} key={item.id}>
              <Art name={item.previewArt} className="park-shop-card-art" />
              <div className="park-shop-card-copy">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {!unlocked && <span>修复 {item.unlockAt} 处后开放</span>}
                {owned && <span>{active ? "使用中" : "已拥有"}</span>}
              </div>
              {!owned ? (
                <button
                  className="park-shop-card-action"
                  disabled={!unlocked || progress.coins < item.price}
                  onClick={() => onBuyCosmetic(item.id)}
                  aria-label={`购买${item.name}`}
                >
                  <Icon name="gem" />
                  {item.price}
                </button>
              ) : item.effect === "exhibit" ? (
                <button
                  className="park-shop-card-action"
                  onClick={() => setPickingExhibit(true)}
                  aria-label={active ? "更换展品" : "选择展品"}
                >
                  {active ? "更换展品" : "选择展品"}
                </button>
              ) : (
                <button
                  className="park-shop-card-action"
                  onClick={() => onEquipCosmetic(item.id, !active)}
                  aria-label={active ? "恢复默认" : "使用"}
                >
                  {active ? "恢复默认" : "使用"}
                </button>
              )}
            </article>
          );
        })}
    </div>
  );
}
```

`Art` 对 `theme-calm-preview` 使用运行时主题预览资产；素材未确认前不创建该文件。

- [ ] **步骤 3：在 Shell 中替换单商品商店**

```tsx
{activeModal === "shop" && (
  <ShopModal
    progress={progress}
    clearedCount={p.clearedLevels.length}
    clearedLevels={p.clearedLevels}
    onBuySupply={(id) => {
      save(buySupply(progress, id));
      flash("补给已放入背包");
    }}
    onBuyCosmetic={(id) => {
      save(buyCosmetic(progress, id, p.clearedLevels.length));
      flash("装扮购买成功");
    }}
    onEquipCosmetic={(id, active) => {
      save(equipCosmetic(progress, id, active));
      flash(active ? "装扮已使用" : "已恢复默认");
    }}
    onSelectExhibit={(id) => {
      save(setHomeExhibit(progress, id));
      flash(id === null ? "展品已收起" : "展品已摆上展台");
    }}
  />
)}
```

- [ ] **步骤 4：增加商店样式**

```css
.park-shop {
  display: flex;
  flex-direction: column;
  gap: 2cqw;
}
.park-shop-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2cqw;
}
.park-shop-tabs button {
  min-height: 10cqw;
  border-radius: 5cqw;
  background: linear-gradient(#eadcf0, #cfb8dd);
  color: #6c4776;
  font-weight: 900;
  font-size: 4cqw;
}
.park-shop-tabs .selected {
  background: linear-gradient(#d58bea, #914ac3);
  color: white;
  box-shadow: inset 0 0 0 0.5cqw #f9d890;
}
.park-shop-card {
  display: grid;
  grid-template-columns: 15cqw 1fr auto;
  align-items: center;
  gap: 2.5cqw;
  min-height: 20cqw;
  padding: 2.5cqw;
  border: 0.35cqw solid #e4b9d7;
  border-radius: 4cqw;
  background: linear-gradient(#fff9ff, #f3e2f1);
}
.park-shop-card.is-locked {
  opacity: 0.72;
}
.park-shop-card-art {
  width: 15cqw;
  height: 15cqw;
  object-fit: contain;
}
.park-shop-card-copy h3 {
  margin: 0;
  font-size: 4.2cqw;
}
.park-shop-card-copy p {
  margin: 0.8cqw 0;
  font-size: 3.1cqw;
  line-height: 1.35;
}
.park-shop-card-copy span {
  font-size: 3cqw;
  color: #875775;
  font-weight: 800;
}
.park-shop-card-action {
  min-width: 18cqw;
  min-height: 9cqw;
  padding: 1cqw 1.5cqw;
  border-radius: 4cqw;
  background: linear-gradient(#f6c968, #e8953c);
  color: white;
  font-size: 3.4cqw;
  font-weight: 900;
}
.park-shop-card-action:disabled {
  filter: grayscale(0.8);
  opacity: 0.65;
}
```

- [ ] **步骤 5：类型检查**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsc --noEmit`

预期：PASS。

- [ ] **步骤 6：提交**

```bash
git add src/components/ShopModal.tsx src/components/CandyThemeShell.tsx src/index.css
git commit -m "feat: 重建商店双页签货架"
```

## 任务 6：接入背包与局内补给

**文件：**
- 修改：`src/components/CandyThemeShell.tsx:120-240`
- 修改：`src/components/CandyThemeShell.tsx:590-625`
- 修改：`src/components/CandyThemeShell.tsx:900-935`
- 修改：`src/components/CandyThemeShell.tsx:1220-1260`

- [ ] **步骤 1：把单步提示改为提示序列状态**

```ts
const [hintMoves, setHintMoves] = useState<HintMove[]>([]);
```

原有 `setHintMove(null)` 改为 `setHintMoves([])`，棋盘高亮改为：

```tsx
hintTileId={hintMoves[0]?.tileId ?? null}
```

提示弹窗渲染：

```tsx
{hintMoves.map((move, index) => (
  <p key={`${move.tileId}-${index}`} className="park-hint-move">
    {index + 1}. {describeHint(move)}
  </p>
))}
```

- [ ] **步骤 2：增加补给使用函数**

```ts
const useAdviceSupply = (id: "hint" | "lens") => {
  if (p.screen !== "play") {
    flash("进入关卡后可使用");
    return;
  }
  if (p.remainingSteps <= 0) {
    flash("步数已经用完，重置后才能继续");
    return;
  }
  if (p.gameMode !== "story" || !supportsHintEngine(p.level)) {
    flash("这件补给只用于主线关卡");
    return;
  }
  const count = id === "lens" ? 3 : 1;
  const moves = findHintSequence(p.level, p.tiles, p.remainingSteps, count);
  if (moves.length === 0) {
    flash("当前盘面算不出可行通路，请重置后重试");
    return;
  }
  save(consumeSupply(progress, id));
  setHintMoves(moves);
  open("hint");
};
```

将游玩页“提示”按钮改为 `onClick={() => useAdviceSupply("hint")}`。

- [ ] **步骤 3：背包显示四件补给**

```tsx
{SUPPLY_ITEMS.map((item) => {
  const stock = progress[item.stockKey];
  return (
    <div className="park-item-card" key={item.id}>
      <Art name={item.iconArt} className="park-icon" />
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <strong>已拥有 {stock} 个</strong>
      </div>
      {item.id === "hint" || item.id === "lens" ? (
        <button
          disabled={p.screen !== "play" || stock === 0}
          onClick={() => useAdviceSupply(item.id)}
        >
          使用
        </button>
      ) : null}
    </div>
  );
})}
```

时光回针与应急线圈分别通过操作足迹和步数耗尽遮罩使用。

- [ ] **步骤 4：接入时光回针**

在历史弹窗增加：

```tsx
{p.onAddRewind && progress.rewindTokens > 0 && (
  <ParkButton
    purple
    onClick={() => {
      save(consumeSupply(progress, "rewind"));
      p.onAddRewind?.();
      flash("回溯次数 +1");
    }}
  >
    使用时光回针 · 余 {progress.rewindTokens}
  </ParkButton>
)}
```

### 步骤 5：接入应急线圈

把步数耗尽遮罩按钮替换为：

```tsx
{p.onAddSteps && p.level.goal === undefined && (
  <ParkButton
    purple
    disabled={progress.stepTokens === 0}
    onClick={() => {
      save(consumeSupply(progress, "step"));
      p.onAddSteps?.();
      flash("应急线圈已启用，补回 3 步");
    }}
  >
    {progress.stepTokens === 0
      ? "应急线圈不足"
      : `使用应急线圈 · 余 ${progress.stepTokens}`}
  </ParkButton>
)}
```

- [ ] **步骤 6：运行类型与玩法回归**

```bash
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsc --noEmit
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_hint_engine.ts
```

预期：通过。

- [ ] **步骤 7：提交**

```bash
git add src/components/CandyThemeShell.tsx
git commit -m "feat: 接通商店补给与局内使用"
```

## 任务 7：实现非绘制类首页装扮

**文件：**
- 创建：`src/utils/parkTheme.ts`
- 修改：`src/main.tsx`
- 修改：`src/components/CandyThemeShell.tsx:355-440`
- 修改：`src/index.css:336-365`

- [ ] **步骤 1：建立主题工具**

```ts
import type { EquippedTheme } from "../types/shop";

export function applyParkTheme(theme: EquippedTheme): void {
  if (theme === "calm") {
    document.documentElement.dataset.theme = "calm";
  } else {
    delete document.documentElement.dataset.theme;
  }
}
```

- [ ] **步骤 2：启动时应用已购主题**

在 `src/main.tsx` 中：

```ts
import { readParkProgress } from "./utils/parkProgress";
import { applyParkTheme } from "./utils/parkTheme";

const themeParam = new URLSearchParams(window.location.search).get("theme");
if (themeParam === "calm" || themeParam === "default") {
  applyParkTheme(themeParam);
} else {
  applyParkTheme(readParkProgress(localStorage).equippedCosmetics.theme);
}
```

- [ ] **步骤 3：商店装备后立即应用主题**

```ts
useEffect(() => {
  const forced = new URLSearchParams(window.location.search).get("theme");
  if (!forced) applyParkTheme(progress.equippedCosmetics.theme);
}, [progress.equippedCosmetics.theme]);
```

- [ ] **步骤 4：首页渲染表情气泡与展台**

```tsx
const activeExhibit =
  progress.equippedCosmetics.exhibitId === null
    ? null
    : getCollectionEntry(progress.equippedCosmetics.exhibitId);
const visibleExhibit =
  activeExhibit && p.clearedLevels.includes(activeExhibit.levelId)
    ? activeExhibit
    : null;

<div className="park-home-friends">
  <Art name="sheep" className="park-friend-sheep" />
  <Art name="rabbit" className="park-friend-rabbit" />
  <Art name="spirit" className="park-friend-spirit" />
  {progress.equippedCosmetics.mood === "joy" && (
    <div className="park-home-moods" aria-label="伙伴开心问候">
      <Art name="mood-xingya-happy" />
      <Art name="mood-boling-happy" />
      <Art name="mood-yunrong-happy" />
    </div>
  )}
</div>
{visibleExhibit && (
  <div className="park-home-exhibit" aria-label={`陈列${visibleExhibit.name}`}>
    <Art name={getExhibitArt(visibleExhibit)} />
    <span>{visibleExhibit.name}</span>
  </div>
)}
```

礼服在任务 8 素材确认并处理完成后接入，装备状态在本任务先完成。

- [ ] **步骤 5：增加表情和展台样式**

```css
.park-home-moods {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.park-home-moods img {
  position: absolute;
  top: -8%;
  width: 14cqw;
  height: 12cqw;
  object-fit: contain;
}
.park-home-moods img:nth-child(1) { left: 18%; }
.park-home-moods img:nth-child(2) { left: 52%; }
.park-home-moods img:nth-child(3) { right: 2%; }
.park-home-exhibit {
  position: absolute;
  top: 25%;
  right: 6%;
  width: 18cqw;
  height: 18cqw;
  z-index: 3;
  border: 0.6cqw solid #f7d778;
  border-radius: 50%;
  background: rgba(88, 53, 132, 0.86);
  box-shadow: 0 0 2cqw rgba(255, 224, 137, 0.65);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.park-home-exhibit img {
  width: 82%;
  height: 68%;
  object-fit: contain;
}
.park-home-exhibit span {
  max-width: 92%;
  font-size: 2.6cqw;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- [ ] **步骤 6：类型检查并提交**

```bash
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsc --noEmit
git add src/utils/parkTheme.ts src/main.tsx src/components/CandyThemeShell.tsx src/index.css
git commit -m "feat: 增加首页表情展台与主题装扮"
```

## 任务 8：素材确认闸门与生产

**文件：**
- 修改：`scripts/prepare_park_assets.py`
- 修改：`public/assets/park/manifest.json`
- 创建：`public/assets/park/icon-lens.webp`
- 创建：`public/assets/park/icon-coil.webp`
- 创建：`public/assets/park/mood-xingya-happy.webp`
- 创建：`public/assets/park/mood-boling-happy.webp`
- 创建：`public/assets/park/mood-yunrong-happy.webp`
- 创建：`public/assets/park/outfit-sheep-starlight.webp`
- 创建：`public/assets/park/outfit-rabbit-starlight.webp`
- 创建：`public/assets/park/outfit-spirit-starlight.webp`
- 创建：`public/assets/park/theme-calm-preview.webp`

- [ ] **步骤 1：停止并请求素材确认**

向用户发送以下素材清单并等待明确确认：

```text
准备绘制 6 张新图：
1. 火花透镜：放大镜、星光与青蓝能量，匹配现有 3D 糖果图标。
2. 应急线圈：蓝青色发条线圈，金色接口，匹配现有管件材质。
3. 羊伙伴星愿礼服：保留羊角、脸型和 375:400 视觉比例，星光庆典服。
4. 兔子伙伴星礼服：保留长耳、脸型和 282:400 视觉比例，同套庆典服。
5. 精灵伙伴星礼服：保留光环、脸型和 400:393 视觉比例，同套庆典服。
6. 宁静夜灯预览：使用现有首页与宁静主题实际渲染生成，不重新绘制场景。

开心问候的三张表情只从现有素材整理，不重新绘制。
得到“可以画”后才会调用 imagegen。
```

- [ ] **步骤 2：确认后使用 imagegen 技能生成图标**

图标共用提示词：

```text
Two isolated game shop icons on a pure white background, arranged in one horizontal row with wide empty space between them. Match a polished 3D casual mobile game style with candy-jelly materials, champagne-gold metal edges, ivory highlights, deep violet accents, and soft studio lighting. Left: a circular magnifying lens with a glowing blue-white star in the glass and a short golden handle. Right: a compact cyan-blue energy coil wrapped around a golden spindle with a small bright plug. Both objects must be complete, centered, uncropped, no text, no numbers, no shadows outside the objects, transparent-ready with clean separation.
```

生成后逐张检查主体完整性、透明边缘、深浅背景可读性、图标在 64–256px 的识别度。不合格的图重新生成，不进入运行目录。

- [ ] **步骤 3：确认后使用 imagegen 技能生成三套礼服**

三张立绘逐张生成，每张以对应现有主立绘为参考，共用提示词：

```text
Use the supplied character illustration as the identity, silhouette, face, pose, viewing angle, and scale reference. Redress the character in a coordinated starlight festival outfit: deep violet fabric, warm ivory trim, champagne-gold ribbons, small glowing star ornaments, and a soft cyan energy accent. Preserve the exact species features, face design, body proportions, limb count, pose, and transparent-background presentation. The full body and every accessory must be complete and uncropped. Match the existing polished 3D candy amusement-park illustration style. Pure white background, no shadow, no text, no labels, no extra characters or props.
```

羊、兔子、精灵分别生成。输出后必须使用对应原图检查身份一致性，并统一到现有角色可见高度与脚底基线。

- [ ] **步骤 4：处理现有表情头像**

在 `scripts/prepare_park_assets.py` 增加固定映射，生成：

```py
expression_sources = {
    "mood-xingya-happy": "expressions/xingya_happy.png",
    "mood-boling-happy": "expressions/boling_happy.png",
    "mood-yunrong-happy": "expressions/yunrong_happy.png",
}
```

使用现有透明裁边与 WebP 流程输出，不改变表情正文比例。

- [ ] **步骤 5：生成主题预览**

启动当前页面，设置 `?theme=calm`，截取 390×844 首页运行截图，裁出仍能辨认角色、标题和按钮区域的预览图，转换为 WebP。预览必须来自真实运行界面，不使用单独的占位插画。

- [ ] **步骤 6：登记资产清单**

每张新资源在 `public/assets/park/manifest.json` 记录：

- `name`、`file`、`source`
- 原始尺寸与处理尺寸
- alpha 边界与四角 alpha
- sha256、bytes
- 生成路线与处理说明
- 人物资源记录所参考的原立绘和脚底基线

- [ ] **步骤 7：素材门禁检查**

运行现有资产审计与浏览器加载检查：

```bash
python3 scripts/verify_visual_assets.py
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsc --noEmit
```

预期：所有图片可解码，透明主体完整，无未加载资源。

- [ ] **步骤 8：接入礼服并提交**

首页角色 `name` 根据装备状态选择：

```tsx
const outfit = progress.equippedCosmetics.outfit === "starlight";
<Art name={outfit ? "outfit-sheep-starlight" : "sheep"} className="park-friend-sheep" />
<Art name={outfit ? "outfit-rabbit-starlight" : "rabbit"} className="park-friend-rabbit" />
<Art name={outfit ? "outfit-spirit-starlight" : "spirit"} className="park-friend-spirit" />
```

```bash
git add public/assets/park scripts/prepare_park_assets.py src/components/CandyThemeShell.tsx
git commit -m "feat: 增加商店补给与伙伴装扮素材"
```

## 任务 9：玩家路径、视觉验收与交付

**文件：**
- 修改：`scripts/test_park_ui.ts:115-185`
- 创建：`docs/QA/shop-expansion-2026-11-20/README.md`

- [ ] **步骤 1：建立可达的玩家存档**

在 UI 测试中通过页面写入一套可由真实游玩达到的存档：拥有足够钻石、已修复 40 关、奖励记录完整。该存档只用于覆盖真实玩家后期状态，不绕过购买、装备和使用路径。

```ts
await page.evaluate(() => {
  const cleared = Array.from({ length: 40 }, (_, index) => index + 1);
  localStorage.setItem("honeycomb_cleared_levels", JSON.stringify(cleared));
  localStorage.setItem("honeycomb_reshape_compensation_v1", "1");
  localStorage.setItem("energy_park_progress_v2", JSON.stringify({
    coins: 12000,
    hints: 3,
    rewardedLevels: cleared,
    completedDate: "",
    claimedDate: "",
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
  }));
});
await page.reload();
```

- [ ] **步骤 2：编写完整购买与使用路径**

```ts
await page.getByRole("navigation").getByRole("button", { name: "商店" }).click();
await expect(page.getByRole("tab", { name: "补给" })).toHaveAttribute("aria-selected", "true");
for (const name of ["提示灯泡", "火花透镜", "时光回针", "应急线圈"]) {
  const card = page.locator(".park-shop-card").filter({ hasText: name });
  await card.getByRole("button").click();
}
await page.getByRole("tab", { name: "装扮" }).click();
for (const name of ["开心问候", "星愿礼服", "星空展台", "宁静夜灯"]) {
  const card = page.locator(".park-shop-card").filter({ hasText: name });
  await card.getByRole("button").click();
}
await page.screenshot({ path: path.join(SCREENS, "shop-all-owned-390x844.png") });
```

- [ ] **步骤 3：验证装备、刷新和首页表现**

```ts
await page.locator(".park-shop-card").filter({ hasText: "开心问候" }).getByRole("button", { name: "使用" }).click();
await page.locator(".park-shop-card").filter({ hasText: "星愿礼服" }).getByRole("button", { name: "使用" }).click();
await page.locator(".park-shop-card").filter({ hasText: "宁静夜灯" }).getByRole("button", { name: "使用" }).click();
await page.locator(".park-shop-card").filter({ hasText: "星空展台" }).getByRole("button", { name: "选择展品" }).click();
await page.locator(".park-exhibit-picker-grid button").first().click();
await close(page);
await expect(page.locator(".park-home-moods")).toBeVisible();
await expect(page.locator(".park-friend-sheep")).toHaveAttribute("src", /outfit-sheep-starlight/);
await expect(page.locator(".park-home-exhibit")).toBeVisible();
await expect(page.locator("html")).toHaveAttribute("data-theme", "calm");
await page.screenshot({ path: path.join(SCREENS, "home-cosmetics-390x844.png") });
await page.reload();
await expect(page.locator(".park-home-moods")).toBeVisible();
await expect(page.locator("html")).toHaveAttribute("data-theme", "calm");
```

- [ ] **步骤 4：验证补给局内效果**

```ts
await page.getByRole("button", { name: "开始修复" }).click();
await page.getByRole("button", { name: "提示" }).click();
await expect(page.locator(".park-hint-move")).toHaveCount(1);
await close(page);
await page.getByRole("navigation").getByRole("button", { name: "背包" }).click();
await page.locator(".park-item-card").filter({ hasText: "火花透镜" }).getByRole("button").click();
await expect(page.locator(".park-hint-move")).toHaveCount(3);
await close(page);
await page.getByRole("button", { name: /操作足迹/ }).click();
await page.getByRole("button", { name: /使用时光回针/ }).click();
await close(page);
for (let index = 0; index < DEFAULT_LEVELS[0].maxSteps; index += 1) {
  await page.locator('[data-tile-id="t-2-2"] .park-tile-rotate').click();
}
await expect(page.getByText("修复步数用完啦")).toBeVisible();
await page.getByRole("button", { name: /使用应急线圈/ }).click();
await expect(page.getByTestId("remaining-steps")).toHaveText("3");
```

- [ ] **步骤 5：运行新增和全量测试**

```bash
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsc --noEmit
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_shop_catalog.ts
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_park_progress.ts
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/test_hint_engine.ts
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm exec tsx scripts/audit-mainline.ts
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm test
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm run build
```

预期：全部通过；构建成功。

- [ ] **步骤 6：启动生产预览并执行玩家路径**

```bash
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm run preview -- --host 127.0.0.1 --port 4173
```

另一个终端运行：

```bash
PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" PARK_TEST_URL="http://127.0.0.1:4173" PARK_QA_DIR="docs/QA/shop-expansion-2026-11-20" pnpm run test:ui
```

预期：真实购买、装备、局内使用、刷新恢复全部通过。

- [ ] **步骤 7：执行商业级视觉验收**

使用 `game-art-visual-review` 技能检查默认主题和宁静夜灯下的：

- 360×800、390×844、430×932 商店与首页截图
- 4 张补给卡片、4 张装扮卡片
- 表情气泡、三伙伴礼服、展台和按钮命中区
- 商品文字完整性、滚动、选中态、禁用态和余额对比度
- 角色透明边缘、脚底基线、比例和相互遮挡

发现截断、溢出、重叠、低对比度或素材边缘问题时修复后重新截图。

- [ ] **步骤 8：编写交付报告并提交**

`README.md` 记录最终源码提交、测试命令、购买和使用路径、各视口截图、素材清单、已知限制。不得把思考过程或实现说明写进玩家界面。

```bash
git add scripts/test_park_ui.ts docs/QA/shop-expansion-2026-11-20 package.json
git commit -m "test: 完成商店扩充玩家路径与视觉验收"
```
