/**
 * 结算页（设施复苏）回归门禁：
 * 1) 大图必须是本关实际修复的设施，且与面板灰/彩对比图和标题一致（不再固定旋转木马）；
 * 2) 背景、设施、标题、角色不允许被拉伸变形；
 * 3) 「通关奖励」只画一次（不再叠已烘焙文字的背景图）；
 * 4) 面板内清单、奖励、成绩与底部按钮互不遮挡；
 * 5) 重玩时奖励是「已领取」状态而不是三个 +0。
 */
import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { openFreshHome, finishFirstGuide, solveThroughInput } from "./park_test_player";

const baseUrl = process.env.PARK_TEST_URL || "http://127.0.0.1:4173";
const root = process.env.PARK_QA_DIR || "docs/QA/victory-page-2026-11-21";
fs.mkdirSync(`${root}/screens`, { recursive: true });

const MEASURE = `(() => {
  const box = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const img = el instanceof HTMLImageElement ? el : el.querySelector("img");
    return {
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
      objectFit: style.objectFit,
      boxRatio: rect.width / rect.height,
      artRatio: img && img.naturalHeight ? img.naturalWidth / img.naturalHeight : null,
    };
  };
  const backgrounds = Array.from(document.querySelectorAll(".park-victory *"))
    .map((el) => getComputedStyle(el).backgroundImage)
    .filter((value) => value && value !== "none");
  const page = document.querySelector(".park-victory");
  return {
    stage: { width: page.clientWidth, height: page.clientHeight },
    victoryBackground: getComputedStyle(page).backgroundColor,
    victoryBackgroundSize: getComputedStyle(page).backgroundSize,
    victoryBackgroundImage: getComputedStyle(page).backgroundImage,
    backgrounds,
    sign: box(".park-red-sign"),
    list: box(".park-repair-checklist"),
    compareActive: box(".park-compare-stage.is-active"),
    rewardTitle: box(".park-reward-title"),
    rewards: box(".park-rewards"),
    score: box(".park-result-score"),
    panel: box(".park-victory-panel"),
    actions: box(".park-victory-actions"),
    replay: box(".park-history-link.park-replay-link"),
    facility: box(".park-victory-facility"),
    titleBanner: box(".park-victory-title img"),
    friends: Array.from(document.querySelectorAll(".park-victory-friends img")).map((img) => ({
      objectFit: getComputedStyle(img).objectFit,
      boxRatio: img.getBoundingClientRect().width / img.getBoundingClientRect().height,
      artRatio: img.naturalWidth / img.naturalHeight,
    })),
    friendsBox: box(".park-victory-friends"),
    facilitySrc: document.querySelector(".park-victory-facility")?.getAttribute("src") ?? "",
    compareSrc: document.querySelector(".park-compare-stage.is-active img")?.getAttribute("src") ?? "",
    dormantSrc: document.querySelector(".park-compare-stage.is-dormant img")?.getAttribute("src") ?? "",
    signText: document.querySelector(".park-red-sign span")?.textContent ?? "",
    rewardTitleText: document.querySelector(".park-reward-title")?.textContent ?? "",
    rewardNumbers: Array.from(document.querySelectorAll(".park-reward-slot b")).map((el) => el.textContent),
    rewardIcons: Array.from(document.querySelectorAll(".park-reward-slot img")).map((el) => el.getAttribute("src") ?? ""),
    scoreText: document.querySelector(".park-result-score")?.textContent ?? "",
  };
})()`;

type Box = {
  top: number;
  bottom: number;
  width: number;
  height: number;
  objectFit: string;
  boxRatio: number;
  artRatio: number | null;
};
type Snapshot = {
  stage: { width: number; height: number };
  victoryBackground: string;
  victoryBackgroundSize: string;
  victoryBackgroundImage: string;
  backgrounds: string[];
  sign: Box;
  list: Box;
  compareActive: Box;
  rewardTitle: Box;
  rewards: Box;
  score: Box;
  panel: Box;
  actions: Box;
  replay: Box;
  facility: Box;
  titleBanner: Box;
  friends: { objectFit: string; boxRatio: number; artRatio: number }[];
  friendsBox: Box;
  facilitySrc: string;
  compareSrc: string;
  dormantSrc: string;
  signText: string;
  rewardTitleText: string;
  rewardNumbers: string[];
  rewardIcons: string[];
  scoreText: string;
};

