import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '@utils/api';

import type { TOrderResponse } from '@utils/types';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds: string[]) => {
    const response = await request<TOrderResponse>('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });

    return response;
  }
);
