import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  count?: number;
  onClick?: () => void;
};

export const IngredientCard = ({
  ingredient,
  count = 0,
  onClick,
}: TIngredientCardProps): React.JSX.Element => {
  const { image, name, price } = ingredient;

  return (
    <article
      className={`${styles.card} pt-6 pl-4 pr-4 pb-4${onClick ? ` ${styles.clickable}` : ''}`}
      onClick={onClick}
    >
      {count > 0 && <Counter count={count} extraClass={styles.counter} />}
      <img className={styles.image} src={image} alt={name} />
      <p className={`${styles.price} mb-1`}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </article>
  );
};
