import { NavLink, Outlet, matchPath, useLocation } from 'react-router-dom';

import styles from './profile.module.css';

type ProfileNavItem = {
  to: string;
  end?: boolean;
  label: string;
  description: string;
};

const PROFILE_NAV: ProfileNavItem[] = [
  {
    to: '/profile',
    end: true,
    label: 'Профиль',
    description: 'В этом разделе вы можете изменить свои персональные данные',
  },
  {
    to: '/profile/orders',
    label: 'История заказов',
    description: 'В этом разделе вы можете просмотреть свою историю заказов',
  },
];

const getActiveNavItem = (pathname: string): ProfileNavItem =>
  [...PROFILE_NAV]
    .sort((a, b) => b.to.length - a.to.length)
    .find((item) => matchPath({ path: item.to, end: item.end ?? false }, pathname)) ??
  PROFILE_NAV[0];

export const ProfileLayout = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const { description } = getActiveNavItem(pathname);

  return (
    <div className={`${styles.page} pt-30 pl-5 pr-5`}>
      <aside className={`${styles.sidebar} mr-15`}>
        <nav className={styles.nav}>
          {PROFILE_NAV.map(({ to, end, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${styles.link} text text_type_main-medium ${isActive ? styles.linkActive : 'text_color_inactive'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </button>
        </nav>
        <p
          className={`${styles.description} text text_type_main-default text_color_inactive mt-20`}
        >
          {description}
        </p>
      </aside>
      <Outlet />
    </div>
  );
};
