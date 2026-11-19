import { expect, type Page } from "@playwright/test";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { solveRuleLevel } from "../src/utils/rule-solver";
import { clickStep } from "./playwright-game-actions";

export async function openFreshHome(page: Page, url: string) {
  await page.goto(url);
  await page.locator(".park-home").waitFor();
  if (await page.locator(".park-modal-story").count())
    await page.getByRole("button", { name: "关闭", exact: true }).click();
}

export async function unlockAllChapters(page: Page) {
  const toggle = page.getByRole("button", {
    name: /章节锁定中.*点击临时全解锁/,
  });
  if (await toggle.count()) await toggle.click();
}

export async function finishFirstGuide(page: Page, capture?: (step: number) => Promise<void>) {
  const seen = await page.evaluate(() => localStorage.getItem("honeycomb_onboarding_v1"));
  if (seen === "1") return;
  await page.locator(".park-modal-onboarding").waitFor();
  for (let step = 1; step <= 3; step++) {
    await capture?.(step);
    await page.getByRole("button", { name: step === 3 ? "开始修复" : "下一步", exact: true }).click();
  }
}

export async function solveThroughInput(page: Page, id: number, beforeVictory?: () => Promise<void>) {
  const level = DEFAULT_LEVELS.find((item) => item.id === id)!;
  // 统一走规则求解器，联动轴、焊死、环面和取舍关都从同一条最优操作序列回放。
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error(`第 ${id} 关没有规则解`);
  for (const move of solution.orderedSteps) {
    await clickStep(page, move);
  }
  const total = level.tiles.filter((tile) => tile.type === "bulb").length;
  await expect(page.getByTestId("target-count")).toHaveText(`${total}/${total}`);
  await beforeVictory?.();
  await page.locator(".park-victory").waitFor();
  return solution;
}
