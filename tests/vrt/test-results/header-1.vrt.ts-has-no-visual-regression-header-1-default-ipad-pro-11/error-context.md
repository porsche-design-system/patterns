# Test info

- Name: has no visual regression "header-1" >> default
- Location: /opt/repository/tests/vrt/specs/header-1.vrt.ts:21:3

# Error details

```
Error: expect(page).toHaveScreenshot(expected)

  525678 pixels (ratio 0.53 of all image pixels) are different.

Expected: /opt/repository/tests/vrt/specs/__screenshots__/header-1-ipad-pro-11.png
Received: /opt/repository/tests/vrt/test-results/header-1.vrt.ts-has-no-visual-regression-header-1-default-ipad-pro-11/header-1-actual.png
    Diff: /opt/repository/tests/vrt/test-results/header-1.vrt.ts-has-no-visual-regression-header-1-default-ipad-pro-11/header-1-diff.png

Call log:
  - expect.toHaveScreenshot(header-1.png) with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 525758 pixels (ratio 0.53 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 525678 pixels (ratio 0.53 of all image pixels) are different.

    at /opt/repository/tests/vrt/specs/header-1.vrt.ts:22:24
```

# Page snapshot

```yaml
- banner:
  - navigation "Main":
    - button "Menu"
    - status
  - link "Porsche":
    - /url: "#"
    - img "Porsche"
  - button "Search"
  - status
  - button "Login"
  - status
- main:
  - heading "Pattern" [level=2]
  - heading "Header" [level=1]
```

# Test source

```ts
   1 | import { expect, test } from '@playwright/test';
   2 | import { enableForcedColors, enableRightToLeft, enableTextZoom } from '../utils';
   3 |
   4 | const pattern = 'header-1';
   5 |
   6 | test.describe(`has no visual regression "${pattern}"`, () => {
   7 |   test.beforeEach(async ({ page }) => {
   8 |     await page.goto('/patterns/header/1/');
   9 |
  10 |     await expect(page.locator('html')).toHaveClass(/hydrated/);
  11 |
  12 |     await page.locator('video').evaluate((video: HTMLVideoElement): void => {
  13 |       video.pause();
  14 |       video.currentTime = 0;
  15 |     });
  16 |
  17 |     // TODO: wait for video
  18 |     await new Promise((resolve) => setTimeout(resolve, 100));
  19 |   });
  20 |
  21 |   test('default', async ({ page }) => {
> 22 |     await expect(page).toHaveScreenshot(`${pattern}.png`, { fullPage: true });
     |                        ^ Error: expect(page).toHaveScreenshot(expected)
  23 |   });
  24 |
  25 |   test.describe(() => {
  26 |     test.skip(({ browserName, viewport }) => browserName !== 'chromium' || viewport.width !== 1280);
  27 |
  28 |     test('right to left', async ({ page }) => {
  29 |       await enableRightToLeft(page);
  30 |       await expect(page).toHaveScreenshot(`${pattern}-rtl.png`, { fullPage: true });
  31 |     });
  32 |
  33 |     test('text zoom', async ({ page }) => {
  34 |       await enableTextZoom(page);
  35 |       await expect(page).toHaveScreenshot(`${pattern}-zoom.png`, { fullPage: true });
  36 |     });
  37 |
  38 |     test('high contrast', async ({ page }) => {
  39 |       await enableForcedColors(page);
  40 |       await expect(page).toHaveScreenshot(`${pattern}-hc.png`, { fullPage: true });
  41 |     });
  42 |   });
  43 | });
  44 |
```