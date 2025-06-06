import { test, expect } from '@playwright/test';

test('navega a README de agent-zero desde Trending', async ({ page }) => {
 
  await page.goto('https://github.com/');


  await expect(page).toHaveTitle(/GitHub/);


  await page.hover('header'); // por si el botón está oculto


  await page.getByRole('button', { name: 'Open Source', exact: true }).click();

 
  await page.getByRole('link', { name: 'Trending' }).click();


  await page.getByRole('link', { name: 'frdel / agent-zero' }).click();


  await expect(page).toHaveURL(/frdel\/agent-zero/);


  await page.getByRole('link', { name: /README\.md/i }).click();


  await expect(page).toHaveURL(/README\.md/);
});
