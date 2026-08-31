import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import { useAppSelector } from '@hooks/use-redux-hooks';
import { getOrderStatusLabel, isOrderStatusDone } from '@utils/order-status';

import type { TIngredient, TOrder } from '@utils/types';

import styles from './order-info.module.css';

type TOrderInfoProps = {
  order: TOrder;
};

type TOrderIngredient = TIngredient & {
  count: number;
};

export const OrderInfo = ({ order }: TOrderInfoProps): React.JSX.Element => {
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const orderIngredients = useMemo(() => {
    const grouped = new Map<string, TOrderIngredient>();

    for (const ingredientId of order.ingredients) {
      const existing = grouped.get(ingredientId);

      if (existing) {
        existing.count += 1;
        continue;
      }

      const ingredient = ingredients.find((item) => item._id === ingredientId);

      if (ingredient) {
        grouped.set(ingredientId, { ...ingredient, count: 1 });
      }
    }

    return [...grouped.values()];
  }, [ingredients, order.ingredients]);

  const totalPrice = useMemo(
    () =>
      orderIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price * ingredient.count,
        0
      ),
    [orderIngredients]
  );

  const statusLabel = getOrderStatusLabel(order.status);
  const statusClassName = isOrderStatusDone(order.status) ? styles.statusDone : '';

  return (
    <section className={styles.container}>
      <p className="text text_type_main-medium mt-10">{order.name}</p>
      <p className={`${statusClassName} text text_type_main-default mt-3`}>
        {statusLabel}
      </p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <ul className={`${styles.list} custom-scroll`}>
        {orderIngredients.map((ingredient) => (
          <li key={ingredient._id} className={styles.item}>
            <div className={styles.imageWrap}>
              <img
                className={styles.image}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
            </div>
            <p className={`${styles.name} text text_type_main-default`}>
              {ingredient.name}
            </p>
            <p className={styles.price}>
              <span className="text text_type_digits-default">
                {ingredient.count} x {ingredient.price.toLocaleString('ru-RU')}
              </span>
              <CurrencyIcon type="primary" />
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
        <p className={styles.price}>
          <span className="text text_type_digits-default">
            {totalPrice.toLocaleString('ru-RU')}
          </span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </section>
  );
};
