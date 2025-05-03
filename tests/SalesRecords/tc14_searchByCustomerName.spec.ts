import { test, expect } from '@playwright/test';

test('Search by customer name', async ({ page }) => {
  // Step 1: Go to login page and log in
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');
  await page.click('text=Login');

  await page.fill('input[placeholder="Email"]', 'qwert@123');
  await page.fill('input[placeholder="Password"]', '123');
  await page.click('button:has-text("Login")');
  await page.waitForNavigation();

  // Step 2: Navigate to sales records
  await page.goto('http://localhost:3000/sales');

  // Step 3: Search by customer name
  await page.fill('input[placeholder="Search by customer, vehicle, or status"]', 'John');
  await page.click('button:has-text("Search")');

 
  const rows = page.locator('table tbody tr');
  const count = await rows.count();
  expect(count).toBeGreaterThan(0);

  
  await expect(rows.first()).toContainText('John');
});
