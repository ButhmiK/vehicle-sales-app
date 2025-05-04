import { test, expect } from '@playwright/test';

declare global {
  interface Window {
    __print_called?: boolean;
  }
}

test('should trigger print dialog on button click', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  // Login
  await page.click('text=Login');
  await page.fill('input[placeholder="Email"]', 'qwert@123');
  await page.fill('input[placeholder="Password"]', '123');
  await page.click('button:has-text("Login")');
  await page.waitForNavigation();

  // Navigate to vehicles
  await page.goto('http://localhost:3000/vehicles');

  // Spy on window.print
  await page.addInitScript(() => {
    window.print = () => {
      window.__print_called = true;
    };
  });


  await page.reload();

  await page.click('button:has-text("Print")');

  const printCalled = await page.evaluate(() => !!window.__print_called);
  expect(printCalled).toBe(true);
});
