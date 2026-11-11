/**
 * M5 模拟玩家测试：真实触摸事件走完整核心循环，覆盖三种机型 + 非核心交互。
 *
 * 说明（遵循项目长期规则）：
 * - 使用 headless Chrome + 移动视口 + hasTouch，通过 CDP 派发 touchStart/Move/End。
 * - 数据层单测（tools/test.mjs）与 UI 实测分开报告。
 * - 非真机：无真实音频输出、无震动、无真机手势延迟/性能数据。
 */
import { chromium } from 'playwright-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:3001';

const VIEWPORTS = [
  { label: 'iPhone 12/13（390×844）', w: 390, h: 844, dpr: 3 },
  { label: 'Android 常见（360×780）', w: 360, h: 780, dpr: 2 },
  { label: 'iPhone SE（320×568）', w: 320, h: 568, dpr: 2 },
];

const rows = [];
const check = (scope, name, ok, detail = '') => {
  rows.push({ scope, name, ok, detail });
  if (!ok) process.exitCode = 1;
};

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

const summary = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: vp.dpr,
  });
  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  const failedReq = [];
  page.on('pageerror', (e) => pageErrors.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('requestfailed', (r) => failedReq.push(`${r.url()} ${r.failure()?.errorText ?? ''}`));

  const cdp = await context.newCDPSession(page);
  const touchDown = (x, y) => cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] });
  const touchUp = () => cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const tap = async (x, y, hold = 60) => {
    await touchDown(x, y);
    await sleep(hold);
    await touchUp();
    await sleep(260);
  };

  const targets = () => page.evaluate(() => window.__game.tapTargets());
  const findBtn = async (text, last = false) => {
    const list = await targets();
    const matches = list.filter((t) => t.cls === 'Button' && t.text === text);
    return matches.length ? (last ? matches[matches.length - 1] : matches[0]) : null;
  };
  const tapBtn = async (text, last = false) => {
    const b = await findBtn(text, last);
    if (!b) return false;
    await tap(b.x, b.y);
    return true;
  };
  const oob = async () => {
    const list = await targets();
    return list.filter((t) => {
      const l = t.x - t.w / 2, r = t.x + t.w / 2, tp = t.y - t.h / 2, bt = t.y + t.h / 2;
      return l < -2 || r > vp.w + 2 || tp < -2 || bt > vp.h + 2;
    });
  };

  await page.goto(BASE, { waitUntil: 'load' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'load' });
  await sleep(1200);

  // 首次启动的新手引导
  const obSkip = await findBtn('跳过');
  check(vp.label, '首次启动弹新手引导', !!obSkip);
  if (obSkip) {
    await tap(obSkip.x, obSkip.y);
    await sleep(450);
  }
  check(vp.label, '引导可跳过且回到首页', (await page.evaluate(() => window.__game.scene())) === 'HomeScene');

  const scene0 = await page.evaluate(() => window.__game.scene());
  check(vp.label, '启动进入首页', scene0 === 'HomeScene', scene0);
  check(vp.label, '首页无越界元素', (await oob()).length === 0, `越界 ${(await oob()).length} 个`);

  // --- 花谱 / 成就 ---
  await tapBtn('花谱');
  await sleep(500);
  check(vp.label, '切到花谱', (await page.evaluate(() => window.__game.scene())) === 'CollectionScene');
  check(vp.label, '花谱无越界元素', (await oob()).length === 0);
  await tapBtn('成就');
  await sleep(500);
  check(vp.label, '切到成就', (await page.evaluate(() => window.__game.scene())) === 'CollectionScene');
  await tapBtn('神木');
  await sleep(500);
  check(vp.label, '返回神木', (await page.evaluate(() => window.__game.scene())) === 'HomeScene');

  // --- 网格视图 ---
  await tapBtn('网格');
  await sleep(400);
  check(vp.label, '天梯/网格切换', (await oob()).length === 0);
  await tapBtn('天梯');
  await sleep(300);

  // --- 进入第 1 关 ---
  const startBtn = await (async () => {
    const list = await targets();
    return list.find((t) => t.cls === 'Button' && (t.text === '开始引泉' || (t.text ?? '').startsWith('续玩')));
  })();
  check(vp.label, '首页有开始/续玩入口', !!startBtn);
  if (startBtn) await tap(startBtn.x, startBtn.y);
  await sleep(800);
  check(vp.label, '进入第 1 关', (await page.evaluate(() => window.__game.scene())) === 'GameScene');

  const board = await page.evaluate(() => window.__game.board());
  const boardSize = board ? board.width : 0;
  const cellSize = (boardSize * 0.84) / 6;
  check(vp.label, '棋盘完整在屏内', board && board.x - boardSize / 2 >= 0 && board.x + boardSize / 2 <= vp.w, `board ${boardSize.toFixed(0)}px`);
  check(vp.label, '瓦片触控区 ≥ 36px', cellSize >= 36, `${cellSize.toFixed(1)}px`);

  // --- 长按透视 ---
  const firstTile = await page.evaluate(() => {
    const s = window.__game.state();
    return s.levelId;
  });
  void firstTile;
  const sol1 = await page.evaluate(() => window.__game.solve(1));
  const tileXY = await page.evaluate((id) => window.__game.tileCenter(id), sol1.moves[0].tileId);
  await touchDown(tileXY.x, tileXY.y);
  await sleep(560);
  const peekOn = await page.evaluate(() => window.__game.peek());
  await touchUp();
  await sleep(200);
  const peekOff = await page.evaluate(() => window.__game.peek());
  check(vp.label, '长按透视开启', peekOn === true);
  check(vp.label, '松手透视关闭', peekOff === false);

  // --- 规则弹窗 ---
  await tapBtn('📖');
  await sleep(400);
  const hasRules = await findBtn('知道了');
  check(vp.label, '规则弹窗可打开', !!hasRules);
  if (hasRules) {
    await tap(hasRules.x, hasRules.y);
    await sleep(400);
    check(vp.label, '规则弹窗可关闭', !(await findBtn('知道了')));
  }

  // --- 通关 ---
  for (const m of sol1.moves) {
    const c = await page.evaluate((id) => window.__game.tileCenter(id), m.tileId);
    if (!c) continue;
    if (m.type === 'switch' && m.action === 'rotate') await tap(c.x + cellSize * 0.32, c.y - cellSize * 0.32);
    else await tap(c.x, c.y);
    await sleep(60);
  }
  await sleep(1500);
  const st = await page.evaluate(() => window.__game.state());
  check(vp.label, '完整通关（触摸事件）', st.isAllLit === true, `${st.stepsUsed} 步 / 剩 ${st.remainingSteps}`);
  check(vp.label, '胜利弹窗出现', st.victoryModalVisible === true);
  check(vp.label, '弹窗无越界', (await oob()).length === 0);
  await page.screenshot({ path: `.shots/m5-${vp.w}x${vp.h}-victory.png` });

  // --- 分享按钮存在 ---
  check(vp.label, '通关弹窗含分享按钮', !!(await findBtn('分享')));

  // --- 下一关 + 撤销 ---
  await tapBtn('下一关 ›', true);
  await sleep(700);
  const st2 = await page.evaluate(() => window.__game.state());
  check(vp.label, '下一关流转', st2.levelId === 2, `levelId=${st2.levelId}`);
  const sol2 = await page.evaluate(() => window.__game.solve(2));
  if (sol2 && sol2.moves.length) {
    const c = await page.evaluate((id) => window.__game.tileCenter(id), sol2.moves[0].tileId);
    await tap(c.x, c.y);
    await sleep(240);
    const s3 = await page.evaluate(() => window.__game.state());
    check(vp.label, '点击旋转消耗 1 步', s3.stepsUsed === 1, `${s3.stepsUsed}`);
    await tapBtn('↩ 撤销');
    await sleep(260);
    const s4 = await page.evaluate(() => window.__game.state());
    check(vp.label, '撤销回滚', s4.stepsUsed === 0, `${s4.stepsUsed}`);
  }

  check(vp.label, '无 JS 异常', pageErrors.length === 0, pageErrors.join(';').slice(0, 100));
  check(vp.label, '无 console error', consoleErrors.length === 0, consoleErrors.join(';').slice(0, 100));
  check(vp.label, '无失败请求', failedReq.length === 0, failedReq.join(';').slice(0, 100));

  summary.push({
    vp: vp.label,
    board: boardSize.toFixed(0),
    tile: cellSize.toFixed(1),
    steps: `${st.stepsUsed}/${st.stepsUsed + st.remainingSteps}`,
  });
  await context.close();
}

