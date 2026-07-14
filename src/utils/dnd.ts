import type { TIngredient } from '@utils/types';

export const INGREDIENT_DRAG_TYPE = 'ingredient';
export const CONSTRUCTOR_INGREDIENT_DRAG_TYPE = 'constructor-ingredient';

export type TIngredientDragItem = {
  ingredient: TIngredient;
};

export type TConstructorIngredientDragItem = {
  id: string;
  index: number;
};
