import {test, expect} from '@playwright/test';

test('Cancel editing a sale record', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  await page.click('text=Login');
  
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button:has-text("Login")'); 

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/sales');
  
    // Get original value
    const originalValue = await page.locator('table tbody tr:first-child td:nth-child(4)').innerText();
  
    await page.click('button:has-text("Edit")');
  
    await page.fill('input[type="number"]', '999999');
  
    // Click Cancel
    await page.click('button:has-text("Cancel")');
  
    // Check value unchanged
    const currentValue = await page.locator('table tbody tr:first-child td:nth-child(4)').innerText();
    expect(currentValue).toBe(originalValue);
  });
  