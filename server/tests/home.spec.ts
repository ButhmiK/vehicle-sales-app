import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  // TC01: Verify Page Loads and Displays Initial Vehicle Data
  test('should load page and display initial vehicle data', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Find Available Vehicles')).toBeVisible();
    await expect(page.getByText('Toyota Camry')).toBeVisible(); // From seeded data
  });

  // TC02: Filter Vehicles by Maximum Price
  test('should filter vehicles by maximum price', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Max Price"]', '25000');
    await expect(page.getByText('Toyota Camry')).toBeVisible(); // Price: 20000
    await expect(page.getByText('Ford Explorer')).not.toBeVisible(); // Price: 30000 (assumed)
  });

  // TC03: Filter Vehicles by Year
  test('should filter vehicles by year', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Year"]', '2020');
    await expect(page.getByText('Toyota Camry')).toBeVisible(); // Year: 2020
    await expect(page.getByText('Honda Civic')).not.toBeVisible(); // Year: 2022 (assumed)
  });

  // TC04: Filter Vehicles by Type
  test('should filter vehicles by type', async ({ page }) => {
    await page.goto('/');
    await page.selectOption('select[name="type"]', 'Sedan');
    await expect(page.getByText('Toyota Camry')).toBeVisible(); // Type: Sedan
    await expect(page.getByText('Ford Explorer')).not.toBeVisible(); // Type: SUV (assumed)
  });

  // TC05: Apply Multiple Filters (Price, Year, Type)
  test('should apply multiple filters', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Max Price"]', '25000');
    await page.fill('input[placeholder="Year"]', '2020');
    await page.selectOption('select[name="type"]', 'Sedan');
    await expect(page.getByText('Toyota Camry')).toBeVisible(); // Matches all criteria
    await expect(page.getByText('Ford Explorer')).not.toBeVisible(); // Fails criteria
  });

  // TC06: Clear Filters and Show All Vehicles
  test('should clear filters and show all vehicles', async ({ page }) => {
    await page.goto('/');
    // Apply a filter
    await page.selectOption('select[name="type"]', 'Sedan');
    await expect(page.getByText('Ford Explorer')).not.toBeVisible(); // Type: SUV
    // Clear filters
    await page.selectOption('select[name="type"]', '');
    await expect(page.getByText('Toyota Camry')).toBeVisible();
    await expect(page.getByText('Ford Explorer')).toBeVisible(); // Now visible
  });

  // TC07: Handle Server Error When Fetching Vehicles
  test('should show error when fetching vehicles fails', async ({ page }) => {
    await page.route('**/api/vehicles*', (route) => {
      route.fulfill({ status: 500, body: JSON.stringify({ message: 'Server error' }) });
    });
    await page.goto('/');
    await expect(page.getByText('Failed to load vehicles')).toBeVisible();
  });

  // TC08: Verify Vehicle Card Display with Correct Data
  test('should display vehicle card with correct data', async ({ page }) => {
    await page.goto('/');
    const vehicleCard = page.locator('.grid > div').first(); // Assuming VehicleCard is a div
    await expect(vehicleCard.getByText('Toyota Camry')).toBeVisible();
    await expect(vehicleCard.getByText('2020')).toBeVisible(); // Assumes year is displayed
    await expect(vehicleCard.getByText('$20000')).toBeVisible(); // Assumes price format
    await expect(vehicleCard.getByText('Sedan')).toBeVisible(); // Assumes type is displayed
  });

  // TC09: Verify Responsive Grid Layout on Smaller Screens
  test('should display responsive grid on smaller screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const grid = page.locator('.grid');
    await expect(grid).toHaveClass(/grid-cols-1/); // 1 column on mobile
    await expect(page.getByText('Toyota Camry')).toBeVisible();
    await expect(page.getByText('Ford Explorer')).toBeVisible(); // Ensure scrollable
  });

  // TC10: Verify Filter Input Accessibility
  test('should have accessible filter inputs', async ({ page }) => {
    await page.goto('/');
    // Focus on Max Price input
    const priceInput = page.locator('input[placeholder="Max Price"]');
    await priceInput.focus();
    await expect(priceInput).toHaveClass(/focus:ring-2/);
    await expect(priceInput).toHaveClass(/focus:ring-green-500/);

    // Focus on Year input
    const yearInput = page.locator('input[placeholder="Year"]');
    await yearInput.focus();
    await expect(yearInput).toHaveClass(/focus:ring-2/);

    // Focus on Type dropdown
    const typeSelect = page.locator('select[name="type"]');
    await typeSelect.focus();
    await expect(typeSelect).toHaveClass(/focus:ring-2/);
  });
});