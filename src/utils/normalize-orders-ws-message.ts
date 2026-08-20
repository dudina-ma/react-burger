import type { TOrder, TOrderStatus, TOrdersSocketMessage } from '@utils/types';

const ORDER_STATUSES: readonly TOrderStatus[] = ['created', 'pending', 'done'];

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0;

const isValidDateString = (value: unknown): value is string =>
  typeof value === 'string' && !Number.isNaN(Date.parse(value));

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

export const isValidOrder = (order: unknown): order is TOrder => {
  if (order === null || typeof order !== 'object') {
    return false;
  }

  const candidate = order as Record<string, unknown>;

  return (
    isNonEmptyString(candidate._id) &&
    isFiniteNumber(candidate.number) &&
    isNonEmptyString(candidate.name) &&
    isValidDateString(candidate.createdAt) &&
    isValidDateString(candidate.updatedAt) &&
    ORDER_STATUSES.includes(candidate.status as TOrderStatus) &&
    Array.isArray(candidate.ingredients) &&
    candidate.ingredients.length > 0 &&
    candidate.ingredients.every((id) => isNonEmptyString(id))
  );
};

export type TNormalizedOrdersWSMessage = {
  success: boolean;
  message?: string;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const normalizeOrdersWSMessage = (
  payload: TOrdersSocketMessage
): TNormalizedOrdersWSMessage => {
  if (!payload.success) {
    return {
      success: false,
      message: payload.message,
      orders: [],
      total: 0,
      totalToday: 0,
    };
  }

  return {
    success: true,
    orders: (Array.isArray(payload.orders) ? payload.orders : []).filter(isValidOrder),
    total: isFiniteNumber(payload.total) ? payload.total : 0,
    totalToday: isFiniteNumber(payload.totalToday) ? payload.totalToday : 0,
  };
};
