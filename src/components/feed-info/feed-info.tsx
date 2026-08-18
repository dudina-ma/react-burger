import { useMemo } from 'react';

import type { TFeedData } from '@utils/types';

import styles from './feed-info.module.css';

const NUMBERS_IN_COLUMN = 5;

type TFeedInfoProps = {
  data: TFeedData;
};

export const FeedInfo = ({ data }: TFeedInfoProps): React.JSX.Element => {
  const doneOrders = useMemo(
    () =>
      data.orders
        .filter((order) => order.status === 'done')
        .map((order) => order.number),
    [data.orders]
  );

  const pendingOrders = useMemo(
    () =>
      data.orders
        .filter((order) => order.status === 'pending')
        .map((order) => order.number),
    [data.orders]
  );

  const doneColumns = [
    doneOrders.slice(0, NUMBERS_IN_COLUMN),
    doneOrders.slice(NUMBERS_IN_COLUMN, NUMBERS_IN_COLUMN * 2),
  ];

  const pendingColumns = [
    pendingOrders.slice(0, NUMBERS_IN_COLUMN),
    pendingOrders.slice(NUMBERS_IN_COLUMN, NUMBERS_IN_COLUMN * 2),
  ];

  return (
    <section className={styles.container}>
      <div className={styles.boards}>
        <section className={styles.board}>
          <h3 className={`${styles.ready} text text_type_main-medium`}>Готовы:</h3>
          <ul className={styles.numbers}>
            {doneColumns.map((column, columnIndex) => (
              <li key={`done-${columnIndex}`}>
                <ul className={styles.column}>
                  {column.map((number) => (
                    <li
                      key={number}
                      className={`${styles.ready} text text_type_digits-default`}
                    >
                      {number.toString().padStart(6, '0')}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.board}>
          <h3 className="text text_type_main-medium">В работе:</h3>
          <ul className={styles.numbers}>
            {pendingColumns.map((column, columnIndex) => (
              <li key={`pending-${columnIndex}`}>
                <ul className={styles.column}>
                  {column.map((number) => (
                    <li key={number} className="text text_type_digits-default">
                      {number.toString().padStart(6, '0')}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section>
        <p className="text text_type_main-medium mb-6">Выполнено за все время:</p>
        <p className={`${styles.total} text text_type_digits-large`}>
          {data.total.toLocaleString('ru-RU')}
        </p>
      </section>
      <section>
        <p className="text text_type_main-medium mb-6">Выполнено за сегодня:</p>
        <p className={`${styles.total} text text_type_digits-large`}>
          {data.totalToday.toLocaleString('ru-RU')}
        </p>
      </section>
    </section>
  );
};
