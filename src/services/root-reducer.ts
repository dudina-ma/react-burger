import { combineReducers } from '@reduxjs/toolkit';

import { authSlice } from './auth/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';
import { currentIngredientSlice } from './current-ingredient/slice';
import { feedSlice } from './feed/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';
import { userOrdersSlice } from './user-orders/slice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  currentIngredient: currentIngredientSlice.reducer,
  order: orderSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  feed: feedSlice.reducer,
  userOrders: userOrdersSlice.reducer,
});
