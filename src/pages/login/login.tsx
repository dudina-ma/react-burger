import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import { AuthForm, AuthLink } from '@components/auth-form/auth-form';
import { useForm } from '@hooks/use-form';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { loginUser } from '@services/auth/actions';

export const LoginPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(loginUser({ email: values.email, password: values.password }));
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
        Войти
      </Button>
    </AuthForm>
  );
};
