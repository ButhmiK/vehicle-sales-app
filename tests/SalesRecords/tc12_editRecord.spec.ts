import { test, expect } from '@playwright/test';

test('Edit an existing sale record', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  await page.click('text=Login');
  
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button:has-text("Login")'); 

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/sales');

  // Wait for edit button and click on the first row's edit
  const firstRow = page.locator('table tbody tr').first();
  await firstRow.locator('button:has-text("Edit")').click();

  // Edit fields
  await page.fill('input[type="number"]', '6000000');
  await page.selectOption('select[required]:nth-of-type(3)', 'Pending');

  await page.click('button:has-text("Update Sale")');

  // Assert the update
  await expect(firstRow).toContainText('Pending');
  await expect(firstRow).toContainText('6000000');
});
