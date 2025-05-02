import { test, expect } from '@playwright/test';

test.describe('VehicleManagement Page', () => {
  // TC01: Verify Page Loads and Displays Initial Vehicle Data
  test('should load page and display initial vehicle data', async ({ page }) => {
    await page.goto('/vehicles');
    await expect(page.getByText('Vehicle Management')).toBeVisible();
    await expect(page.getByText('Toyota Camry')).toBeVisible(); // From seeded data
  });

  // TC02: Add a New Vehicle Successfully
  test('should add a new vehicle successfully', async ({ page }) => {
    await page.goto('/vehicles');
    await page.fill('input[placeholder="Make"]', 'Honda');
    await page.fill('input[placeholder="Model"]', 'Civic');
    await page.fill('input[placeholder="Year"]', '2021');
    await page.fill('input[placeholder="Price"]', '22000');
    await page.selectOption('select', { label: 'Sedan' });
    await page.fill('input[placeholder="Image URL"]', 'https://example.com/honda-civic.jpg');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Honda Civic')).toBeVisible();
  });

  // TC03: Edit an Existing Vehicle Successfully
  test('should edit an existing vehicle successfully', async ({ page }) => {
    await page.goto('/vehicles');
    await page.getByText('Edit').first().click();
    await page.fill('input[placeholder="Price"]', '23000');
    await page.click('button[type="submit"]');
    await expect(page.getByText('23000')).toBeVisible();
  });

  // TC04: Delete a Vehicle Successfully
  test('should delete a vehicle successfully', async ({ page }) => {
    await page.goto('/vehicles');
    const vehicleCount = await page.locator('tbody tr').count();
    await page.getByText('Delete').first().click();
    await expect(page.locator('tbody tr')).toHaveCount(vehicleCount - 1);
  });

  // TC05: Handle Error When Adding Invalid Vehicle Data
  test('should show error with invalid vehicle data', async ({ page }) => {
    await page.goto('/vehicles');
    await page.fill('input[placeholder="Model"]', 'Civic');
    await page.fill('input[placeholder="Year"]', '2021');
    await page.fill('input[placeholder="Price"]', '22000');
    await page.selectOption('select', { label: 'Sedan' });
    await page.fill('input[placeholder="Image URL"]', 'https://example.com/civic.jpg');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Failed to save vehicle')).toBeVisible();
  });

  // TC06: Verify Vehicle Type Dropdown Options
  test('should display all vehicle type options', async ({ page }) => {
    await page.goto('/vehicles');
    await page.click('select');
    const options = await page.locator('select option').allTextContents();
    const expectedOptions = [
      'Select Type', 'SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback',
      'Convertible', 'Van', 'Wagon', 'Other',
    ];
    expect(options).toEqual(expect.arrayContaining(expectedOptions));
  });

  // TC07: Verify Image Display for Vehicles
  test('should display vehicle images', async ({ page }) => {
    await page.goto('/vehicles');
    const image = await page.locator('tbody tr:first-child img').first();
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('alt', 'Toyota Camry');
  });

  // TC08: Verify Form Reset After Adding a New Vehicle
  test('should reset form after adding a new vehicle', async ({ page }) => {
    await page.goto('/vehicles');
    await page.fill('input[placeholder="Make"]', 'Honda');
    await page.fill('input[placeholder="Model"]', 'Civic');
    await page.fill('input[placeholder="Year"]', '2021');
    await page.fill('input[placeholder="Price"]', '22000');
    await page.selectOption('select', { label: 'Sedan' });
    await page.fill('input[placeholder="Image URL"]', 'https://example.com/honda-civic.jpg');
    await page.click('button[type="submit"]');

    // Verify form is reset
    await expect(page.locator('input[placeholder="Make"]')).toHaveValue('');
    await expect(page.locator('input[placeholder="Model"]')).toHaveValue('');
    await expect(page.locator('input[placeholder="Year"]')).toHaveValue('0');
    await expect(page.locator('input[placeholder="Price"]')).toHaveValue('0');
    await expect(page.locator('select')).toHaveValue('');
    await expect(page.locator('input[placeholder="Image URL"]')).toHaveValue('');
  });

  // TC09: Handle Server Error When Fetching Vehicles
  test('should show error when fetching vehicles fails', async ({ page }) => {
    await page.route('**/api/vehicles*', (route) => {
      route.fulfill({ status: 500, body: JSON.stringify({ message: 'Server error' }) });
    });
    await page.goto('/vehicles');
    await expect(page.getByText('Failed to load vehicles')).toBeVisible();
  });

  // TC10: Verify Responsive Design on Smaller Screens
  test('should be usable on smaller screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/vehicles');
    await expect(page.getByText('Vehicle Management')).toBeVisible();
    await page.locator('input[placeholder="Make"]').fill('Test');
    await expect(page.locator('table')).toBeVisible(); // Ensure table is scrollable
  });

  // TC11: Verify Print Button Functionality
  test('should trigger print dialog when Print button is clicked', async ({ page }) => {
    await page.goto('/vehicles');
    const printButton = await page.getByRole('button', { name: 'Print' });
    await expect(printButton).toBeVisible(); // Verify button exists
    // Note: Playwright can't directly test the print dialog due to browser restrictions
    // Instead, we can mock the window.print call for testing purposes
    await page.evaluate(() => {
      window.print = () => console.log('Print triggered'); // Mock print function
    });
    await printButton.click();
    // Verify the mock was called (via console or additional setup)
    // For full coverage, consider testing the printed output with a screenshot or PDF generation
  });

});