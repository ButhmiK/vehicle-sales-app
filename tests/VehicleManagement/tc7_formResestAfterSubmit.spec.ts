import { test, expect } from '@playwright/test';

test('should reset form after successful submission', async ({ page }) => {
    await page.fill('input[placeholder="Make"]', 'Nissan');
    await page.click('button:has-text("Add Vehicle")');
    await expect(page.locator('input[placeholder="Make"]')).toHaveValue('');
  });
  