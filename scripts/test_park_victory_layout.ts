import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {openFreshHome,finishFirstGuide} from "./park_test_player";

const base = process.env.PARK_TEST_URL || "http://127.0.0.1:4173";
const root = process.env.PARK_QA_DIR || "docs/QA/ui2-2026-11-10";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results: unknown[] = [];
try {
  for (const [width, height, scale, label] of [
    [390, 844, 1, "390x844"],
    [361, 727, 1, "361x727"],
    [360, 640, 3, "360x640"],
    [360, 640, 2, "720x1280"],
    [360, 800, 3, "360x800"],
    [449, 877, 897 / 449, "897x1752"],
    [449, 878, 897 / 449, "897x1754"],
  ] as const) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: scale });
    const page = await context.newPage();
    await openFreshHome(page,base);
    await page.getByRole("button", { name: "开始挑战", exact: true }).click();
    await finishFirstGuide(page);
    for (const [id, count] of [["t-2-2", 1], ["t-2-3", 3], ["t-3-3", 1], ["t-4-3", 2]] as const)
      for (let i = 0; i < count; i++) await page.locator(`[data-tile-id="${id}"] .park-tile-rotate`).click();
    await page.locator(".park-victory").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${root}/screens/victory-${label}.png` });
    const rects = await page.evaluate(() => {
      return Object.fromEntries([
        ["sign", ".park-red-sign"], ["list", ".park-repair-detail ul"],
        ["title", ".park-reward-title"], ["rewards", ".park-rewards"],
        ["score", ".park-result-score"], ["panel", ".park-victory-panel"],
        ["actions", ".park-victory-actions"],
      ].map(([key, selector]) => {
        const r = document.querySelector(selector)!.getBoundingClientRect();
        return [key, { top: r.top, bottom: r.bottom, left: r.left, right: r.right }];
      }));
    });
    assert.ok(rects.sign.bottom <= rects.list.top + 1, `${label} 修复牌遮挡清单 ${JSON.stringify(rects)}`);
    assert.ok(rects.list.bottom <= rects.title.top + 1, `${label} 奖励牌遮挡清单`);
    assert.ok(rects.rewards.bottom <= rects.score.top + 1, `${label} 奖励遮挡成绩`);
    assert.ok(rects.panel.bottom <= rects.actions.top + 1, `${label} 面板遮挡操作按钮`);
    await expect(page.getByRole("button", { name: "下一关", exact: true })).toBeVisible();
    await page.screenshot({ path: `${root}/screens/victory-${label}.png` });
    results.push({ viewport: label, status: "通过", rects });
    await page.getByRole("button", { name: "下一关", exact: true }).click();
    await expect(page.locator(".park-level-sign")).toHaveText("第 2 关");
    await context.close();
  }
  fs.writeFileSync(`${root}/victory-layout-results.json`, JSON.stringify({ base, date: new Date().toISOString(), results }, null, 2));
  console.log("通过：7 种结算尺寸的修复清单、奖励、成绩与按钮均无交叠，并可继续下一关。");
} finally {
  await browser.close();
}