async function reachVictory(page: import("@playwright/test").Page) {
  await page.goto(baseUrl);
  await page.evaluate(() => {
    for (const key of Object.keys(localStorage)) localStorage.removeItem(key);
  });
  await page.reload();
  await openFreshHome(page, baseUrl);
  await page.getByRole("button", { name: "开始修复" }).first().click();
  await page.waitForTimeout(400);
  await finishFirstGuide(page);
  await solveThroughInput(page, 1);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const results: unknown[] = [];
try {
  for (const [width, height, scale, label] of [
    [390, 844, 1, "390x844"],
    [361, 727, 1, "361x727"],
    [360, 640, 3, "360x640"],
    [360, 640, 2, "720x1280"],
    [360, 800, 3, "360x800"],
    [449, 877, 897 / 449, "897x1752"],
    [449, 878, 897 / 449, "897x1754"],
    [456, 763, 2, "456x763"],
  ] as const) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: scale });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    await reachVictory(page);
    await page.screenshot({ path: `${root}/screens/victory-${label}.png` });
    const first = (await page.evaluate(MEASURE)) as Snapshot;

    // 1) 大图、灰态、彩态必须是同一件设施；标题也必须是这件设施
    assert.equal(first.facilitySrc, first.compareSrc, `${label} 大图与已修复设施不一致`);
    assert.equal(first.dormantSrc, first.compareSrc, `${label} 灰态与彩态设施不一致`);
    assert.ok(!/\/carousel\.webp$/.test(first.facilitySrc), `${label} 大图回退成了旋转木马`);
    assert.match(first.facilitySrc, /exhibit-0/, `${label} 大图不是展品素材`);
    assert.ok(first.signText.length > 0, `${label} 修复牌没有设施名`);

    // 2) 不允许拉伸：背景必须 cover，图片必须 contain/等比
    assert.equal(first.victoryBackgroundSize, "cover", `${label} 背景不是 cover，会被拉伸`);
    assert.match(first.victoryBackgroundImage, /victory-bg-v3\.webp/, `${label} 背景不是新的无主体素材`);
    assert.equal(first.facility.objectFit, "contain", `${label} 设施大图未等比`);
    assert.notEqual(first.titleBanner.objectFit, "fill", `${label} 标题未等比`);
    for (const friend of first.friends) assert.equal(friend.objectFit, "contain", `${label} 角色未等比`);
    assert.ok(first.titleBanner.artRatio !== null, `${label} 标题素材未加载`);
    assert.ok(Math.abs(first.titleBanner.boxRatio - (first.titleBanner.artRatio ?? 0)) < 0.02, `${label} 标题被拉伸`);
    for (const friend of first.friends)
      assert.ok(Math.abs(friend.boxRatio - friend.artRatio) < 0.02, `${label} 角色被拉伸`);

    // 3) 「通关奖励」只出现一次：文字 + 无字丝带，不允许再引用带字的旧背景图
    assert.equal(first.rewardTitleText.trim(), "通关奖励", `${label} 奖励牌文字重复或错误`);
    for (const background of first.backgrounds)
      assert.ok(!background.includes("reward-ribbon-v2"), `${label} 奖励牌仍引用带字烘焙素材`);
    assert.ok(
      first.backgrounds.some((background) => background.includes("reward-ribbon.webp")),
      `${label} 奖励牌没有使用无字丝带`,
    );

    // 4) 面板内部与底部操作区不重叠
    assert.ok(first.sign.bottom <= first.list.top + 1, `${label} 修复牌遮挡清单`);
    assert.ok(first.list.bottom <= first.rewardTitle.top + 1, `${label} 奖励牌遮挡清单`);
    assert.ok(first.rewards.bottom <= first.score.top + 1, `${label} 奖励遮挡成绩`);
    assert.ok(first.panel.bottom <= first.actions.top + 1, `${label} 面板遮挡操作按钮`);
    assert.ok(first.actions.bottom <= first.replay.top + 1, `${label} 操作按钮遮挡重玩入口`);
    assert.ok(first.replay.bottom <= first.stage.height + 1, `${label} 重玩入口超出屏幕`);
    assert.ok(first.score.bottom <= first.panel.bottom + 1, `${label} 成绩行超出面板，会被底部按钮压住`);
    const occlusion = (first.facility.bottom - first.friendsBox.top) / first.stage.height;
    assert.ok(occlusion <= 0.045, `${label} 大图被角色遮挡 ${(occlusion * 100).toFixed(1)}%，超过 4.5%`);

    // 5) 首通：奖励都是新增数值；重玩：槽位显示已领取，不再是 +0；金币已下线，只剩星星与钻石
    assert.equal(first.rewardNumbers.length, 2, `${label} 奖励槽位数量不是 2（金币应已下线）`);
    for (const amount of first.rewardNumbers) assert.match(amount, /^\+\d+$/, `${label} 首通奖励数值异常`);
    for (const icon of first.rewardIcons) assert.ok(!icon.includes("icon-coin"), `${label} 结算页仍在显示金币图标`);
    await page.locator(".park-history-link.park-replay-link").click();
    await page.waitForTimeout(600);
    await finishFirstGuide(page);
    await solveThroughInput(page, 1);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);
    const replay = (await page.evaluate(MEASURE)) as Snapshot;
    assert.deepEqual(replay.rewardNumbers, ["已领取", "已领取"], `${label} 重玩奖励没有改成已领取状态`);
    assert.match(replay.scoreText, /已用 \d+ 步/, `${label} 成绩行文案异常`);

    assert.deepEqual(errors, [], `${label} 页面运行时报错`);
    results.push({ viewport: label, stage: first.stage, first, replay, status: "通过" });
    await context.close();
  }
  fs.writeFileSync(
    `${root}/victory-page-results.json`,
    JSON.stringify({ base: baseUrl, date: new Date().toISOString(), results }, null, 2),
  );
  console.log("通过：结算页大图对应本关设施、素材等比、奖励牌唯一、版面不重叠、重玩奖励为已领取状态。");
} finally {
  await browser.close();
}
