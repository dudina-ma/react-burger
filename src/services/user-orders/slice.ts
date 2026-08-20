import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TOrder, TOrdersSocketMessage } from '@utils/types';

type TUserOrdersState = {
  error: string | null;
  isConnected: boolean;
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TUserOrdersState = {
  error: null,
  isConnected: false,
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    connect: (state, _action: PayloadAction<string>) => {
      state.isLoading = state.orders.length === 0;
      state.error = null;
    },
    disconnect: (state) => {
      state.error = null;
      state.isConnected = false;
      state.isLoading = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    onClose: (state) => {
      state.isConnected = false;
    },
    onError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    onMessage: (state, action: PayloadAction<TOrdersSocketMessage>) => {
      if (!action.payload.success) {
        state.error = action.payload.message ?? 'Не удалось получить заказы';
        state.isLoading = false;
        return;
      }

      state.error = null;
      state.isLoading = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    onOpen: (state) => {
      state.isConnected = true;
      state.error = null;
    },
  },
  selectors: {
    selectUserOrdersError: (state) => state.error,
    selectUserOrdersIsConnected: (state) => state.isConnected,
    selectUserOrdersIsLoading: (state) => state.isLoading,
    selectUserOrders: (state) => state.orders,
  },
});

export const {
  connect: connectUserOrders,
  disconnect: disconnectUserOrders,
  onClose: onUserOrdersClose,
  onError: onUserOrdersError,
  onMessage: onUserOrdersMessage,
  onOpen: onUserOrdersOpen,
} = userOrdersSlice.actions;

export const {
  selectUserOrdersError,
  selectUserOrdersIsConnected,
  selectUserOrdersIsLoading,
  selectUserOrders,
} = userOrdersSlice.selectors;
