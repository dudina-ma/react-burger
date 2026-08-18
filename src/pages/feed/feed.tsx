import { useMemo } from 'react';

import { FeedInfo } from '@components/feed-info/feed-info';
import { OrderCard } from '@components/order-card/order-card';
import { useAppSelector } from '@hooks/use-redux-hooks';
import { createMockFeedData } from '@utils/feed-mock';

import styles from './feed.module.css';

export const FeedPage = (): React.JSX.Element => {
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const feedData = useMemo(() => createMockFeedData(ingredients), [ingredients]);

  return (
    <main className={`${styles.page} pt-10 pl-5 pr-5`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.content}>
        <section className={`${styles.orders} custom-scroll`}>
          <ul className={styles.list}>
            {feedData.orders.map((order) => (
              <li key={order._id}>
                <OrderCard order={order} />
              </li>
            ))}
          </ul>
        </section>
        <FeedInfo data={feedData} />
      </div>
    </main>
  );
};
