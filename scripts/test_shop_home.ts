import { chromium, expect, type Browser, type Page } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { selectLevelOnMap } from "./park_test_player";

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

const viewports = [
  { width: 360, height: 800, label: "360x800" },
  { width: 390, height: 844, label: "390x844" },
  { width: 430, height: 932, label: "430x932" },
] as const;

const clearedThrough40 = Array.from({ length: 40 }, (_, index) => index + 1);
const ownAllCosmetics = [
  "joy-greeting",
  "starlight-outfit",
  "exhibit-display",
  "calm-theme",
] as const;

interface SeedOptions {
  cleared: number[];
  mood: "default" | "joy";
  outfit: "default" | "starlight";
  exhibitId: number | null;
  theme: "default" | "calm";
}

const fullPlayer: SeedOptions = {
  cleared: clearedThrough40,
  mood: "joy",
  outfit: "starlight",
  exhibitId: 21,
  theme: "calm",
};

const records: Array<{
  viewport: string;
  state: string;
  file: string;
  size: { width: number; height: number };
  imageCount: number;
  layout: unknown;
}> = [];
const pageErrors: string[] = [];

function saveFor(options: SeedOptions) {
  return {
    coins: 9000,
    hints: 5,
    lenses: 5,
    rewindTokens: 1,
    stepTokens: 1,
    ownedCosmetics: ownAllCosmetics,
    equippedCosmetics: {
      mood: options.mood,
      outfit: options.outfit,
      exhibitId: options.exhibitId,
      theme: options.theme,
    },
    rewardedLevels: options.cleared,
    completedDate: "",
    claimedDate: "",
  };
}

async function seedPlayer(page: Page, options: SeedOptions) {
  await page.goto(base);
  await page.evaluate(
    ({ progress, cleared }) => {
      localStorage.clear();
      localStorage.setItem("energy_park_progress_v2", JSON.stringify(progress));
      localStorage.setItem("honeycomb_cleared_levels", JSON.stringify(cleared));
      localStorage.setItem("honeycomb_best_steps", "{}");
      localStorage.setItem("honeycomb_best_lights", "{}");
      localStorage.setItem("honeycomb_story_seen_v1", "1");
      localStorage.setItem("honeycomb_onboarding_v1", "1");
      localStorage.setItem("honeycomb_reshape_compensation_v1", "1");
    },
    { progress: saveFor(options), cleared: options.cleared },
  );
  await page.reload();
  await expect(page.locator(".park-home")).toBeVisible();
}

async function seedNewPlayer(page: Page) {
  await page.goto(base);
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem(
      "energy_park_progress_v2",
      JSON.stringify({
        coins: 0,
        hints: 3,
        lenses: 0,
        rewindTokens: 0,
        stepTokens: 0,
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
    localStorage.setItem("honeycomb_cleared_levels", "[]");
    localStorage.setItem("honeycomb_story_seen_v1", "1");
    localStorage.setItem("honeycomb_onboarding_v1", "1");
    localStorage.setItem("honeycomb_reshape_compensation_v1", "1");
  });
  await page.reload();
  await expect(page.locator(".park-home")).toBeVisible();
}

async function assertTheme(page: Page, expected: "default" | "calm") {
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.theme ?? "default"))
    .toBe(expected);
}

async function closeModal(page: Page) {
  await page.locator(".park-modal .park-close").click();
}

async function resetAttempt(page: Page) {
  type ResetOutcome =
    | { kind: "dialog" }
    | { kind: "game" }
    | { kind: "error"; error: unknown };

  let resolveDialog: (outcome: ResetOutcome) => void = () => {};
  const dialogOutcome = new Promise<ResetOutcome>((resolve) => {
    resolveDialog = resolve;
  });
  const acceptDialog = async (dialog: {
    accept: () => Promise<void>;
  }) => {
    try {
      await dialog.accept();
      resolveDialog({ kind: "dialog" });
    } catch (error) {
      resolveDialog({ kind: "error", error });
    }
  };
  page.once("dialog", acceptDialog);
  await page.getByRole("button", { name: "重置", exact: true }).click();

  const confirm = page.getByRole("button", {
    name: "确定重置",
    exact: true,
  });
  const gameOutcome = confirm
    .waitFor({ state: "visible", timeout: 1500 })
    .then(async () => {
      await confirm.click();
      return { kind: "game" } as const;
    })
    .catch((error: unknown) => ({ kind: "error" as const, error }));
  const outcome = await Promise.race([dialogOutcome, gameOutcome]);
  page.off("dialog", acceptDialog);
  if (outcome.kind === "error") {
    const message =
      outcome.error instanceof Error
        ? outcome.error.message
        : String(outcome.error);
    pageErrors.push(`重置确认失败：${message}`);
    throw outcome.error;
  }
  console.log(
    outcome.kind === "dialog"
      ? "重置确认：原生 window.confirm"
      : "重置确认：游戏内确认弹窗",
  );
  if (outcome.kind === "game") {
    await expect(confirm).toBeHidden();
  }
  await expect(page.getByRole("button", { name: /操作足迹/ })).toContainText(
    "操作足迹 · 0 步",
  );
}

