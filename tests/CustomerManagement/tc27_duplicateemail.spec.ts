import {test, expect} from '@playwright/test';

test('Duplicate email entry', async ({ page }) => {
     
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  
  await page.goto('http://localhost:3000/customers');
    
   
    await page.fill('input[placeholder="Name"]', 'SaKmaN');
    await page.fill('input[placeholder="Email"]', 'jane@example.com');
    await page.fill('input[placeholder="Phone"]', '0000000000');
    await page.fill('input[placeholder="Address"]', 'Kandy');
    await page.selectOption('select', 'Business');
    
    
    await page.click('button:has-text("Add Customer")');
    
  
    const errorMessage = await page.locator('text=Email is already in use').isVisible();
    expect(errorMessage).toBe(true);
  });
  