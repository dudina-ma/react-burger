import type { Page } from '@playwright/test';

export const API_HAR_PATH = 'e2e/hars/api.har';

export const setupConstructorApiMocks = async (page: Page): Promise<void> => {
  await page.routeFromHAR(API_HAR_PATH, {
    url: '**/api/**',
    notFound: 'abort',
  });
};

export const setupAuthenticatedUser = async (page: Page): Promise<void> => {
  await page.addInitScript(() => {
    localStorage.setItem('accessToken', 'Bearer test-access-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');
  });
};
