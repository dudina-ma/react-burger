import { createSelector } from '@reduxjs/toolkit';

import type { TBurgerConstructorState } from '@services/burger-constructor/slice';
import type { TRootState } from '@services/store';

const selectBurgerConstructorState = (state: TRootState): TBurgerConstructorState =>
  state.burgerConstructor;

export const selectIngredientCounts = createSelector(
  [selectBurgerConstructorState],
  ({ bun, ingredients }) => {
    const counts: Record<string, number> = {};

    for (const ingredient of ingredients) {
      counts[ingredient._id] = (counts[ingredient._id] ?? 0) + 1;
    }

    if (bun) {
      counts[bun._id] = 2;
    }

    return counts;
  }
);

export const selectBurgerTotalPrice = createSelector(
  [selectBurgerConstructorState],
  ({ bun, ingredients }) => {
    const fillingsTotal = ingredients.reduce((sum, item) => sum + item.price, 0);
    const bunTotal = bun ? bun.price * 2 : 0;

    return bunTotal + fillingsTotal;
  }
);
