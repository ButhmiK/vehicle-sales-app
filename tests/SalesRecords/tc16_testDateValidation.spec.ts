import {test,expect} from '@playwright/test';

test('Prevent invalid date format in sale form', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  await page.click('text=Login');
  
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button:has-text("Login")'); 

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/sales');
  
    await page.selectOption('select[required]:nth-of-type(1)', { index: 1 });
    await page.selectOption('select[required]:nth-of-type(2)', { index: 1 });
    await page.fill('input[type="date"]', 'invalid-date'); 
  
    await page.fill('input[type="number"]', '4500000');
    await page.selectOption('select[required]:nth-of-type(3)', 'Pending');
  
    await page.click('button:has-text("Add Sale")');
  
    // Assert: form still present or error shown
    await expect(page.locator('form')).toBeVisible();
  });
  