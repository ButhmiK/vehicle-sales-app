import {test, expect} from '@playwright/test';

test('Long input string test', async ({ page }) => {
    
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  
  await page.goto('http://localhost:3000/customers');
   
    await page.fill('input[placeholder="Name"]', 'A'.repeat(120));
    await page.fill('input[placeholder="Email"]', 'long@input.com');
    await page.fill('input[placeholder="Phone"]', '9999999999');
    await page.fill('input[placeholder="Address"]', 'B'.repeat(200));
    await page.selectOption('select', 'Business');
    
    
    await page.click('button:has-text("Add Customer")');
    
    await expect(page.locator('td')).toContainText('long@input.com');
  });
  