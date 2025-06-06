import { test, expect } from '@playwright/test';

test('Weather page loads', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/mock-apis/weather.html');
  await expect(page).toHaveTitle(/Weather/i); // o lo que diga tu <title>
});
