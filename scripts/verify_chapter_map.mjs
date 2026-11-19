import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();

  // Set seed progress in localStorage to make it rich with cleared, current, unlocked levels
  await page.addInitScript(() => {
    localStorage.setItem('honeycomb_onboarding_v1', '1');
    localStorage.setItem('honeycomb_story_seen_v1', '1');
    // Set cleared levels 1..40 to test chapter 1 & 2 progress
    const progress = {
      version: 1,
      coins: 5280,
      stars: 48,
      hints: 3,
      streak: 5,
      lastDaily: new Date().toISOString().slice(0, 10),
      claimedTasks: [],
      mailRead: true,
      clearedLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      bestSteps: {
        38: 12,
        39: 15,
        40: 16,
      },
      bestLights: {},
      purchasedUpgrades: [],
      unlockedBadges: [],
    };
    localStorage.setItem('energy_park_progress_v1', JSON.stringify(progress));
  });

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Home screen
  fs.mkdirSync('docs/QA/runtime-map-2026-11-17', { recursive: true });
  await page.screenshot({ path: 'docs/QA/runtime-map-2026-11-17/01-home.png' });
  console.log('Saved 01-home.png');

  // 2. Click "关卡" tab in bottom navigation
  const navButtons = await page.$$('.park-nav button');
  if (navButtons.length >= 2) {
    await navButtons[1].click();
  } else {
    await page.click('button:has-text("关卡")');
  }

  await page.waitForSelector('.chapter-map-view', { timeout: 5000 });
  await page.waitForTimeout(800);

  // Screenshot Chapter Map
  await page.screenshot({ path: 'docs/QA/runtime-map-2026-11-17/02-chapter-map-390x844.png' });
  console.log('Saved 02-chapter-map-390x844.png');

  // 3. Scroll down the map
  await page.evaluate(() => {
    const scrollArea = document.querySelector('.chapter-map-scroll-area');
    if (scrollArea) scrollArea.scrollTop += 450;
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'docs/QA/runtime-map-2026-11-17/03-chapter-map-scrolled.png' });
  console.log('Saved 03-chapter-map-scrolled.png');

  // 4. Test Chapter switch arrow
  const nextBtn = await page.$('.chapter-arrow-btn.next');
  if (nextBtn) {
    await nextBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'docs/QA/runtime-map-2026-11-17/04-chapter-map-next-ch.png' });
    console.log('Saved 04-chapter-map-next-ch.png');
  }

  // 5. Click Back Button
  const backBtn = await page.$('.chapter-map-back-btn');
  if (backBtn) {
    await backBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'docs/QA/runtime-map-2026-11-17/05-back-to-home.png' });
    console.log('Saved 05-back-to-home.png');
  }

  // 6. Re-open levels and click an active level node to test entering game
  const navButtonsAgain = await page.$$('.park-nav button');
  if (navButtonsAgain.length >= 2) {
    await navButtonsAgain[1].click();
    await page.waitForSelector('.chapter-map-view', { timeout: 5000 });
    await page.waitForTimeout(500);

    // Click active/unlocked level node
    const nodeBtn = await page.$('.chapter-level-node-btn:not(.map-node-locked)');
    if (nodeBtn) {
      await nodeBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: 'docs/QA/runtime-map-2026-11-17/06-entered-gameplay.png' });
      console.log('Saved 06-entered-gameplay.png');
    }
  }

  await browser.close();
  console.log('All verification steps completed successfully!');
}

main().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
