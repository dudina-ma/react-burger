import { createAsyncThunk } from '@reduxjs/toolkit';

import { request, requestWithAuth } from '@utils/api';
import { isValidOrder } from '@utils/normalize-orders-ws-message';

import type { TOrderByIdResponse, TOrderResponse } from '@utils/types';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds: string[]) => {
    const response = await requestWithAuth<TOrderResponse>('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });

    return response;
  }
);

export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (orderId: string) => {
    const { order } = await request<TOrderByIdResponse>(`/api/orders/${orderId}`);

    if (!isValidOrder(order)) {
      throw new Error('Некорректные данные заказа');
    }

    return order;
  }
);