async function openShop(page: Page) {
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "商店", exact: true })
    .click();
  await expect(page.locator(".park-shop")).toBeVisible();
}

// 货架余额条必须是吸顶栏：滚动时贴住容器顶边、铺满整宽、底色不透明，
// 否则滚过的商品会从标题栏下方的缝隙和半透明底色里透出来形成叠加。
async function assertShelfBarSticks(page: Page, viewport: string) {
  const metrics = await page.evaluate(() => {
    const body = document.querySelector<HTMLElement>(".park-modal-body");
    const head = document.querySelector<HTMLElement>(".park-shop-head");
    const bar = document.querySelector<HTMLElement>(".park-shop-balance");
    const tabs = document.querySelector<HTMLElement>(".park-shop-tabs");
    if (!body || !head || !bar || !tabs) return null;
    const previous = body.scrollTop;
    const maxScroll = Math.max(0, body.scrollHeight - body.clientHeight);
    const samples = [0, 0.5, 1].map((ratio) => {
      body.scrollTop = maxScroll * ratio;
      const bodyRect = body.getBoundingClientRect();
      const headRect = head.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();
      const tabsRect = tabs.getBoundingClientRect();
      return {
        scrollTop: Math.round(body.scrollTop),
        gap: Number((headRect.top - bodyRect.top).toFixed(2)),
        widthGap: Number((bodyRect.width - headRect.width).toFixed(2)),
        barInsideHead:
          barRect.top >= headRect.top - 0.5 &&
          barRect.bottom <= headRect.bottom + 0.5,
        tabsInsideViewport:
          tabsRect.top >= bodyRect.top - 0.5 &&
          tabsRect.bottom <= bodyRect.bottom + 0.5,
      };
    });
    body.scrollTop = previous;
    // 只查渐变：background-color 恒为 rgba(0, 0, 0, 0)，由渐变负责铺底。
    // 不透明色会被序列化成 rgb(...)，出现 rgba(...) 就说明底色带 alpha。
    const style = getComputedStyle(head);
    return {
      maxScroll,
      samples,
      hasAlpha: /rgba\(/.test(style.backgroundImage),
    };
  });
  assert.ok(metrics, `${viewport} 商店货架缺少滚动容器、吸顶栏或页签`);
  assert.ok(metrics.maxScroll > 0, `${viewport} 商店货架不可滚动，无法验证吸顶`);
  for (const sample of metrics.samples) {
    assert.ok(
      Math.abs(sample.gap) < 0.5,
      `${viewport} 货架栏未贴住滚动容器顶边（scrollTop=${sample.scrollTop}，缝隙 ${sample.gap}px）`,
    );
    assert.ok(
      Math.abs(sample.widthGap) < 0.5,
      `${viewport} 货架栏未铺满货架宽度（差 ${sample.widthGap}px）`,
    );
    assert.ok(
      sample.barInsideHead,
      `${viewport} 余额条跑出货架栏（scrollTop=${sample.scrollTop}）`,
    );
    assert.ok(
      sample.tabsInsideViewport,
      `${viewport} 补给/装扮页签被裁掉（scrollTop=${sample.scrollTop}）`,
    );
  }
  assert.equal(
    metrics.hasAlpha,
    false,
    `${viewport} 货架栏底色带透明度，滚动商品会透出`,
  );
}

async function selectStoryLevel(page: Page, id: number) {
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "关卡", exact: true })
    .click();
  await selectLevelOnMap(page, id);
}

