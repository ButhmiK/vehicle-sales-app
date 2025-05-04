import { test, expect } from '@playwright/test';



test('should edit an existing vehicle', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  await page.click('text=Login');
  
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button:has-text("Login")'); 

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/vehicles'); 

    await page.click('button:has-text("Edit")');
    await page.fill('input[placeholder="Model"]', 'UpdatedModel');
    await page.click('button:has-text("Update Vehicle")');
    await expect(page.locator('table')).toContainText('UpdatedModel');
  });
