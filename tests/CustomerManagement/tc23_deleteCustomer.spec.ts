import { test, expect } from '@playwright/test';

test('Delete a customer', async ({ page }) => {
     
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  
  await page.goto('http://localhost:3000/customers');
    
    const customerRow = page.locator('tr', { hasText: 'John Doe' });
  
    await customerRow.locator('button:has-text("Delete")').click();
    
    await expect(customerRow).toHaveCount(0);
  });
  