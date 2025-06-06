import { test, expect } from '@playwright/test';

test.describe('Weather App', () => {
  test('muestra clima de Paris y maneja error 500 del servidor correctamente', async ({ page }) => {
    // Primer escenario: respuesta exitosa mockeada
    await page.route('**/forecast?city=Paris', async route => {
      const url = new URL(route.request().url());
      if (url.searchParams.get('city') === 'Paris') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            city: 'Paris',
            temperature: 25,
            condition: 'Cloudy',
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto('http://127.0.0.1:5500/mock-apis/weather.html');

    
    await page.getByPlaceholder('Enter city').fill('Paris');

    
    await page.getByRole('button', { name: 'Get Weather' }).click();

    
    await expect(page.getByText('Paris: 25, Cloudy')).toBeVisible();

    // Segundo escenario: mockear error 500 y reiniciar la ruta
    await page.route('**/forecast?city=Paris', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    // Recargar la página para hacer segunda prueba limpia
    await page.reload();

    await page.getByPlaceholder('Enter city').fill('Paris');
    await page.getByRole('button', { name: 'Get Weather' }).click();

    await expect(page.getByText('Paris: 25, Cloudy')).toHaveCount(0);


  });
});
