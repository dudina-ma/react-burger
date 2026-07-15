import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { AuthForm, AuthLink } from '@components/auth-form/auth-form';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const [email, setEmail] = useState('');

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
      <EmailInput
        name="email"
        value={email}
        placeholder="Укажите e-mail"
        onChange={(e) => setEmail(e.target.value)}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
        Восстановить
      </Button>
    </AuthForm>
  );
};
