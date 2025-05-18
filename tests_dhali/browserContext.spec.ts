import { test, expect, firefox } from "@playwright/test";

test("Activity 3 - Browsers & Browser context", async () => {
  
  const browser = await firefox.launch();

  
  console.log("Browser context length (inicial):", browser.contexts().length);

  
  const context = await browser.newContext();

  
  console.log("Browser context length (después de crear uno):", browser.contexts().length);

  
  const page = await context.newPage();

  
  await page.goto("https://playwright.dev");

  
  await context.close();
  await browser.close();
});
