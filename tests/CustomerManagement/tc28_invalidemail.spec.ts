import {test,expect} from '@playwright/test';

test('TC08 - Invalid email format validation', async ({ page }) => {
    // Navigate to the customer management page
    await page.goto('http://localhost:3000/customers');
    
    // Fill the form with an invalid email
    await page.fill('input[placeholder="Name"]', 'Invalid Email');
    await page.fill('input[placeholder="Email"]', 'invalid@');
    await page.fill('input[placeholder="Phone"]', '1111111111');
    await page.fill('input[placeholder="Address"]', 'Badulla');
    await page.selectOption('select', 'Individual');
    
    // Attempt to add the customer
    await page.click('button:has-text("Add Customer")');
    
    // Verify that the email field is marked as invalid
    const invalidEmail = await page.locator('input[type="email"]:invalid').isVisible();
    expect(invalidEmail).toBe(true);
  });
  