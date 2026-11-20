import { chromium, expect, type Page } from "@playwright/test";
import assert from "node:assert/strict";

const base = process.env.PARK_TEST_URL ?? "";
if (!base) throw new Error("请设置 PARK_TEST_URL，例如 http://127.0.0.1:3000");

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const pageErrors: string[] = [];
page.on("pageerror", (error) => pageErrors.push(error.message));

const save = {
  coins: 5000,
  hints: 5,
  lenses: 5,
  rewindTokens: 1,
  stepTokens: 1,
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
};

async function openFreshHome() {
  await page.goto(base);
  await page.evaluate((progress) => {
    localStorage.clear();
    localStorage.setItem("energy_park_progress_v2", JSON.stringify(progress));
    localStorage.setItem("honeycomb_story_seen_v1", "1");
    localStorage.setItem("honeycomb_onboarding_v1", "1");
    localStorage.setItem("honeycomb_reshape_compensation_v1", "1");
  }, save);
  await page.reload();
  await expect(page.locator(".park-home")).toBeVisible();
}

async function enterFirstLevel() {
  await page.getByRole("button", { name: "开始修复", exact: true }).click();
  await expect(page.locator(".park-play")).toBeVisible();
}

async function closeHint() {
  await page.getByRole("button", { name: "继续挑战", exact: true }).click();
}

async function useHint() {
  await page.getByRole("button", { name: "提示", exact: true }).click();
  await expect(page.locator(".park-modal-hint")).toBeVisible();
  await closeHint();
}

async function rotateFirstCell() {
  await page.locator('[data-tile-id="t-2-2"] .park-tile-rotate').click();
}

async function test(name: string, action: () => Promise<void>) {
  try {
    await action();
    console.log(`通过：${name}`);
    return true;
  } catch (error) {
    console.error(`失败：${name}`);
    console.error(error instanceof Error ? error.message : error);
    return false;
  }
}

