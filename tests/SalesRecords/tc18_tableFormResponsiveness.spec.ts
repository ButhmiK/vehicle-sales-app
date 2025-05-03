import {test,expect} from '@playwright/test';

test('Responsive layout of sales records page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); 
    await page.goto('http://localhost:3000/sales');

    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });
  