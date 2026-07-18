import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@hooks/use-redux-hooks';
import { selectIsAuthChecked, selectUser } from '@services/auth/slice';

type TProtectedRouteProps = {
  component: React.ReactElement;
  guestOnly?: boolean;
};

type TLocationState = {
  from?: Location;
};

export const ProtectedRoute = ({
  component,
  guestOnly = false,
}: TProtectedRouteProps): React.ReactElement | null => {
  const location = useLocation();
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);

  if (!isAuthChecked) {
    return null;
  }

  if (guestOnly && user) {
    const { from } = (location.state as TLocationState | null) ?? {
      from: { pathname: '/' },
    };

    return <Navigate to={from ?? '/'} replace />;
  }

  if (!guestOnly && !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return component;
};
