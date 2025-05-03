import {test,expect} from '@playwright/test';

test('Invalid email format validation', async ({ page }) => {
     
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  
  await page.goto('http://localhost:3000/customers');
    

    await page.fill('input[placeholder="Name"]', 'wasedcfgb');
    await page.fill('input[placeholder="Email"]', 'iwery6.com');
    await page.fill('input[placeholder="Phone"]', '1111111111');
    await page.fill('input[placeholder="Address"]', 'Badulla');
    await page.selectOption('select', 'Individual');
    

    await page.click('button:has-text("Add Customer")');
    
  
    const invalidEmail = await page.locator('input[type="email"]:invalid').isVisible();
    expect(invalidEmail).toBe(true);
  });
  