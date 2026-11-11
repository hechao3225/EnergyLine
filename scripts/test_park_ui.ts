import { chromium, expect, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { openFreshHome, finishFirstGuide, solveThroughInput } from "./park_test_player";
const FIRST_BUDGET = DEFAULT_LEVELS[0].maxSteps;
const ROOT = path.resolve(process.env.PARK_QA_DIR || "docs/QA/ui2-2026-11-10");
const SCREENS = path.join(ROOT, "screens");
fs.mkdirSync(SCREENS, { recursive: true });
const results: { name: string; status: string; details?: unknown }[] = [];
const errors: string[] = [];
const base = process.env.PARK_TEST_URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
async function capture(page: Page, name: string) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete),
  );
  await page.waitForTimeout(300);
  const broken = await page
    .locator("img")
    .evaluateAll((images) =>
      (images as HTMLImageElement[])
        .filter((image) => !image.naturalWidth)
        .map((image) => image.src),
    );
  assert.deepEqual(broken, [], `${name} 存在未加载图片`);
  await page.screenshot({ path: path.join(SCREENS, `${name}.png`) });
}
async function rotate(page: Page, id: string, count = 1) {
  for (let i = 0; i < count; i++)
    await page.locator(`[data-tile-id="${id}"] .park-tile-rotate`).click();
}
async function solveFirst(page: Page) {
  await rotate(page, "t-2-2");
  await rotate(page, "t-2-3", 3);
  await rotate(page, "t-3-3");
  await rotate(page, "t-4-3", 2);
  await expect(page.locator('[data-testid="target-count"]')).toHaveText("1/1");
  await page.locator(".park-victory").waitFor();
}
async function close(page: Page) {
  await page.getByRole("button", { name: "关闭", exact: true }).click();
}
async function selectLevel(page: Page, id: number) {
  if (await page.locator(".park-play").count())
    await page.getByRole("button", { name: "返回乐园", exact: true }).click();
  else if (await page.locator(".park-victory").count())
    await page
      .locator(".park-victory-actions")
      .getByRole("button", { name: "返回乐园", exact: true })
      .click();
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "关卡", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: `${Math.floor((id - 1) / 20) + 1}章`,
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: `进入第${id}关`, exact: true })
    .click();
  await expect(page.locator(".park-level-sign")).toHaveText(`第 ${id} 关`);
}
async function test(name: string, action: () => Promise<void>) {
  await action();
  results.push({ name, status: "通过" });
  console.log("通过：" + name);
}
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  recordVideo: {
    dir: path.join(ROOT, "video"),
    size: { width: 390, height: 844 },
  },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
