import { chromium, expect, type Browser, type Page } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const configuredBase = process.env.PARK_TEST_URL;
if (!configuredBase) {
  throw new Error(
    "请设置 PARK_TEST_URL，例如 PARK_TEST_URL=http://127.0.0.1:4173",
  );
}
const base = configuredBase;
const QA_ROOT = path.resolve(
  process.env.PARK_QA_DIR || path.join("output", "qa", "shop-expansion"),
);
const SCREENS = path.join(QA_ROOT, "screens");
fs.mkdirSync(SCREENS, { recursive: true });

const allCosmeticIds = [
  "joy-greeting",
  "starlight-outfit",
  "exhibit-display",
  "calm-theme",
] as const;
const clearedThrough40 = Array.from({ length: 40 }, (_, index) => index + 1);
const supplies = [
  { name: "提示灯泡", key: "hints" },
  { name: "火花透镜", key: "lenses" },
  { name: "时光回针", key: "rewindTokens" },
  { name: "加步电池", key: "stepTokens" },
] as const;
const cosmetics = ["开心问候", "星愿礼服", "星空展台", "宁静夜灯"] as const;

interface SeedOptions {
  coins: number;
  cleared: number[];
  supplies: boolean;
  owned: boolean;
  equipped: boolean;
}

interface BrowserRecord {
  viewport: string;
  state: string;
  file: string;
  scrollTop: number;
  imageCount: number;
}

const records: BrowserRecord[] = [];
const pageErrors: string[] = [];

async function seed(page: Page, options: SeedOptions) {
  const owned = options.owned ? [...allCosmeticIds] : [];
  const equipped =
    options.owned && options.equipped
      ? { mood: "joy", outfit: "starlight", exhibitId: 21, theme: "calm" }
      : { mood: "default", outfit: "default", exhibitId: null, theme: "default" };
  await page.goto(base);
  await page.evaluate(
    ({ coins, cleared, stock, ownedIds, equippedState }) => {
      localStorage.clear();
      localStorage.setItem(
        "energy_park_progress_v2",
        JSON.stringify({
          coins,
          hints: stock,
          lenses: stock,
          rewindTokens: stock,
          stepTokens: stock,
          ownedCosmetics: ownedIds,
          equippedCosmetics: equippedState,
          rewardedLevels: cleared,
          completedDate: "",
          claimedDate: "",
        }),
      );
      localStorage.setItem("honeycomb_cleared_levels", JSON.stringify(cleared));
      localStorage.setItem("honeycomb_best_steps", "{}");
      localStorage.setItem("honeycomb_best_lights", "{}");
      localStorage.setItem("honeycomb_story_seen_v1", "1");
      localStorage.setItem("honeycomb_onboarding_v1", "1");
      localStorage.setItem("honeycomb_reshape_compensation_v1", "1");
    },
    {
      coins: options.coins,
      cleared: options.cleared,
      stock: options.supplies ? 1 : 0,
      ownedIds: owned,
      equippedState: equipped,
    },
  );
  await page.reload();
  await expect(page.locator(".park-home")).toBeVisible();
}

async function readProgress(page: Page) {
  return page.evaluate(() =>
    JSON.parse(localStorage.getItem("energy_park_progress_v2")!),
  );
}

async function openShop(page: Page) {
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "商店", exact: true })
    .click();
  await expect(page.locator(".park-shop")).toBeVisible();
}

async function closeModal(page: Page) {
  await page.locator(".park-modal .park-close").click();
}

function card(page: Page, name: string) {
  return page.locator(".park-shop-card").filter({ hasText: name });
}

async function scrollShop(page: Page, direction: "up" | "down") {
  const body = page.locator(".park-modal-body");
  await body.hover();
  const initial = await body.evaluate((element) => element.scrollTop);
  const amount = direction === "down" ? 520 : -520;
  for (let index = 0; index < 8; index += 1) {
    await page.mouse.wheel(0, amount);
    await page.waitForTimeout(80);
  }
  const current = await body.evaluate((element) => element.scrollTop);
  if (direction === "down") assert.ok(current > initial);
  else assert.ok(current <= initial);
}

