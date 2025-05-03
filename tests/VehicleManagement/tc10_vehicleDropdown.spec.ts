import { test, expect } from '@playwright/test';

test('should select and display vehicle type', async ({ page }) => {
    await page.selectOption('select', 'Sedan');
    await page.click('button:has-text("Add Vehicle")');
    await expect(page.locator('table')).toContainText('Sedan');
  });
  