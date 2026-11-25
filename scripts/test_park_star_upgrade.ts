import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
import {
  finishFirstGuide,
  openFreshHome,
  solveThroughInput,
} from "./park_test_player";

const ROOT = process.env.PARK_QA_DIR || "docs/QA/ui2-2026-11-10";
fs.mkdirSync(`${ROOT}/screens`, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors: string[] = [];
page.on("pageerror", (error) => errors.push(error.message));

try {
  await openFreshHome(
    page,
    process.env.PARK_TEST_URL || "http://127.0.0.1:4173",
  );
  await page.getByRole("button", { name: "开始修复", exact: true }).click();
  await finishFirstGuide(page);
  await page.getByRole("button", { name: "返回乐园", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "关卡", exact: true })
    .click();
  await page
    .locator(".park-modal-levels")
    .getByRole("button", { name: "修复第3处设施", exact: true })
    .click();

  // 多转三次未参与通电的诱饵管，正好用满 12 步预算并拿到一星。
  for (let index = 0; index < 3; index++) {
    await page.locator('[data-tile-id="t-0-0"] .park-tile-rotate').click();
  }
  await solveThroughInput(page, 3);
  await expect(page.locator(".park-result-score .park-stars")).toHaveAttribute(
    "aria-label",
    "1星",
  );
  await expect(page.locator(".park-rewards div").first()).toContainText("+1");
  await expect(page.locator(".park-rewards div").nth(1)).toContainText("+100");
  await page.screenshot({ path: `${ROOT}/screens/victory-one-star.png` });

  await page
    .getByRole("button", {
      name: "再玩一次，挑战更高星级",
      exact: true,
    })
    .click();
  await solveThroughInput(page, 3);
  await expect(page.locator(".park-result-score .park-stars")).toHaveAttribute(
    "aria-label",
    "4星",
  );
  await expect(page.locator(".park-rewards div").first()).toContainText("+3");
  await expect(page.locator(".park-rewards div").nth(1)).toContainText("—");
  await expect(page.locator(".park-result-score")).toContainText("首通奖励已领取");

  const progress = await page.evaluate(() => ({
    park: JSON.parse(localStorage.getItem("energy_park_progress_v2")!),
    best: JSON.parse(localStorage.getItem("honeycomb_best_steps")!),
  }));
  expect(progress.park.coins).toBe(100);
  expect(progress.best["3"]).toBe(9);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: `${ROOT}/screens/victory-star-upgrade.png`,
  });
  fs.writeFileSync(
    `${ROOT}/star-upgrade-results.json`,
    JSON.stringify(
      {
        status: "通过",
        firstClearSteps: 12,
        firstStars: 1,
        secondClearSteps: 9,
        starDifference: 3,
        coins: progress.park.coins,
        errors,
      },
      null,
      2,
    ),
  );
  console.log(
    "通过：十二次点击一星通关；重玩九点击提升至四星只补三颗星，货币不重复发放。",
  );
} finally {
  await browser.close();
}
