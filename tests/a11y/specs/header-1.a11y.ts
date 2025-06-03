import { expect, test } from '../utils';

test.describe('has WCAG 2.2 (AA) compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/patterns/header/1/');
    await expect(page.getByText('Header')).toBeVisible();
  });

  test('with a11y tree', async ({ page }) => {
    await expect(page.locator('body')).toMatchAriaSnapshot({ name: 'header-1.aria.yml' });
  });

  test('with axe', async ({ makeAxeBuilder }) => {
    expect((await makeAxeBuilder().analyze()).violations).toEqual([]);
  });
});
