import { test, expect } from '@playwright/test';

test('Error handling on API failure', async ({ page }) => {

  await page.route('**/api/customers', route =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' }),
    })
  );

  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Email"]', 'qwert@123');
  await page.fill('input[placeholder="Password"]', '123');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await page.goto('http://localhost:3000/customers');
  await expect(page.locator('body')).not.toContainText('');

  
});
