import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test('Page loads with correct title', async ({ page }) => {
  await page.goto(`${baseUrl}/customers`);
  await expect(page.locator('h1')).toHaveText('Customer Management');
});

test('Add new customer', async ({ page }) => {
  await page.goto(`${baseUrl}/customers`);
  await page.fill('input[placeholder="Name"]', 'Alice');
  await page.fill('input[placeholder="Email"]', 'alice@example.com');
  await page.fill('input[placeholder="Phone"]', '1234567890');
  await page.fill('input[placeholder="Address"]', '123 Main St');
  await page.selectOption('select', 'Individual');
  await page.click('button:text("Add Customer")');
  await expect(page.locator('td')).toContainText('Alice');
});

test('Search for customer by name', async ({ page }) => {
  await page.goto(`${baseUrl}/customers`);
  await page.fill('input[placeholder="Search by name"]', 'Alice');
  await expect(page.locator('tbody tr')).toHaveCount(1);
});

test('Edit customer details', async ({ page }) => {
  await page.goto(`${baseUrl}/customers`);
  await page.click('text=Edit');
  await page.fill('input[placeholder="Phone"]', '9876543210');
  await page.click('button:text("Update Customer")');
  await expect(page.locator('td')).toContainText('9876543210');
});

test('Delete a customer', async ({ page }) => {
  await page.goto(`${baseUrl}/customers`);
  const initialCount = await page.locator('tbody tr').count();
  await page.click('text=Delete');
  await expect(page.locator('tbody tr')).toHaveCount(initialCount - 1);
});

test('Prevent form submission with empty fields', async ({ page }) => {
   await page.goto(`${baseUrl}/customers`);
  await page.click('button:text("Add Customer")');
  const nameValue = await page.locator('input[placeholder="Name"]').inputValue();
  expect(nameValue).toBe('');
});

test('Form is reset after customer is added', async ({ page }) => {
  await page.goto(`${baseUrl}/customers`);
  await page.fill('input[placeholder="Name"]', 'Bob');
  await page.fill('input[placeholder="Email"]', 'bob@example.com');
  await page.fill('input[placeholder="Phone"]', '1111111111');
  await page.fill('input[placeholder="Address"]', '456 Side St');
  await page.selectOption('select', 'Business');
  await page.click('button:text("Add Customer")');
  await expect(page.locator('input[placeholder="Name"]')).toHaveValue('');
});

test('Show error message on API failure', async ({ page }) => {
  await page.route('**/api/customers**', route => route.abort());
  await page.goto(`${baseUrl}/customers`);
  await expect(page.locator('p')).toHaveText('Failed to load customers');
});

test('Switch between Add and Update modes', async ({ page }) => {
  await page.goto(`${baseUrl}/customers`);
  await page.click('text=Edit');
  await expect(page.locator('button')).toHaveText('Update Customer');
  await page.fill('input[placeholder="Phone"]', '9999999999');
  await page.click('button:text("Update Customer")');
  await expect(page.locator('button')).toHaveText('Add Customer');
});

test('Customer table has all columns', async ({ page }) => {
  await page.goto(`${baseUrl}/customers`);
  const headers = await page.locator('thead th').allTextContents();
  expect(headers).toEqual([
    'Name', 'Email', 'Phone', 'Address', 'Type', 'Actions'
  ]);
});
