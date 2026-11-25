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

export async function unlockAllChapters(page: Page) {
  // 关卡入口已从弹窗改成章节地图页：新开关是 .chapter-unlock-toggle（幂等，只在未全开时点）
  const mapToggle = page.locator(".chapter-unlock-toggle");
  if (await mapToggle.count()) {
    if ((await mapToggle.textContent())?.trim() !== "全开") await mapToggle.click();
    return;
  }
  const legacy = page.getByRole("button", {
    name: /章节锁定中.*点击临时全解锁/,
  });
  if (await legacy.count()) await legacy.click();
}

/** 章节地图页：切到目标章节（必要时先临时全解锁），选中关卡节点再进关 */
export async function selectLevelOnMap(page: Page, id: number) {
  const map = page.locator(".chapter-map-view");
  await map.waitFor();
  await unlockAllChapters(page);
  const chapter = Math.floor((id - 1) / 20) + 1;
  for (let attempt = 0; attempt < 6; attempt++) {
    const banner = (await map.locator(".chapter-map-banner-title").textContent()) ?? "";
    const current = Number(banner.match(/第(\d+)章/)?.[1] ?? 0);
    if (current === chapter) break;
    await page
      .getByRole("button", { name: current < chapter ? "下一章" : "上一章", exact: true })
      .click();
  }
  await map.getByRole("button", { name: new RegExp(`^第 ${id} 关`) }).click();
  await map
    .locator(".chapter-node-detail")
    .getByRole("button", { name: /开始修复|再次挑战/ })
    .click();
  await expect(page.locator(".park-level-sign")).toHaveText(`第 ${id} 关`);
}

export async function finishFirstGuide(page: Page, capture?: (step: number) => Promise<void>) {
  const seen = await page.evaluate(() => localStorage.getItem("honeycomb_onboarding_v1"));
  if (seen === "1") return;
  // 引导弹窗由 effect 挂载，进关后晚一帧才出现。过去这里直接 count() 判空，
  // 于是刚点完「开始修复」就返回，后续点击全被弹窗挡着——先等它挂上再决定。
  const guide = page.locator(".park-modal-onboarding");
  await guide.waitFor({ state: "visible", timeout: 3000 }).catch(() => undefined);
  if (!await guide.count()) return;
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