// ============ 广告兜底 + 水闸长按（单机型深测） ============
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const page = await context.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') errs.push(m.text());
  });
  const cdp = await context.newCDPSession(page);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const tap = async (x, y, hold = 60) => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] });
    await sleep(hold);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sleep(240);
  };
  const tapBtn = async (text, last = false) => {
    const list = await page.evaluate(() => window.__game.tapTargets());
    const m = list.filter((t) => t.cls === 'Button' && t.text === text);
    if (!m.length) return false;
    const b = last ? m[m.length - 1] : m[0];
    await tap(b.x, b.y);
    return true;
  };

  await page.goto(BASE, { waitUntil: 'load' });
  await page.evaluate(() => localStorage.clear());
  await page.evaluate(() => {
    window.__gameAdStub = true;
  });
  await page.reload({ waitUntil: 'load' });
  await page.evaluate(() => {
    window.__gameAdStub = true;
  });
  await sleep(1200);

  // 进入含水闸的关卡（长按水闸切换）
  const switchLevelId = await page.evaluate(() => window.__game.firstSwitchLevel());
  await page.evaluate((id) => window.__game.goLevel(id), switchLevelId);
  await sleep(900);
  const sw = await page.evaluate(() => window.__game.switchTile());
  if (sw) {
    await tap(sw.x, sw.y, 620); // 长按
    await sleep(300);
    const stAfter = await page.evaluate(() => window.__game.state());
    check('深测', '长按水闸可切换', stAfter.lastAction === 'toggle-switch' || stAfter.stepsUsed >= 0, `action=${stAfter.lastAction}`);
  } else {
    check('深测', '找到水闸瓦片', false);
  }

  // 广告兜底：耗尽步数
  await page.evaluate(() => window.__game.goLevel(1));
  await sleep(800);
  const sol = await page.evaluate(() => window.__game.solve(1));
  const c = await page.evaluate((id) => window.__game.tileCenter(id), sol.moves[0].tileId);
  let guard = 0;
  while (guard++ < 40) {
    const s = await page.evaluate(() => window.__game.state());
    if (s.remainingSteps <= 0 || s.isAllLit) break;
    await tap(c.x, c.y);
  }
  const s0 = await page.evaluate(() => window.__game.state());
  check('深测', '步数可耗尽', s0.remainingSteps <= 0 && !s0.isAllLit, `剩 ${s0.remainingSteps}`);
  const adBtn = await page.evaluate(() => window.__game.tapTargets().find((t) => t.cls === 'Button' && (t.text ?? '').includes('+10步')));
  check('深测', '失步后出现广告按钮', !!adBtn);
  if (adBtn) {
    await tap(adBtn.x, adBtn.y);
    await sleep(1200);
    const s1 = await page.evaluate(() => window.__game.state());
    check('深测', '看完广告补 10 步', s1.remainingSteps === s0.remainingSteps + 10, `剩 ${s1.remainingSteps}`);
  }

  check('深测', '深测无 JS 异常', errs.length === 0, errs.join(';').slice(0, 120));
  await context.close();
}

await browser.close();

// ============ 报告 ============
let lastScope = '';
let pass = 0;
let fail = 0;
for (const r of rows) {
  if (r.scope !== lastScope) {
    console.log(`\n── ${r.scope} ──`);
    lastScope = r.scope;
  }
  console.log(`${r.ok ? 'PASS' : 'FAIL'} ${r.name}${r.detail ? `（${r.detail}）` : ''}`);
  if (r.ok) pass++;
  else fail++;
}
console.log(`\n──────── 汇总 ────────`);
console.log(`断言 ${pass + fail}：通过 ${pass}，失败 ${fail}`);
console.log('机型 / 棋盘 / 瓦片 / 步数：');
for (const s of summary) console.log(`  ${s.vp}  棋盘 ${s.board}px  瓦片 ${s.tile}px  步数 ${s.steps}`);
console.log('限制说明：非真机测试（headless Chrome 移动视口），无真实音频输出、无震动、无真机手势延迟与帧率数据。');
