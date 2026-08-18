import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Modal } from '@components/modal/modal';
import { OrderInfo } from '@components/order-info/order-info';
import { useAppSelector } from '@hooks/use-redux-hooks';
import { getMockOrderById } from '@utils/feed-mock';

export const OrderInfoPage = (): React.JSX.Element | null => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const order = useMemo(() => getMockOrderById(ingredients, id), [id, ingredients]);

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
