import type { Page } from '@playwright/test';

export const enableForcedColors = async (page: Page): Promise<void> => {
  await page.emulateMedia({
    forcedColors: 'active',
  });
};

export const enableTextZoom = async (page: Page): Promise<void> => {
  await (await page.context().newCDPSession(page)).send('Page.setFontSizes', {
    fontSizes: {
      standard: 32,
      fixed: 48,
    },
  });
};

export const enableRightToLeft = async (page: Page): Promise<void> => {
  await page.locator('html').evaluate((html) => {
    html.setAttribute('dir', 'rtl');
  });
};
