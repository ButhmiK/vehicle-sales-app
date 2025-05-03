import {test,expect} from '@playwright/test';

test('Validate required fields in sale form', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  await page.click('text=Login');
  
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button:has-text("Login")'); 

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/sales');
  
    await page.click('button:has-text("Add Sale")');
  
    
    await expect(page.locator('form')).toBeVisible(); 
  });
  