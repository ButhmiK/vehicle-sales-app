import {test,expect} from '@playwright/test';

test('Responsive mobile UI', async ({ browser }) => {
    
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    

    await page.goto('http://localhost:3000/customers');
  
    await expect(page.locator('form')).toBeVisible();
  
    await expect(page.locator('table')).toBeVisible();
  });
  