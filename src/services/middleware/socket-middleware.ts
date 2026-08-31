import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

type TWsActions<TMessage> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<TMessage>;
  onOpen: ActionCreatorWithoutPayload;
};

export const socketMiddleware = <TMessage>(
  wsActions: TWsActions<TMessage>
): Middleware => {
  const middleware: Middleware = (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: unknown) => {
      const { dispatch } = store;

      if (wsActions.connect.match(action)) {
        if (socket) {
          socket.close();
        }

        try {
          const ws = new WebSocket(action.payload);
          socket = ws;

          ws.onopen = (): void => {
            if (socket !== ws) {
              return;
            }

            dispatch(wsActions.onOpen());
          };

          ws.onerror = (): void => {
            if (socket !== ws) {
              return;
            }

            dispatch(wsActions.onError('Ошибка WebSocket-соединения'));
          };

          ws.onmessage = (event: MessageEvent<string>): void => {
            if (socket !== ws) {
              return;
            }

            try {
              const data = JSON.parse(event.data) as TMessage;
              dispatch(wsActions.onMessage(data));
            } catch {
              dispatch(wsActions.onError('Некорректные данные от сервера'));
            }
          };

          ws.onclose = (): void => {
            if (socket !== ws) {
              return;
            }

            socket = null;
            dispatch(wsActions.onClose());
          };
        } catch (error) {
          dispatch(
            wsActions.onError(
              error instanceof Error ? error.message : 'Не удалось открыть соединение'
            )
          );
        }
      }

      if (wsActions.disconnect.match(action) && socket) {
        socket.close();
        socket = null;
      }

      return next(action);
    };
  };

  return middleware;
};