async function inspectLayout(page: Page) {
  return page.evaluate(() => {
    const viewport = { width: innerWidth, height: innerHeight };
    const visible = (element: Element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.visibility !== "hidden" &&
        style.display !== "none"
      );
    };
    const overflow = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".park-home-exhibit span, .park-shop-card-copy h3, .park-shop-card-copy p, .park-shop-card-copy > span, .park-shop-tabs button, .park-hint-move, .park-play-actions button span, .park-modal h2, .park-modal h3",
      ),
    )
      .filter(visible)
      .filter(
        (element) =>
          element.scrollWidth > element.clientWidth + 1 ||
          element.scrollHeight > element.clientHeight + 4,
      )
      .map((element) => ({
        selector: element.className || element.tagName,
        text: element.textContent?.trim() ?? "",
        client: [element.clientWidth, element.clientHeight],
        scroll: [element.scrollWidth, element.scrollHeight],
      }));

    const outside = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".park-home, .park-play, .park-modal, .park-hint-move",
      ),
    )
      .filter(visible)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          selector: element.className || element.tagName,
          rect: {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          },
        };
      })
      .filter(
        ({ rect }) =>
          rect.left < -1 ||
          rect.top < -1 ||
          rect.right > viewport.width + 1 ||
          rect.bottom > viewport.height + 1,
      );

    const rectFor = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element || !visible(element)) return null;
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      };
    };
    const overlaps = (a: typeof rectA, b: typeof rectA) =>
      Boolean(
        a &&
          b &&
          Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 &&
          Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2,
      );
    const rectA = rectFor(".park-home-exhibit");
    const homeOverlaps = [
      [".park-home-exhibit", ".park-home-title"],
      [".park-home-exhibit", ".park-side-actions"],
      [".park-home-exhibit", ".park-home-friends"],
      [".park-home-exhibit", ".park-lab-entries"],
    ].filter(([left, right]) =>
      overlaps(rectFor(left), rectFor(right)),
    );

    return { viewport, overflow, outside, homeOverlaps };
  });
}

async function capture(page: Page, viewport: string, state: string) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete),
  );
  await page.waitForTimeout(250);

  const imageState = await page.locator("img").evaluateAll((images) =>
    images.map((image) => ({
      src: (image as HTMLImageElement).src,
      naturalWidth: (image as HTMLImageElement).naturalWidth,
      naturalHeight: (image as HTMLImageElement).naturalHeight,
    })),
  );
  assert.deepEqual(
    imageState.filter((image) => image.naturalWidth <= 0),
    [],
    `${viewport} ${state} 存在未解码图片`,
  );

  const file = `${state}-${viewport}.png`;
  await page.screenshot({ path: path.join(SCREENS, file) });
  const layout = await inspectLayout(page);
  assert.deepEqual(layout.overflow, [], `${viewport} ${state} 存在文字溢出`);
  assert.deepEqual(layout.outside, [], `${viewport} ${state} 存在元素越界`);
  assert.deepEqual(layout.homeOverlaps, [], `${viewport} ${state} 首页展台发生遮挡`);
  records.push({
    viewport,
    state,
    file,
    size: await page.evaluate(() => ({
      width: innerWidth,
      height: innerHeight,
    })),
    imageCount: imageState.length,
    layout,
  });
}

async function assertFullHome(page: Page) {
  await assertTheme(page, "calm");
  await expect(page.locator(".park-progress-track b")).toHaveText("40/99");
  await expect(page.locator(".park-friend-sheep")).toHaveAttribute(
    "src",
    /outfit-sheep-starlight\.webp/,
  );
  await expect(page.locator(".park-friend-rabbit")).toHaveAttribute(
    "src",
    /outfit-rabbit-starlight\.webp/,
  );
  await expect(page.locator(".park-friend-spirit")).toHaveAttribute(
    "src",
    /outfit-spirit-starlight\.webp/,
  );
  const moods = page.locator(".park-home-moods img");
  await expect(moods).toHaveCount(3);
  for (const mood of await moods.all()) {
    await expect(mood).toBeVisible();
    assert.ok(
      await mood.evaluate((image) => (image as HTMLImageElement).naturalWidth > 0),
    );
  }
  await expect(page.locator(".park-home-exhibit span")).toHaveText("旋转木马");
  await expect(page.locator(".park-home-exhibit span")).toBeVisible();
}

async function assertThemeOverrides(browser: Browser) {
  const calmContext = await browser.newContext({ viewport: viewports[1] });
  const calmPage = await calmContext.newPage();
  calmPage.on("pageerror", (error) => pageErrors.push(error.message));
  await seedPlayer(calmPage, fullPlayer);
  await calmPage.reload();
  await assertTheme(calmPage, "calm");
  await calmPage.goto(`${base}?theme=default`);
  await assertTheme(calmPage, "default");
  await calmContext.close();

  const defaultContext = await browser.newContext({ viewport: viewports[1] });
  const defaultPage = await defaultContext.newPage();
  defaultPage.on("pageerror", (error) => pageErrors.push(error.message));
  await seedPlayer(defaultPage, { ...fullPlayer, theme: "default" });
  await assertTheme(defaultPage, "default");
  await defaultPage.goto(`${base}?theme=calm`);
  await assertTheme(defaultPage, "calm");
  await defaultContext.close();
}

