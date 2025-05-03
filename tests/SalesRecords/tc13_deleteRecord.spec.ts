import { test, expect } from '@playwright/test';

test('Delete a sale record', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  // Login
  await page.click('text=Login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button:has-text("Login")'); 
  await page.waitForNavigation();

  // Go to Sales page
  await page.goto('http://localhost:3000/sales');

  // Accept confirmation popup if exists
  page.on('dialog', dialog => dialog.accept());

  // Check if any record exists
  const rows = page.locator('table tbody tr');
  const count = await rows.count();

  if (count === 0) {
    console.log('No records to delete.');
    return;
  }


  await rows.first().locator('button:has-text("Delete")').click();

  await page.waitForTimeout(1000);

  await expect(page).toHaveURL('http://localhost:3000/sales');
});
