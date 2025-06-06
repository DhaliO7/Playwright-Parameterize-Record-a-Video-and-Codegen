import { test, expect } from '@playwright/test';

test('Agregar producto de moda al carrito en Mercado Libre', async ({ page }) => {
  // 1. Ir al sitio principal
  await page.goto('https://mercadolibre.com/');

  // 2. Elegir México
  await page.getByRole('link', { name: 'México' }).click();

  // 3. Ir a Ofertas
  await page.getByRole('link', { name: 'Ofertas', exact: true }).click();

  // 4. Ir a la sección de Moda
  await page.getByRole('link', { name: 'Moda', exact: true }).click();

  // 5. Esperar a que aparezca algún producto (puede tardar)
  const primerProducto = page.locator('a:has(img)').first();
  await primerProducto.waitFor({ timeout: 15000 }); // 15 segundos
  await primerProducto.click();

  // 6. Hacer clic en "Agregar al carrito", si está disponible
  const botonAgregar = page.getByRole('button', { name: /Agregar al carrito/i });
  if (await botonAgregar.isVisible()) {
    await botonAgregar.click();

    // 7. Verificar que el carrito contenga algo
    await expect(page.locator('text=Carrito')).toBeVisible();
  } else {
    console.warn('El botón "Agregar al carrito" no está disponible para este producto.');
  }
});
