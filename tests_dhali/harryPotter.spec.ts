import { test, expect } from '@playwright/test';

test('modifica respuesta de personajes de Harry Potter', async ({ page }) => {
  await page.route('**/v1/characters**', async route => {
    const response = await route.fetch();
    const json = await response.json();

    // 1. Agrega tu personaje personalizado
    json.data.push({
      id: 'custom-id',
      type: 'character',
      attributes: {
        name: 'Dhali Tejeda',
        house: 'Gryffindor',
      }
    });

    
    json.data = json.data.filter(c => c.attributes.name !== 'Bellatrix Lestrange');

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(json),
    });
  });

  await page.goto('http://127.0.0.1:5500/mock-apis/harry-potter-list.html');


  await expect(page.getByText('Dhali Tejeda - Gryffindor')).toBeVisible();


  await expect(page.getByText('Bellatrix Lestrange', { exact: false })).toHaveCount(0);
});
