import { test, expect } from '@playwright/test';

test('Homepage should have correct title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Vehicle Sales App/i);
});
