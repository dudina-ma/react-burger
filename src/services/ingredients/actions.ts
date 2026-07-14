import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '@utils/api';

import type { TIngredientsResponse } from '@utils/types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const { data } = await request<TIngredientsResponse>('/api/ingredients');
    return data;
  }
);
