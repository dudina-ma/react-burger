import { describe, it, expect } from 'vitest';

import {
  currentIngredientSlice,
  setCurrentIngredient,
  clearCurrentIngredient,
  initialState,
} from './slice';

import type { TIngredient } from '@utils/types';

const reducer = currentIngredientSlice.reducer;

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

describe('currentIngredientSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  describe('setCurrentIngredient', () => {
    it('должен сохранять выбранный ингредиент', () => {
      const result = reducer(initialState, setCurrentIngredient(mockIngredient));

      expect(result.item).toEqual(mockIngredient);
    });
  });

  describe('clearCurrentIngredient', () => {
    it('должен очищать выбранный ингредиент', () => {
      const startState = {
        item: mockIngredient,
      };

      const result = reducer(startState, clearCurrentIngredient());

      expect(result.item).toBeNull();
    });
  });
});
