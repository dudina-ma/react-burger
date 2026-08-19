import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@hooks/use-redux-hooks';
import { getOrderStatusLabel, isOrderStatusDone } from '@utils/order-status';

import type { TOrder } from '@utils/types';

import styles from './order-card.module.css';

const MAX_VISIBLE_INGREDIENTS = 6;

type TOrderCardProps = {
  order: TOrder;
  to: string;
  showStatus?: boolean;
  wide?: boolean;
};

export const OrderCard = ({
  order,
  to,
  showStatus = false,
  wide = false,
}: TOrderCardProps): React.JSX.Element => {
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const orderIngredients = useMemo(
    () =>
      order.ingredients
        .map((ingredientId) =>
          ingredients.find((ingredient) => ingredient._id === ingredientId)
        )
        .filter((ingredient) => ingredient !== undefined),
    [ingredients, order.ingredients]
  );

  const visibleIngredients = orderIngredients.slice(0, MAX_VISIBLE_INGREDIENTS);
  const hiddenCount = orderIngredients.length - MAX_VISIBLE_INGREDIENTS;

  const totalPrice = useMemo(
    () => orderIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0),
    [orderIngredients]
  );

  const statusLabel = getOrderStatusLabel(order.status);
  const statusClassName = isOrderStatusDone(order.status) ? styles.statusDone : '';

  return (
    <Link to={to} className={`${styles.card} ${wide ? styles.cardWide : ''} p-6`}>
      <div className={`${styles.header} mb-6`}>
        <p className={`${styles.number} text text_type_digits-default`}>
          #{order.number.toString().padStart(6, '0')}
        </p>
        <p className={`${styles.date} text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <p
        className={`${styles.name} text text_type_main-medium ${showStatus ? 'mb-2' : 'mb-6'}`}
      >
        {order.name}
      </p>
      {showStatus && (
        <p
          className={`${styles.status} ${statusClassName} text text_type_main-default mb-6`}
        >
          {statusLabel}
        </p>
      )}
      <div className={styles.details}>
        <ul className={styles.ingredients}>
          {visibleIngredients.map((ingredient, index) => (
            <li
              key={ingredient._id}
              className={styles.ingredient}
              style={{ zIndex: MAX_VISIBLE_INGREDIENTS - index }}
            >
              <img
                className={styles.image}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
              {hiddenCount > 0 && index === MAX_VISIBLE_INGREDIENTS - 1 && (
                <span className={`${styles.hiddenCount} text text_type_main-default`}>
                  +{hiddenCount}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className={styles.price}>
          <span className="text text_type_digits-default">
            {totalPrice.toLocaleString('ru-RU')}
          </span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  );
};
