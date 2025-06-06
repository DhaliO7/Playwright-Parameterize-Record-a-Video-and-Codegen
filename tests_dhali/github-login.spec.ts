import { test, expect } from '@playwright/test';

const users = [
  { username: 'user1@example.com', password: 'wrongpass1' },
  { username: 'user2@example.com', password: 'wrongpass2' },
  { username: 'user3@example.com', password: 'wrongpass3' },
];

users.forEach(({ username, password }) => {
  test(`Login test for ${username}`, async ({ page }) => {
    await page.goto('https://github.com/login');
    await page.fill('#login_field', username);
    await page.fill('#password', password);
    await page.click('input[name="commit"]');

    const error = await page.locator('#js-flash-container .flash-error').textContent();
    expect(error).toContain('Incorrect username or password.');
  });
});
