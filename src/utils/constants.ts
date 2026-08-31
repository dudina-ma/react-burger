export const BASE_URL = 'https://new-stellarburgers.education-services.ru';

export const WS_BASE_URL = BASE_URL.replace(/^https/, 'wss');

export const WS_ORDERS_ALL_URL = `${WS_BASE_URL}/orders/all`;

export const WS_ORDERS_URL = `${WS_BASE_URL}/orders`;

export const WS_INVALID_TOKEN_MESSAGE = 'Invalid or missing token';
