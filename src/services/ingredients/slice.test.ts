import { describe, it, expect } from 'vitest';

import { fetchIngredients } from './actions';
import { ingredientsSlice } from './slice';

import type { TIngredient } from '@utils/types';

const reducer = ingredientsSlice.reducer;

const initialState = {
  items: [],
  isLoading: true,
  error: null,
};

const errorWithoutMessage = { name: 'Error' } as unknown as Error;

const mockIngredient: TIngredient = {
  _id: 'ingredient-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'image.png',
  image_large: 'image-large.png',
  image_mobile: 'image-mobile.png',
  __v: 0,
};

describe('ingredientsSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  describe('fetchIngredients', () => {
    it('должен устанавливать isLoading при pending', () => {
      const startState = {
        ...initialState,
        isLoading: false,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, fetchIngredients.pending(''));

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('при fulfilled должен сохранить список ингредиентов', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        fetchIngredients.fulfilled([mockIngredient], '')
      );

      expect(result.isLoading).toBe(false);
      expect(result.items).toEqual([mockIngredient]);
    });

    it('должен сохранять сообщение об ошибке загрузки при rejected', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        fetchIngredients.rejected(new Error('Сервер недоступен'), '')
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Сервер недоступен');
    });

    it('должен использовать дефолтное сообщение при ошибке загрузки', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        fetchIngredients.rejected(errorWithoutMessage, '')
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Произошла ошибка');
    });
  });
});
