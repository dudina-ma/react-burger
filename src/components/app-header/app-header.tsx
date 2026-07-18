import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

import styles from './app-header.module.css';

type HeaderNavItem = {
  to: string;
  label: string;
  className?: string;
  end?: boolean;
  activePaths?: string[];
  icon: typeof BurgerIcon;
};

const LEFT_NAV: HeaderNavItem[] = [
  {
    to: '/',
    label: 'Конструктор',
    end: true,
    activePaths: ['/ingredients/:id'],
    icon: BurgerIcon,
  },
  {
    to: '/feed',
    label: 'Лента заказов',
    className: 'ml-10',
    icon: ListIcon,
  },
];

const PROFILE_NAV: HeaderNavItem = {
  to: '/profile',
  label: 'Личный кабинет',
  className: styles.link_position_last,
  icon: ProfileIcon,
};

const isNavItemActive = (pathname: string, item: HeaderNavItem): boolean => {
  if (matchPath({ path: item.to, end: item.end ?? false }, pathname)) {
    return true;
  }

  return (
    item.activePaths?.some((path) => matchPath({ path, end: true }, pathname)) ?? false
  );
};

const HeaderNavLink = ({ item }: { item: HeaderNavItem }): React.JSX.Element => {
  const { pathname } = useLocation();
  const isActive = isNavItemActive(pathname, item);
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={`${styles.link} ${item.className ?? ''} ${isActive ? styles.link_active : ''}`}
    >
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <p className="text text_type_main-default ml-2">{item.label}</p>
    </NavLink>
  );
};

export const AppHeader = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {LEFT_NAV.map((item) => (
            <HeaderNavLink key={item.to} item={item} />
          ))}
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <HeaderNavLink item={PROFILE_NAV} />
      </nav>
    </header>
  );
};
