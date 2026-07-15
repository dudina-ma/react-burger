import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { AuthForm, AuthLink } from '@components/auth-form/auth-form';

export const LoginPage = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <AuthForm
      title="Вход"
      onSubmit={handleSubmit}
      footer={
        <>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?{' '}
            <AuthLink to="/register">Зарегистрироваться</AuthLink>
          </p>
          <p className="text text_type_main-default text_color_inactive mt-4">
            Забыли пароль? <AuthLink to="/forgot-password">Восстановить пароль</AuthLink>
          </p>
        </>
      }
    >
      <EmailInput
        name="email"
        value={email}
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        extraClass="mt-6"
      />
      <PasswordInput
        name="password"
        value={password}
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
        Войти
      </Button>
    </AuthForm>
  );
};
