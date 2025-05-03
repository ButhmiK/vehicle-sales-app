import { test, expect } from '@playwright/test';

test('Edit an existing customer', async ({ page }) => {
  
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  
  await page.goto('http://localhost:3000/customers');

  
  const firstRow = page.locator('table tbody tr').first();
  await firstRow.locator('button:has-text("Edit")').click();

  await page.fill('input[placeholder="Phone"]', '9876543210');

  await page.click('button:has-text("Update Customer")');
  
  const updatedRow = page.locator('table tbody tr').first();
  await expect(updatedRow).toContainText('9876543210');
});
