import { nanoid } from '@reduxjs/toolkit';

import { addBun, addConstructorIngredient } from './slice';

import type { TIngredient } from '@utils/types';

export const addIngredient = (
  ingredient: TIngredient
): ReturnType<typeof addBun> | ReturnType<typeof addConstructorIngredient> => {
  if (ingredient.type === 'bun') {
    return addBun(ingredient);
  }

  return addConstructorIngredient({
    ...ingredient,
    id: nanoid(),
  });
};
