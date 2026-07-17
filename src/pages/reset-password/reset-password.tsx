import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Navigate, useNavigate } from 'react-router-dom';

import { AuthForm, AuthLink } from '@components/auth-form/auth-form';
import { useForm } from '@hooks/use-form';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { resetPassword } from '@services/auth/actions';
import { isPasswordResetAllowed } from '@utils/password-reset';

export const ResetPasswordPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { values, handleChange } = useForm({ password: '', token: '' });

  if (!isPasswordResetAllowed()) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    void dispatch(resetPassword({ password: values.password, token: values.token }))
      .unwrap()
      .then(() => {
        void navigate('/login');
      })
      .catch(() => undefined);
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
        value={values.password}
        placeholder="Введите новый пароль"
        onChange={handleChange}
        extraClass="mt-6"
      />
      <Input
        type="text"
        name="token"
        value={values.token}
        placeholder="Введите код из письма"
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
        Сохранить
      </Button>
    </AuthForm>
  );
};
