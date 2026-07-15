import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import styles from './not-found.module.css';

export const NotFoundPage = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <p className={`${styles.code} text text_type_digits-large`}>404</p>
      <h1 className="text text_type_main-medium mt-8">Страница не найдена</h1>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Такого адреса в Stellar Burgers нет. Возможно, страница ещё в разработке или вы
        перешли по неверной ссылке.
      </p>
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="mt-10"
        onClick={() => void navigate('/')}
      >
        На главную
      </Button>
    </main>
  );
};
