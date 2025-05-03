import { test, expect } from '@playwright/test';

test('should show error if required fields are empty', async ({ page }) => {
    await page.fill('input[placeholder="Model"]', 'Aqua');
    await page.click('button:has-text("Add Vehicle")');
    await expect(page.locator('form')).toContainText('required');
  });
  