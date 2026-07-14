import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import { useAppSelector } from '@hooks/use-redux-hooks';
import { ORDER_DETAILS_TEXTS } from '@utils/order-details.constants';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  const orderNumber = useAppSelector((state) => state.order.orderNumber);
  return (
    <section className={styles.container}>
      <p className="text text_type_digits-large mb-8">
        {orderNumber?.toString().padStart(6, '0')}
      </p>
      <p className="text text_type_main-medium mb-15">
        {ORDER_DETAILS_TEXTS.identifierLabel}
      </p>
      <div className={`${styles.icon} mb-15`}>
        <span
          className={`${styles.glow_layer} ${styles.glow_layer_outer}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.glow_layer} ${styles.glow_layer_middle}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.glow_layer} ${styles.glow_layer_inner}`}
          aria-hidden="true"
        />
        <CheckMarkIcon type="primary" className={styles.check} />
      </div>
      <p className="text text_type_main-default mb-2">
        {ORDER_DETAILS_TEXTS.statusTitle}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {ORDER_DETAILS_TEXTS.statusSubtitle}
      </p>
    </section>
  );
};
