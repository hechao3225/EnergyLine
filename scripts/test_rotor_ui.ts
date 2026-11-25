import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { closeTransientModals } from "./playwright-game-actions";

const BASE_URL = process.env.ROTOR_URL ?? "http://127.0.0.1:3001/";
const OUTPUT_DIR = path.resolve("docs/QA/rotor-lab-2026-11-25");
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

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.evaluate(`
  window.__rotorVibrations = [];
  Object.defineProperty(navigator, "vibrate", {
    configurable: true,
    value: function (pattern) {
      window.__rotorVibrations.push(pattern);
      return true;
    }
  });
`);
await closeTransientModals(page);
await page.evaluate(() => document.fonts.ready);

const entry = page.locator(".park-lab-entry.is-rotor");
await entry.waitFor({ timeout: 8_000 });
await entry.scrollIntoViewIfNeeded();
await page.screenshot({
  path: path.join(OUTPUT_DIR, "01-home-rotor-entry-390x844.png"),
  animations: "allow",
});
const homeState = await page.evaluate(() => {
  const button = document.querySelector(".park-lab-entry.is-rotor");
  const rect = button?.getBoundingClientRect();
  const controls = [
    ".park-continue",
    ".park-facility-cards",
    ".park-home-progress",
    ".park-nav",
  ].map((selector) => document.querySelector(selector)?.getBoundingClientRect());
  return {
    label: button?.textContent?.replace(/\s+/g, " ").trim(),
    visible:
      Boolean(rect) &&
      rect!.top >= 0 &&
      rect!.bottom <= window.innerHeight &&
      rect!.left >= 0 &&
      rect!.right <= window.innerWidth,
    bodyOverflowX: document.body.scrollWidth > document.body.clientWidth,
    overlapsCoreControls: controls.some(
      (control) =>
        Boolean(rect && control) &&
        rect!.left < control!.right &&
        rect!.right > control!.left &&
        rect!.top < control!.bottom &&
        rect!.bottom > control!.top,
    ),
  };
});

await entry.click();
await page.waitForSelector(".park-play", { timeout: 8_000 });
await closeTransientModals(page);
await page.evaluate(() => document.fonts.ready);
const lesson = page.getByRole("dialog", { name: "动力转盘教学" });
await lesson.waitFor({ timeout: 4_000 });
await page.screenshot({
  path: path.join(OUTPUT_DIR, "02b-rotor-lesson-390x844.png"),
  animations: "allow",
});
const lessonState = await page.evaluate(() => {
  const card = document.querySelector(
    ".park-rotor-lesson, .park-mechanic-lesson",
  );
  const rect = card?.getBoundingClientRect();
  return {
    steps: document.querySelectorAll(
      ".park-rotor-lesson-steps > div, .park-mechanic-lesson-steps > div",
    ).length,
    orbitVisible: Boolean(
      document.querySelector(
        ".park-rotor-lesson-orbit, .park-mechanic-lesson-orbit",
      )?.getBoundingClientRect().width,
    ),
    insideViewport:
      Boolean(rect) &&
      rect!.top >= 0 &&
      rect!.bottom <= window.innerHeight &&
      rect!.left >= 0 &&
      rect!.right <= window.innerWidth,
    clipped: Array.from(
      document.querySelectorAll(
        ".park-rotor-lesson h2, .park-rotor-lesson span, .park-mechanic-lesson h2, .park-mechanic-lesson span",
      ),
    )
      .filter((node) => {
        const nodeRect = node.getBoundingClientRect();
        return (
          nodeRect.width > 0 &&
          nodeRect.height > 0 &&
          (node.scrollWidth > node.clientWidth + 2 ||
            node.scrollHeight > node.clientHeight + 2)
        );
      })
      .map((node) => node.textContent?.trim())
      .filter(Boolean),
  };
});
await page.getByRole("button", { name: "开始试玩" }).click();
await lesson.waitFor({ state: "hidden" });
await page.screenshot({
  path: path.join(OUTPUT_DIR, "02-rotor-initial-390x844.png"),
  animations: "allow",
});

const initial = await page.evaluate(() => {
  const orbit = document.querySelector(".park-rotor-orbit")?.getBoundingClientRect();
  const board = document.querySelector(".park-board")?.getBoundingClientRect();
  return {
    rotorMark: document.querySelector(".park-rotor-mark")?.textContent?.trim(),
    orbitInsideBoard:
      Boolean(orbit && board) &&
      orbit!.left >= board!.left &&
      orbit!.right <= board!.right &&
      orbit!.top >= board!.top &&
      orbit!.bottom <= board!.bottom,
    target: document.querySelector("[data-testid=target-count]")?.textContent?.trim(),
    caption: document.querySelector(".park-play-caption")?.textContent?.trim(),
    clipped: Array.from(
      document.querySelectorAll(".park-play h1, .park-play p, .park-play button"),
    )
      .filter((node) => {
        const rect = node.getBoundingClientRect();
        const text = node.textContent?.trim() ?? "";
        return (
          text.length > 1 &&
          rect.width > 0 &&
          rect.height > 0 &&
          (node.scrollWidth > node.clientWidth + 2 ||
            node.scrollHeight > node.clientHeight + 2)
        );
      })
      .map((node) => node.textContent?.trim())
      .filter(Boolean),
  };
});

