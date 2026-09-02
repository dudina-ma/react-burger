import { describe, it, expect } from 'vitest';

import {
  burgerConstructorSlice,
  addBun,
  addConstructorIngredient,
  removeConstructorIngredient,
  moveConstructorIngredient,
  clearConstructor,
  initialState,
} from './slice';

import type { TConstructorIngredient, TIngredient } from '@utils/types';

const reducer = burgerConstructorSlice.reducer;

const mockBun: TIngredient = {
  _id: 'bun-1',
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

const mockIngredientA: TConstructorIngredient = {
  _id: 'sauce-1',
  id: 'uid-a',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 100,
  price: 90,
  image: 'image.png',
  image_large: 'image-large.png',
  image_mobile: 'image-mobile.png',
  __v: 0,
};

const mockIngredientB: TConstructorIngredient = {
  ...mockIngredientA,
  _id: 'main-1',
  id: 'uid-b',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  price: 424,
};

describe('burgerConstructorSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  describe('addBun', () => {
    it('должен сохранять булку', () => {
      const result = reducer(initialState, addBun(mockBun));

      expect(result.bun).toEqual(mockBun);
    });
  });

  describe('addConstructorIngredient', () => {
    it('должен добавлять ингредиент в конец списка', () => {
      const startState = {
        ...initialState,
        ingredients: [mockIngredientA],
      };

      const result = reducer(startState, addConstructorIngredient(mockIngredientB));

      expect(result.ingredients).toEqual([mockIngredientA, mockIngredientB]);
    });
  });

  describe('removeConstructorIngredient', () => {
    it('должен удалять ингредиент по id', () => {
      const startState = {
        ...initialState,
        ingredients: [mockIngredientA, mockIngredientB],
      };

      const result = reducer(startState, removeConstructorIngredient('uid-a'));

      expect(result.ingredients).toEqual([mockIngredientB]);
    });
  });

  describe('moveConstructorIngredient', () => {
    it('должен перемещать ингредиент с dragIndex на hoverIndex', () => {
      const startState = {
        ...initialState,
        ingredients: [mockIngredientA, mockIngredientB],
      };

      const result = reducer(
        startState,
        moveConstructorIngredient({ dragIndex: 0, hoverIndex: 1 })
      );

      expect(result.ingredients).toEqual([mockIngredientB, mockIngredientA]);
    });
  });

  describe('clearConstructor', () => {
    it('должен очищать булку и список ингредиентов', () => {
      const startState = {
        bun: mockBun,
        ingredients: [mockIngredientA, mockIngredientB],
      };

      const result = reducer(startState, clearConstructor());

      expect(result).toEqual(initialState);
    });
  });
});
