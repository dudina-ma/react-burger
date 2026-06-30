import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
