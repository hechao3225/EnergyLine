/**
 * 重置链路回归（2026-11-22「闯关重置点了没反应」）。
 *
 * 背景：局内重置原先靠 window.confirm 二次确认。安卓 WebView、小游戏壳、
 * 浏览器勾过「阻止此页面创建更多对话框」之后，confirm 会不弹窗直接返回
 * false，代码在 if (!ok) return 处静默退出 —— 玩家看到的就是按钮没反应。
 *
 * 这个用例做两件事：
 *  1. 在「原生对话框完全不可用」的环境里跑通整条重置链路；
 *  2. 记账 window.confirm / dialog 事件，任何一次原生弹窗调用都算回归失败。
 */
import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { finishFirstGuide, openFreshHome } from "./park_test_player";

/** 源码护栏：src 里不允许再出现原生对话框调用（它们会在 WebView / 小游戏壳里静默失效） */
function scanNativeDialogCalls(dir: string, hits: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanNativeDialogCalls(full, hits);
    else if (/\.(ts|tsx)$/.test(entry.name)) {
      fs.readFileSync(full, "utf8")
        .split("\n")
        .forEach((line, index) => {
          if (/window\.(confirm|alert|prompt)\s*\(/.test(line)) {
            hits.push(`${full}:${index + 1}`);
          }
        });
    }
  }
  return hits;
}

const URL = process.env.PARK_TEST_URL || "http://127.0.0.1:3000";
const BUDGET = DEFAULT_LEVELS[0].maxSteps;

const failures: string[] = [];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
const page = await context.newPage();

const pageErrors: string[] = [];
page.on("pageerror", (error) => pageErrors.push(error.message));
// 原生对话框一律拒绝（等价于被宿主静默拦截的环境），只记账不参与流程
const nativeDialogs: string[] = [];
page.on("dialog", async (dialog) => {
  nativeDialogs.push(dialog.message());
  await dialog.dismiss();
});

async function check(name: string, run: () => Promise<void>) {
  try {
    await run();
    console.log("通过：" + name);
  } catch (error) {
    failures.push(name);
    console.error("失败：" + name + " —— " + (error as Error).message);
  }
}

const remaining = () => page.getByTestId("remaining-steps");
const footprint = () => page.getByRole("button", { name: /操作足迹/ });

try {
  await check("运行时代码里不再出现 window.confirm/alert/prompt", async () => {
    expect(scanNativeDialogCalls(path.resolve("src"))).toEqual([]);
  });

  await page.addInitScript(() => {
    // 记录 window.confirm 调用次数：重置链路一旦回退到原生确认就会 > 0
    (window as unknown as { __confirmCalls: number }).__confirmCalls = 0;
    const native = window.confirm.bind(window);
    window.confirm = (message?: string) => {
      (window as unknown as { __confirmCalls: number }).__confirmCalls += 1;
      return native(message ?? "");
    };
  });

  await openFreshHome(page, URL);
  await page.getByRole("button", { name: "开始修复", exact: true }).click();
  await finishFirstGuide(page);
  await expect(remaining()).toHaveText(String(BUDGET));

  const tile = page.locator('[data-tile-id="t-2-2"] .park-tile-rotate');

  await check("走过步数后重置必须先弹游戏内确认，取消不改任何状态", async () => {
    for (let i = 0; i < 3; i++) await tile.click();
    await expect(remaining()).toHaveText(String(BUDGET - 3));
    await expect(footprint()).toContainText("3 步");
    await page.getByRole("button", { name: "重置", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "重置本局" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "取消", exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await expect(remaining()).toHaveText(String(BUDGET - 3));
    await expect(footprint()).toContainText("3 步");
  });

  await check("确认重置把盘面、步数、足迹一起还原", async () => {
    await page.getByRole("button", { name: "重置", exact: true }).click();
    await page.getByRole("button", { name: "确定重置", exact: true }).click();
    await expect(remaining()).toHaveText(String(BUDGET));
    await expect(footprint()).toContainText("0 步");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  await check("空局点重置不弹确认，直接重来", async () => {
    await page.getByRole("button", { name: "重置", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(remaining()).toHaveText(String(BUDGET));
  });

  await check("步数用尽后仍能靠重置恢复", async () => {
    for (let i = 0; i < BUDGET; i++) await tile.click();
    await expect(page.getByText("修复步数用完啦", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "撤销一步", exact: true }).click();
    await page.getByRole("button", { name: "重置", exact: true }).click();
    await page.getByRole("button", { name: "确定重置", exact: true }).click();
    await expect(remaining()).toHaveText(String(BUDGET));
    await expect(page.getByText("修复步数用完啦", { exact: true })).toHaveCount(0);
  });

  await check("设置页重置存档同样走游戏内确认，取消后存档完好", async () => {
    await page.getByRole("button", { name: "返回乐园", exact: true }).click();
    await page.locator(".park-home").waitFor();
    await page.getByRole("button", { name: "乐园设置", exact: true }).click();
    await page.getByRole("button", { name: "重置本地存档", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "重置存档" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "取消", exact: true }).click();
    await expect(dialog).toHaveCount(0);
    const saved = await page.evaluate(() => localStorage.getItem("energy_park_progress_v2"));
    expect(saved).not.toBeNull();
  });

  await check("全程没有调用过原生 window.confirm / dialog", async () => {
    const confirmCalls = await page.evaluate(
      () => (window as unknown as { __confirmCalls: number }).__confirmCalls,
    );
    expect(confirmCalls).toBe(0);
    expect(nativeDialogs).toEqual([]);
  });

  await check("重置链路没有页面运行时错误", async () => {
    expect(pageErrors).toEqual([]);
  });
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("重置链路回归失败：" + failures.join("、"));
  process.exit(1);
}
console.log("重置链路回归全部通过");
