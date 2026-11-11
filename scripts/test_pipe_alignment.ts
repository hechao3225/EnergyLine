import { chromium, expect, type Page } from "@playwright/test";
import fs from "node:fs";
import assert from "node:assert/strict";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { simulateCircuit } from "../src/utils/circuit";
import {openFreshHome,finishFirstGuide,solveThroughInput} from "./park_test_player";

const ROOT = process.env.PARK_PIPE_QA_DIR || "docs/QA/pipe-alignment-2026-11-11";
fs.mkdirSync(ROOT, { recursive: true });
const pixelAudit = JSON.parse(fs.readFileSync(`${ROOT}/port-pixel-audit.json`, "utf8"));
const base = process.env.PARK_TEST_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const observations: unknown[] = [];
const errors: string[] = [];

async function rotate(page: Page, id: string, count = 1) {
  for (let i = 0; i < count; i++) await page.locator(`[data-tile-id="${id}"] .park-tile-rotate`).click();
}
async function measure(page: Page, levelId: number, label: string) {
  await page.waitForTimeout(250);
  const cells = await page.locator(".park-tile").evaluateAll((elements) => elements.map((element) => {
    const e = element as HTMLElement;
    const image = e.querySelector("img.park-pipe:not(.park-facility-art)") as HTMLImageElement | null;
    const r = image?.getBoundingClientRect();
    return {
      id: e.dataset.tileId!, rotation: Number(e.dataset.rotation), type: e.dataset.type,
      closed: e.dataset.switch, powered: e.dataset.powered,
      image: image ? { name: image.src.split("/").pop()!.replace("pipe-", "").replace(".webp", ""),
        angle: Number(image.style.transform.match(/rotate\((-?[\d.]+)deg\)/)?.[1] ?? 0),
        x: r!.x, y: r!.y, width: r!.width, height: r!.height } : null,
    };
  }));
  const config = DEFAULT_LEVELS.find((level) => level.id === levelId)!;
  const tiles = config.tiles.map((tile) => {
    const observed = cells.find((cell) => cell.id === tile.id)!;
    return { ...tile, rotation: observed.rotation, switchClosed: tile.type === "switch" ? observed.closed === "true" : tile.switchClosed };
  });
  const simulation = simulateCircuit(tiles, config.gridRows, config.gridCols);
  const connections: unknown[] = [];
  const visited = new Set<string>();
  for (const edge of simulation.poweredEdges) {
    const [from, to] = edge.split("->").map((value) => value.split(",").map(Number));
    const key = [from.join(","), to.join(",")].sort().join("-");
    if (visited.has(key)) continue;
    visited.add(key);
    const a = cells.find((cell) => cell.id === tiles.find((tile) => tile.row === from[0] && tile.col === from[1])!.id)!;
    const b = cells.find((cell) => cell.id === tiles.find((tile) => tile.row === to[0] && tile.col === to[1])!.id)!;
    const direction = from[0] < to[0] ? "bottom" : from[0] > to[0] ? "top" : from[1] < to[1] ? "right" : "left";
    const opposite = { top: "bottom", right: "left", bottom: "top", left: "right" }[direction];
    const points: number[][] = [];
    for (const [cell, port] of [[a, direction], [b, opposite]] as const) {
      const image = cell.image!;
      // 设施的四个入口使用十字接头，装饰主体独立于通路。
      const rotation = ((Math.round(image.angle / 90) * 90) % 360 + 360) % 360;
      const audit = pixelAudit.observations.find((item: any) => item.name === image.name && item.rotation === rotation);
      const mouth = audit.ports[port];
      assert.ok(mouth, `${label} ${cell.id} 可见端口与实际连通方向不符`);
      const center = (mouth.center_px + .5) / 512;
      points.push(port === "left" ? [image.x, image.y + center * image.height] :
        port === "right" ? [image.x + image.width, image.y + center * image.height] :
          port === "top" ? [image.x + center * image.width, image.y] : [image.x + center * image.width, image.y + image.height]);
    }
    const error = Math.hypot(points[0][0] - points[1][0], points[0][1] - points[1][1]);
    assert.ok(error <= .25, `${label} ${edge} 接头错位 ${error.toFixed(3)} CSS像素`);
    connections.push({ edge, endpoint_error_css_px: error });
  }
  assert.ok(connections.length > 0, `${label} 缺少实际供能连接`);
  await page.locator(".park-board").screenshot({ path: `${ROOT}/${label}.png` });
  observations.push({ label, connections });
}
async function select(page: Page, id: number) {
  if (await page.locator(".park-victory").count()) await page.locator(".park-victory-actions").getByRole("button", { name: "返回乐园", exact: true }).click();
  else if (await page.locator(".park-play").count()) await page.getByRole("button", { name: "返回乐园", exact: true }).click();
  await page.getByRole("navigation").getByRole("button", { name: "关卡", exact: true }).click();
  await page.getByRole("button", { name: `${Math.floor((id - 1) / 20) + 1}章`, exact: true }).click();
  await page.getByRole("button", { name: `进入第${id}关`, exact: true }).click();
}
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 640 }, { width: 360, height: 800 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    await openFreshHome(page,base);
    await page.getByRole("button", { name: "开始挑战", exact: true }).click();
    await finishFirstGuide(page);
    await rotate(page, "t-2-2"); await rotate(page, "t-2-3", 3); await rotate(page, "t-3-3");
    await measure(page, 1, `flow-${viewport.width}x${viewport.height}`);
    await rotate(page, "t-4-3", 2);
    await expect(page.getByTestId("target-count")).toHaveText("1/1");
    await measure(page, 1, `connected-${viewport.width}x${viewport.height}`);
    await page.locator(".park-victory").waitFor();
    if (viewport.width === 390) {
      await select(page, 24);
      await solveThroughInput(page, 24, () => measure(page, 24, "switch-and-branches-connected"));
      await select(page, 41);
      await solveThroughInput(page, 41, () => measure(page, 41, "diode-connected"));
    }
    await context.close();
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(`${ROOT}/runtime-port-results.json`, JSON.stringify({ date: new Date().toISOString(), base, status: "通过", observations, errors }, null, 2));
  console.log(`通过：${observations.length} 个真实玩法状态的连通端口对齐，最大允许误差0.25 CSS像素。`);
} finally { await browser.close(); }
