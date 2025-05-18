import { test, expect } from '@playwright/test';

test.use({ browserName: 'firefox' });

test("Activity 5: Page Methods", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await page.screenshot({ path: "playwright_home.png" });

  page.once("load", () => {
    console.log("Page loaded!");
  });

  await page.goto("https://github.com");
  await page.goBack();
});
