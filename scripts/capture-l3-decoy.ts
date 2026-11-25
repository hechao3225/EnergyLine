import { chromium, expect, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { openFreshHome, selectLevelOnMap, finishFirstGuide } from "./park_test_player";

const BASE = "http://127.0.0.1:3000";
const ROOT = path.resolve("docs/QA/l3-decoy-2026-11-22/screens");
fs.mkdirSync(ROOT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const errors: string[] = [];
page.on("pageerror", (e) => errors.push(e.message));

async function shot(name: string) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(ROOT, name + ".png") });
  console.log("shot", name);
}
async function rotate(id: string, count = 1) {
  for (let i = 0; i < count; i++) {
    await page.locator(`[data-tile-id="${id}"] .park-tile-rotate`).click();
    await page.waitForTimeout(60);
  }
}
async function target() {
  return page.getByTestId("target-count").textContent().catch(() => "n/a");
}

await openFreshHome(page, BASE);
await page.getByRole("navigation").getByRole("button", { name: "关卡", exact: true }).click();
await selectLevelOnMap(page, 3);
await finishFirstGuide(page);
await page.waitForTimeout(500);
await shot("l3-01-start");

// 修好主干：上排长管亮起来，但末端弯管是反的，接不到灯
await rotate("t-2-1", 1);
await page.waitForTimeout(500);
const litTopGlow = await target();
await shot("l3-02-top-line-on-but-broken");

// 玩家自己把末端弯管转两下，才把假主路接出去 -> 只亮 1 盏
await rotate("t-0-4", 2);
await page.waitForTimeout(500);
const litAfterBuild = await target();
await shot("l3-03-player-built-one-bulb");

// 放弃上排改走主干：上排熄灭，0/3
await rotate("t-2-2", 3);
await page.waitForTimeout(500);
const litAfterAbandon = await target();
await shot("l3-04-bait-abandoned");

// 十字枢纽分流，三盏同亮
await rotate("t-2-4", 1);
await rotate("t-3-3", 1);
await rotate("t-4-4", 3);
await page.waitForTimeout(800);
const litSolved = await target();
await shot("l3-05-solved");
console.log(JSON.stringify({ litTopGlow, litAfterBuild, litAfterAbandon, litSolved, errors }));
await browser.close();
