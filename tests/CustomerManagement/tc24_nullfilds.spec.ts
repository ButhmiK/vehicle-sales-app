import {test,expect} from '@playwright/test';

test('TC04 - Required field validation', async ({ page }) => {
    // Navigate to the customer management page
    await page.goto('http://localhost:3000/customers');
    
    // Click the "Add Customer" button without filling any fields
    await page.click('button:has-text("Add Customer")');
    
    // Verify that the required fields show validation errors
    const invalidFields = await page.locator('input:invalid').count();
    expect(invalidFields).toBeGreaterThan(0);
  });
  