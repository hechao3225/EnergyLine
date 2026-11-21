import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  finishFirstGuide,
  openFreshHome,
  solveThroughInput,
} from "./park_test_player";

const base = process.env.PARK_TEST_URL;
if (!base) {
  throw new Error("请设置 PARK_TEST_URL，例如 http://127.0.0.1:4302");
}

const output = path.resolve("docs/QA/honor-titles-2026-11-21");
fs.mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const pageErrors: string[] = [];
page.on("pageerror", (error) => pageErrors.push(error.message));

try {
  await openFreshHome(page, base);
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("honeycomb_story_seen_v1", "1");
  });
  await page.reload();
  await page.locator(".park-home").waitFor();

  await page.getByRole("button", { name: "开始修复", exact: true }).click();
  await page.locator(".park-modal-onboarding").waitFor();
  await finishFirstGuide(page);
  await solveThroughInput(page, 1);

  await expect(page.getByText("获得荣誉称号", { exact: true })).toBeVisible();
  await expect(page.getByText("初亮星火", { exact: true })).toBeVisible();
  await expect(page.getByText("零误差校准师", { exact: true })).toBeVisible();
  await page.screenshot({ path: path.join(output, "victory-title-390x844.png") });

  await page.setViewportSize({ width: 360, height: 800 });
  await page.screenshot({ path: path.join(output, "victory-title-360x800.png") });
  const layout = await page.evaluate(() => {
    return Object.fromEntries(
      [
        ["honors", ".park-victory-honors"],
        ["title", ".park-reward-title"],
        ["panel", ".park-victory-panel"],
        ["actions", ".park-victory-actions"],
      ].map(([key, selector]) => {
        const rect = document.querySelector(selector)!.getBoundingClientRect();
        return [key, { top: rect.top, bottom: rect.bottom }];
      }),
    ) as Record<string, { top: number; bottom: number }>;
  });
  assert.ok(layout.honors.bottom <= layout.title.top + 1);
  assert.ok(layout.panel.bottom <= layout.actions.top + 1);

  const saved = await page.evaluate(() => ({
    achievements: JSON.parse(
      localStorage.getItem("honeycomb_achievements_v1") ?? "{}",
    ),
    progress: JSON.parse(
      localStorage.getItem("energy_park_progress_v2") ?? "{}",
    ),
  }));
  assert.ok(saved.achievements.first_spark);
  assert.equal(saved.progress.equippedTitleId, "precision_calibrator");
  assert.deepEqual(pageErrors, []);

  console.log("通关荣誉称号测试通过");
} finally {
  await browser.close();
}
