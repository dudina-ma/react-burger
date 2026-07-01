import { combineReducers } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burger-constructor/slice';
import { currentIngredientSlice } from './current-ingredient/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  currentIngredient: currentIngredientSlice.reducer,
  order: orderSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
});
