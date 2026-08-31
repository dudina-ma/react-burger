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
import {
  connectUserOrders,
  disconnectUserOrders,
  onUserOrdersClose,
  onUserOrdersError,
  onUserOrdersMessage,
  onUserOrdersOpen,
} from './user-orders/slice';

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
      }),
      socketMiddleware({
        connect: connectUserOrders,
        disconnect: disconnectUserOrders,
        onClose: onUserOrdersClose,
        onError: onUserOrdersError,
        onMessage: onUserOrdersMessage,
        onOpen: onUserOrdersOpen,
      })
    ),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
