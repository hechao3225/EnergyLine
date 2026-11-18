import fs from "node:fs";
import path from "node:path";
import { chromium, type Page } from "playwright";
import { LAB_LEVELS } from "../src/data/labLevels";
import { PHASE0_SLICES } from "../src/data/phase0Levels";
import { solveRuleLevel } from "../src/utils/rule-solver";
import {
  clickStep,
  closeTransientModals,
  openStoryLevel,
} from "./playwright-game-actions";

const BASE_URL = process.env.PHASE0_URL ?? "http://127.0.0.1:4328/";
const OUTPUT_DIR = path.resolve("docs/QA/phase0-2026-11-17");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function openLab(page: Page, code: string) {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await closeTransientModals(page);
  const entry = page
    .locator(".park-lab-entry")
    .filter({ hasText: new RegExp(`\\b${code.replace("-", "\\-")}\\b`) })
    .first();
  await entry.scrollIntoViewIfNeeded();
  await entry.click();
  await page.waitForSelector(".park-play", { timeout: 8_000 });
  await closeTransientModals(page);
}

async function screenshot(page: Page, name: string) {
  await page.screenshot({
    path: path.join(OUTPUT_DIR, name),
    animations: "allow",
  });
}

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

const results: Record<string, unknown> = {};

await openLab(page, "T1");
await screenshot(page, "01-wrap-initial.png");
await page.getByRole("button", { name: /^提示/ }).click();
await page.waitForSelector(".park-modal-hint");
await screenshot(page, "02-wrap-hint.png");
await closeTransientModals(page);

const t1 = LAB_LEVELS.find((level) => level.code === "T1")!;
const t1Solution = solveRuleLevel(t1)!;
for (const step of t1Solution.orderedSteps) await clickStep(page, step);
await page.waitForTimeout(90);
await screenshot(page, "03-wrap-seams-lit.png");
results.t1 = await page.evaluate(() => ({
  seams: document.querySelectorAll(".park-wrap-ghost").length,
  board: document.querySelector(".park-board")?.getAttribute("data-wrap"),
  caption: document.querySelector(".park-play-caption")?.textContent?.trim(),
  steps: document.querySelector("[data-testid=remaining-steps]")?.textContent,
  seamRects: Array.from(document.querySelectorAll(".park-wrap-ghost")).map((node) => {
    const rect = node.getBoundingClientRect();
    return {
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  }),
}));

await openLab(page, "W1");
const w1 = LAB_LEVELS.find((level) => level.code === "W1")!;
const w1Solution = solveRuleLevel(w1)!;
let weldCaptured = false;
let weldButtonDisabled = false;
for (const step of w1Solution.orderedSteps) {
  await clickStep(page, step);
  if (!weldCaptured && (await page.locator(".park-weld-flash").count()) > 0) {
    await screenshot(page, "04-weld-lock.png");
    weldButtonDisabled = await page
      .locator(".park-tile.is-welded .park-tile-rotate")
      .first()
      .isDisabled();
    weldCaptured = true;
  }
}
const weldResult = await page.evaluate(() => ({
  captured: Boolean(document.querySelector(".park-weld-flash")),
  marks: document.querySelectorAll(".park-weld-mark").length,
  caption: document.querySelector(".park-play-caption")?.textContent?.trim(),
}));
results.weld = {
  ...weldResult,
  lockedButtonDisabled: weldButtonDisabled,
};

await openLab(page, "C2");
await screenshot(page, "05-colors-weld-initial.png");
results.colors = await page.evaluate(() => ({
  symbols: Array.from(document.querySelectorAll(".park-color-mark")).map((node) =>
    node.getAttribute("data-symbol"),
  ),
  tileWidth: Math.round(
    document.querySelector("[data-tile-id]")?.getBoundingClientRect().width ?? 0,
  ),
  caption: document.querySelector(".park-play-caption")?.textContent?.trim(),
  captionFont: getComputedStyle(
    document.querySelector(".park-play-caption")!,
  ).fontSize,
  symbolFont: getComputedStyle(
    document.querySelector(".park-color-mark")!,
    "::after",
  ).fontSize,
  overflowX: document.body.scrollWidth > document.body.clientWidth,
  clippedText: Array.from(
    document.querySelectorAll(".park-play h1, .park-play h2, .park-play p, .park-play button"),
  )
    .filter((node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.overflow !== "visible" &&
        (node.scrollWidth > node.clientWidth + 2 ||
          node.scrollHeight > node.clientHeight + 2)
      );
    })
    .map((node) => node.textContent?.trim())
    .filter(Boolean),
}));

await openLab(page, "W-1");
await screenshot(page, "06-wrap-weld-initial.png");
const wrapWeld = LAB_LEVELS.find((level) => level.code === "W-1")!;
const wrapWeldSolution = solveRuleLevel(wrapWeld)!;
for (const step of wrapWeldSolution.orderedSteps) await clickStep(page, step);
await page.waitForTimeout(90);
await screenshot(page, "07-wrap-weld-seams.png");
results.wrapWeld = await page.evaluate(() => ({
  seams: document.querySelectorAll(".park-wrap-ghost").length,
  welded: document.querySelectorAll(".park-weld-mark").length,
  caption: document.querySelector(".park-play-caption")?.textContent?.trim(),
}));

await page.setViewportSize({ width: 360, height: 800 });
await openLab(page, "C2");
await screenshot(page, "08-colors-weld-360x800.png");
results.compact = await page.evaluate(() => ({
  bodyOverflowX: document.body.scrollWidth > document.body.clientWidth,
  tileWidth: Math.round(
    document.querySelector("[data-tile-id]")?.getBoundingClientRect().width ?? 0,
  ),
  captionHeight: Math.round(
    document.querySelector(".park-play-caption")?.getBoundingClientRect().height ?? 0,
  ),
}));

const matrix: unknown[] = [];
for (const [index, slice] of PHASE0_SLICES.entries()) {
  if (slice.level.id === 73) await openStoryLevel(page, BASE_URL, 73);
  else {
    const uiCode =
      slice.kind === "combo" && slice.level.code === "W-1"
        ? "W-1"
        : slice.sourceCode;
    await openLab(page, uiCode);
  }
  await page.evaluate(() => document.fonts.ready);

  const matrixName = `matrix-${String(index + 1).padStart(2, "0")}-${slice.key}.jpg`;
  await page.screenshot({
    path: path.join(OUTPUT_DIR, matrixName),
    type: "jpeg",
    quality: 82,
    animations: "allow",
  });

  const solution = solveRuleLevel(slice.level);
  if (!solution) throw new Error(`${slice.key} 没有规则解`);
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
      weldMarks: document.querySelectorAll(".park-weld-mark").length,
      colorSymbols: document.querySelectorAll(".park-color-mark").length,
      seamGhosts: document.querySelectorAll(".park-wrap-ghost").length,
    };
  });
  await page.locator(".park-victory").waitFor({ timeout: 4_000 });
  matrix.push({
    key: slice.key,
    code: slice.level.code,
    par: solution.par,
    screenshot: matrixName,
    ...measured,
  });
}
results.matrix = matrix;

fs.writeFileSync(
  path.join(OUTPUT_DIR, "result.json"),
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ results, errors }, null, 2));

await browser.close();
