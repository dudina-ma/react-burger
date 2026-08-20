import { configureStore } from '@reduxjs/toolkit';

import {
  connectFeed,
  disconnectFeed,
  onClose,
  onError,
  onMessage,
  onOpen,
} from './feed/slice';
import { socketMiddleware } from './middleware/socket-middleware';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware({
        connect: connectFeed,
        disconnect: disconnectFeed,
        onClose,
        onError,
        onMessage,
        onOpen,
      })
    ),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
