import fs from 'node:fs';
const URL_ = 'http://127.0.0.1:4211/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch('http://127.0.0.1:9224/json/list')).json();
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); const errs = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Runtime.exceptionThrown') errs.push(m.params.exceptionDetails?.exception?.description ?? ''); };
const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
const ev = async (x) => (await send('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true })).result?.result?.value;
const snap = async (n) => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync('/tmp/shots2/' + n + '.png', Buffer.from(r.result.data, 'base64')); };
const tap = async (t, n) => { for (let i = 0; i < n; i++) { await ev(`document.querySelector('[data-tile-id="${t}"] .park-tile-rotate')?.click()`); await sleep(130); } };
fs.mkdirSync('/tmp/shots2', { recursive: true });
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send('Page.navigate', { url: URL_ }); await sleep(2400);
await ev("[...document.querySelectorAll('button')].find(b=>b.textContent?.includes('一起出发'))?.click()"); await sleep(900);
if (await ev("!!document.querySelector('.park-play')")) { await ev("document.querySelector('[aria-label=\"返回乐园\"]')?.click()"); await sleep(800); }
await ev("document.querySelectorAll('.park-lab-entry')[3]?.click()"); await sleep(1400);
for (let i = 0; i < 3; i++) { const c = await ev("(() => { const b = document.querySelector('[aria-label=\"关闭\"]'); if (!b) return false; b.click(); return true; })()"); if (!c) break; await sleep(350); }
await sleep(400);
const info = await ev("({ title: document.querySelector('.park-level-sign')?.textContent, steps: document.querySelector('[data-testid=remaining-steps]')?.textContent, target: document.querySelector('[data-testid=target-count]')?.textContent, tiles: document.querySelectorAll('[data-tile-id]').length, colorTiles: document.querySelectorAll('.park-tile[class*=\"color-\"]').length })");
await snap('01-color-start');
for (const [t, n] of [['lab-3-1',1],['lab-3-2',1],['lab-3-4',1],['lab-5-1',1],['lab-5-2',1],['lab-5-4',1]]) await tap(t, n);
await sleep(700);
const mixed = await ev("({ mixed: document.querySelectorAll('.park-tile.color-3').length, target: document.querySelector('[data-testid=target-count]')?.textContent })");
await snap('02-color-mixed');
await tap('lab-3-3', 2); await tap('lab-5-3', 2);
await sleep(1700);
const done = await ev("({ victory: !!document.querySelector('.park-victory'), used: document.querySelector('.park-victory')?.innerText?.match(/已用 (\\d+) 步/)?.[1] })");
await snap('03-color-solved');
console.log(JSON.stringify({ info, mixed, done, errors: errs }));
ws.close();
