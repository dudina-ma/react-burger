import { combineReducers } from '@reduxjs/toolkit';

import { ingredientsSlice } from './ingredients/slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
});
