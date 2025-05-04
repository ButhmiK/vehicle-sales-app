import { test, expect } from '@playwright/test';

test('should reset form after successful submission', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  // Login
  await page.click('text=Login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button:has-text("Login")'); 
  await page.waitForNavigation();

  // Navigate to vehicles page
  await page.goto('http://localhost:3000/vehicles'); 

  // Fill form
  await page.fill('input[placeholder="Make"]', 'Nissan');
  await page.fill('input[placeholder="Model"]', 'Aqua');
  await page.fill('input[placeholder="Year"]', '2020');
  await page.fill('input[placeholder="Price"]', '80000');
  await page.selectOption('select', { label: 'Sedan' });
  await page.fill('input[placeholder="Image URL"]', 'https://via.placeholder.com/150');

  // Submit form
  await page.click('button:has-text("Add Vehicle")');

  // ✅ Assert all fields are reset (empty)
  await expect(page.locator('input[placeholder="Make"]')).toHaveValue('');
  await expect(page.locator('input[placeholder="Model"]')).toHaveValue('');
  await expect(page.locator('input[placeholder="Year"]')).toHaveValue('0');
  await expect(page.locator('input[placeholder="Price"]')).toHaveValue('0');
  await expect(page.locator('input[placeholder="Image URL"]')).toHaveValue('');
});
