import { test, expect } from '@playwright/test';

test('should show price boundary error for low price', async ({ page }) => {
    await page.fill('input[placeholder="Price"]', '40000');
    await page.click('button:has-text("Add Vehicle")');
    await expect(page.locator('p')).toHaveText(/Price must be between/);
  });
  