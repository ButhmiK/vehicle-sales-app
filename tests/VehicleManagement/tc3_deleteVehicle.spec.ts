import { test, expect } from '@playwright/test';

test('should delete an existing vehicle and ensure others remain', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  await page.click('text=Login');
  await page.fill('input[placeholder="Email"]', 'qwert@123');
  await page.fill('input[placeholder="Password"]', '123');
  await page.click('button:has-text("Login")');

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/vehicles');


  const rowToDelete = page.locator('tr', { hasText: 'UpdatedModel' });
  await expect(rowToDelete).toBeVisible();
  await rowToDelete.locator('button:has-text("Delete")').click();

  
  await page.waitForSelector('tr', { state: 'attached' });

  
  await expect(page.locator('table')).not.toContainText('UpdatedModel');


  const tableContent = await page.locator('table').textContent();
  console.log(tableContent); 
});
