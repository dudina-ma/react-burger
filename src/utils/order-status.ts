import type { TOrderStatus } from '@utils/types';

const ORDER_STATUS_LABELS: Record<TOrderStatus, string> = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
};

export const getOrderStatusLabel = (status: TOrderStatus): string =>
  ORDER_STATUS_LABELS[status];

export const isOrderStatusDone = (status: TOrderStatus): boolean => status === 'done';
