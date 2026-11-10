import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844}});
const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
const rotate=async(id:string,count=1)=>{for(let i=0;i<count;i++)await page.locator(`[data-tile-id="${id}"] .park-tile-rotate`).click()};
try{
  await page.goto(process.env.PARK_TEST_URL || 'http://127.0.0.1:4173');await page.getByRole('button',{name:'开始挑战',exact:true}).click();
  await rotate('t-2-2',9);await rotate('t-2-3',3);await rotate('t-3-3');await rotate('t-4-3',2);await expect(page.getByTestId('target-count')).toHaveText('1/1');await page.locator('.park-victory').waitFor();
  await expect(page.locator('.park-rewards').locator('div').first()).toContainText('+1');await page.screenshot({path:'docs/QA/ui2-2026-11-10/screens/victory-one-star.png'});
  await page.getByRole('button',{name:'再玩一次，挑战更高星级',exact:true}).click();await rotate('t-2-2');await rotate('t-2-3',3);await rotate('t-3-3');await rotate('t-4-3',2);await page.locator('.park-victory').waitFor();
  await expect(page.locator('.park-rewards').locator('div').first()).toContainText('+2');await expect(page.locator('.park-rewards').locator('div').nth(1)).toContainText('+0');
  const progress=await page.evaluate(()=>({park:JSON.parse(localStorage.getItem('energy_park_progress_v2')!),best:JSON.parse(localStorage.getItem('honeycomb_best_steps')!)}));
  expect(progress.park.coins).toBe(100);expect(progress.park.gems).toBe(10);expect(progress.best['1']).toBe(7);expect(errors).toEqual([]);await page.screenshot({path:'docs/QA/ui2-2026-11-10/screens/victory-star-upgrade.png'});
  fs.writeFileSync('docs/QA/ui2-2026-11-10/star-upgrade-results.json',JSON.stringify({status:'通过',firstClearSteps:15,firstStars:1,secondClearSteps:7,starDifference:2,coins:progress.park.coins,gems:progress.park.gems,errors},null,2));console.log('通过：满步数最后一步接通，一星通关；重玩提升至三星只补两颗星，货币不重复发放。');
}finally{await browser.close()}
