import { test, expect } from '@playwright/test';

test.use({
  // Activar modo HAR
  storageState: 'harrypotter.har',
});

test('muestra personajes desde archivo HAR', async ({ page }) => {
  await page.routeFromHAR('harrypotter.har', { update: false });

  await page.goto('http://127.0.0.1:5500/mock-apis/harry-potter-list.html');

  // Validar personaje agregado
  await expect(page.getByText('Dhali Tejeda - Gryffindor')).toBeVisible();

  // Validar que el personaje eliminado ya no esté
  await expect(page.getByText('Albert Tillyman')).toHaveCount(0);
});
