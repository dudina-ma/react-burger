import { createSlice } from '@reduxjs/toolkit';

import { createOrder, fetchOrderById } from './actions';

import type { TOrder } from '@utils/types';

type TOrderState = {
  orderNumber: number | null;
  orderName: string | null;
  isLoading: boolean;
  error: string | null;
  currentOrder: TOrder | null;
  currentOrderError: string | null;
};

const initialState: TOrderState = {
  orderNumber: null,
  orderName: null,
  isLoading: false,
  error: null,
  currentOrder: null,
  currentOrderError: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderNumber = null;
      state.orderName = null;
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.currentOrderError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload.order.number;
        state.orderName = action.payload.name;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось оформить заказ';
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.currentOrderError = null;
        state.currentOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.currentOrder = null;
        state.currentOrderError = action.error.message ?? 'Не удалось загрузить заказ';
      });
  },
});

export const { resetOrder, clearCurrentOrder } = orderSlice.actions;
