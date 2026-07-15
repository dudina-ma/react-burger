import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { AuthForm, AuthLink } from '@components/auth-form/auth-form';

export const ResetPasswordPage = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <AuthForm
      title="Восстановление пароля"
      onSubmit={handleSubmit}
      footer={
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <AuthLink to="/login">Войти</AuthLink>
        </p>
      }
    >
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
    </AuthForm>
  );
};
