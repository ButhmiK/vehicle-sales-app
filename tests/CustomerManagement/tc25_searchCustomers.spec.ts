import {test, expect} from '@playwright/test';

test('TC05 - Search customers by name', async ({ page }) => {
    // Navigate to the customer management page
    await page.goto('http://localhost:3000/customers');
    
    // Enter a search term (e.g., "John") in the search bar
    await page.fill('input[placeholder="Search by name"]', 'John');
    
    // Verify that the customer list contains customers with names matching "John"
    await expect(page.locator('td')).toContainText('John');
  });
  