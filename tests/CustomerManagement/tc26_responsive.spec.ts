import {test,expect} from '@playwright/test';

test('TC06 - Responsive UI test (mobile)', async ({ browser }) => {
    // Set up a mobile viewport size
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    
    // Navigate to the customer management page
    await page.goto('http://localhost:3000/customers');
    
    // Verify that the form is visible
    await expect(page.locator('form')).toBeVisible();
    
    // Verify that the customer table is visible
    await expect(page.locator('table')).toBeVisible();
  });
  