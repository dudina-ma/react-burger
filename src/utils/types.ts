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

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TUpdateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type TAuthResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type TRefreshResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TPasswordResetRequest = {
  email: string;
};

export type TResetPasswordRequest = {
  password: string;
  token: string;
};

export type TPasswordResetResponse = {
  success: boolean;
  message: string;
};
