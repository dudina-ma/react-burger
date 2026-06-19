import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { IngredientCard } from '@components/ingredient-card/ingredient-card';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

const INGREDIENT_SECTIONS = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
] as const;

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);

  const sections = INGREDIENT_SECTIONS.map(({ type, title }) => ({
    id: type,
    title,
    items: ingredients.filter((item) => item.type === type),
  }));

  const handleCloseModal = (): void => {
    setSelectedIngredient(null);
  };

  const renderIngredientCard = (ingredient: TIngredient): React.JSX.Element => (
    <IngredientCard
      ingredient={ingredient}
      onClick={() => {
        setSelectedIngredient(ingredient);
      }}
    />
  );

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {INGREDIENT_SECTIONS.map(({ type, title }, index) => (
            <Tab
              key={type}
              value={type}
              active={index === 0}
              onClick={() => {
                /* TODO */
              }}
            >
              {title}
            </Tab>
          ))}
        </ul>
      </nav>

      <section className={`${styles.ingredients_list} custom-scroll`}>
        {sections.map(({ id, title, items }) => (
          <section key={id} className={styles.ingredients_section} id={id}>
            <h2 className="text text_type_main-medium m-0 mb-6">{title}</h2>
            <ul className={styles.cards_grid}>
              {items.map((ingredient) => (
                <li key={ingredient._id}>{renderIngredientCard(ingredient)}</li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
