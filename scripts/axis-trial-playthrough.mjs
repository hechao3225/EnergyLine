/**
 * 主线试玩回归：?trial=axis 下连打 41–50（41–43 手写、44–50 生成），
 * 用 fixture 里的解自动通关并截图。
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const OUT = process.env.LAB_QA_DIR || 'docs/QA/axis-trial-2026-11-14';
const HTTP_PORT = Number(process.env.LAB_HTTP_PORT || 4200);
const CDP_PORT = Number(process.env.LAB_CDP_PORT || 9223);
const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL_ = `http://127.0.0.1:${HTTP_PORT}/?trial=axis`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const solutions = JSON.parse(fs.readFileSync(path.resolve('scripts/fixtures/axis-solutions.json'), 'utf8'));
// 41–43 是手写实验板，瓦片 id 前缀是 lab-*
const HAND = {
  '41': { groups: [{ axis: 'ax-1', cells: ['lab-3-3', 'lab-3-4', 'lab-4-3'] }], phases: { 'ax-1': 1 }, individual: [{ id: 'lab-3-1', taps: 1 }, { id: 'lab-3-2', taps: 2 }, { id: 'lab-2-2', taps: 1 }, { id: 'lab-1-2', taps: 1 }] },
  '42': { groups: [{ axis: 'ax-1', cells: ['lab-1-2', 'lab-3-3', 'lab-4-3'] }], phases: { 'ax-1': 1 }, individual: [{ id: 'lab-3-1', taps: 1 }, { id: 'lab-2-2', taps: 1 }, { id: 'lab-4-2', taps: 1 }, { id: 'lab-5-2', taps: 1 }] },
  '43': { groups: [{ axis: 'ax-1', cells: ['lab-3-3', 'lab-4-3', 'lab-5-3', 'lab-5-2'] }], phases: { 'ax-1': 1 }, individual: [{ id: 'lab-2-2', taps: 1 }, { id: 'lab-1-2', taps: 2 }] },
};

fs.mkdirSync(OUT, { recursive: true });
const server = spawn('python3', ['-m', 'http.server', String(HTTP_PORT)], { cwd: 'dist', stdio: 'ignore' });
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=390,844',
  '--force-device-scale-factor=2', `--remote-debugging-port=${CDP_PORT}`,
  `--user-data-dir=${fs.mkdtempSync('/tmp/trial-chrome-')}`, '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
const stop = () => { server.kill(); chrome.kill(); };
process.on('exit', stop);
await sleep(4000);

const list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); const errors = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Runtime.exceptionThrown') errors.push('EXC: ' + (m.params.exceptionDetails?.exception?.description ?? ''));
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push('ERR: ' + m.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
};
const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;
const shot = async (name) => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(r.result.data, 'base64')); };
const click = async (sel, wait = 120) => { await ev(`document.querySelector('${sel}')?.click()`); await sleep(wait); };
const tap = async (tileId, times) => { for (let i = 0; i < times; i++) await click(`[data-tile-id="${tileId}"] .park-tile-rotate`, 110); };
const openLevel = async (n) => {
  // 先回首页，否则关卡选择入口不在 DOM 里
  if (await ev("!!document.querySelector('.park-victory')")) {
    await ev("[...document.querySelectorAll('button')].find(b=>b.textContent?.includes('返回乐园'))?.click()");
    await sleep(800);
  } else if (await ev("!!document.querySelector('.park-play')")) {
    await click('[aria-label="返回乐园"]', 800);
  }
  await ev("document.querySelector('[aria-label=\"关闭\"]')?.click()"); await sleep(200);
  await ev("[...document.querySelectorAll('.park-nav button')].find(b=>b.textContent?.includes('关卡'))?.click()"); await sleep(500);
  const chapter = Math.min(4, Math.ceil(n / 20) - 1);
  await ev(`[...document.querySelectorAll('.park-chapter-tabs button')][${chapter}]?.click()`); await sleep(300);
  await click(`[aria-label="修复第${n}处设施"]`, 700);
  await ev("document.querySelector('[aria-label=\"关闭\"]')?.click()"); await sleep(200);
};

await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send('Page.navigate', { url: URL_ }); await sleep(2400);
await ev("[...document.querySelectorAll('button')].find(b=>b.textContent?.includes('一起出发'))?.click()"); await sleep(900);
if (await ev("!!document.querySelector('.park-play')")) await click('[aria-label="返回乐园"]', 700);

const report = {};
for (const n of [41, 42, 43, 44, 45, 46, 47, 48, 49, 50]) {
  await openLevel(n);
  const startSteps = await ev("document.querySelector('[data-testid=remaining-steps]')?.textContent");
  const title = await ev("document.querySelector('.park-level-sign')?.textContent");
  if (n >= 44) await shot(`2${n - 40}-l${n}-start`);
  const sol = n >= 44 ? solutions[String(n)] : HAND[String(n)];
  for (const g of sol.groups) await tap(g.cells[0], sol.phases[g.axis] ?? 0);
  for (const it of sol.individual) await tap(it.id, it.taps);
  await sleep(1700);
  const victory = await ev("!!document.querySelector('.park-victory')");
  const used = await ev("document.querySelector('.park-victory')?.innerText?.match(/已用 (\\d+) 步/)?.[1]");
  report[n] = { title, startSteps, victory, used };
  if (n === 50) await shot('30-l50-victory');
  if (await ev("!!document.querySelector('.park-victory')")) {
    await ev("[...document.querySelectorAll('button')].find(b=>b.textContent?.includes('下一关'))?.click()"); await sleep(900);
  }
}
console.log(JSON.stringify({ report, consoleErrors: errors }, null, 2));
ws.close();
stop();
