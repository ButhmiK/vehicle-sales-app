import { test, expect } from '@playwright/test';

test('Search customers by name', async ({ page }) => {
  
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.goto('http://localhost:3000/customers');

  
  await page.fill('input[placeholder="Search by name"]', 'Jane');

  await page.waitForTimeout(1000); 

  const searchResults = page.locator('table tbody tr');
  await expect(searchResults.first()).toContainText('Jane');
});
