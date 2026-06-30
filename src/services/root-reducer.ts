import { combineReducers } from '@reduxjs/toolkit';

import { currentIngredientSlice } from './current-ingredient/slice';
import { ingredientsSlice } from './ingredients/slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  currentIngredient: currentIngredientSlice.reducer,
});
