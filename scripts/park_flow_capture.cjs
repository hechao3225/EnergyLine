const {chromium}=require('@playwright/test');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});const page=await browser.newPage({viewport:{width:390,height:844}});await page.goto('http://localhost:3000');await page.getByRole('button',{name:'开始挑战',exact:true}).click();
for(const [id,count] of [['t-2-2',1],['t-2-3',3],['t-3-3',1]])for(let i=0;i<count;i++)await page.locator(`[data-tile-id="${id}"] .park-tile-rotate`).click();
await page.screenshot({path:'docs/QA/ui2-2026-11-10/flow-first.png'});
for(let i=0;i<2;i++)await page.locator('[data-tile-id="t-4-3"] .park-tile-rotate').click();
await page.waitForSelector('.park-victory');await page.screenshot({path:'docs/QA/ui2-2026-11-10/victory-first.png'});console.log(await page.evaluate(()=>({progress:localStorage.getItem('energy_park_progress_v2'),cleared:localStorage.getItem('honeycomb_cleared_levels')})));await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