let failures = 0;
try {
  if (!(await test("应急线圈更新当前历史快照，撤销后恢复 3 步", async () => {
    await openFreshHome();
    await enterFirstLevel();
    const budget = Number(await page.getByTestId("remaining-steps").textContent());
    for (let index = 0; index < budget; index += 1) await rotateFirstCell();

    await expect(page.getByText("修复步数用完啦", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "使用应急线圈 · 余 1", exact: true }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText("3");

    await page.getByRole("button", { name: /操作足迹/ }).click();
    await expect(page.locator(".park-history-list button.selected")).toContainText("剩余 3 步");
    await page.locator(".park-modal-history .park-close").click();

    await rotateFirstCell();
    await expect(page.getByTestId("remaining-steps")).toHaveText("2");
    await page.getByRole("button", { name: "撤销", exact: true }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText("3");
  }))) failures += 1;

  if (!(await test("提示在键盘撤销、重做和历史跳转后清空高亮", async () => {
    await openFreshHome();
    await enterFirstLevel();
    await rotateFirstCell();
    await useHint();
    await expect(page.locator(".park-grid .park-tile.is-hint")).toHaveCount(1);

    await page.keyboard.press("Control+z");
    await expect(page.locator(".park-grid .park-tile.is-hint")).toHaveCount(0);

    await useHint();
    await expect(page.locator(".park-grid .park-tile.is-hint")).toHaveCount(1);
    await page.getByRole("button", { name: /操作足迹/ }).click();
    await page.getByRole("button", { name: "重做一步", exact: true }).click();
    await expect(page.locator(".park-grid .park-tile.is-hint")).toHaveCount(0);

    await rotateFirstCell();
    await useHint();
    await expect(page.locator(".park-grid .park-tile.is-hint")).toHaveCount(1);
    await page.getByRole("button", { name: /操作足迹/ }).click();
    await page
      .locator(".park-modal-history")
      .getByRole("button", { name: /起点/ })
      .click();
    await expect(page.locator(".park-grid .park-tile.is-hint")).toHaveCount(0);
  }))) failures += 1;

  if (!(await test("剩余步数不足时提示还差多少，不误报无解", async () => {
    await openFreshHome();
    await enterFirstLevel();
    const budget = Number(await page.getByTestId("remaining-steps").textContent());
    for (let index = 0; index < budget - 1; index += 1) await rotateFirstCell();
    await expect(page.getByTestId("remaining-steps")).toHaveText("1");

    await page.getByRole("button", { name: "提示", exact: true }).click();
    await expect(page.getByRole("status")).toContainText("还差");
    await expect(page.getByRole("status")).not.toContainText("算不出");
    await expect(page.locator(".park-modal-hint")).toHaveCount(0);
    assert.equal(
      await page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("energy_park_progress_v2")!).hints,
      ),
      5,
    );
  }))) failures += 1;

  if (!(await test("返回首页保留盘面并回收额外回溯", async () => {
    await openFreshHome();
    await enterFirstLevel();
    await rotateFirstCell();
    const remaining = await page.getByTestId("remaining-steps").textContent();
    const rotation = await page
      .locator('[data-tile-id="t-2-2"]')
      .getAttribute("data-rotation");

    await page.getByRole("button", { name: /操作足迹/ }).click();
    await page
      .getByRole("button", { name: "使用时光回针 · 余 1", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "使用时光回针 · 余 0", exact: true }),
    ).toBeVisible();
    await page.locator(".park-modal-history .park-close").click();

    await page.getByRole("button", { name: "返回乐园", exact: true }).click();
    await page.getByRole("button", { name: "开始修复", exact: true }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText(remaining ?? "");
    await expect(page.locator('[data-tile-id="t-2-2"]')).toHaveAttribute(
      "data-rotation",
      rotation ?? "",
    );
    await expect(page.locator(".park-history-link")).toContainText("回溯 3 次");
  }))) failures += 1;

  if (!(await test("消耗完基础回溯后购买的回针在返回首页时全部回收", async () => {
    await openFreshHome();
    await enterFirstLevel();
    for (let index = 0; index < 4; index += 1) await rotateFirstCell();
    for (let index = 0; index < 3; index += 1) {
      await page.getByRole("button", { name: "撤销", exact: true }).click();
    }
    await expect(page.locator(".park-history-link")).toContainText("回溯 0 次");

    await page.getByRole("button", { name: /操作足迹/ }).click();
    await page
      .getByRole("button", { name: "使用时光回针 · 余 1", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "使用时光回针 · 余 0", exact: true }),
    ).toBeVisible();
    await page.locator(".park-modal-history .park-close").click();

    await page.getByRole("button", { name: "返回乐园", exact: true }).click();
    await page.getByRole("button", { name: "开始修复", exact: true }).click();
    await expect(page.locator(".park-history-link")).toContainText("回溯 0 次");
  }))) failures += 1;

  if (!(await test("未消耗的基础回溯在返回首页时保持 3 次", async () => {
    await openFreshHome();
    await enterFirstLevel();
    await page.getByRole("button", { name: /操作足迹/ }).click();
    await page
      .getByRole("button", { name: "使用时光回针 · 余 1", exact: true })
      .click();
    await page.locator(".park-modal-history .park-close").click();
    await expect(page.locator(".park-history-link")).toContainText("回溯 4 次");

    await page.getByRole("button", { name: "返回乐园", exact: true }).click();
    await page.getByRole("button", { name: "开始修复", exact: true }).click();
    await expect(page.locator(".park-history-link")).toContainText("回溯 3 次");
  }))) failures += 1;

  if (!(await test("无尽关背包中的提示按钮禁用", async () => {
    await openFreshHome();
    await page.getByRole("navigation").getByRole("button", { name: "关卡", exact: true }).click();
    await page
      .locator(".park-modal-levels")
      .getByRole("button", { name: "无尽挑战", exact: true })
      .click();
    await page
      .locator(".park-modal-endless")
      .getByRole("button", { name: /轻松漫游/ })
      .click();
    await expect(page.locator(".park-play")).toBeVisible();

    await page
      .locator(".park-play-tools")
      .getByRole("button", { name: "背包", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "使用提示灯泡", exact: true }),
    ).toBeDisabled();
  }))) failures += 1;

  if (!(await test("基础回溯耗尽且有回针库存时引导使用回针", async () => {
    await openFreshHome();
    await enterFirstLevel();
    for (let index = 0; index < 4; index += 1) await rotateFirstCell();
    for (let index = 0; index < 3; index += 1) {
      await page.getByRole("button", { name: "撤销", exact: true }).click();
    }
    await expect(page.locator(".park-history-link")).toContainText("回溯 0 次");

    const budget = Number(await page.getByTestId("remaining-steps").textContent());
    for (let index = 0; index < budget; index += 1) await rotateFirstCell();
    await expect(page.getByText("修复步数用完啦", { exact: true })).toBeVisible();
    await expect(page.getByText(/可使用时光回针补充/)).toBeVisible();
  }))) failures += 1;

  assert.deepEqual(pageErrors, [], `页面运行错误：${pageErrors.join(" | ")}`);
  assert.equal(failures, 0, `${failures} 项补给回归失败`);
  console.log("补给历史与提示状态回归通过");
} finally {
  await browser.close();
}
