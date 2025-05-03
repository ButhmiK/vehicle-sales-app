import {test, expect} from '@playwright/test';

test('Filter sales by status', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  await page.click('text=Login');
  
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button:has-text("Login")'); 

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/sales');
  
    
    
    await page.fill('input[placeholder="Search by customer, vehicle, or status"]', 'Completed');
  
    await page.click('button:has-text("Search")');
  
  
    await expect(page.locator('td')).toContainText(['Completed']);
  });
  