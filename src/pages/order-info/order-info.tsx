import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Modal } from '@components/modal/modal';
import { OrderInfo } from '@components/order-info/order-info';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { selectFeedOrders } from '@services/feed/slice';
import { fetchOrderById } from '@services/order/actions';
import { clearCurrentOrder } from '@services/order/slice';
import {
  selectUserOrders,
  selectUserOrdersIsLoading,
} from '@services/user-orders/slice';

export const OrderInfoPage = (): React.JSX.Element | null => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isFeedRoute = pathname.startsWith('/feed');

  const feedOrders = useAppSelector(selectFeedOrders);
  const userOrders = useAppSelector(selectUserOrders);
  const userOrdersIsLoading = useAppSelector(selectUserOrdersIsLoading);
  const currentOrder = useAppSelector((state) => state.order.currentOrder);
  const currentOrderError = useAppSelector((state) => state.order.currentOrderError);

  const orderFromWs = useMemo(() => {
    if (!id) {
      return null;
    }

    const orders = isFeedRoute ? feedOrders : userOrders;

    return orders.find((item) => item._id === id) ?? null;
  }, [id, isFeedRoute, feedOrders, userOrders]);

  const order = orderFromWs ?? (isFeedRoute ? currentOrder : null);

  useEffect(() => {
    if (!isFeedRoute || !id || orderFromWs) {
      return;
    }

    void dispatch(fetchOrderById(id));
  }, [dispatch, id, isFeedRoute, orderFromWs]);

  useEffect(
    () => (): void => {
      dispatch(clearCurrentOrder());
    },
    [dispatch, id]
  );

  const handleClose = useCallback((): void => {
    void navigate('..');
  }, [navigate]);

  if (!id) {
    return null;
  }

  const isLoading = isFeedRoute
    ? !order && !currentOrderError
    : !order && userOrdersIsLoading;

  if (isLoading) {
    return <Preloader />;
  }

  if (!order) {
    return (
      <p className="text text_type_main-default p-10">
        {currentOrderError ?? 'Заказ не найден'}
      </p>
    );
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
