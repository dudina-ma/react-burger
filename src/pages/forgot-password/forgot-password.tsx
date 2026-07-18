import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import { AuthForm, AuthLink } from '@components/auth-form/auth-form';
import { useForm } from '@hooks/use-form';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { forgotPassword } from '@services/auth/actions';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { values, handleChange } = useForm({ email: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    void dispatch(forgotPassword({ email: values.email }))
      .unwrap()
      .then(() => {
        void navigate('/reset-password');
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
      <EmailInput
        name="email"
        value={values.email}
        placeholder="Укажите e-mail"
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
        Восстановить
      </Button>
    </AuthForm>
  );
};
