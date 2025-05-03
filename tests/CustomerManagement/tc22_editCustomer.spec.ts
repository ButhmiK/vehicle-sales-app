import { test, expect } from '@playwright/test';

test('TC02 - Edit an existing customer', async ({ page }) => {

  await page.goto('http://localhost:3000/login');

  
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button[type="submit"]');

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/customers');

    // Click the "Edit" button for the existing customer
    await page.click('button:has-text("Edit")');
    
    // Modify the phone number field
    await page.fill('input[placeholder="Phone"]', '9876543210');
    
    // Click the "Update Customer" button
    await page.click('button:has-text("Update Customer")');
    
    // Verify that the phone number has been updated in the customer list
    await expect(page.locator('td')).toContainText('9876543210');
  });
  
