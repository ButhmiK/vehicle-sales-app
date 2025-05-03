import {test, expect} from '@playwright/test';

test('TC07 - Duplicate email entry', async ({ page }) => {
    // Navigate to the customer management page
    await page.goto('http://localhost:3000/customers');
    
    // Add a customer with a duplicate email
    await page.fill('input[placeholder="Name"]', 'Duplicate User');
    await page.fill('input[placeholder="Email"]', 'john@example.com');
    await page.fill('input[placeholder="Phone"]', '0000000000');
    await page.fill('input[placeholder="Address"]', 'Kandy');
    await page.selectOption('select', 'Business');
    
    // Try to add the customer
    await page.click('button:has-text("Add Customer")');
    
    // Verify that the email duplication error is shown
    const errorMessage = await page.locator('text=Email is already in use').isVisible();
    expect(errorMessage).toBe(true);
  });
  