import { test, expect } from '@playwright/test';

test('should show year boundary error for future year', async ({ page }) => {
    await page.fill('input[placeholder="Year"]', '2028');
    await page.click('button:has-text("Add Vehicle")');
    await expect(page.locator('p')).toHaveText(/Year must be between/);
  });
  