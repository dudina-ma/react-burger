import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '@utils/api';
import { allowPasswordReset, clearPasswordResetAllowed } from '@utils/password-reset';
import { clearTokens, getRefreshToken, setTokens } from '@utils/token';

import type {
  TAuthResponse,
  TLoginRequest,
  TLogoutResponse,
  TPasswordResetRequest,
  TPasswordResetResponse,
  TRegisterRequest,
  TResetPasswordRequest,
} from '@utils/types';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name }: TRegisterRequest) => {
    const response = await request<TAuthResponse>('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    setTokens(response.accessToken, response.refreshToken);

    return response;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: TLoginRequest) => {
    const response = await request<TAuthResponse>('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    setTokens(response.accessToken, response.refreshToken);

    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }: TPasswordResetRequest) => {
    const response = await request<TPasswordResetResponse>('/api/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    allowPasswordReset();

    return response;
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ password, token }: TResetPasswordRequest) => {
    const response = await request<TPasswordResetResponse>('/api/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    });

    clearPasswordResetAllowed();

    return response;
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const token = getRefreshToken();

  if (!token) {
    clearTokens();
    return { success: true, message: 'Successful logout' } satisfies TLogoutResponse;
  }

  const response = await request<TLogoutResponse>('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  clearTokens();

  return response;
});
