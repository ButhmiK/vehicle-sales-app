import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test.describe('Vehicle Management and Dashboard Pages', () => {
  // TC01: Verify Vehicle Management Page Loads with Correct Title
  test('should load Vehicle Management page with correct title', async ({ page }) => {
    await page.goto(`${baseUrl}/vehicles`);
    await expect(page.locator('h1')).toHaveText('Vehicle Management');
  });

  // TC02: Add a New Vehicle
  test('should add a new vehicle', async ({ page }) => {
    await page.goto(`${baseUrl}/vehicles`);
    await page.fill('input[placeholder="Make"]', 'Honda');
    await page.fill('input[placeholder="Model"]', 'Civic');
    await page.fill('input[placeholder="Year"]', '2021');
    await page.fill('input[placeholder="Price"]', '22000');
    await page.selectOption('select', 'Sedan');
    await page.fill('input[placeholder="Image URL"]', 'https://example.com/honda-civic.jpg');
    await page.click('button:text("Add Vehicle")');
    await expect(page.locator('td')).toContainText('Honda Civic');
  });

  // TC03: Edit an Existing Vehicle
  test('should edit an existing vehicle', async ({ page }) => {
    await page.goto(`${baseUrl}/vehicles`);
    await page.click('text=Edit'); // Assumes first vehicle has an Edit button
    await page.fill('input[placeholder="Price"]', '22000');
    await page.click('button:text("Update Vehicle")');
    await expect(page.locator('td')).toContainText('22000');
  });

  // TC04: Delete a Vehicle
  test('should delete a vehicle', async ({ page }) => {
    await page.goto(`${baseUrl}/vehicles`);
    const initialCount = await page.locator('tbody tr').count();
    await page.click('text=Delete'); // Assumes first vehicle has a Delete button
    await expect(page.locator('tbody tr')).toHaveCount(initialCount - 1);
  });

  // TC05: Verify Dashboard Page Loads with Summary Data
  test('should load Dashboard page with summary data', async ({ page }) => {
    await page.goto(`${baseUrl}/dashboard`);
    await expect(page.locator('p')).toContainText('Total Vehicles:');
    await expect(page.locator('p')).toContainText('Total Sales:');
  });

  // TC06: Verify Vehicle Table Sorting
  test('should sort vehicle table by price', async ({ page }) => {
    await page.goto(`${baseUrl}/vehicles`);
    await page.click('th:text("Price")'); // Assumes price column is sortable
    const prices = await page.locator('td:nth-child(5)').allTextContents(); // Adjust index based on column order
    const sortedPrices = [...prices].sort((a, b) => Number(a) - Number(b));
    expect(prices).toEqual(sortedPrices);
  });

  // TC07: Handle API Failure on Vehicle Load
  test('should show error on API failure', async ({ page }) => {
    await page.route('**/api/vehicles**', route => route.fulfill({ status: 500, body: JSON.stringify({ message: 'Server error' }) }));
    await page.goto(`${baseUrl}/vehicles`);
    await expect(page.locator('p')).toHaveText('Failed to load vehicles');
  });

  // TC08: Verify Dashboard Chart Rendering
  test('should render dashboard chart', async ({ page }) => {
    await page.goto(`${baseUrl}/dashboard`);
    await expect(page.locator('canvas') || page.locator('img')).toBeVisible(); // Adjust based on chart implementation
  });

  // TC09: Test Navigation Between Pages
  test('should navigate from Vehicles to Dashboard', async ({ page }) => {
    await page.goto(`${baseUrl}/vehicles`);
    await page.click('a:text("Dashboard")'); // Assumes a link exists
    await expect(page).toHaveURL(`${baseUrl}/dashboard`);
    await expect(page.locator('h1')).toHaveText('Dashboard Overview');
  });

  // TC10: Validate Form Input Constraints
  test('should reject invalid form input', async ({ page }) => {
    await page.goto(`${baseUrl}/vehicles`);
    await page.fill('input[placeholder="Price"]', '-100');
    await page.click('button:text("Add Vehicle")');
    await expect(page.locator('p')).toContainText('Invalid price'); // Assumes error handling
    await expect(page.locator('td')).not.toContainText('-100');
  });
});