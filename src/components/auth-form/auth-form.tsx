import { Link } from 'react-router-dom';

import type { FormEvent, ReactNode } from 'react';

import styles from './auth-form.module.css';

type AuthFormProps = {
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  footer: ReactNode;
};

type AuthLinkProps = {
  to: string;
  children: ReactNode;
};

export const AuthForm = ({
  title,
  onSubmit,
  children,
  footer,
}: AuthFormProps): React.JSX.Element => {
  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">{title}</h1>
        {children}
      </form>
      <div className={`${styles.footer} mt-20`}>{footer}</div>
    </div>
  );
};

export const AuthLink = ({ to, children }: AuthLinkProps): React.JSX.Element => {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
};