page.on("pageerror", (error) => errors.push(error.message));
try {
  await test("新玩家首页到玩法、旋转通能、撤销、足迹与重置", async () => {
    await openFreshHome(page, base);
    await expect(
      page.getByRole("button", { name: "金币 0", exact: true }),
    ).toBeVisible();
    await capture(page, "home-390x844");
    await page.getByRole("button", { name: "开始挑战", exact: true }).click();
    await finishFirstGuide(page, async step => capture(page, `onboarding-${step}-390x844`));
    await expect(page.locator(".park-level-sign")).toHaveText("第 1 关");
    await expect(page.getByTestId("remaining-steps")).toHaveText(String(FIRST_BUDGET));
    await capture(page, "play-390x844");
    await rotate(page, "t-2-2");
    await expect(page.getByTestId("remaining-steps")).toHaveText(String(FIRST_BUDGET - 1));
    await expect(page.locator('[data-tile-id="t-2-2"]')).toHaveAttribute(
      "data-powered",
      "true",
    );
    await page.getByRole("button", { name: "撤销", exact: true }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText(String(FIRST_BUDGET));
    await expect(page.locator('[data-tile-id="t-2-2"]')).toHaveAttribute(
      "data-rotation",
      "90",
    );
    await rotate(page, "t-2-2");
    await page.getByRole("button", { name: /操作足迹/ }).click();
    await capture(page, "history-390x844");
    await page.getByRole("button", { name: /起点/ }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText(String(FIRST_BUDGET));
    await page.getByRole("button", { name: "重置", exact: true }).click();
    await rotate(page, "t-2-2");
    await rotate(page, "t-2-3", 3);
    await rotate(page, "t-3-3");
    await capture(page, "flow-390x844");
    await rotate(page, "t-4-3", 2);
    await expect(page.getByTestId("target-count")).toHaveText("1/1");
    await page.locator(".park-victory").waitFor();
    await capture(page, "victory-390x844");
    const progress = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("energy_park_progress_v2")!),
    );
    assert.equal(progress.coins, 100);
    assert.equal(progress.gems, 10);
    assert.deepEqual(progress.rewardedLevels, [1]);
  });
  await test("每日任务资格、领取、兑换、库存和重启保存", async () => {
    await page
      .locator(".park-victory-actions")
      .getByRole("button", { name: "返回乐园", exact: true })
      .click();
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "任务", exact: true })
      .click();
    await capture(page, "tasks-ready-390x844");
    await page.getByRole("button", { name: "领取奖励", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "今日已领取", exact: true }),
    ).toBeDisabled();
    await close(page);
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "商店", exact: true })
      .click();
    await page.getByRole("button", { name: "兑换灯泡", exact: true }).click();
    await capture(page, "shop-purchased-390x844");
    await close(page);
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "背包", exact: true })
      .click();
    await expect(page.getByText("已拥有 4 个", { exact: true })).toBeVisible();
    await capture(page, "bag-390x844");
    await close(page);
    await page.reload();
    await expect(
      page.getByRole("button", { name: "金币 150", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "钻石 10", exact: true }),
    ).toBeVisible();
    await capture(page, "home-progress-390x844");
  });
  await test("重复通关奖励不重发，下一关可玩，提示实际消耗库存", async () => {
    await selectLevel(page, 1);
    await solveFirst(page);
    const progress = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("energy_park_progress_v2")!),
    );
    assert.equal(progress.coins, 150);
    assert.equal(progress.gems, 10);
    await expect(page.locator(".park-rewards")).toContainText("+0");
    await page.getByRole("button", { name: "下一关", exact: true }).click();
    await expect(page.locator(".park-level-sign")).toHaveText("第 2 关");
    await page.getByRole("button", { name: "提示", exact: true }).click();
    await capture(page, "hint-390x844");
    await page.getByRole("button", { name: "继续挑战", exact: true }).click();
    assert.equal(
      await page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("energy_park_progress_v2")!).hints,
      ),
      3,
    );
  });
  await test("步数耗尽后撤销和重新挑战恢复", async () => {
    await selectLevel(page, 1);
    for (let i = 0; i < FIRST_BUDGET; i++) await rotate(page, "t-2-2");
    await expect(
      page.getByText("能量步数用完啦", { exact: true }),
    ).toBeVisible();
    await capture(page, "out-of-steps-390x844");
    await page.getByRole("button", { name: "撤销一步", exact: true }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText("1");
    await page.getByRole("button", { name: "重置", exact: true }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText(String(FIRST_BUDGET));
  });
  for (const id of [24, 41, 61, 81]) {
    await test(`第${id}关沿用主干新版关卡，通过旋转与通断实际完成`, async () => {
      await selectLevel(page, id);
      await capture(page, `level${id}-start-390x844`);
      const level = DEFAULT_LEVELS[id - 1];
      const special = level.tiles.find(tile => !tile.locked && (tile.type === "switch" || tile.type === "diode"));
      if (special) {
        const cell = page.locator(`[data-tile-id="${special.id}"]`);
        await rotate(page, special.id);
        await expect(cell).toHaveAttribute("data-rotation", String((special.rotation + 90) % 360));
        await page.getByRole("button", { name: "撤销", exact: true }).click();
        await expect(cell).toHaveAttribute("data-rotation", String(special.rotation % 360));
        if (special.type === "switch") {
          await cell.locator(".park-switch-toggle").click();
          await expect(cell).toHaveAttribute("data-switch", String(!(special.switchClosed !== false)));
          await page.getByRole("button", { name: "撤销", exact: true }).click();
        }
      }
      await solveThroughInput(page, id, () => capture(page, `level${id}-powered-390x844`));
    });
  }
  await test("设置、规则、个人成就、图鉴与收集物详情", async () => {
    await page
      .locator(".park-victory-actions")
      .getByRole("button", { name: "返回乐园", exact: true })
      .click();
    await page.getByRole("button", { name: "乐园设置", exact: true }).click();
    await capture(page, "settings-390x844");
    await page.getByRole("button", { name: "游戏音效", exact: true }).click();
    await page.getByRole("button", { name: "触感反馈", exact: true }).click();
    await page.getByRole("button", { name: "乐园指南", exact: true }).click();
    await capture(page, "rules-390x844");
    await close(page);
    await page.getByRole("button", { name: "冒险手册", exact: true }).click();
    await capture(page, "profile-390x844");
    await close(page);
    await page.getByRole("button", { name: "百花图鉴", exact: true }).click();
    await capture(page, "flora-390x844");
    await page.locator(".park-flower-grid button").first().click();
    await capture(page, "flower-detail-390x844");
    await close(page);
    await page.getByRole("button", { name: "乐园来信", exact: true }).click();
    await capture(page, "mail-390x844");
    await page
      .getByRole("button", { name: "阅读乐园故事", exact: true })
      .click();
    await capture(page, "story-390x844");
    await close(page);
  });
  await test("无尽挑战实际生成、旋转、撤销和重置", async () => {
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "关卡", exact: true })
      .click();
    await capture(page, "levels-390x844");
    await page.getByRole("button", { name: "无尽挑战", exact: true }).click();
    await capture(page, "endless-select-390x844");
    await page
      .getByRole("button", { name: "轻松漫游 · 2 座设施", exact: true })
      .click();
    await expect(page.locator(".park-level-sign")).toHaveText("无尽挑战");
    await capture(page, "endless-390x844");
    const before = await page.getByTestId("remaining-steps").innerText();
    await page.locator(".park-tile-rotate:enabled").first().click();
    assert.equal(
      Number(await page.getByTestId("remaining-steps").innerText()),
      Number(before) - 1,
    );
    await page.getByRole("button", { name: "撤销", exact: true }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText(before);
    await page.getByRole("button", { name: "返回乐园", exact: true }).click();
  });
  await test("关卡工坊真实绘制、导出导入、试玩与完成", async () => {
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "关卡", exact: true })
      .click();
    await page.getByRole("button", { name: "关卡工坊", exact: true }).click();
    await capture(page, "editor-390x844");
    for (let col = 1; col <= 4; col++) await rotate(page, `editor-2-${col}`);
    await capture(page, "editor-connected-390x844");
    await page.getByRole("button", { name: "导出关卡", exact: true }).click();
    const code = await page.locator("textarea").inputValue();
    assert.ok(code.length > 100);
    await page
      .getByRole("button", { name: "导入这份关卡", exact: true })
      .click();
    await expect(page.getByText("关卡已导入", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "进入试玩", exact: true }).click();
    await page.locator(".park-victory").waitFor();
    await capture(page, "editor-victory-390x844");
  });
  await test("参考比例、9:16与9:20的三页真实操作截图", async () => {
    for (const viewport of [
      { width: 361, height: 727, scale: 1, label: "361x727" },
      { width: 360, height: 640, scale: 3, label: "360x640" },
      { width: 360, height: 640, scale: 2, label: "720x1280" },
      { width: 360, height: 800, scale: 3, label: "360x800" },
      { width: 449, height: 877, scale: 897 / 449, label: "897x1752" },
      { width: 449, height: 878, scale: 897 / 449, label: "897x1754" },
    ]) {
      const ctx = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: viewport.scale,
      });
      const tab = await ctx.newPage();
      tab.on("pageerror", (error) => errors.push(error.message));
      await openFreshHome(tab, base);
      const label = viewport.label;
      await capture(tab, `home-${label}`);
      await tab.getByRole("button", { name: "开始挑战", exact: true }).click();
      await finishFirstGuide(tab);
      await capture(tab, `play-${label}`);
      await solveFirst(tab);
      await capture(tab, `victory-${label}`);
      await ctx.close();
    }
  });
  assert.deepEqual(errors, []);
  results.push({
    name: "全部运行页面图片可解码且无脚本异常",
    status: "通过",
    details: { pageErrors: errors },
  });
} catch (error) {
  results.push({ name: "执行中断", status: "失败", details: String(error) });
  await page.screenshot({ path: path.join(SCREENS, "failure.png") });
  throw error;
} finally {
  await context.close();
  await browser.close();
  fs.writeFileSync(
    path.join(ROOT, "ui-test-results.json"),
    JSON.stringify(
      { date: new Date().toISOString(), base, results, errors },
      null,
      2,
    ),
  );
}
console.log(`${results.length} 项真实玩家路径验证完成`);
