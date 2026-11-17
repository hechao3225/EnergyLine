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
const open = async (n, chapterIdx) => {
  if (await ev("!!document.querySelector('.park-play')")) { await ev("document.querySelector('.park-round')?.click()"); await sleep(700); }
  await ev("Array.from(document.querySelectorAll('.park-nav button')).find(b => b.textContent.includes('关卡'))?.click()"); await sleep(600);
  await ev('document.querySelectorAll(".park-chapter-tabs button")[' + chapterIdx + ']?.click()'); await sleep(400);
  await ev('document.querySelector(`[aria-label="修复第' + n + '处设施"]`)?.click()'); await sleep(900);
  for (let i = 0; i < 3; i++) { const c = await ev("(() => { const b = document.querySelector('.park-close'); if (!b) return false; b.click(); return true; })()"); if (!c) break; await sleep(300); }
  await sleep(300);
  return ev("({ id: (document.querySelector('.park-level-sign')||{}).textContent, target: (document.querySelector('[data-testid=target-count]')||{}).textContent, steps: (document.querySelector('[data-testid=remaining-steps]')||{}).textContent, caption: (document.querySelector('.park-play-caption')||{}).textContent, tag: (document.querySelector('.park-build-tag')||{}).textContent })");
};
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send('Page.navigate', { url: 'http://127.0.0.1:4314/' }); await sleep(2500);
await ev("Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('一起出发'))?.click()"); await sleep(900);
const l10 = await open(10, 0);
await sn('61-l10-real');
const l30 = await open(30, 1);
await sn('62-l30-real');
console.log(JSON.stringify({ l10, l30, errs: errs.slice(0, 2) }));
ws.close();