await page.locator('[data-tile-id="lab-2-1"] .park-tile-rotate').click();
await page.waitForTimeout(240);
const motion = await page.evaluate(() => ({
  movingTiles: document.querySelectorAll(".park-rotor-moving-tile").length,
  runningAnimations: Array.from(
    document.querySelectorAll(".park-rotor-moving-tile"),
  ).filter((node) =>
    node.getAnimations().some((animation) => animation.playState === "running"),
  ).length,
  boardShaking: document
    .querySelector(".park-board")
    ?.getAnimations()
    .some((animation) => animation.playState === "running"),
  vibrationPatterns: (
    window as Window & { __rotorVibrations?: (number | number[])[] }
  ).__rotorVibrations,
  callout: document.querySelector(".park-rotor-callout")?.textContent?.trim(),
}));
await page.screenshot({
  path: path.join(OUTPUT_DIR, "03-rotor-spinning-390x844.png"),
  animations: "allow",
});
await page.waitForTimeout(760);
const afterShift = await page.evaluate(() => ({
  active: document.querySelector('[data-tile-id="lab-2-2"]')?.getAttribute("data-rotor-active"),
  movingTiles: document.querySelectorAll(".park-rotor-moving-tile").length,
  switchedTileRowCol: (() => {
    const tile = document.querySelector('[data-tile-id="lab-1-2"]');
    const index = Array.from(document.querySelectorAll("[data-tile-id]")).indexOf(tile!);
    return {
      id: tile?.getAttribute("data-tile-id"),
      position: index,
      switchOpen:
        tile?.querySelector(".park-switch-toggle")?.textContent?.trim() ?? null,
    };
  })(),
  target: document.querySelector("[data-testid=target-count]")?.textContent?.trim(),
  remaining: document.querySelector("[data-testid=remaining-steps]")?.textContent?.trim(),
  caption: document.querySelector(".park-play-caption")?.textContent?.trim(),
}));

await page.locator('[data-tile-id="lab-1-2"] .park-switch-toggle').click();
await page.locator(".park-victory").waitFor({ timeout: 5_000 });
await page.screenshot({
  path: path.join(OUTPUT_DIR, "04-rotor-victory-390x844.png"),
  animations: "allow",
});
const victory = await page.evaluate(() => ({
  title: document.querySelector(".park-victory-title")?.textContent?.trim(),
  steps: document.querySelector(".park-result-score")?.textContent?.replace(/\s+/g, " ").trim(),
}));

await page.setViewportSize({ width: 360, height: 800 });
await page.goto(BASE_URL, { waitUntil: "networkidle" });
await closeTransientModals(page);
const compactEntry = page.locator(".park-lab-entry.is-rotor");
await compactEntry.scrollIntoViewIfNeeded();
await compactEntry.click();
await page.waitForSelector(".park-play", { timeout: 8_000 });
await closeTransientModals(page);
await page.evaluate(() => document.fonts.ready);
const compactLesson = page.getByRole("dialog", { name: "动力转盘教学" });
await compactLesson.waitFor({ timeout: 4_000 });
await page.screenshot({
  path: path.join(OUTPUT_DIR, "05a-rotor-lesson-360x800.png"),
  animations: "allow",
});
const compactLessonState = await page.evaluate(() => {
  const rect = document
    .querySelector(".park-rotor-lesson, .park-mechanic-lesson")
    ?.getBoundingClientRect();
  return {
    insideViewport:
      Boolean(rect) &&
      rect!.top >= 0 &&
      rect!.bottom <= window.innerHeight &&
      rect!.left >= 0 &&
      rect!.right <= window.innerWidth,
    bodyOverflowX: document.body.scrollWidth > document.body.clientWidth,
  };
});
await page.getByRole("button", { name: "开始试玩" }).click();
await compactLesson.waitFor({ state: "hidden" });
await page.screenshot({
  path: path.join(OUTPUT_DIR, "05-rotor-initial-360x800.png"),
  animations: "allow",
});
const compact = await page.evaluate(() => ({
  bodyOverflowX: document.body.scrollWidth > document.body.clientWidth,
  tileWidth: Math.round(
    document.querySelector("[data-tile-id]")?.getBoundingClientRect().width ?? 0,
  ),
  rotorMarkVisible: Boolean(
    document.querySelector(".park-rotor-mark")?.getBoundingClientRect().width,
  ),
  captionHeight: Math.round(
    document.querySelector(".park-play-caption")?.getBoundingClientRect().height ?? 0,
  ),
}));

await browser.close();

const result = {
  homeState,
  lessonState,
  initial,
  motion,
  afterShift,
  victory,
  compactLessonState,
  compact,
  errors,
};
fs.writeFileSync(
  path.join(OUTPUT_DIR, "result.json"),
  JSON.stringify(result, null, 2),
);

if (
  !homeState.visible ||
  homeState.bodyOverflowX ||
  homeState.overlapsCoreControls ||
  !lessonState.insideViewport ||
  lessonState.steps !== 3 ||
  !lessonState.orbitVisible ||
  lessonState.clipped.length > 0 ||
  !initial.orbitInsideBoard ||
  initial.clipped.length > 0 ||
  initial.target !== "0/2" ||
  motion.movingTiles !== 8 ||
  motion.runningAnimations !== 8 ||
  !motion.boardShaking ||
  JSON.stringify(motion.vibrationPatterns?.at(-1)) !==
    JSON.stringify([32, 90, 12, 480, 64]) ||
  motion.callout !== "环轨换位" ||
  afterShift.active !== "true" ||
  afterShift.movingTiles !== 0 ||
  afterShift.target !== "1/2" ||
  afterShift.remaining !== "5" ||
  !compactLessonState.insideViewport ||
  compactLessonState.bodyOverflowX ||
  compact.bodyOverflowX ||
  errors.length > 0
) {
  console.error(JSON.stringify(result, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(result, null, 2));
}
