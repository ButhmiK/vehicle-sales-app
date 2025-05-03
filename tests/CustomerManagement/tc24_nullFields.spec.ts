import {test,expect} from '@playwright/test';

test('Required field validation', async ({ page }) => {
   
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button[type="submit"]');

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/customers');
    
    
    await page.click('button:has-text("Add Customer")');
    
    const invalidFields = await page.locator('input:invalid').count();
    expect(invalidFields).toBeGreaterThan(0);
  });
  