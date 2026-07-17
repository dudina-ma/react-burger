import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import { AuthForm, AuthLink } from '@components/auth-form/auth-form';
import { useForm } from '@hooks/use-form';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { registerUser } from '@services/auth/actions';

export const RegisterPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(
      registerUser({ name: values.name, email: values.email, password: values.password })
    );
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
        value={values.name}
        placeholder="Имя"
        onChange={handleChange}
        extraClass="mt-6"
      />
      <EmailInput
        name="email"
        value={values.email}
        placeholder="E-mail"
        onChange={handleChange}
        extraClass="mt-6"
      />
      <PasswordInput
        name="password"
        value={values.password}
        placeholder="Пароль"
        onChange={handleChange}
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
