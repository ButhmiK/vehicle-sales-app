import { test, expect } from '@playwright/test';

test('TC03 - Delete a customer', async ({ page }) => {
    // Navigate to the customer management page
    await page.goto('http://localhost:3000/customers');
    
    // Find the row containing the customer you want to delete (e.g., "John Doe")
    const customerRow = page.locator('tr', { hasText: 'John Doe' });
    
    // Click the "Delete" button for that customer
    await customerRow.locator('button:has-text("Delete")').click();
    
    // (Optional) Handle any confirmation dialog if required
    // await page.click('button:has-text("Confirm")'); // Modify based on actual implementation
  
    // Verify that the customer no longer appears in the list
    await expect(customerRow).toHaveCount(0);
  });
  