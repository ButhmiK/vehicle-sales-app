import { test, expect } from '@playwright/test';

test('should display image in vehicle row', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('domcontentloaded');

  await page.click('text=Login');
  await page.fill('input[placeholder="Email"]', 'qwert@123'); 
  await page.fill('input[placeholder="Password"]', '123'); 
  await page.click('button:has-text("Login")'); 

  await page.waitForNavigation();
  await page.goto('http://localhost:3000/vehicles'); 

  await page.fill('input[placeholder="Make"]', 'Toyota');
  await page.fill('input[placeholder="Model"]', 'Aqua');
  await page.fill('input[placeholder="Year"]', '2020');
  await page.fill('input[placeholder="Price"]', '80000');
  await page.selectOption('select', { label: 'Sedan' });

  const imageUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'; 
  await page.fill('input[placeholder="Image URL"]', imageUrl);

  await page.click('button:has-text("Add Vehicle")'); 
 
  await page.waitForSelector(`img[src="${imageUrl}"]`);


  const image = await page.$(`img[src="${imageUrl}"]`);
  expect(image).not.toBeNull();
});
