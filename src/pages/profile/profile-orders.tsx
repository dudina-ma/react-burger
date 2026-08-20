import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { OrderCard } from '@components/order-card/order-card';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { setUser } from '@services/auth/slice';
import {
  connectUserOrders,
  disconnectUserOrders,
  onUserOrdersError,
  selectUserOrders,
  selectUserOrdersError,
  selectUserOrdersIsConnected,
  selectUserOrdersIsLoading,
} from '@services/user-orders/slice';
import { refreshToken } from '@utils/api';
import { WS_INVALID_TOKEN_MESSAGE, WS_ORDERS_URL } from '@utils/constants';
import { clearTokens, getAccessTokenWithoutBearer } from '@utils/token';

import styles from './profile.module.css';

const getUserOrdersSocketUrl = (): string | null => {
  const token = getAccessTokenWithoutBearer();

  if (!token) {
    return null;
  }

  return `${WS_ORDERS_URL}?token=${token}`;
};

export const ProfileOrderPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectUserOrders);
  const isLoading = useAppSelector(selectUserOrdersIsLoading);
  const isConnected = useAppSelector(selectUserOrdersIsConnected);
  const error = useAppSelector(selectUserOrdersError);
  const showLoader =
    isLoading || (orders.length === 0 && error === null && !isConnected);

  useEffect(() => {
    const url = getUserOrdersSocketUrl();

    if (url) {
      dispatch(connectUserOrders(url));
    }

    return (): void => {
      dispatch(disconnectUserOrders());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error !== WS_INVALID_TOKEN_MESSAGE) {
      return;
    }

    let cancelled = false;

    void (async (): Promise<void> => {
      try {
        await refreshToken();

        if (cancelled) {
          return;
        }

        const url = getUserOrdersSocketUrl();

        if (url) {
          dispatch(connectUserOrders(url));
        }
      } catch {
        if (cancelled) {
          return;
        }

        clearTokens();
        dispatch(setUser(null));
        dispatch(onUserOrdersError('Сессия истекла. Войдите снова'));
      }
    })();

    return (): void => {
      cancelled = true;
    };
  }, [error, dispatch]);

  return (
    <>
      {showLoader && <Preloader />}
      {error && error !== WS_INVALID_TOKEN_MESSAGE && !showLoader && (
        <p className="text text_type_main-default">{error}</p>
      )}
      {!showLoader && (error === null || error === WS_INVALID_TOKEN_MESSAGE) && (
        <section className={`${styles.orders} custom-scroll`}>
          <ul className={styles.list}>
            {orders.map((order) => (
              <li key={order._id}>
                <OrderCard
                  order={order}
                  to={`/profile/orders/${order._id}`}
                  showStatus
                  wide
                />
              </li>
            ))}
          </ul>
        </section>
      )}
      <Outlet />
    </>
  );
};
