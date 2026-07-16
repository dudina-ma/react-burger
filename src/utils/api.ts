import { BASE_URL } from './constants';
import { getAccessToken } from './token';

type TApiResponse = {
  success: boolean;
  message?: string;
};

export const checkResponse = <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json() as Promise<T>;
  }

  return Promise.reject(new Error(`Ошибка загрузки: ${response.status}`));
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

export const requestWithAuth = <T extends TApiResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const accessToken = getAccessToken();
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set('Authorization', accessToken);
  }

  return request<T>(endpoint, {
    ...options,
    headers,
  });
};
