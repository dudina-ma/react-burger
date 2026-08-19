import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { OrderCard } from '@components/order-card/order-card';
import { useAppSelector } from '@hooks/use-redux-hooks';
import { createMockFeedData } from '@utils/feed-mock';

import styles from './profile.module.css';

export const ProfileOrderPage = (): React.JSX.Element => {
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const orders = useMemo(() => createMockFeedData(ingredients).orders, [ingredients]);

  return (
    <>
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
      <Outlet />
    </>
  );
};
