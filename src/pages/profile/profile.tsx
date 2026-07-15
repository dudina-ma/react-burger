import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './profile.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.form}>
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
    </form>
  );
};
