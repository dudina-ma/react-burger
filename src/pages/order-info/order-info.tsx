import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Modal } from '@components/modal/modal';
import { OrderInfo } from '@components/order-info/order-info';
import { useAppSelector } from '@hooks/use-redux-hooks';
import { selectFeedOrders } from '@services/feed/slice';

export const OrderInfoPage = (): React.JSX.Element | null => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const feedOrders = useAppSelector(selectFeedOrders);

  const order = useMemo(
    () => feedOrders.find((item) => item._id === id),
    [feedOrders, id]
  );

  const handleClose = useCallback((): void => {
    void navigate('..');
  }, [navigate]);

  if (!order) {
    return null;
  }

  return (
    <Modal
      title={`#${order.number.toString().padStart(6, '0')}`}
      titleClassName="text text_type_digits-default"
      titleCentered
      onClose={handleClose}
    >
      <OrderInfo order={order} />
    </Modal>
  );
};
