import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { IngredientCard } from '@components/ingredient-card/ingredient-card';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);

  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');

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
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
        </ul>
      </nav>

      <section className={`${styles.ingredients_list} custom-scroll`}>
        <section className={styles.ingredients_section} id="bun">
          <h2 className="text text_type_main-medium m-0 mb-6">Булки</h2>
          <ul className={styles.cards_grid}>
            {buns.map((ingredient) => (
              <li key={ingredient._id}>{renderIngredientCard(ingredient)}</li>
            ))}
          </ul>
        </section>

        <section className={styles.ingredients_section} id="sauce">
          <h2 className="text text_type_main-medium m-0 mb-6">Соусы</h2>
          <ul className={styles.cards_grid}>
            {sauces.map((ingredient) => (
              <li key={ingredient._id}>{renderIngredientCard(ingredient)}</li>
            ))}
          </ul>
        </section>

        <section className={styles.ingredients_section} id="main">
          <h2 className="text text_type_main-medium m-0 mb-6">Начинки</h2>
          <ul className={styles.cards_grid}>
            {mains.map((ingredient) => (
              <li key={ingredient._id}>{renderIngredientCard(ingredient)}</li>
            ))}
          </ul>
        </section>
      </section>

      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
