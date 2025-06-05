import { expect, test } from '@playwright/test';
import { enableForcedColors, enableRightToLeft, enableTextZoom } from '../utils';

const pattern = 'header-1';

test.describe(`has no visual regression "${pattern}"`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/patterns/header/1/');

    await expect(page.locator('html')).toHaveClass(/hydrated/);

    await page.locator('video').evaluate((video: HTMLVideoElement): void => {
      video.pause();
      video.currentTime = 0;
    });

    // TODO: wait for video
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  test('default', async ({ page }) => {
    await expect(page).toHaveScreenshot(`${pattern}.png`, { fullPage: true });
  });

  test.describe(() => {
    test.skip(({ browserName, viewport }) => browserName !== 'chromium' || viewport.width !== 1280);

    test('right to left', async ({ page }) => {
      await enableRightToLeft(page);
      await expect(page).toHaveScreenshot(`${pattern}-rtl.png`, { fullPage: true });
    });

    test('text zoom', async ({ page }) => {
      await enableTextZoom(page);
      await expect(page).toHaveScreenshot(`${pattern}-zoom.png`, { fullPage: true });
    });

    test('high contrast', async ({ page }) => {
      await enableForcedColors(page);
      await expect(page).toHaveScreenshot(`${pattern}-hc.png`, { fullPage: true });
    });
  });
});
