import fs from 'node:fs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch('http://127.0.0.1:9224/json/list')).json();
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); const errs = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Runtime.exceptionThrown') errs.push(String(m.params.exceptionDetails?.exception?.description ?? '')); };
const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
const ev = async (x) => (await send('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true })).result?.result?.value;
const sn = async (n) => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync('/tmp/shots2/' + n + '.png', Buffer.from(r.result.data, 'base64')); };
const tap = async (t, n = 1) => { for (let i = 0; i < n; i++) { await ev('document.querySelector(`[data-tile-id="' + t + '"] .park-tile-rotate`)?.click()'); await sleep(140); } };
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send('Page.navigate', { url: 'http://127.0.0.1:4211/' }); await sleep(2400);
await ev("Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('一起出发'))?.click()"); await sleep(900);
if (await ev("!!document.querySelector('.park-play')")) { await ev("document.querySelector('.park-round')?.click()"); await sleep(700); }
await ev("document.querySelectorAll('.park-lab-entry')[6]?.click()"); await sleep(1300);
for (let i = 0; i < 3; i++) { const c = await ev("(() => { const b = document.querySelector('.park-close'); if (!b) return false; b.click(); return true; })()"); if (!c) break; await sleep(320); }
await sleep(300);
const info = await ev("({ target: (document.querySelector('[data-testid=target-count]')||{}).textContent, steps: (document.querySelector('[data-testid=remaining-steps]')||{}).textContent })");
await sn('21-s3-start');
await tap('lab-2-1'); await tap('lab-2-2'); await tap('lab-2-3');
await sleep(1700);
const won = await ev("!!document.querySelector('.park-victory')");
await sn('22-s3-red-win');
console.log(JSON.stringify({ info, won, errs: errs.slice(0, 1) }));
ws.close();
