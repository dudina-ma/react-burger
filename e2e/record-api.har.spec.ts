import { test, expect } from '@playwright/test';

import { runConstructorScenario } from './helpers/constructor-flow';

const API_HAR_PATH = 'e2e/hars/api.har';
const API_BASE_URL = 'https://new-stellarburgers.education-services.ru';

/**
 * Одноразовая запись HAR с реального API.
 *
 * 1. Убедитесь, что update: true
 * 2. Запустите: npx playwright test e2e/record-api.har.spec.ts
 * 3. Поменяйте update: false и больше не трогайте этот файл
 */
test.describe('Запись HAR', () => {
  test('записать HAR-файл API конструктора', async ({ page, request }) => {
    test.setTimeout(120_000);

    await page.routeFromHAR(API_HAR_PATH, {
      url: '**/api/**',
      update: false,
    });

    const email = `e2e-${Date.now()}@example.com`;
    const password = 'Password123';
    const name = 'E2E User';

    const registerResponse = await request.post(`${API_BASE_URL}/api/auth/register`, {
      data: { email, password, name },
    });

    expect(registerResponse.ok()).toBeTruthy();

    const { accessToken, refreshToken } = await registerResponse.json();

    await page.addInitScript(
      ({ access, refresh }) => {
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
      },
      { access: accessToken, refresh: refreshToken }
    );

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Соберите бургер' })).toBeVisible();

    await runConstructorScenario(page);
  });
});
