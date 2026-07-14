import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { Home } from '@pages/home/home';
import { IngredientDetails } from '@pages/ingredient-details/ingredient-details';
import { fetchIngredients } from '@services/ingredients/actions';

import styles from './app.module.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'ingredients/:id',
    element: <IngredientDetails />,
  },
]);

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p className={`${styles.error} text text_type_main-default`}>{error}</p>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
