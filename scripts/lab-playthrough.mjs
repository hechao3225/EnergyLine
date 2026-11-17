/**
 * 玩法实验关的端到端回归：起静态服务 + 无头 Chrome，用 CDP 真实点击跑一遍
 * P1（合作）/ P2（冲突）两张实验关，并截图。
 *
 * 前置：`npm run build` 产物在 dist/；macOS 自带 python3 与 Chrome。
 * 用法：`npm run lab:play`
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const OUT = process.env.LAB_QA_DIR || 'docs/QA/axis-slice-2026-11-14';
const HTTP_PORT = Number(process.env.LAB_HTTP_PORT || 4199);
const CDP_PORT = Number(process.env.LAB_CDP_PORT || 9222);
const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL_ = `http://127.0.0.1:${HTTP_PORT}/`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

fs.mkdirSync(OUT, { recursive: true });
const server = spawn('python3', ['-m', 'http.server', String(HTTP_PORT)], { cwd: 'dist', stdio: 'ignore' });
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=390,844',
  '--force-device-scale-factor=2', `--remote-debugging-port=${CDP_PORT}`,
  `--user-data-dir=${fs.mkdtempSync('/tmp/lab-chrome-')}`, '--no-first-run',
  '--no-default-browser-check', 'about:blank',
], { stdio: 'ignore' });

const stop = () => { server.kill(); chrome.kill(); };
process.on('exit', stop);
await sleep(4000);

const list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Runtime.exceptionThrown') errors.push('EXC: ' + (m.params.exceptionDetails?.exception?.description ?? ''));
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push('ERR: ' + m.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
};
const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;
const shot = async (name) => {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(r.result.data, 'base64'));
};
const click = async (sel, wait = 240) => { await ev(`document.querySelector('${sel}')?.click()`); await sleep(wait); };
const lit = () => ev("document.querySelector('[data-testid=target-count]')?.textContent");
const steps = () => ev("document.querySelector('[data-testid=remaining-steps]')?.textContent");
const closeDialogs = async () => {
  for (let i = 0; i < 3; i++) {
    const closed = await ev("(() => { const b = document.querySelector('[aria-label=\"关闭\"]'); if (!b) return false; b.click(); return true; })()");
    if (!closed) break;
    await sleep(400);
  }
};
const enterLab = async (index) => {
  await send('Page.navigate', { url: URL_ });
  await sleep(2200);
  await ev("[...document.querySelectorAll('button')].find(b=>b.textContent?.includes('一起出发'))?.click()");
  await sleep(900);
  if (await ev("!!document.querySelector('.park-play')")) await click('[aria-label="返回乐园"]', 900);
  await shot('01-home');
  await ev(`document.querySelectorAll('.park-lab-entry')[${index}]?.click()`);
  await sleep(1200);
  await closeDialogs();
  await sleep(300);
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

// ── P1 合作：点一次轴，三格同时归位 ──
await enterLab(0);
const p1Start = { steps: await steps(), lit: await lit() };
await shot('02-p1-start');
await click('[data-tile-id="lab-3-3"] .park-tile-rotate', 500);
const p1Axis = await ev("Array.from(document.querySelectorAll('[data-axis]')).map(e => e.dataset.tileId + ':' + e.dataset.rotation).join(' | ')");
await shot('03-p1-axis-once');
await click('[data-tile-id="lab-3-1"] .park-tile-rotate');
await click('[data-tile-id="lab-3-2"] .park-tile-rotate');
await click('[data-tile-id="lab-3-2"] .park-tile-rotate');
await click('[data-tile-id="lab-2-2"] .park-tile-rotate');
await click('[data-tile-id="lab-1-2"] .park-tile-rotate');
await sleep(1800);
const p1Win = await ev("!!document.querySelector('.park-victory')");
await shot('04-p1-victory');

// ── P2 冲突：右边先亮，一拧轴就灭，只能绕下面 ──
await enterLab(1);
const p2Start = { steps: await steps(), lit: await lit() };
await shot('05-p2-start');
await click('[data-tile-id="lab-3-1"] .park-tile-rotate', 500);
await click('[data-tile-id="lab-2-2"] .park-tile-rotate', 700);
const p2RightLit = await lit();
await shot('06-p2-right-lit');
await click('[data-tile-id="lab-1-2"] .park-tile-rotate', 800);
const p2AfterAxis = await lit();
await shot('07-p2-axis-breaks-right');
await click('[data-tile-id="lab-4-2"] .park-tile-rotate');
await click('[data-tile-id="lab-5-2"] .park-tile-rotate');
await sleep(1800);
const p2Win = await ev("!!document.querySelector('.park-victory')");
await shot('08-p2-victory');

// ── P3 忍住不修：通关了，但轴上还有一格是歪的 ──
await enterLab(2);
const p3Start = { steps: await steps(), lit: await lit() };
await shot('09-p3-start');
await click('[data-tile-id="lab-3-3"] .park-tile-rotate', 400);
await click('[data-tile-id="lab-2-2"] .park-tile-rotate');
await click('[data-tile-id="lab-1-2"] .park-tile-rotate');
await click('[data-tile-id="lab-1-2"] .park-tile-rotate', 150);
const p3Lit = await lit();
const p3Decoy = await ev("document.querySelector('[data-tile-id=lab-5-2]')?.dataset.rotation");
await shot('10-p3-cleared-but-bent');
await sleep(1800);
const p3Win = await ev("!!document.querySelector('.park-victory')");
await shot('11-p3-victory');

// ── 失败态 + 道具 ──
await enterLab(0);
for (let i = 0; i < 7; i++) await click('[data-tile-id=lab-4-4] .park-tile-rotate', 150);
await sleep(700);
const oos = await ev("document.querySelector('.park-out-of-steps')?.innerText?.replace(/[\\n]+/g,' / ')");
await shot('12-out-of-steps');

console.log(JSON.stringify({
  p1Start, p1AxisAfterOneTap: p1Axis, p1Victory: p1Win,
  p2Start, p2RightLit, p2AfterAxis, p2Victory: p2Win,
  p3Start, p3Lit, p3DecoyRotation: p3Decoy, p3Victory: p3Win,
  outOfSteps: oos, consoleErrors: errors,
}, null, 2));
ws.close();
stop();
