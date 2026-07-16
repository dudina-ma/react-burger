import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { AuthForm, AuthLink } from '@components/auth-form/auth-form';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { registerUser } from '@services/auth/actions';

export const RegisterPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(registerUser({ name, email, password }));
  };

  return (
    <AuthForm
      title="Регистрация"
      onSubmit={handleSubmit}
      footer={
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? <AuthLink to="/login">Войти</AuthLink>
        </p>
      }
    >
      <Input
        type="text"
        name="name"
        value={name}
        placeholder="Имя"
        onChange={(e) => setName(e.target.value)}
        extraClass="mt-6"
      />
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
      {error && (
        <p className="text text_type_main-default text_color_error mt-6">{error}</p>
      )}
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mt-6"
        disabled={isLoading}
      >
        Зарегистрироваться
      </Button>
    </AuthForm>
  );
};
