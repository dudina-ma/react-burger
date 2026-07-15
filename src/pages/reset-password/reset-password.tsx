import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './reset-password.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          name="password"
          value={password}
          placeholder="Введите новый пароль"
          onChange={(e) => setPassword(e.target.value)}
          extraClass="mt-6"
        />
        <Input
          type="text"
          name="token"
          value={token}
          placeholder="Введите код из письма"
          onChange={(e) => setToken(e.target.value)}
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
          Сохранить
        </Button>
      </form>
      <div className={`${styles.footer} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
