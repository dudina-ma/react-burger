import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TOrder, TOrdersSocketMessage } from '@utils/types';

type TFeedState = {
  error: string | null;
  isConnected: boolean;
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  error: null,
  isConnected: false,
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const feedSlice = createSlice({
  name: 'feed',
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
    selectFeedError: (state) => state.error,
    selectFeedIsConnected: (state) => state.isConnected,
    selectFeedIsLoading: (state) => state.isLoading,
    selectFeedOrders: (state) => state.orders,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday,
  },
});

export const {
  connect: connectFeed,
  disconnect: disconnectFeed,
  onClose,
  onError,
  onMessage,
  onOpen,
} = feedSlice.actions;

export const {
  selectFeedError,
  selectFeedIsConnected,
  selectFeedIsLoading,
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
} = feedSlice.selectors;
