import { test, expect } from '@playwright/test';

test('should trigger print dialog on button click', async ({ page }) => {
    const printSpy = await page.evaluate(() => {
      const printCalls: string[] = [];
      window.print = () => printCalls.push('print');
      return printCalls;
    });
    await page.click('button:has-text("Print")');
    expect(printSpy.length).toBeGreaterThan(0);
  });
  