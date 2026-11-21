import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { openFreshHome } from "./park_test_player";

const base = process.env.PARK_TEST_URL;
if (!base) {
  throw new Error("请设置 PARK_TEST_URL，例如 http://127.0.0.1:4302");
}

const output = path.resolve("docs/QA/repair-atlas-2026-11-21");
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
    localStorage.setItem("honeycomb_onboarding_v1", "1");
    localStorage.setItem("honeycomb_cleared_levels", "[1,2,3]");
    localStorage.setItem("honeycomb_best_steps", '{"1":5,"2":7,"3":8}');
  });
  await page.reload();
  await page.locator(".park-home").waitFor();

  await expect(
    page.getByRole("button", { name: "乐园图鉴", exact: true }),
  ).toHaveCount(0);

  await page
    .getByRole("navigation")
    .getByRole("button", { name: "关卡", exact: true })
    .click();
  await expect(
    page.getByRole("main", { name: "关卡路线", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: path.join(output, "repair-atlas-map-390x844.png"),
  });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.screenshot({
    path: path.join(output, "repair-atlas-map-360x800.png"),
  });
  await page.setViewportSize({ width: 390, height: 844 });

  const firstNode = page.getByRole("button", { name: "第 1 关 已通关" });
  await expect(firstNode.locator(".chapter-node-exhibit")).toBeVisible();
  await firstNode.click();

  await expect(page.getByLabel("迎宾门设施详情")).toBeVisible();
  await expect(page.getByText("第一束星光", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "再次挑战", exact: true }),
  ).toBeVisible();
  const detailBounds = await page
    .getByLabel("迎宾门设施详情")
    .boundingBox();
  assert.ok(detailBounds);
  assert.ok(detailBounds.x >= 0);
  assert.ok(detailBounds.x + detailBounds.width <= 390);
  assert.ok(detailBounds.y >= 0);
  assert.ok(detailBounds.y + detailBounds.height <= 844);
  await page.screenshot({
    path: path.join(output, "repair-atlas-detail-390x844.png"),
  });

  await page
    .getByRole("button", { name: "收起设施详情", exact: true })
    .click();
  await page.getByRole("button", { name: "第 4 关 进行中" }).click();
  await expect(page.getByLabel("气球摊设施详情")).toBeVisible();
  await page.getByRole("button", { name: "开始修复", exact: true }).click();
  await expect(page.locator(".park-level-sign")).toHaveText("第 4 关");

  assert.deepEqual(pageErrors, []);
  console.log("关卡图鉴合并 UI 测试通过");
} finally {
  await browser.close();
}
