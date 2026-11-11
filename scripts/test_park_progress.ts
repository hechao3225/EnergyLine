import assert from "node:assert/strict";
import {
  buyHint,
  claimDailyTask,
  completeParkLevel,
  consumeHint,
  getBestStars,
  localDate,
  PARK_STORAGE_KEY,
  readParkProgress,
  resumeLevel,
  readStoryProgress,
  PROGRESS_VERSION,
  PROGRESS_VERSION_KEY,
} from "../src/utils/parkProgress";
import { getStarsForSteps } from "../src/utils/rating";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
const store = (entries: Record<string, string>) => ({
  getItem: (key: string) => entries[key] ?? null,
});
let passed = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`通过：${name}`);
  passed += 1;
}
const fresh = () => readParkProgress(store({}));
test("新玩家从首关进入，余额真实为零，并获得三个初始提示", () => {
  const p = fresh();
  assert.equal(resumeLevel([]), 1);
  assert.equal(p.coins, 0);
  assert.equal(p.gems, 0);
  assert.equal(p.hints, 3);
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
  assert.equal(p.coins, 730);
  assert.equal(p.gems, 40);
  assert.equal(p.hints, 2);
  assert.deepEqual(p.rewardedLevels, [1]);
  assert.equal(completeParkLevel(p, 1, "2026-11-10").coins, 730);
});
test("首次通关奖励只发一次，重玩不能重复领取", () => {
  const p = completeParkLevel(fresh(), 1, "2026-11-10");
  assert.equal(p.coins, 100);
  assert.equal(p.gems, 10);
  const again = completeParkLevel(p, 1, "2026-11-10");
  assert.equal(again.coins, 100);
  assert.equal(again.gems, 10);
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
  assert.equal(buyHint(start), start);
  const earned = completeParkLevel(start, 1, "2026-11-10");
  const bought = buyHint(earned);
  assert.equal(bought.coins, 50);
  assert.equal(bought.hints, 4);
  assert.equal(consumeHint(bought).hints, 3);
  const empty = { ...start, hints: 0 };
  assert.equal(consumeHint(empty), empty);
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
  assert.equal(getBestStars(DEFAULT_LEVELS[0], [], {}), 0);
});
test("每日任务使用本地自然日而非UTC日期", () => {
  assert.equal(localDate(new Date(2026, 10, 10, 0, 1)), "2026-11-10");
  assert.equal(localDate(new Date(2026, 10, 10, 23, 59)), "2026-11-10");
});
test("新版盘面成绩迁移保留已完成的自由演练关卡与独立货币记录", () => {
  const data = store({ honeycomb_cleared_levels: "[1,24]", honeycomb_best_steps: '{"1":7,"24":11}',
    [PROGRESS_VERSION_KEY]: "3", energy_coins: "730" });
  assert.deepEqual(readStoryProgress(data, DEFAULT_LEVELS), { cleared: [1,24], best: {} });
  assert.equal(readParkProgress(data).coins, 730);
  const current = readStoryProgress(store({ honeycomb_cleared_levels: "[1,24]", honeycomb_best_steps: '{"1":7,"24":1}',
    [PROGRESS_VERSION_KEY]: PROGRESS_VERSION }), DEFAULT_LEVELS);
  assert.deepEqual(current, { cleared: [1,24], best: { 1: 7 } });
});
console.log(`${passed} 项需求验证通过`);
