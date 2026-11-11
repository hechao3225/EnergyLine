/**
 * 交互冒烟测试（M2 运行时验收）：
 * 移动视口 + CDP 触摸事件驱动真实点击/长按/拖拽，采集 console 日志与页面错误。
 * 复用系统 Chrome（playwright-core 不带浏览器）。
 */
import { chromium } from 'playwright-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const logs = [];
const pageErrors = [];

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
});

const page = await context.newPage();
page.on('console', (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', (err) => pageErrors.push(String(err)));

const cdp = await context.newCDPSession(page);

const touchDown = (x, y) =>
  cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] });
const touchMove = (x, y) =>
  cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y, id: 1 }] });
const touchUp = () =>
  cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tap(x, y) {
  await touchDown(x, y);
  await sleep(60);
  await touchUp();
  await sleep(250);
}

await page.goto('http://localhost:3001', { waitUntil: 'load' });
await sleep(600);

const results = [];
const check = (name, ok) => {
  results.push(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) process.exitCode = 1;
};

// 布局坐标（与 DemoScene 一致）：top=8
// 按钮A (115, 138)  按钮B (275, 138)  滚动列表 top=208，行高 56
const LIST_TOP = 208;

// 1. 点击滚动列表第 1 行
await tap(195, LIST_TOP + 28);
check('点击列表第 1 行', logs.some((l) => l.includes('点击了第 1 行')));

// 2. 点击按钮 A（tap 命中 + tween 不报错）
await tap(115, 138);
check('点击按钮 A 无报错', pageErrors.length === 0);

// 3. 长按按钮 B（confetti）
await touchDown(275, 138);
await sleep(620);
await touchUp();
await sleep(300);
check('长按撒花触发', logs.some((l) => l.includes('长按触发')));

// 4. 拖拽滚动列表（上滑 200px）
await touchDown(195, LIST_TOP + 56 * 4 + 28);
for (let i = 1; i <= 10; i++) {
  await touchMove(195, LIST_TOP + 56 * 4 + 28 - i * 20);
  await sleep(30);
}
await touchUp();
await sleep(400);

// 5. 滚动后同一屏幕位置点击 → 命中不同行号（验证滚动 + 命中一致）
await tap(195, LIST_TOP + 28);
const rowHits = logs.filter((l) => l.includes('点击了第')).map((l) => l.match(/第 (\d+) 行/)?.[1]);
check('滚动后行号偏移（拖拽生效）', rowHits.length >= 2 && rowHits[rowHits.length - 1] !== '1');

// 6. 全程无页面错误
check('无 pageerror', pageErrors.length === 0);

console.log('──────── 交互冒烟结果 ────────');
for (const r of results) console.log(r);
console.log('console 手势日志:');
for (const l of logs.filter((l) => l.includes('点击了') || l.includes('长按'))) console.log('  ' + l);
if (pageErrors.length) {
  console.log('页面错误:');
  for (const e of pageErrors) console.log('  ' + e);
}

await browser.close();
