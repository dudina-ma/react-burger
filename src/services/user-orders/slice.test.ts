import { describe, it, expect } from 'vitest';

import {
  userOrdersSlice,
  connectUserOrders,
  disconnectUserOrders,
  onUserOrdersClose,
  onUserOrdersError,
  onUserOrdersMessage,
  onUserOrdersOpen,
  initialState,
} from './slice';

import type { TOrder, TOrdersSocketMessage } from '@utils/types';

const reducer = userOrdersSlice.reducer;

const mockOrder: TOrder = {
  _id: 'order-id',
  ingredients: ['ingredient-1', 'ingredient-2'],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  number: 12345,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const successMessage: TOrdersSocketMessage = {
  success: true,
  orders: [mockOrder],
  total: 50,
  totalToday: 3,
};

describe('userOrdersSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  describe('connect', () => {
    it('должен включать isLoading, если заказов ещё нет', () => {
      const startState = {
        ...initialState,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, connectUserOrders('wss://example.com/orders'));

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('не должен включать isLoading, если заказы уже есть', () => {
      const startState = {
        ...initialState,
        orders: [mockOrder],
      };

      const result = reducer(startState, connectUserOrders('wss://example.com/orders'));

      expect(result.isLoading).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('disconnect', () => {
    it('должен сбрасывать состояние заказов пользователя', () => {
      const startState = {
        error: 'Ошибка',
        isConnected: true,
        isLoading: true,
        orders: [mockOrder],
        total: 50,
        totalToday: 3,
      };

      const result = reducer(startState, disconnectUserOrders());

      expect(result).toEqual(initialState);
    });
  });

  describe('onOpen', () => {
    it('должен отмечать соединение открытым и очищать ошибку', () => {
      const startState = {
        ...initialState,
        error: 'Ошибка',
      };

      const result = reducer(startState, onUserOrdersOpen());

      expect(result.isConnected).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('onClose', () => {
    it('должен отмечать соединение закрытым', () => {
      const startState = {
        ...initialState,
        isConnected: true,
      };

      const result = reducer(startState, onUserOrdersClose());

      expect(result.isConnected).toBe(false);
    });
  });

  describe('onError', () => {
    it('должен сохранять ошибку и сбрасывать isLoading', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(startState, onUserOrdersError('Соединение разорвано'));

      expect(result.error).toBe('Соединение разорвано');
      expect(result.isLoading).toBe(false);
    });
  });

  describe('onMessage', () => {
    it('при успешном сообщении должен сохранить заказы и счётчики', () => {
      const startState = {
        ...initialState,
        isLoading: true,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, onUserOrdersMessage(successMessage));

      expect(result.error).toBeNull();
      expect(result.isLoading).toBe(false);
      expect(result.orders).toEqual([mockOrder]);
      expect(result.total).toBe(50);
      expect(result.totalToday).toBe(3);
    });

    it('при неуспешном сообщении должен сохранить ошибку', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        onUserOrdersMessage({
          success: false,
          message: 'Invalid token',
          orders: [],
          total: 0,
          totalToday: 0,
        })
      );

      expect(result.error).toBe('Invalid token');
      expect(result.isLoading).toBe(false);
    });

    it('должен использовать дефолтное сообщение, если success=false без текста', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        onUserOrdersMessage({
          success: false,
          orders: [],
          total: 0,
          totalToday: 0,
        })
      );

      expect(result.error).toBe('Не удалось получить заказы');
      expect(result.isLoading).toBe(false);
    });
  });
});
