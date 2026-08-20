export type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TUser = {
  email: string;
  name: string;
};

export type TRegisterRequest = TUser & {
  password: string;
};

export type TLoginRequest = Pick<TRegisterRequest, 'email' | 'password'>;

export type TUpdateUserRequest = TRegisterRequest;

export type TAuthResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TUserResponse = Pick<TAuthResponse, 'success' | 'user'>;

export type TRefreshResponse = Pick<
  TAuthResponse,
  'success' | 'accessToken' | 'refreshToken'
>;

export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TPasswordResetRequest = Pick<TUser, 'email'>;

export type TResetPasswordRequest = {
  password: string;
  token: string;
};

export type TPasswordResetResponse = TLogoutResponse;

export type TOrderStatus = 'created' | 'pending' | 'done';

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: TOrderStatus;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrderByIdResponse = {
  success: boolean;
  order: TOrder;
};

export type TFeedData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrdersSocketMessage = TFeedData & {
  success: boolean;
  message?: string;
};
