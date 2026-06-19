import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient: TIngredient;
};

const NUTRITION_LABELS = [
  { key: 'calories' as const, label: 'Калории, ккал' },
  { key: 'proteins' as const, label: 'Белки, г' },
  { key: 'fat' as const, label: 'Жиры, г' },
  { key: 'carbohydrates' as const, label: 'Углеводы, г' },
];

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetailsProps): React.JSX.Element => {
  const { image_large, name } = ingredient;

  return (
    <div className={styles.container}>
      <img className={`${styles.image} mb-4`} src={image_large} alt={name} />
      <h3 className="text text_type_main-medium mb-8">{name}</h3>
      <ul className={styles.nutrition}>
        {NUTRITION_LABELS.map(({ key, label }) => (
          <li key={key} className={styles.item}>
            <p
              className={`${styles.label} text text_type_main-default text_color_inactive`}
            >
              {label}
            </p>
            <p className={`${styles.value} text text_type_digits-default`}>
              {ingredient[key]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
