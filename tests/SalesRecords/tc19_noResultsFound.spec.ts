import {test, expect} from '@playwright/test';

test('Display message when no search results found', async ({ page }) => {
    await page.goto('http://localhost:3000/sales');
  
    await page.fill('input[placeholder="Search by customer, vehicle, or status"]', 'NotExist');
    await page.click('button:has-text("Search")');
  
    await expect(page.locator('text=No records found'));
  });
  