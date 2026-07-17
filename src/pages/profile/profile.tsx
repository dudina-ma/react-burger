import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { updateUser } from '@services/auth/actions';
import { selectUser } from '@services/auth/slice';

import styles from './profile.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
    }
  }, [user]);

  const isChanged =
    Boolean(user) && (name !== user?.name || email !== user?.email || password !== '');

  const handleReset = (): void => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!isChanged) {
      return;
    }

    void dispatch(updateUser({ name, email, password }))
      .unwrap()
      .then(() => setPassword(''));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        value={name}
        placeholder="Имя"
        icon="EditIcon"
        onChange={(e) => setName(e.target.value)}
        onIconClick={() => undefined}
      />
      <Input
        type="text"
        name="email"
        value={email}
        placeholder="Логин"
        icon="EditIcon"
        onChange={(e) => setEmail(e.target.value)}
        onIconClick={() => undefined}
        extraClass="mt-6"
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="Пароль"
        icon="EditIcon"
        onChange={(e) => setPassword(e.target.value)}
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
