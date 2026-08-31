import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { FeedInfo } from '@components/feed-info/feed-info';
import { OrderCard } from '@components/order-card/order-card';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import {
  connectFeed,
  disconnectFeed,
  selectFeedError,
  selectFeedIsConnected,
  selectFeedIsLoading,
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
} from '@services/feed/slice';
import { WS_ORDERS_ALL_URL } from '@utils/constants';

import type { TFeedData } from '@utils/types';

import styles from './feed.module.css';

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectFeedOrders);
  const total = useAppSelector(selectFeedTotal);
  const totalToday = useAppSelector(selectFeedTotalToday);
  const isLoading = useAppSelector(selectFeedIsLoading);
  const isConnected = useAppSelector(selectFeedIsConnected);
  const error = useAppSelector(selectFeedError);
  const showLoader =
    isLoading || (orders.length === 0 && error === null && !isConnected);

  useEffect(() => {
    dispatch(connectFeed(WS_ORDERS_ALL_URL));

    return (): void => {
      dispatch(disconnectFeed());
    };
  }, [dispatch]);

  const feedData: TFeedData = {
    orders,
    total,
    totalToday,
  };

  return (
    <main className={`${styles.page} pt-10 pl-5 pr-5`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      {showLoader && <Preloader />}
      {error && !showLoader && <p className="text text_type_main-default">{error}</p>}
      {!showLoader && !error && (
        <div className={styles.content}>
          <section className={`${styles.orders} custom-scroll`}>
            <ul className={styles.list}>
              {feedData.orders.map((order) => (
                <li key={order._id}>
                  <OrderCard order={order} to={`/feed/${order._id}`} />
                </li>
              ))}
            </ul>
          </section>
          <FeedInfo data={feedData} />
        </div>
      )}
      <Outlet />
    </main>
  );
};