async function capture(page: Page, viewport: string, state: string) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete),
  );
  await page.waitForTimeout(200);
  const images = await page.locator("img").evaluateAll((nodes) =>
    nodes.map((node) => ({
      src: (node as HTMLImageElement).src,
      naturalWidth: (node as HTMLImageElement).naturalWidth,
    })),
  );
  assert.deepEqual(
    images.filter((image) => image.naturalWidth <= 0),
    [],
    `${viewport} ${state} 存在未解码图片`,
  );
  const file = `${state}-${viewport}.png`;
  await page.screenshot({ path: path.join(SCREENS, file) });
  records.push({
    viewport,
    state,
    file,
    scrollTop:
      (await page.locator(".park-modal-body").count()) > 0
        ? await page.locator(".park-modal-body").evaluate((element) => element.scrollTop)
        : 0,
    imageCount: images.length,
  });
}

async function buyAll(page: Page) {
  await page.getByRole("tab", { name: "补给", exact: true }).click();
  for (const item of supplies) {
    await card(page, item.name)
      .getByRole("button", { name: `购买${item.name}`, exact: true })
      .click();
  }
  await page.getByRole("tab", { name: "装扮", exact: true }).click();
  for (const name of cosmetics) {
    await card(page, name)
      .getByRole("button", { name: `购买${name}`, exact: true })
      .click();
  }
  await expect(page.getByLabel("钻石余额 1790", { exact: true })).toBeVisible();
}

async function equipPurchases(page: Page) {
  for (const name of ["开心问候", "星愿礼服", "宁静夜灯"] as const) {
    await card(page, name)
      .getByRole("button", { name: "使用", exact: true })
      .click();
    await expect(
      card(page, name).getByRole("button", {
        name: "恢复默认",
        exact: true,
      }),
    ).toBeVisible();
  }

  const exhibitCard = card(page, "星空展台");
  await exhibitCard
    .getByRole("button", { name: "选择展品", exact: true })
    .click();
  await expect(page.locator(".park-exhibit-picker")).toBeVisible();
  return exhibitCard;
}

async function selectCarousel(page: Page) {
  await page
    .locator(".park-exhibit-picker-grid button")
    .filter({ hasText: "旋转木马" })
    .click();
  await expect(page.locator(".park-exhibit-picker")).toHaveCount(0);
}

async function assertPurchaseProgress(page: Page) {
  const progress = await readProgress(page);
  assert.equal(progress.coins, 1790);
  assert.equal(progress.hints, 1);
  assert.equal(progress.lenses, 1);
  assert.equal(progress.rewindTokens, 1);
  assert.equal(progress.stepTokens, 1);
  assert.deepEqual(
    [...progress.ownedCosmetics].sort(),
    [...allCosmeticIds].sort(),
  );
  assert.deepEqual(progress.equippedCosmetics, {
    mood: "joy",
    outfit: "starlight",
    exhibitId: 21,
    theme: "calm",
  });
}

async function runFunctional(browser: Browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await seed(page, {
    coins: 7000,
    cleared: clearedThrough40,
    supplies: false,
    owned: false,
    equipped: false,
  });
  await openShop(page);
  await buyAll(page);

  const beforeEquip = await readProgress(page);
  assert.equal(beforeEquip.coins, 1790);
  assert.deepEqual(beforeEquip.equippedCosmetics, {
    mood: "default",
    outfit: "default",
    exhibitId: null,
    theme: "default",
  });
  const exhibitCard = await equipPurchases(page);
  await capture(page, "390x844", "purchase-exhibit-picker");
  await expect(exhibitCard).toContainText("已拥有");
  await selectCarousel(page);
  await expect(exhibitCard.getByRole("button", { name: "更换展品" })).toBeVisible();
  await assertPurchaseProgress(page);
  await closeModal(page);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "calm");
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "背包", exact: true })
    .click();
  for (const item of supplies) {
    await expect(card(page, item.name)).toContainText("已拥有 1 个");
  }
  await closeModal(page);
  await context.close();
}

