import { test, expect } from '@playwright/test';

import { setupAuthenticatedUser, setupConstructorApiMocks } from './helpers/api-mocks';
import { runConstructorScenario } from './helpers/constructor-flow';

test.describe('Страница «Конструктор»', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedUser(page);
    await setupConstructorApiMocks(page);
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Соберите бургер' })).toBeVisible();
  });

  test('сборка бургера, модальные окна и оформление заказа', async ({ page }) => {
    await runConstructorScenario(page);
  });
});
