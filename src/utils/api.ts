import { BASE_URL } from './constants';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './token';

import type { TRefreshResponse } from './types';

type TApiResponse = {
  success: boolean;
  message?: string;
};

type TApiError = Error & {
  statusCode?: number;
};

export const checkResponse = <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json() as Promise<T>;
  }

  return response.json().then((err: TApiResponse) => {
    const error = new Error(
      err.message ?? `Ошибка загрузки: ${response.status}`
    ) as TApiError;
    error.statusCode = response.status;

    return Promise.reject(error);
  });
};

export const request = <T extends TApiResponse>(
  endpoint: string,
  options?: RequestInit
): Promise<T> =>
  fetch(`${BASE_URL}${endpoint}`, options)
    .then((response) => checkResponse<T>(response))
    .then((data) => {
      if (data.success) {
        return data;
      }

      return Promise.reject(new Error(data.message ?? 'Не удалось выполнить запрос'));
    });

export const refreshToken = async (): Promise<TRefreshResponse> => {
  const token = getRefreshToken();

  if (!token) {
    return Promise.reject(new Error('Refresh token отсутствует'));
  }

  const response = await request<TRefreshResponse>('/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  setTokens(response.accessToken, response.refreshToken);

  return response;
};

export const fetchWithRefresh = async <T extends TApiResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    return await request<T>(endpoint, options);
  } catch (error) {
    const apiError = error as TApiError;

    if (apiError.statusCode === 401 || apiError.statusCode === 403) {
      try {
        const refreshData = await refreshToken();

        return await request<T>(endpoint, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: refreshData.accessToken,
          },
        });
      } catch (refreshError) {
        clearTokens();
        throw refreshError;
      }
    }

    throw error;
  }
};

export const requestWithAuth = <T extends TApiResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const accessToken = getAccessToken();

  return fetchWithRefresh<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      ...(accessToken ? { Authorization: accessToken } : {}),
    },
  });
};
