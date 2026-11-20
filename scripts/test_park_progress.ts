import assert from "node:assert/strict";
import {
  buyCosmetic,
  buyHint,
  buySupply,
  claimDailyTask,
  completeParkLevel,
  consumeHint,
  consumeSupply,
  equipCosmetic,
  getBestStars,
  HINT_PRICE,
  isCosmeticEquipped,
  localDate,
  PARK_STORAGE_KEY,
  readParkProgress,
  resumeLevel,
  readStoryProgress,
  PROGRESS_VERSION,
  PROGRESS_VERSION_KEY,
  setHomeExhibit,
} from "../src/utils/parkProgress";
import { COSMETIC_ITEMS, SUPPLY_ITEMS, getSupplyItem } from "../src/data/shopCatalog";
import type { CosmeticId } from "../src/types/shop";
import { getStarsForLights, getStarsForSteps } from "../src/utils/rating";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
const store = (entries: Record<string, string>) => ({
  getItem: (key: string) => entries[key] ?? null,
});
const memoryStore = (entries: Record<string, string>) => {
  const data = { ...entries };
  return {
    getItem: (key: string) => data[key] ?? null,
    setItem: (key: string, value: string) => {
      data[key] = value;
    },
  };
};
let passed = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`通过：${name}`);
  passed += 1;
}
const fresh = () => readParkProgress(store({}));
const ownedOnly = (id: CosmeticId) => ({
  ...fresh(),
  ownedCosmetics: [id],
});
test("新玩家从首关进入，余额真实为零，并获得三个初始提示", () => {
  const p = fresh();
  assert.equal(resumeLevel([]), 1);
  assert.equal(p.coins, 0);
  assert.equal(p.hints, 3);
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
  assert.equal(resumeLevel([1, 2, 3]), 4);
});
test("旧货币、道具与已发奖励记录延续", () => {
  const p = readParkProgress(
    store({
      energy_coins: "730",
      energy_gems: "40",
      energy_hints: "2",
      energy_reward_1: "1",
    }),
  );
  // 旧存档的 40 钻按 10 钻 = 100 币折算进金币
  assert.equal(p.coins, 1130);
  assert.equal(p.hints, 2);
  assert.deepEqual(p.rewardedLevels, [1]);
  assert.equal(completeParkLevel(p, 1, "2026-11-10").coins, 1130);
});
test("首次通关奖励只发一次，重玩不能重复领取", () => {
  const p = completeParkLevel(fresh(), 1, "2026-11-10");
  assert.equal(p.coins, 100);
  const again = completeParkLevel(p, 1, "2026-11-10");
  assert.equal(again.coins, 100);
});
test("未完成每日任务时无法领取；完成后当天只领取一次", () => {
  const start = fresh();
  assert.equal(claimDailyTask(start, "2026-11-10"), start);
  const p = completeParkLevel(start, 1, "2026-11-10");
  const claimed = claimDailyTask(p, "2026-11-10");
  assert.equal(claimed.coins, 200);
  assert.equal(claimDailyTask(claimed, "2026-11-10"), claimed);
  assert.equal(claimDailyTask(claimed, "2026-11-11"), claimed);
  assert.equal(
    claimDailyTask(completeParkLevel(claimed, 1, "2026-11-11"), "2026-11-11")
      .coins,
    300,
  );
});
test("兑换同时扣金币并增加库存；使用扣一个；余额不足不会变动", () => {
  const start = fresh();
  assert.equal(HINT_PRICE, getSupplyItem("hint")?.price);
  assert.equal(buyHint(start), start);
  const broke = completeParkLevel(start, 1, "2026-11-10");
  assert.equal(buyHint(broke), broke, "首通 100 金币不够买 120 的灯泡");
  const rich = { ...start, coins: 500 };
  const bought = buyHint(rich);
  assert.equal(bought.coins, 500 - HINT_PRICE);
  assert.equal(bought.hints, 4);
  assert.equal(consumeHint(bought).hints, 3);
  const empty = { ...start, hints: 0 };
  assert.equal(consumeHint(empty), empty);
});
test("四件补给按目录价格购买，库存加减与余额不足规则一致", () => {
  for (const item of SUPPLY_ITEMS) {
    const start = { ...fresh(), coins: item.price };
    start[item.stockKey] = 2;

    const bought = buySupply(start, item.id);
    assert.equal(bought.coins, 0, `${item.name}应扣除目录价格`);
    assert.equal(bought[item.stockKey], 3, `${item.name}库存应增加一件`);

    const consumed = consumeSupply(bought, item.id);
    assert.equal(consumed.coins, bought.coins);
    assert.equal(consumed[item.stockKey], 2, `${item.name}库存应减少一件`);

    const short = { ...start, coins: item.price - 1 };
    assert.equal(buySupply(short, item.id), short);

    const empty = { ...start };
    empty[item.stockKey] = 0;
    assert.equal(consumeSupply(empty, item.id), empty);
  }
});
test("四件装扮达到开放关数后按目录价格购买一次", () => {
  for (const item of COSMETIC_ITEMS) {
    const locked = { ...fresh(), coins: item.price };
    assert.equal(buyCosmetic(locked, item.id, item.unlockAt - 1), locked);

    const short = { ...fresh(), coins: item.price - 1 };
    assert.equal(buyCosmetic(short, item.id, item.unlockAt), short);

    const start = { ...fresh(), coins: item.price };
    const bought = buyCosmetic(start, item.id, item.unlockAt);
    assert.equal(bought.coins, 0, `${item.name}应扣除目录价格`);
    assert.deepEqual(bought.ownedCosmetics, [item.id]);

    const repeated = buyCosmetic(bought, item.id, 99);
    assert.equal(repeated, bought);
  }
});
test("开心问候可以装备和卸下", () => {
  const owned = ownedOnly("joy-greeting");
  const equipped = equipCosmetic(owned, "joy-greeting", true);
  assert.equal(equipped.equippedCosmetics.mood, "joy");
  assert.equal(isCosmeticEquipped(equipped, "joy-greeting"), true);

  const removed = equipCosmetic(equipped, "joy-greeting", false);
  assert.equal(removed.equippedCosmetics.mood, "default");
  assert.equal(isCosmeticEquipped(removed, "joy-greeting"), false);
});
test("星愿礼服可以装备和卸下", () => {
  const owned = ownedOnly("starlight-outfit");
  const equipped = equipCosmetic(owned, "starlight-outfit", true);
  assert.equal(equipped.equippedCosmetics.outfit, "starlight");
  assert.equal(isCosmeticEquipped(equipped, "starlight-outfit"), true);

  const removed = equipCosmetic(equipped, "starlight-outfit", false);
  assert.equal(removed.equippedCosmetics.outfit, "default");
  assert.equal(isCosmeticEquipped(removed, "starlight-outfit"), false);
});
test("宁静夜灯可以装备和卸下", () => {
  const owned = ownedOnly("calm-theme");
  const equipped = equipCosmetic(owned, "calm-theme", true);
  assert.equal(equipped.equippedCosmetics.theme, "calm");
  assert.equal(isCosmeticEquipped(equipped, "calm-theme"), true);

  const removed = equipCosmetic(equipped, "calm-theme", false);
  assert.equal(removed.equippedCosmetics.theme, "default");
  assert.equal(isCosmeticEquipped(removed, "calm-theme"), false);
});
test("星空展台可以选择并收起合法展品", () => {
  const owned = ownedOnly("exhibit-display");
  const displayed = setHomeExhibit(owned, 42);
  assert.equal(displayed.equippedCosmetics.exhibitId, 42);
  assert.equal(isCosmeticEquipped(displayed, "exhibit-display"), true);

  const hidden = setHomeExhibit(displayed, null);
  assert.equal(hidden.equippedCosmetics.exhibitId, null);
  assert.equal(isCosmeticEquipped(hidden, "exhibit-display"), false);
});
test("未拥有的装扮不能装备", () => {
  const start = fresh();
  assert.equal(equipCosmetic(start, "joy-greeting", true), start);
  assert.equal(equipCosmetic(start, "starlight-outfit", true), start);
  assert.equal(equipCosmetic(start, "calm-theme", true), start);
  assert.equal(setHomeExhibit(start, 12), start);
});
test("非法展品编号不会改变装备状态", () => {
  const start = ownedOnly("exhibit-display");
  assert.equal(setHomeExhibit(start, 0), start);
  assert.equal(setHomeExhibit(start, 100), start);
  assert.equal(setHomeExhibit(start, 1.5), start);
  assert.equal(setHomeExhibit(start, Number.NaN), start);
});
test("旧存档缺少商店扩展字段时补齐默认值并保留提示库存", () => {
  const p = readParkProgress(
    store({
      [PARK_STORAGE_KEY]: JSON.stringify({
        coins: 500,
        hints: 4,
        rewardedLevels: [1],
        completedDate: "2026-11-10",
        claimedDate: "2026-11-10",
      }),
    }),
  );
  assert.equal(p.hints, 4);
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
test("未知装扮会被过滤，只保留已拥有装扮的装备状态", () => {
  const p = readParkProgress(
    store({
      [PARK_STORAGE_KEY]: JSON.stringify({
        coins: 500,
        hints: 3,
        rewardedLevels: [],
        completedDate: "",
        claimedDate: "",
        ownedCosmetics: ["unknown-cosmetic", "joy-greeting", "joy-greeting"],
        equippedCosmetics: {
          mood: "joy",
          outfit: "starlight",
          exhibitId: 7,
          theme: "calm",
        },
      }),
    }),
  );
  assert.deepEqual(p.ownedCosmetics, ["joy-greeting"]);
  assert.deepEqual(p.equippedCosmetics, {
    mood: "joy",
    outfit: "default",
    exhibitId: null,
    theme: "default",
  });
});
test("非法装扮装备值回落默认状态", () => {
  const p = readParkProgress(
    store({
      [PARK_STORAGE_KEY]: JSON.stringify({
        coins: 500,
        hints: 3,
        rewardedLevels: [],
        completedDate: "",
        claimedDate: "",
        ownedCosmetics: COSMETIC_ITEMS.map((item) => item.id),
        equippedCosmetics: {
          mood: "calm",
          outfit: "joy",
          exhibitId: 1.5,
          theme: "starlight",
        },
      }),
    }),
  );
  assert.deepEqual(p.equippedCosmetics, {
    mood: "default",
    outfit: "default",
    exhibitId: null,
    theme: "default",
  });
});
test("存档重启读取后补给库存、装扮与装备状态保持", () => {
  let p = { ...fresh(), coins: 5000 };
  p = buySupply(p, "lens");
  p = buyCosmetic(p, "joy-greeting", 5);
  p = equipCosmetic(p, "joy-greeting", true);
  p = buyCosmetic(p, "exhibit-display", 10);
  p = setHomeExhibit(p, 12);

  const data = memoryStore({});
  data.setItem(PARK_STORAGE_KEY, JSON.stringify(p));
  assert.deepEqual(readParkProgress(data), p);
});
test("存档重启读取后余额、库存与领取记录保持", () => {
  const p = buyHint(
    claimDailyTask(completeParkLevel(fresh(), 1, "2026-11-10"), "2026-11-10"),
  );
  assert.deepEqual(
    readParkProgress(store({ [PARK_STORAGE_KEY]: JSON.stringify(p) })),
    p,
  );
});
test("四星最少步数与三星、二星、一星边界遵循主干评分规则", () => {
  const level = { maxSteps: 20, parSteps: 5 };
  assert.equal(getStarsForSteps(5, level), 4);
  assert.equal(getStarsForSteps(6, level), 3);
  assert.equal(getStarsForSteps(10, level), 3);
  assert.equal(getStarsForSteps(11, level), 2);
  assert.equal(getStarsForSteps(15, level), 2);
  assert.equal(getStarsForSteps(16, level), 1);
});

test("达标关通过即四星，未达标不给星", () => {
  // 达标关的预算就是最优解，通过即满星；没达到目标就是没通过
  assert.equal(getStarsForLights(2, 3, 1), 0);
  assert.equal(getStarsForLights(2, 3, 2), 4);
  assert.equal(getStarsForLights(2, 3, 3), 4);
  assert.equal(getStarsForLights(4, 5, 4), 4);
  assert.equal(getStarsForLights(4, 5, 5), 4);
  assert.equal(getBestStars(DEFAULT_LEVELS[0], [], {}), 0);
});
test("每日任务使用本地自然日而非UTC日期", () => {
  assert.equal(localDate(new Date(2026, 10, 10, 0, 1)), "2026-11-10");
  assert.equal(localDate(new Date(2026, 10, 10, 23, 59)), "2026-11-10");
});
test("新版盘面成绩迁移保留已完成记录并结算重塑补偿", () => {
  const data = store({ honeycomb_cleared_levels: "[1,24]", honeycomb_best_steps: '{"1":7,"24":11}',
    [PROGRESS_VERSION_KEY]: "3", energy_coins: "730" });
  assert.deepEqual(readStoryProgress(data, DEFAULT_LEVELS), { cleared: [1,24], best: {} });
  assert.equal(readParkProgress(data).coins, 830);
  const current = readStoryProgress(store({ honeycomb_cleared_levels: "[1,24]", honeycomb_best_steps: '{"1":7,"24":1}',
    [PROGRESS_VERSION_KEY]: PROGRESS_VERSION }), DEFAULT_LEVELS);
  assert.deepEqual(current, { cleared: [1,24], best: { 1: 7 } });
});
test("旧版通关记录只发放一次重塑补偿", () => {
  const data = memoryStore({
    honeycomb_cleared_levels: "[1,2,3]",
  });
  assert.equal(readParkProgress(data).coins, 150);
  assert.equal(readParkProgress(data).coins, 150);
});
test("重塑补偿上限为 4950 钻石", () => {
  const data = memoryStore({
    honeycomb_cleared_levels: JSON.stringify(
      Array.from({ length: 99 }, (_, index) => index + 1),
    ),
  });
  assert.equal(readParkProgress(data).coins, 4950);
});
console.log(`${passed} 项需求验证通过`);
