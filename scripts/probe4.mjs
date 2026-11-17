const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch('http://127.0.0.1:9224/json/list')).json();
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
const ev = async (x) => (await send('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true })).result?.result?.value;
const tap = async (t) => { await ev(`document.querySelector('[data-tile-id="${t}"] .park-tile-rotate')?.click()`); await sleep(120); };
await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'http://127.0.0.1:4211/' }); await sleep(2400);
await ev("[...document.querySelectorAll('button')].find(b=>b.textContent?.includes('一起出发'))?.click()"); await sleep(800);
if (await ev("!!document.querySelector('.park-play')")) { await ev("document.querySelector('[aria-label=\"返回乐园\"]')?.click()"); await sleep(700); }
await ev("document.querySelectorAll('.park-lab-entry')[3]?.click()"); await sleep(1200);
for (let i = 0; i < 3; i++) { const c = await ev("(() => { const b = document.querySelector('[aria-label=\"关闭\"]'); if (!b) return false; b.click(); return true; })()"); if (!c) break; await sleep(300); }
for (const t of ['lab-3-1','lab-3-2','lab-3-4','lab-5-1','lab-5-2','lab-5-4']) await tap(t);
await sleep(500);
console.log(String(await ev("(() => { const marks = document.querySelectorAll('.park-color-mark'); const t = document.querySelector('.park-tile.color-3'); if (!t) return 'no mixed'; const m = t.querySelector('.park-color-mark'); return 'marks=' + marks.length + ' tilecls=' + t.className + ' hasMark=' + !!m + ' rect=' + (m ? JSON.stringify(m.getBoundingClientRect()) : '-') + ' bg=' + (m ? getComputedStyle(m).backgroundColor : '-'); })()")));
ws.close();
