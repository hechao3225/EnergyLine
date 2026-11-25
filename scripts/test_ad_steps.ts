import assert from "node:assert/strict";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { findHint, supportsHintEngine } from "../src/utils/hint-engine";
import {
  AD_STEP_REWARD,
  AD_STEP_REWARD_MAX,
  DAILY_AD_STEP_CAP,
  REVIVES_PER_RUN,
  decideAdStepOffer,
} from "../src/utils/adReward";
import {
  adStepsUsedToday,
  consumeAdStep,
  sanitizeProgress,
} from "../src/utils/parkProgress";

/**
 * 续命广告的纯逻辑回归：额度按天累计、奖励按盘面缺口给、脏存档不炸。
 * 广告桥本身（原生/网页/mock）由 scripts/test_ad_steps_ui.ts 走真界面验证。
 */

let failures = 0;
function test(name: string, action: () => void): void {
  try {
    action();
    console.log(`通过：${name}`);
  } catch (error) {
    failures += 1;
    console.error(`失败：${name}`);
    console.error(error instanceof Error ? error.message : error);
  }
}

test("老存档缺 adSteps 字段时补默认值", () => {
  const progress = sanitizeProgress({ coins: 100 });
  assert.equal(progress.adStepsDate, "");
  assert.equal(progress.adStepsUsed, 0);
  assert.equal(adStepsUsedToday(progress, "2026-11-22"), 0);
});

test("脏数据不会让广告额度变成负数或 NaN", () => {
  const progress = sanitizeProgress({ adStepsDate: 42, adStepsUsed: -7 });
  assert.equal(progress.adStepsDate, "");
  assert.equal(progress.adStepsUsed, 0);
  const nan = sanitizeProgress({ adStepsDate: "2026-11-22", adStepsUsed: "abc" });
  assert.equal(nan.adStepsUsed, 0);
});

test("续命广告额度按天累计，跨天自动归零", () => {
  let progress = sanitizeProgress({});
  progress = consumeAdStep(progress, "2026-11-22");
  progress = consumeAdStep(progress, "2026-11-22");
  assert.equal(adStepsUsedToday(progress, "2026-11-22"), 2);
  assert.equal(adStepsUsedToday(progress, "2026-11-23"), 0);
  progress = consumeAdStep(progress, "2026-11-23");
  assert.equal(adStepsUsedToday(progress, "2026-11-23"), 1);
  assert.equal(adStepsUsedToday(progress, "2026-11-22"), 0);
});

test("每日上限刚好数到 0，单局续命 2 次", () => {
  let progress = sanitizeProgress({});
  for (let index = 0; index < DAILY_AD_STEP_CAP; index += 1) {
    progress = consumeAdStep(progress, "2026-11-22");
  }
  assert.equal(DAILY_AD_STEP_CAP - adStepsUsedToday(progress, "2026-11-22"), 0);
  assert.equal(REVIVES_PER_RUN, 2);
});

test("奖励按盘面缺口分档：3 步以内给 3，4 步以上给 5", () => {
  const samples: string[] = [];
  for (const level of DEFAULT_LEVELS.slice(0, 12)) {
    if (!supportsHintEngine(level)) continue;
    const hint = findHint(level, level.tiles, Number.MAX_SAFE_INTEGER);
    if (!hint) continue;
    const offer = decideAdStepOffer(level, level.tiles);
    assert.equal(offer.stepsNeeded, hint.stepsNeeded, `第 ${level.id} 关缺口不一致`);
    const expected =
      hint.stepsNeeded <= AD_STEP_REWARD ? AD_STEP_REWARD : AD_STEP_REWARD_MAX;
    assert.equal(offer.reward, expected, `第 ${level.id} 关奖励不对`);
    samples.push(`第${level.id}关 ${hint.stepsNeeded}步→${offer.reward}`);
  }
  assert.ok(samples.length >= 3, `可用样本太少：${samples.join("，")}`);
  console.log(`  样本：${samples.join("，")}`);
});

test("补步数只会是 0、3、5，不会给出半截补偿", () => {
  for (const level of DEFAULT_LEVELS.slice(0, 20)) {
    const { reward } = decideAdStepOffer(level, level.tiles);
    assert.ok(
      reward === 0 || reward === AD_STEP_REWARD || reward === AD_STEP_REWARD_MAX,
      `第 ${level.id} 关给出了非法步数 ${reward}`,
    );
  }
});

test("提示引擎覆盖不了的大联动盘面按 3 步兜底", () => {
  const level = DEFAULT_LEVELS.find((item) => !supportsHintEngine(item));
  if (!level) {
    console.log("  当前主线没有超大联动盘面，跳过");
    return;
  }
  assert.equal(decideAdStepOffer(level, level.tiles).reward, AD_STEP_REWARD);
});

assert.equal(failures, 0, `${failures} 项续命广告逻辑失败`);
console.log("续命广告逻辑回归通过");
