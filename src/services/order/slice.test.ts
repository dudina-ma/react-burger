import { describe, it, expect } from 'vitest';

import { createOrder, fetchOrderById } from './actions';
import { orderSlice, resetOrder, clearCurrentOrder } from './slice';

import type { TOrder, TOrderResponse } from '@utils/types';

const reducer = orderSlice.reducer;

const initialState = {
  orderNumber: null,
  orderName: null,
  isLoading: false,
  error: null,
  currentOrder: null,
  currentOrderError: null,
};

const mockOrderResponse: TOrderResponse = {
  success: true,
  name: 'Space флюоресцентный бургер',
  order: { number: 12345 },
};

const errorWithoutMessage = { name: 'Error' } as unknown as Error;

const mockOrder: TOrder = {
  _id: 'order-id',
  ingredients: ['ingredient-1', 'ingredient-2'],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  number: 12345,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('orderSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  describe('resetOrder', () => {
    it('должен сбрасывать номер, имя и ошибку заказа', () => {
      const startState = {
        ...initialState,
        orderNumber: 12345,
        orderName: 'Space бургер',
        error: 'Ошибка',
        isLoading: true,
      };

      const result = reducer(startState, resetOrder());

      expect(result.orderNumber).toBeNull();
      expect(result.orderName).toBeNull();
      expect(result.error).toBeNull();
      expect(result.isLoading).toBe(true);
    });
  });

  describe('clearCurrentOrder', () => {
    it('должен очищать текущий заказ и ошибку', () => {
      const startState = {
        ...initialState,
        currentOrder: mockOrder,
        currentOrderError: 'Ошибка загрузки',
      };

      const result = reducer(startState, clearCurrentOrder());

      expect(result.currentOrder).toBeNull();
      expect(result.currentOrderError).toBeNull();
    });
  });

  describe('createOrder', () => {
    it('должен устанавливать isLoading при pending', () => {
      const startState = {
        ...initialState,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, createOrder.pending('', ['ingredient-1']));

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('при fulfilled должен сохранить номер и имя оформленного заказа', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        createOrder.fulfilled(mockOrderResponse, '', ['ingredient-1'])
      );

      expect(result.isLoading).toBe(false);
      expect(result.orderNumber).toBe(mockOrderResponse.order.number);
      expect(result.orderName).toBe(mockOrderResponse.name);
    });

    it('должен сохранять сообщение об ошибке оформления при rejected', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        createOrder.rejected(new Error('Сервер недоступен'), '', ['ingredient-1'])
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Сервер недоступен');
    });

    it('должен использовать дефолтное сообщение при ошибке оформления', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        createOrder.rejected(errorWithoutMessage, '', ['ingredient-1'])
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Не удалось оформить заказ');
    });
  });

  describe('fetchOrderById', () => {
    it('должен очищать заказ и ошибку при pending', () => {
      const startState = {
        ...initialState,
        currentOrder: mockOrder,
        currentOrderError: 'Предыдущая ошибка',
      };

      const result = reducer(startState, fetchOrderById.pending('', 'order-id'));

      expect(result.currentOrder).toBeNull();
      expect(result.currentOrderError).toBeNull();
    });

    it('при fulfilled должен сохранить загруженный заказ в currentOrder', () => {
      const result = reducer(
        initialState,
        fetchOrderById.fulfilled(mockOrder, '', 'order-id')
      );

      expect(result.currentOrder).toEqual(mockOrder);
    });

    it('должен сохранять сообщение об ошибке загрузки при rejected', () => {
      const result = reducer(
        initialState,
        fetchOrderById.rejected(new Error('Заказ не найден'), '', 'order-id')
      );

      expect(result.currentOrder).toBeNull();
      expect(result.currentOrderError).toBe('Заказ не найден');
    });

    it('должен использовать дефолтное сообщение при ошибке загрузки', () => {
      const result = reducer(
        initialState,
        fetchOrderById.rejected(errorWithoutMessage, '', 'order-id')
      );

      expect(result.currentOrder).toBeNull();
      expect(result.currentOrderError).toBe('Не удалось загрузить заказ');
    });
  });
});
