import type { Page } from "playwright";

export async function closeTransientModals(page: Page) {
  for (let index = 0; index < 5; index++) {
    const close = page.locator(".park-modal .park-close").first();
    if (!(await close.isVisible().catch(() => false))) break;
    await close.click();
    await page.waitForTimeout(160);
  }
}

export async function openStoryLevel(page: Page, baseUrl: string, id: number) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await closeTransientModals(page);
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "关卡", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: `${Math.floor((id - 1) / 20) + 1}章`,
      exact: true,
    })
    .click();
  await page
    .locator(".park-modal-levels")
    .getByRole("button", { name: `修复第${id}处设施`, exact: true })
    .click();
  await page.waitForSelector(".park-play", { timeout: 8_000 });
  await closeTransientModals(page);
}

export async function clickStep(
  page: Page,
  step: { id?: string; axis?: string; toggle?: boolean; taps: number },
) {
  for (let tap = 0; tap < step.taps; tap++) {
    if (step.axis) {
      const tile = page.locator(`[data-axis="${step.axis}"]`).first();
      await tile.locator(".park-tile-rotate").click();
    } else if (step.id && step.toggle) {
      await page
        .locator(`.park-tile[data-tile-id="${step.id}"] .park-switch-toggle`)
        .click();
    } else if (step.id) {
      const tile = page.locator(`.park-tile[data-tile-id="${step.id}"]`);
      const rotate = tile.locator(".park-tile-rotate");
      if ((await tile.getAttribute("data-type")) === "switch") {
        const box = await rotate.boundingBox();
        await rotate.click({
          position: box
            ? { x: box.width * 0.25, y: box.height * 0.25 }
            : undefined,
        });
      } else {
        await rotate.click();
      }
    }
    await page.waitForTimeout(45);
  }
}