async function assertUnrepairedExhibitHidden(browser: Browser) {
  const context = await browser.newContext({ viewport: viewports[1] });
  const page = await context.newPage();
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await seedPlayer(page, {
    cleared: [1, 2, 3, 4],
    mood: "joy",
    outfit: "starlight",
    exhibitId: 5,
    theme: "calm",
  });
  await expect(page.locator(".park-progress-track b")).toHaveText("4/99");
  await expect(page.locator(".park-home-exhibit")).toHaveCount(0);
  await context.close();
}

async function runViewport(browser: Browser, viewport: (typeof viewports)[number]) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.addInitScript("globalThis.__name = (value) => value;");
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await seedNewPlayer(page);
  await assertTheme(page, "default");
  await capture(page, viewport.label, "home-default");

  await seedPlayer(page, fullPlayer);
  await assertFullHome(page);
  await capture(page, viewport.label, "home-cosmetics-calm");

  await openShop(page);
  await expect(page.getByRole("tab", { name: "补给", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await capture(page, viewport.label, "shop-supply");
  await assertShelfBarSticks(page, viewport.label);

  await page.getByRole("tab", { name: "装扮", exact: true }).click();
  const themeCard = page.locator(".park-shop-card").filter({ hasText: "宁静夜灯" });
  await expect(themeCard).toContainText("已拥有");
  await themeCard.getByRole("button", { name: "恢复默认", exact: true }).click();
  await assertTheme(page, "default");
  await themeCard.getByRole("button", { name: "使用", exact: true }).click();
  await assertTheme(page, "calm");
  await capture(page, viewport.label, "shop-cosmetic");
  await closeModal(page);

  await selectStoryLevel(page, 1);
  await page
    .locator(".park-play-tools")
    .getByRole("button", { name: "背包", exact: true })
    .click();
  await capture(page, viewport.label, "bag");
  await page
    .getByRole("button", { name: "使用火花透镜", exact: true })
    .click();
  await expect(page.locator(".park-hint-move")).toHaveCount(3);
  await capture(page, viewport.label, "lens-3-steps");
  await page.getByRole("button", { name: "继续挑战", exact: true }).click();

  await page.locator('[data-tile-id="t-2-2"] .park-tile-rotate').click();
  await page.getByRole("button", { name: /操作足迹/ }).click();
  await page
    .getByRole("button", { name: "使用时光回针 · 余 1", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "使用时光回针 · 余 0", exact: true }),
  ).toBeVisible();
  await capture(page, viewport.label, "history-rewind");
  await closeModal(page);

  await resetAttempt(page);
  const budget = Number(
    await page.getByTestId("remaining-steps").textContent(),
  );
  for (let index = 0; index < budget; index += 1) {
    await page.locator('[data-tile-id="t-2-2"] .park-tile-rotate').click();
  }
  await expect(page.getByText("修复步数用完啦", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "使用加步电池 · 余 1", exact: true }),
  ).toBeVisible();
  await capture(page, viewport.label, "out-of-steps-coil");
  await page
    .getByRole("button", { name: "使用加步电池 · 余 1", exact: true })
    .click();
  await expect(page.getByTestId("remaining-steps")).toHaveText("3");
  await capture(page, viewport.label, "coil-refilled");

  await page.getByRole("button", { name: "返回乐园", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "关卡", exact: true })
    .click();
  await page
    .locator(".park-modal-levels")
    .getByRole("button", { name: "无尽挑战", exact: true })
    .click();
  await page
    .locator(".park-modal-endless")
    .getByRole("button", { name: /轻松漫游/ })
    .click();
  await expect(page.locator(".park-play")).toBeVisible();
  await expect(page.getByRole("button", { name: "提示", exact: true })).toBeDisabled();
  await capture(page, viewport.label, "endless-hint-disabled");

  await context.close();
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  await assertThemeOverrides(browser);
  await assertUnrepairedExhibitHidden(browser);
  for (const viewport of viewports) {
    console.log(`开始验收 ${viewport.label}`);
    await runViewport(browser, viewport);
  }
  assert.deepEqual(pageErrors, [], `页面运行错误：${pageErrors.join(" | ")}`);
  fs.writeFileSync(
    path.join(QA_ROOT, "browser-results.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        base,
        platform: {
          browser: "Chrome",
          channel: "chrome",
          deviceScaleFactor: 1,
        },
        viewports,
        checks: {
          themeRefreshOverride: "通过",
          unrepairedExhibitHidden: "通过",
          imagesDecoded: "通过",
          textOverflow: "通过",
          elementBounds: "通过",
          homeExhibitOverlap: "通过",
          pageErrors,
        },
        records,
      },
      null,
      2,
    ),
  );
  console.log(`通过：${viewports.length} 个视口、${records.length} 张玩家路径截图`);
} finally {
  await browser.close();
}
