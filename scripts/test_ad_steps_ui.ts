import { chromium, expect, type Page } from "@playwright/test";
import assert from "node:assert/strict";

/**
 * 续命广告的真界面回归：用 localStorage 打开 mock 广告桥，
 * 覆盖「看完发步数 / 中途关掉不发 / 拉不到兜底发 / 单局 2 次上限 / 每日额度」。
 * 跑法：先 npm run dev，再 PARK_TEST_URL=http://127.0.0.1:3000 npx tsx scripts/test_ad_steps_ui.ts
 */

const base = process.env.PARK_TEST_URL ?? "";
if (!base) throw new Error("请设置 PARK_TEST_URL，例如 http://127.0.0.1:3000");

function today(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

const baseSave = {
  coins: 5000,
  hints: 5,
  lenses: 5,
  rewindTokens: 0,
  stepTokens: 0,
  adStepsDate: "",
  adStepsUsed: 0,
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

async function openHome(
  page: Page,
  overrides: Record<string, unknown> = {},
  adResult = "rewarded",
) {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.evaluate(
    ({ save, result }) => {
      localStorage.clear();
      localStorage.setItem("energy_park_progress_v2", JSON.stringify(save));
      localStorage.setItem("honeycomb_story_seen_v1", "1");
      localStorage.setItem("honeycomb_onboarding_v1", "1");
      localStorage.setItem("honeycomb_reshape_compensation_v1", "1");
      localStorage.setItem("energy_park_dev_ads", "mock");
      localStorage.setItem("energy_park_dev_ads_result", result);
    },
    { save: { ...baseSave, ...overrides }, result: adResult },
  );
  await page.reload();
  await expect(page.locator(".park-home")).toBeVisible();
}

async function enterLevel(page: Page) {
  await page.getByRole("button", { name: "开始修复", exact: true }).click();
  await expect(page.locator(".park-play")).toBeVisible();
}

async function drainSteps(page: Page) {
  const budget = Number(await page.getByTestId("remaining-steps").textContent());
  for (let index = 0; index < budget; index += 1) {
    await page.locator('[data-tile-id="t-2-2"] .park-tile-rotate').click();
  }
  await expect(page.getByText("修复步数用完啦", { exact: true })).toBeVisible();
}

async function readReward(page: Page): Promise<number> {
  const label = await page.getByRole("button", { name: /看广告 \+\d 步/ }).textContent();
  const matched = label?.match(/\+(\d)/);
  assert.ok(matched, `广告按钮文案异常：${label}`);
  return Number(matched[1]);
}

async function storedProgress(page: Page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem("energy_park_progress_v2") ?? "{}"));
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

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const pageErrors: string[] = [];
// 生产包里 PWA 会尝试注册 ServiceWorker，静态服务器下失败属环境噪音，不当作功能缺陷
page.on("pageerror", (error) => {
  if (error.message.includes("ServiceWorker")) return;
  pageErrors.push(error.message);
});

let failures = 0;
try {
  if (!(await test("看完广告补步数并扣每日额度", async () => {
    await openHome(page);
    await enterLevel(page);
    await drainSteps(page);

    const reward = await readReward(page);
    await page.getByRole("button", { name: /看广告 \+\d 步/ }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText(String(reward));

    const progress = await storedProgress(page);
    assert.equal(progress.adStepsUsed, 1, "每日额度没有累加");
    assert.equal(progress.adStepsDate, today(), "额度日期没有落盘");
  }))) failures += 1;

  if (!(await test("看完广告才发奖励，中途关掉不发", async () => {
    await openHome(page);
    await enterLevel(page);
    await drainSteps(page);
    await page.evaluate(() => localStorage.setItem("energy_park_dev_ads_result", "closed"));

    await page.getByRole("button", { name: /看广告 \+\d 步/ }).click();
    await expect(page.getByText("广告没看完，这次没有奖励", { exact: true })).toBeVisible();
    await expect(page.getByTestId("remaining-steps")).toHaveText("0");
    assert.equal((await storedProgress(page)).adStepsUsed, 0, "没看完不该扣额度");
  }))) failures += 1;

  if (!(await test("广告拉不到时兜底补步，但同样扣额度", async () => {
    await openHome(page);
    await enterLevel(page);
    await drainSteps(page);
    await page.evaluate(() => localStorage.setItem("energy_park_dev_ads_result", "unavailable"));

    const reward = await readReward(page);
    await page.getByRole("button", { name: /看广告 \+\d 步/ }).click();
    await expect(page.getByTestId("remaining-steps")).toHaveText(String(reward));
    assert.equal((await storedProgress(page)).adStepsUsed, 1, "兜底也要扣额度，否则断网就能白嫖");
  }))) failures += 1;

  if (!(await test("同一局最多续命 2 次，第 3 次只剩重来", async () => {
    await openHome(page);
    await enterLevel(page);
    for (let round = 0; round < 2; round += 1) {
      await drainSteps(page);
      await page.getByRole("button", { name: /看广告 \+\d 步/ }).click();
      await expect(page.getByTestId("remaining-steps")).not.toHaveText("0");
    }
    await drainSteps(page);
    await expect(page.getByText("本局续命次数已用完，重开这一关吧")).toBeVisible();
    await expect(page.getByRole("button", { name: /看广告 \+\d 步/ })).toHaveCount(0);
  }))) failures += 1;

  if (!(await test("每日额度用完时改引导去商店补线圈", async () => {
    await openHome(page, { adStepsDate: today(), adStepsUsed: 6 });
    await enterLevel(page);
    await drainSteps(page);
    await expect(page.getByText("今日广告补步已用完，明天再来")).toBeVisible();
    await page.getByRole("button", { name: "加步电池不足 · 去商店补", exact: true }).click();
    await expect(page.locator(".park-shop")).toBeVisible();
  }))) failures += 1;

  if (!(await test("背包里有线圈时优先给线圈，不弹广告", async () => {
    await openHome(page, { stepTokens: 1 });
    await enterLevel(page);
    await drainSteps(page);
    await expect(page.getByRole("button", { name: "使用加步电池 · 余 1", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /看广告 \+\d 步/ })).toHaveCount(0);
  }))) failures += 1;

  assert.deepEqual(pageErrors, [], `页面运行错误：${pageErrors.join(" | ")}`);
  assert.equal(failures, 0, `${failures} 项续命广告界面回归失败`);
  console.log("续命广告界面回归通过");
} finally {
  await browser.close();
}
