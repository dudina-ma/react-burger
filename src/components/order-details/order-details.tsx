import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import { ORDER_DETAILS_TEXTS } from '@utils/order-details.constants';
import { MOCK_ORDER_NUMBER } from '@utils/order-mock';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  orderNumber?: string;
};

export const OrderDetails = ({
  orderNumber = MOCK_ORDER_NUMBER,
}: TOrderDetailsProps): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large mb-8">{orderNumber}</p>
      <p className="text text_type_main-medium mb-15">
        {ORDER_DETAILS_TEXTS.identifierLabel}
      </p>
      <div className={`${styles.icon} mb-15`}>
        <div className={styles.glow} aria-hidden="true">
          <span className={`${styles.glow_layer} ${styles.glow_layer_outer}`} />
          <span className={`${styles.glow_layer} ${styles.glow_layer_middle}`} />
          <span className={`${styles.glow_layer} ${styles.glow_layer_inner}`} />
        </div>
        <CheckMarkIcon type="primary" className={styles.check} />
      </div>
      <p className="text text_type_main-default mb-2">
        {ORDER_DETAILS_TEXTS.statusTitle}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {ORDER_DETAILS_TEXTS.statusSubtitle}
      </p>
    </div>
  );
};
