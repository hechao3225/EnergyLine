import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
import { openFreshHome, finishFirstGuide, solveThroughInput } from "./park_test_player";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";

const ROOT = process.env.PARK_QA_DIR || "docs/QA/master-merge-2026-11-11";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const page = await context.newPage();
const budget = DEFAULT_LEVELS[0].maxSteps;
try {
  await openFreshHome(page, process.env.PARK_TEST_URL || "http://127.0.0.1:4180");
  await page.getByRole("button", { name: "开始挑战", exact: true }).click();
  await finishFirstGuide(page, async step => {
    await page.screenshot({ path: `${ROOT}/screens/final-onboarding-${step}.png` });
  });
  await page.screenshot({ path: `${ROOT}/screens/final-play.png` });
  await expect(page.locator(".park-play-status .park-stars img")).toHaveCount(4);
  const tile = page.locator('[data-tile-id="t-2-2"] .park-tile-rotate');
  for (let left = 2; left >= 0; left--) {
    await tile.tap();
    await expect(page.getByTestId("remaining-steps")).toHaveText(String(budget - 1));
    await page.getByRole("button", { name: "撤销", exact: true }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText(String(budget));
    await expect(page.getByRole("button", { name: /操作足迹/ })).toContainText(`回溯 ${left}/3`);
  }
  await tile.tap();
  await expect(page.getByTestId("remaining-steps")).toHaveText(String(budget - 1));
  await expect(page.getByRole("button", { name: "撤销", exact: true })).toBeDisabled();
  await page.keyboard.press("Control+z");
  await expect(page.getByTestId("remaining-steps")).toHaveText(String(budget - 1));
  await page.getByRole("button", { name: "重置", exact: true }).click();
  await expect(page.getByRole("button", { name: /操作足迹/ })).toContainText("回溯 3/3");
  await tile.dblclick();
  await expect(page.getByTestId("remaining-steps")).toHaveText(String(budget - 2));
  await page.getByRole("button", { name: "重置", exact: true }).click();
  await solveThroughInput(page, 1);
  await expect(page.locator(".park-result-score .park-stars")).toHaveAttribute("aria-label", "4星");
  await expect(page.locator(".park-rewards > div").first()).toContainText("+4");
  await page.screenshot({ path: `${ROOT}/screens/final-victory.png` });
  await page.locator(".park-victory-actions").getByRole("button", { name: "返回乐园", exact: true }).click();
  await expect(page.getByRole("button", { name: "星星 4", exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "星星 4", exact: true })).toBeVisible();
  await expect(page.locator(".park-modal-story")).toHaveCount(0);
  await page.screenshot({ path: `${ROOT}/screens/merged-touch-progress.png` });
  fs.writeFileSync(`${ROOT}/merge-rules-results.json`, JSON.stringify({ status: "通过", singleTouchSteps: 1, doubleClickSteps: 2,
    freeBacktracks: 3, limitEnforced: true, resetRestores: true, fourStarClear: true, starPersistence: true, onboardingPersistence: true }, null, 2));
  console.log("通过：单次触控仅计一步、连续双击计两步、三次回溯限制、重试恢复、四星结算与重载保存。");
} finally { await context.close(); await browser.close(); }
