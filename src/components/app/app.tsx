import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BASE_URL } from '@utils/constants';

import type { TIngredient, TIngredientsResponse } from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async (): Promise<void> => {
      try {
        const response = await fetch(`${BASE_URL}/api/ingredients`);

        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const data = (await response.json()) as TIngredientsResponse;

        if (!data.success) {
          throw new Error('Не удалось загрузить ингредиенты');
        }

        setIngredients(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchIngredients();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p className={`${styles.error} text text_type_main-default`}>{error}</p>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
};

export default App;
