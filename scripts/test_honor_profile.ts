import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { openFreshHome } from "./park_test_player";

const base = process.env.PARK_TEST_URL;
if (!base) {
  throw new Error("请设置 PARK_TEST_URL，例如 http://127.0.0.1:4300");
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const output = path.resolve("docs/QA/honor-titles-2026-11-21");
fs.mkdirSync(output, { recursive: true });
const pageErrors: string[] = [];
page.on("pageerror", (error) => pageErrors.push(error.message));

try {
  await openFreshHome(page, base);
  await page.evaluate(() => {
    localStorage.setItem("honeycomb_story_seen_v1", "1");
    localStorage.setItem("honeycomb_onboarding_v1", "1");
    localStorage.setItem("honeycomb_honor_titles_seen_v1", "[]");
    localStorage.setItem(
      "honeycomb_achievements_v1",
      JSON.stringify({
        first_spark: 1700000000000,
        master_engineer: 1700000001000,
      }),
    );
    localStorage.setItem(
      "honeycomb_player_stats_v1",
      JSON.stringify({
        totalClearedLevels: 10,
        clearedLevelIds: Array.from({ length: 10 }, (_, index) => index + 1),
        threeStarLevelIds: [],
        consecutivePerfect: 0,
        consecutivePerfectLevelIds: [],
        maxConsecutivePerfect: 0,
        totalUndos: 0,
        maxEndlessStreak: 0,
        tenStepClearCount: 0,
      }),
    );
    localStorage.setItem(
      "energy_park_progress_v2",
      JSON.stringify({
        coins: 500,
        hints: 3,
        lenses: 0,
        rewindTokens: 0,
        stepTokens: 0,
        equippedTitleId: "first_light",
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
      }),
    );
  });
  await page.reload();
  await page.locator(".park-home").waitFor();

  await expect(page.locator(".park-side-actions").getByText("荣誉墙")).toHaveCount(0);
  await expect(page.locator(".park-avatar .park-honor-badge")).toBeVisible();

  await page
    .getByRole("button", { name: "修复师档案", exact: true })
    .click();

  await expect(page.getByRole("heading", { name: "修复师档案" })).toBeVisible();
  await page.screenshot({ path: path.join(output, "titles-390x844.png") });
  await expect(page.getByText("初亮星火", { exact: true }).first()).toBeVisible();
  await expect(
    page.getByRole("button", { name: /巡园修复师/ }),
  ).toBeVisible();

  await page.getByRole("button", { name: /巡园修复师/ }).click();
  await expect(page.getByText("巡园修复师", { exact: true }).first()).toBeVisible();

  const equipped = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("energy_park_progress_v2")!).equippedTitleId,
  );
  assert.equal(equipped, "park_trainee");

  await page.setViewportSize({ width: 360, height: 800 });
  await page.screenshot({ path: path.join(output, "titles-360x800.png") });
  const titleOverflow = await page.locator(".park-title-card").evaluateAll((cards) =>
    cards.some(
      (card) =>
        card.scrollWidth > card.clientWidth + 1 ||
        card.scrollHeight > card.clientHeight + 1,
    ),
  );
  assert.equal(titleOverflow, false, "称号卡存在文字或内容溢出");

  await page.getByRole("tab", { name: "成就", exact: true }).click();
  await expect(page.getByText("称号 · 乐园复兴师", { exact: true })).toBeVisible();
  await expect(page.getByText("星光花园 0/20 关", { exact: true })).toBeVisible();
  await page.screenshot({ path: path.join(output, "achievements-360x800.png") });

  await page.getByRole("button", { name: "关闭", exact: true }).click();
  await expect(page.locator(".park-avatar .park-honor-badge")).toHaveCount(0);

  assert.deepEqual(pageErrors, []);
  console.log("称号档案 UI 测试通过");
} finally {
  await browser.close();
}
