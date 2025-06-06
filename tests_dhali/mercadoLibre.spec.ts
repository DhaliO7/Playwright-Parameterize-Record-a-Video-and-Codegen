import { test, expect } from '@playwright/test';

test('Activity: Mercado Libre locators', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com/');

  // Espera a que el selector de país aparezca y selecciona uno (ej. México)
  await page.getByRole('link', { name: 'México' }).click();

  // getByRole - botón de búsqueda
  const searchButton = page.getByRole('button', { name: /Buscar/i });
  await expect(searchButton).toBeVisible();

  // getByText - texto visible de una sección
  const ofertas = page.getByText('Ofertas');
  await expect(ofertas).toBeVisible();

  // getByPlaceholder - caja de búsqueda
  const searchInput = page.getByPlaceholder('Buscar productos, marcas y más…');
  await expect(searchInput).toBeVisible();

  // getByAltText - logo del sitio
  const logo = page.getByAltText('Mercado Libre');
  await expect(logo).toBeVisible();

  // getByTitle - este puede depender del país; revisa si hay título en algún enlace o imagen
  const titleExample = page.getByTitle('Ingresa a tu cuenta');
  await expect(titleExample).toBeVisible();

  // getByLabel - normalmente se usa en formularios, pero puedes buscar el login
  await page.getByRole('link', { name: /Ingresa/i }).click();
  const emailInput = page.getByLabel('E-mail');
  await expect(emailInput).toBeVisible();

  // getByTestId - este puede no estar presente en Mercado Libre, pero puedes verificar:
  const testIdElement = page.locator('[data-testid]');
  await expect(testIdElement.first()).toBeVisible();
});
