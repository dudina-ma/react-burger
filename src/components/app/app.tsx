import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { ProtectedRoute } from '@components/protected-route/protected-route';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { FeedPage } from '@pages/feed/feed';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password';
import { Home } from '@pages/home/home';
import { IngredientDetails } from '@pages/ingredient-details/ingredient-details';
import { LoginPage } from '@pages/login/login';
import { NotFoundPage } from '@pages/not-found/not-found';
import { OrderInfoPage } from '@pages/order-info/order-info';
import { ProfilePage } from '@pages/profile/profile';
import { ProfileLayout } from '@pages/profile/profile-layout';
import { ProfileOrderPage } from '@pages/profile/profile-orders';
import { RegisterPage } from '@pages/register/register';
import { ResetPasswordPage } from '@pages/reset-password/reset-password';
import { checkUserAuth } from '@services/auth/actions';
import { fetchIngredients } from '@services/ingredients/actions';

import styles from './app.module.css';

const AppLayout = (): React.JSX.Element => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: 'ingredients/:id',
            element: <IngredientDetails />,
          },
        ],
      },
      {
        path: 'login',
        element: <ProtectedRoute guestOnly component={<LoginPage />} />,
      },
      {
        path: 'register',
        element: <ProtectedRoute guestOnly component={<RegisterPage />} />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
        children: [
          {
            path: ':id',
            element: <OrderInfoPage />,
          },
        ],
      },
      {
        path: 'profile',
        element: <ProtectedRoute component={<ProfileLayout />} />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: 'orders',
            element: <ProfileOrderPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    void dispatch(checkUserAuth());
    void dispatch(fetchIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p className={`${styles.error} text text_type_main-default`}>{error}</p>;
  }

  return <RouterProvider router={router} />;
};

export default App;
