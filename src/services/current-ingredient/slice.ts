import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types';

type TCurrentIngredientState = {
  item: TIngredient | null;
};

const initialState: TCurrentIngredientState = {
  item: null,
};

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.item = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.item = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  currentIngredientSlice.actions;
