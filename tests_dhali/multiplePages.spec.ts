import { test, expect, chromium, describe} from "@playwright/test";

describe("Activity 4: Multiple Pages", () => {
  test("should open multiple pages and list them", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const page1 = await context.newPage();
    await page1.goto("https://playwright.dev/docs/intro"); // Installation URL

    const page2 = await context.newPage();
    await page2.goto("https://playwright.dev/docs/writing-tests"); // Writing tests URL

    const pages = context.pages();
    console.log("Total number of pages in context:", pages.length);

    await browser.close();
  });
});
