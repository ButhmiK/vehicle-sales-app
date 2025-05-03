import { test, expect } from '@playwright/test';

test('Add new customer successfully', async ({ page }) => {
  
  await page.goto('http://localhost:3000/login');

  
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button[type="submit"]');

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/customers');

  await page.fill('input[placeholder="Name"]', 'John Doe');
  await page.fill('input[placeholder="Email"]', 'john@example.com');
  await page.fill('input[placeholder="Phone"]', '0712345678');
  await page.fill('input[placeholder="Address"]', '123 Main Street');
  await page.selectOption('select', 'Individual');

  await page.click('button[type="submit"]');

  
  await page.waitForSelector('table tbody tr:last-child', { state: 'attached' });

  const lastRow = page.locator('table tbody tr').last();
  await expect(lastRow).toContainText('John Doe');
  await expect(lastRow).toContainText('john@example.com');
  await expect(lastRow).toContainText('0712345678');
  await expect(lastRow).toContainText('123 Main Street');
  await expect(lastRow).toContainText('Individual');
});
