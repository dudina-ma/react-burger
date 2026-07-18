import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { useForm } from '@hooks/use-form';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { updateUser } from '@services/auth/actions';
import { selectUser } from '@services/auth/slice';

import styles from './profile.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setValues({ name: user.name, email: user.email, password: '' });
    }
  }, [user, setValues]);

  const isChanged =
    Boolean(user) &&
    (values.name !== user?.name ||
      values.email !== user?.email ||
      values.password !== '');

  const handleReset = (): void => {
    if (user) {
      setValues({ name: user.name, email: user.email, password: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!isChanged) {
      return;
    }

    void dispatch(
      updateUser({ name: values.name, email: values.email, password: values.password })
    )
      .unwrap()
      .then(() => setValues((prev) => ({ ...prev, password: '' })));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        value={values.name}
        placeholder="Имя"
        icon="EditIcon"
        onChange={handleChange}
        onIconClick={() => undefined}
      />
      <Input
        type="text"
        name="email"
        value={values.email}
        placeholder="Логин"
        icon="EditIcon"
        onChange={handleChange}
        onIconClick={() => undefined}
        extraClass="mt-6"
      />
      <Input
        type="password"
        name="password"
        value={values.password}
        placeholder="Пароль"
        icon="EditIcon"
        onChange={handleChange}
        onIconClick={() => undefined}
        extraClass="mt-6"
      />
      {error && (
        <p className="text text_type_main-default text_color_error mt-6">{error}</p>
      )}
      {isChanged && (
        <div className={`${styles.actions} mt-6`}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleReset}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