async function runInsufficient(page: Page, viewport: string) {
  await seed(page, {
    coins: 50,
    cleared: clearedThrough40,
    supplies: false,
    owned: false,
    equipped: false,
  });
  await openShop(page);
  for (const item of supplies) {
    const button = card(page, item.name).getByRole("button", {
      name: `购买${item.name}`,
      exact: true,
    });
    await expect(button).toBeDisabled();
    await expect(button).toHaveText("钻石不足");
  }
  await capture(page, viewport, "shop-insufficient");
}

async function runLocked(page: Page, viewport: string) {
  await seed(page, {
    coins: 7000,
    cleared: [1, 2, 3, 4],
    supplies: false,
    owned: false,
    equipped: false,
  });
  await openShop(page);
  await page.getByRole("tab", { name: "装扮", exact: true }).click();
  await expect(page.locator(".park-shop-card.is-locked")).toHaveCount(4);
  for (const name of cosmetics) {
    await expect(
      card(page, name).getByRole("button", { name: /开放$/, exact: false }),
    ).toBeDisabled();
  }
  await capture(page, viewport, "shop-locked");
}

async function runPurchaseVisual(browser: Browser, width: number, height: number) {
  const viewport = `${width}x${height}`;
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await seed(page, {
    coins: 7000,
    cleared: clearedThrough40,
    supplies: false,
    owned: false,
    equipped: false,
  });
  await openShop(page);
  await capture(page, viewport, "shop-supply-top");
  await scrollShop(page, "down");
  await expect(card(page, "加步电池")).toBeInViewport();
  await capture(page, viewport, "shop-supply-bottom");

  await page.getByRole("tab", { name: "装扮", exact: true }).click();
  await scrollShop(page, "up");
  await capture(page, viewport, "shop-cosmetic-top");
  await scrollShop(page, "down");
  await expect(card(page, "宁静夜灯")).toBeInViewport();
  await capture(page, viewport, "shop-cosmetic-bottom");

  await buyAll(page);
  const exhibitCard = await equipPurchases(page);
  await capture(page, viewport, "shop-exhibit-picker");
  await selectCarousel(page);
  await assertPurchaseProgress(page);
  await scrollShop(page, "up");
  await capture(page, viewport, "shop-owned-equipped-top");
  await scrollShop(page, "down");
  await capture(page, viewport, "shop-owned-equipped-bottom");
  await expect(exhibitCard).toContainText("已拥有");
  await closeModal(page);
  await capture(page, viewport, "purchase-home");
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "背包", exact: true })
    .click();
  await capture(page, viewport, "purchase-bag");

  await closeModal(page);
  await runInsufficient(page, viewport);
  await closeModal(page);
  await runLocked(page, viewport);
  await closeModal(page);
  await context.close();
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  await runFunctional(browser);
  for (const [width, height] of [
    [360, 800],
    [430, 932],
  ] as const) {
    await runPurchaseVisual(browser, width, height);
  }
  assert.deepEqual(pageErrors, [], `页面运行错误：${pageErrors.join(" | ")}`);
  fs.writeFileSync(
    path.join(QA_ROOT, "purchase-results.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        base,
        checks: {
          purchaseTotal: 7000 - 1790,
          finalCoins: 1790,
          supplyStock: 1,
          ownedCosmetics: 4,
          equipped: {
            mood: "joy",
            outfit: "starlight",
            exhibitId: 21,
            theme: "calm",
          },
          insufficientDisabled: "通过",
          lockedDisabled: "通过",
          realWheelScroll: "通过",
          pageErrors,
        },
        records,
      },
      null,
      2,
    ),
  );
  console.log(`通过：真实购买路径与 ${records.length} 张购买状态截图`);
} finally {
  await browser.close();
}
