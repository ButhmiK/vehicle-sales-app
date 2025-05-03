import { test, expect } from '@playwright/test';

test('should display image in vehicle row', async ({ page }) => {
    await page.fill('input[placeholder="Image URL"]', 'https://via.placeholder.com/150');
    await page.click('button:has-text("Add Vehicle")');
    await expect(page.locator('img')).toBeVisible();
  });
  