import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { getLevelContent } from "../src/content";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import type { LevelRole, MechanicTag } from "../src/types/game";
import { solveRuleLevel } from "../src/utils/rule-solver";
import { clickStep, openStoryLevel } from "./playwright-game-actions";

export interface ChapterPlaySchedule {
  id: number;
  title: string;
  primaryMechanic: MechanicTag;
  role: LevelRole;
}

export async function runChapterPlaythrough(options: {
  chapterName: string;
  schedule: ChapterPlaySchedule[];
  outputDir: string;
  baseUrl: string;
}) {
  const outputDir = path.resolve(options.outputDir);
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await context.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem("honeycomb_story_seen_v1", "1");
    localStorage.setItem("honeycomb_onboarding_v1", "1");
    localStorage.setItem("honeycomb_unlock_all", "1");
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const levels: unknown[] = [];
  for (const spec of options.schedule) {
    await openStoryLevel(page, options.baseUrl, spec.id);
    await page.evaluate(() => document.fonts.ready);
    const screenshot = `level-${String(spec.id).padStart(2, "0")}.jpg`;
    await page.screenshot({
      path: path.join(outputDir, screenshot),
      type: "jpeg",
      quality: 84,
      animations: "allow",
    });

    const level = DEFAULT_LEVELS.find((item) => item.id === spec.id);
    const solution = level ? solveRuleLevel(level) : null;
    if (!level || !solution) throw new Error(`L${spec.id} 没有规则解`);
    for (const step of solution.orderedSteps) await clickStep(page, step);

    const measured = await page.evaluate(() => {
      const history = document.querySelector(".park-history-link")?.textContent ?? "";
      const match = history.match(/·\s*(\d+)\s*步/);
      return {
        target: document.querySelector("[data-testid=target-count]")?.textContent?.trim(),
        remaining: document.querySelector("[data-testid=remaining-steps]")?.textContent?.trim(),
        steps: match ? Number(match[1]) : null,
        boardTiles: document.querySelectorAll("[data-tile-id]").length,
        tileWidth: Math.round(
          document.querySelector("[data-tile-id]")?.getBoundingClientRect().width ?? 0,
        ),
        overflowX: document.body.scrollWidth > document.body.clientWidth,
        axisMarks: document.querySelectorAll(".park-axis-mark").length,
        switches: document.querySelectorAll(".park-switch-toggle").length,
        seamGhosts: document.querySelectorAll(".park-wrap-ghost").length,
        weldMarks: document.querySelectorAll(".park-weld-mark").length,
      };
    });
    await page.locator(".park-victory").waitFor({ timeout: 4_000 });
    levels.push({
      id: spec.id,
      title: getLevelContent(spec.id)?.title ?? spec.title,
      primaryMechanic: spec.primaryMechanic,
      role: spec.role,
      par: solution.par,
      screenshot,
      ...measured,
    });
  }

  const result = { chapter: options.chapterName, levels, errors };
  fs.writeFileSync(
    path.join(outputDir, "result.json"),
    JSON.stringify(result, null, 2),
  );
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}
