import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '@utils/api';
import { setTokens } from '@utils/token';

import type { TAuthResponse, TLoginRequest, TRegisterRequest } from '@utils/types';

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
