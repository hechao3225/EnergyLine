import { expect, type Page } from "@playwright/test";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { solveMinTaps } from "./solve-min-par";

export async function openFreshHome(page: Page, url: string) {
  await page.goto(url);
  await page.locator(".park-home").waitFor();
  if (await page.locator(".park-modal-story").count()) {
    const closeBtn = page.getByRole("button", { name: /关闭|×/ });
    if (await closeBtn.count()) {
      await closeBtn.first().click();
    } else {
      await page.getByRole("button", { name: "一起出发" }).click();
    }
  }
}

export async function finishFirstGuide(page: Page, capture?: (step: number) => Promise<void>) {
  const seen = await page.evaluate(() => localStorage.getItem("honeycomb_onboarding_v1"));
  if (seen === "1") return;
  if (!await page.locator(".park-modal-onboarding").count()) return;
  for (let step = 1; step <= 3; step++) {
    await capture?.(step);
    const btn = page.getByRole("button", { name: /开始连接|开始修复|下一步/ });
    if (await btn.count()) await btn.first().click();
  }
}

export async function solveThroughInput(page: Page, id: number, beforeVictory?: () => Promise<void>) {
  const level = DEFAULT_LEVELS.find((item) => item.id === id)!;
  // 复用主干已有精确求解器规划操作，通过真实按钮执行，不注入棋盘或胜利状态。
  const solution = solveMinTaps(level);
  for (const move of [...solution.plan].reverse()) {
    for (let tap = 0; tap < move.rotateTaps; tap++)
      await page.locator(`[data-tile-id="${move.id}"] .park-tile-rotate`).click();
    if (move.toggle) await page.locator(`[data-tile-id="${move.id}"] .park-switch-toggle`).click();
  }
  const total = level.tiles.filter((tile) => tile.type === "bulb").length;
  await expect(page.getByTestId("target-count")).toHaveText(`${total}/${total}`);
  await beforeVictory?.();
  await page.locator(".park-victory").waitFor();
  return solution;
}
