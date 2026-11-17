import fs from 'node:fs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch('http://127.0.0.1:9224/json/list')).json();
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
const ev = async (x) => (await send('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true })).result?.result?.value;
await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'http://127.0.0.1:4211/' }); await sleep(2500);
await ev("[...document.querySelectorAll('button')].find(b=>b.textContent?.includes('一起出发'))?.click()"); await sleep(800);
if (await ev("!!document.querySelector('.park-play')")) { await ev("document.querySelector('[aria-label=\"返回乐园\"]')?.click()"); await sleep(800); }
console.log('lab buttons:', await ev("[...document.querySelectorAll('.park-lab-entry')].map(b=>b.textContent).join(' | ')"));
console.log('script:', await ev("[...document.querySelectorAll('script')].map(s=>s.src).filter(Boolean).join(',')"));
ws.close();
