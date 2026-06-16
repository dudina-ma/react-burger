import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
};

export const IngredientCard = ({
  ingredient,
}: TIngredientCardProps): React.JSX.Element => {
  const { image, name, price } = ingredient;

  return (
    <article className={styles.card}>
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.price}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </article>
  );
};
