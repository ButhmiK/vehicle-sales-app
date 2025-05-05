import { test, expect } from '@playwright/test';

test('Add a new sale record', async ({ page }) => {

  await page.goto('http://localhost:3000');


  await page.click('text=Login');
  await page.fill('input[placeholder="Email"]', 'qwert@123');
  await page.fill('input[placeholder="Password"]', '123');
  await page.click('button:has-text("Login")');
  

  await page.waitForNavigation();
    await page.goto('http://localhost:3000/sales');

  await page.selectOption('select[required]:nth-of-type(1)', { index: 1 });
  await page.selectOption('select[required]:nth-of-type(2)', { index: 1 });
  await page.fill('input[type="date"]', '2024-12-01');
  await page.fill('input[type="number"]', '5500000');
  await page.selectOption('select[required]:nth-of-type(3)', 'Completed');
  await page.click('button:has-text("Add Sale")');

  // Safer check
  const newRow = page.locator('table tbody tr').last();
  await expect(newRow).toContainText('Completed');
  await expect(newRow).toContainText('5500000');
});
