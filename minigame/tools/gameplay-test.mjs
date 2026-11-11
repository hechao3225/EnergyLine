/**
 * M2b 核心玩法验收：真实通关测试（触摸事件驱动 + BFS 求解器给出操作序列）。
 * 覆盖：进入关卡 → 逐格旋转/切闸 → 通关判定 → 胜利弹窗 → 下一关流转 → 撤销。
 * 按模拟玩家测试规则记录：console 错误、触控目标尺寸、通关步数与剩余步数。
 */
import { chromium } from 'playwright-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

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
const cdp = await context.newCDPSession(page);

const pageErrors = [];
const consoleErrors = [];
page.on('pageerror', (e) => pageErrors.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});

const touchDown = (x, y) => cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] });
const touchMove = (x, y) => cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y, id: 1 }] });
const touchUp = () => cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tap(x, y, hold = 60) {
  await touchDown(x, y);
  await sleep(hold);
  await touchUp();
  await sleep(200);
}

const results = [];
const check = (name, ok, detail = '') => {
  results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? `（${detail}）` : ''}`);
  if (!ok) process.exitCode = 1;
};

/** 按可见文本定位按钮中心（模拟玩家「看到按钮就点」） */
async function tapButton(text, opts = {}) {
  const list = await page.evaluate(() => window.__game.tapTargets());
  const matches = list.filter((t) => t.cls === 'Button' && t.text === text);
  if (matches.length === 0) throw new Error(`找不到按钮「${text}」`);
  const b = opts.last ? matches[matches.length - 1] : matches[0];
  await tap(b.x, b.y);
  return b;
}

// 全新档案
await page.goto('http://localhost:3001', { waitUntil: 'load' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'load' });
await sleep(700);

// 0. 首次启动的新手引导：跳过（模拟玩家真实操作）
{
  const list = await page.evaluate(() => window.__game.tapTargets());
  const skip = list.find((t) => t.cls === 'Button' && t.text === '跳过');
  if (skip) await tap(skip.x, skip.y);
  await sleep(400);
}

// 1. 首页 → 开始第 1 关（按钮文案随进度变化：开始引泉 / 续玩 N）
{
  const list = await page.evaluate(() => window.__game.tapTargets());
  const start = list.find((t) => t.cls === 'Button' && (t.text === '开始引泉' || (t.text ?? '').startsWith('续玩')));
  if (!start) throw new Error('首页找不到开始/续玩按钮');
  await tap(start.x, start.y);
}
await sleep(500);
let state = await page.evaluate(() => window.__game.state());
check('进入第 1 关', state.levelId === 1, `levelId=${state.levelId}`);

// 触控目标尺寸记录
const board = await page.evaluate(() => window.__game.board());
const cellSize = (board.width * 0.84) / 6;
const touchTargets = {
  瓦片: `${cellSize.toFixed(1)} × ${cellSize.toFixed(1)} CSS px（@2x ≈ ${(cellSize * 2).toFixed(0)} 物理px）`,
  顶栏按钮: '26 × 26 CSS px',
  底部导航按钮: '100 × 30 CSS px',
};

// 2. 求解并通关
const solution = await page.evaluate(() => window.__game.solve(1));
check('第 1 关可解', solution !== null && solution.moves !== undefined, solution ? `最优 ${solution.steps} 步` : 'null');
check('初始未点亮', state.isAllLit === false && state.litCount >= 0, `lit ${state.litCount}/${state.totalBulbs}`);

for (const move of solution.moves) {
  const c = await page.evaluate((id) => window.__game.tileCenter(id), move.tileId);
  if (!c) {
    check(`瓦片坐标 ${move.tileId}`, false);
    break;
  }
  if (move.type === 'switch' && move.action === 'rotate') {
    // 水闸外圈旋转：偏离中心点击
    await tap(c.x + cellSize * 0.32, c.y - cellSize * 0.32);
  } else {
    await tap(c.x, c.y);
  }
  await sleep(80);
}

state = await page.evaluate(() => window.__game.state());
check('通关判定 isAllLit', state.isAllLit === true, `lit ${state.litCount}/${state.totalBulbs}`);
check('步数统计一致', state.stepsUsed === solution.moves.length, `stepsUsed=${state.stepsUsed}, solver=${solution.moves.length}`);
check('剩余步数非负', state.remainingSteps >= 0, `剩余 ${state.remainingSteps}`);

// 3. 胜利弹窗（1100ms 延迟后）
await sleep(1600);
state = await page.evaluate(() => window.__game.state());
check('胜利弹窗弹出', state.victoryModalVisible === true);

// 4. 弹窗「下一关」→ 进入第 2 关（同名按钮有两个，取弹窗内最后添加的那个）
await tapButton('下一关 ›', { last: true });
await sleep(600);
state = await page.evaluate(() => window.__game.state());
check('下一关流转', state.levelId === 2, `levelId=${state.levelId}`);

// 5. 撤销：点一格旋转 → 撤销按钮回滚
const sol2 = await page.evaluate(() => window.__game.solve(2));
if (sol2 && sol2.moves.length > 0) {
  const m = sol2.moves[0];
  const c = await page.evaluate((id) => window.__game.tileCenter(id), m.tileId);
  if (m.type === 'switch' && m.action === 'rotate') {
    await tap(c.x + cellSize * 0.32, c.y - cellSize * 0.32);
  } else {
    await tap(c.x, c.y);
  }
  await sleep(250);
  let s2 = await page.evaluate(() => window.__game.state());
  check('旋转消耗步数', s2.stepsUsed === 1, `stepsUsed=${s2.stepsUsed}`);

  // 撤销按钮：按文本定位
  await tapButton('↩ 撤销');
  await sleep(250);
  s2 = await page.evaluate(() => window.__game.state());
  check('撤销回滚步数', s2.stepsUsed === 0, `stepsUsed=${s2.stepsUsed}`);
}

// 6. 长按透视（非水闸瓦片 500ms 长按不崩溃）
const sol1 = sol2;
if (sol1 && sol1.moves.length > 0) {
  const m = sol1.moves.find((mv) => mv.type !== 'switch') || sol1.moves[0];
  const c = await page.evaluate((id) => window.__game.tileCenter(id), m.tileId);
  await touchDown(c.x, c.y);
  await sleep(520);
  await touchUp();
  await sleep(300);
}

// 7. 进度持久化（通关后 cleared 含第 1 关）
state = await page.evaluate(() => window.__game.state());
check('通关进度持久化', state.cleared.includes(1), `cleared=[${state.cleared}]`);

// 8. 全程零 JS 错误
check('无 pageerror', pageErrors.length === 0, pageErrors.join('; ').slice(0, 120));
check('无 console error', consoleErrors.length === 0, consoleErrors.join('; ').slice(0, 120));

console.log('──────── 通关测试结果 ────────');
for (const r of results) console.log(r);
console.log('触控目标尺寸记录:');
for (const [k, v] of Object.entries(touchTargets)) console.log(`  ${k}: ${v}`);
console.log(`（390×844 视口，deviceScaleFactor 2）`);

await browser.close();
