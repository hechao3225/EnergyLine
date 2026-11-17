import fs from 'node:fs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch('http://127.0.0.1:9224/json/list')).json();
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); const errs = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; } if (m.method === 'Runtime.exceptionThrown') errs.push(String((m.params.exceptionDetails||{}).text)); };
const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
const ev = async (x) => (await send('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true })).result?.result?.value;
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send('Page.navigate', { url: 'http://127.0.0.1:4324/' }); await sleep(1500);
await ev("localStorage.setItem('honeycomb_cleared_levels', JSON.stringify([1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80]))"); await sleep(200);
await send('Page.navigate', { url: 'http://127.0.0.1:4324/' }); await sleep(2400);
await ev("Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('一起出发'))?.click()"); await sleep(900);
if (await ev("!!document.querySelector('.park-play')")) { await ev("document.querySelector('.park-round')?.click()"); await sleep(700); }
await ev("Array.from(document.querySelectorAll('.park-nav button')).find(b => b.textContent.includes('关卡'))?.click()"); await sleep(700);
await ev('document.querySelectorAll(".park-chapter-tabs button")[4]?.click()'); await sleep(500);
const hellCards = await ev("Array.from(document.querySelectorAll('.park-level-card')).filter(c => c.textContent.includes('地狱')).map(c => c.textContent).join(' | ')");
const s1 = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync('/tmp/shots2/131-hell-cards.png', Buffer.from(s1.result.data,'base64'));
await ev('document.querySelector(\'[aria-label="修复第99处设施"]\')?.click()'); await sleep(900);
for (let i = 0; i < 3; i++) { const c = await ev("(() => { const b = document.querySelector('.park-close'); if (!b) return false; b.click(); return true; })()"); if (!c) break; await sleep(300); }
await sleep(300);
const info = await ev("({ title: (document.querySelector('.park-level-sign')||{}).textContent, steps: (document.querySelector('[data-testid=remaining-steps]')||{}).textContent, target: (document.querySelector('[data-testid=target-count]')||{}).textContent })");
const s2 = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync('/tmp/shots2/132-hell-l99.png', Buffer.from(s2.result.data,'base64'));
console.log(JSON.stringify({ hellCards, info, errs: errs.slice(0,2) }));
ws.close();