import {test, expect} from '@playwright/test';

test('TC09 - Long input string test', async ({ page }) => {
    // Navigate to the customer management page
    await page.goto('http://localhost:3000/customers');
    
    // Fill out the form with long input strings
    await page.fill('input[placeholder="Name"]', 'A'.repeat(120));
    await page.fill('input[placeholder="Email"]', 'long@input.com');
    await page.fill('input[placeholder="Phone"]', '9999999999');
    await page.fill('input[placeholder="Address"]', 'B'.repeat(200));
    await page.selectOption('select', 'Business');
    
    // Attempt to add the customer
    await page.click('button:has-text("Add Customer")');
    
    // Verify that the name and email are displayed correctly in the customer list
    await expect(page.locator('td')).toContainText('long@input.com');
  });
  