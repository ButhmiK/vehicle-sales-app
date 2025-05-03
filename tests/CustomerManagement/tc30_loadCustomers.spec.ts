import {test,expect} from '@playwright/test';

test('TC10 - Error handling on API failure', async ({ page }) => {
    // Simulate a backend failure by disconnecting the server or mocking an error response
    await page.goto('http://localhost:3000/customers');
    
    // Simulate API failure (e.g., reload page after stopping backend or mock error response)
    await page.reload();
    
    // Verify that an error message is displayed
    await expect(page.locator('text=Failed to load customers')).toBeVisible();
  });
  