import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { getLevelContent } from "../src/content";
import { CHAPTER1_SCHEDULE } from "../src/data/chapter1Schedule";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { solveRuleLevel } from "../src/utils/rule-solver";
import { clickStep, openStoryLevel } from "./playwright-game-actions";

const BASE_URL = process.env.CHAPTER1_URL ?? "http://127.0.0.1:4328/";
const OUTPUT_DIR = path.resolve("docs/QA/chapter1-2026-11-18");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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
for (const spec of CHAPTER1_SCHEDULE) {
  await openStoryLevel(page, BASE_URL, spec.id);
  await page.evaluate(() => document.fonts.ready);
  const screenshot = `level-${String(spec.id).padStart(2, "0")}.jpg`;
  await page.screenshot({
    path: path.join(OUTPUT_DIR, screenshot),
    type: "jpeg",
    quality: 84,
    animations: "allow",
  });

  const level = DEFAULT_LEVELS.find((item) => item.id === spec.id)!;
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error(`L${spec.id} 没有规则解`);
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

fs.writeFileSync(
  path.join(OUTPUT_DIR, "result.json"),
  JSON.stringify({ levels, errors }, null, 2),
);
console.log(JSON.stringify({ levels, errors }, null, 2));

await browser.close();
