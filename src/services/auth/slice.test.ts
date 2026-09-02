import { describe, it, expect } from 'vitest';

import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} from './actions';
import { authSlice, setIsAuthChecked, setUser, initialState } from './slice';

import type {
  TAuthResponse,
  TLogoutResponse,
  TPasswordResetResponse,
  TUser,
  TUserResponse,
} from '@utils/types';

const reducer = authSlice.reducer;

const errorWithoutMessage = { name: 'Error' } as unknown as Error;

const mockUser: TUser = {
  email: 'user@example.com',
  name: 'Test User',
};

const mockAuthResponse: TAuthResponse = {
  success: true,
  user: mockUser,
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
};

const mockUserResponse: TUserResponse = {
  success: true,
  user: { ...mockUser, name: 'Updated User' },
};

const mockPasswordResetResponse: TPasswordResetResponse = {
  success: true,
  message: 'Reset email sent',
};

const mockLogoutResponse: TLogoutResponse = {
  success: true,
  message: 'Successful logout',
};

const registerArg = {
  email: 'user@example.com',
  password: 'password',
  name: 'Test User',
};

const loginArg = {
  email: 'user@example.com',
  password: 'password',
};

describe('authSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  describe('setIsAuthChecked', () => {
    it('должен устанавливать флаг проверки авторизации', () => {
      const result = reducer(initialState, setIsAuthChecked(true));

      expect(result.isAuthChecked).toBe(true);
    });
  });

  describe('setUser', () => {
    it('должен сохранять пользователя', () => {
      const result = reducer(initialState, setUser(mockUser));

      expect(result.user).toEqual(mockUser);
    });

    it('должен очищать пользователя при null', () => {
      const startState = {
        ...initialState,
        user: mockUser,
      };

      const result = reducer(startState, setUser(null));

      expect(result.user).toBeNull();
    });
  });

  describe('registerUser', () => {
    it('должен устанавливать isLoading при pending', () => {
      const startState = {
        ...initialState,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, registerUser.pending('', registerArg));

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('при fulfilled должен сохранить пользователя и отметить проверку авторизации', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        registerUser.fulfilled(mockAuthResponse, '', registerArg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.user).toEqual(mockUser);
      expect(result.isAuthChecked).toBe(true);
    });

    it('должен сохранять сообщение об ошибке регистрации при rejected', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        registerUser.rejected(new Error('Email уже занят'), '', registerArg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Email уже занят');
    });

    it('должен использовать дефолтное сообщение при ошибке регистрации', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        registerUser.rejected(errorWithoutMessage, '', registerArg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Не удалось зарегистрироваться');
    });
  });

  describe('loginUser', () => {
    it('должен устанавливать isLoading при pending', () => {
      const startState = {
        ...initialState,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, loginUser.pending('', loginArg));

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('при fulfilled должен сохранить пользователя и отметить проверку авторизации', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        loginUser.fulfilled(mockAuthResponse, '', loginArg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.user).toEqual(mockUser);
      expect(result.isAuthChecked).toBe(true);
    });

    it('должен сохранять сообщение об ошибке входа при rejected', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        loginUser.rejected(new Error('Неверный пароль'), '', loginArg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Неверный пароль');
    });

    it('должен использовать дефолтное сообщение при ошибке входа', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        loginUser.rejected(errorWithoutMessage, '', loginArg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Не удалось войти');
    });
  });

  describe('logoutUser', () => {
    it('должен устанавливать isLoading при pending', () => {
      const startState = {
        ...initialState,
        user: mockUser,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, logoutUser.pending(''));

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('при fulfilled должен очистить пользователя', () => {
      const startState = {
        ...initialState,
        user: mockUser,
        isLoading: true,
      };

      const result = reducer(startState, logoutUser.fulfilled(mockLogoutResponse, ''));

      expect(result.isLoading).toBe(false);
      expect(result.user).toBeNull();
    });

    it('должен сохранять сообщение об ошибке выхода при rejected', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        logoutUser.rejected(new Error('Токен недействителен'), '')
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Токен недействителен');
    });

    it('должен использовать дефолтное сообщение при ошибке выхода', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(startState, logoutUser.rejected(errorWithoutMessage, ''));

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Не удалось выйти');
    });
  });

  describe('forgotPassword', () => {
    const arg = { email: 'user@example.com' };

    it('должен устанавливать isLoading при pending', () => {
      const startState = {
        ...initialState,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, forgotPassword.pending('', arg));

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('при fulfilled должен сбросить isLoading', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        forgotPassword.fulfilled(mockPasswordResetResponse, '', arg)
      );

      expect(result.isLoading).toBe(false);
    });

    it('должен сохранять сообщение об ошибке отправки письма при rejected', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        forgotPassword.rejected(new Error('Пользователь не найден'), '', arg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Пользователь не найден');
    });

    it('должен использовать дефолтное сообщение при ошибке отправки письма', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        forgotPassword.rejected(errorWithoutMessage, '', arg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Не удалось отправить письмо');
    });
  });

  describe('resetPassword', () => {
    const arg = { password: 'new-password', token: 'reset-token' };

    it('должен устанавливать isLoading при pending', () => {
      const startState = {
        ...initialState,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, resetPassword.pending('', arg));

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('при fulfilled должен сбросить isLoading', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        resetPassword.fulfilled(mockPasswordResetResponse, '', arg)
      );

      expect(result.isLoading).toBe(false);
    });

    it('должен сохранять сообщение об ошибке сброса пароля при rejected', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        resetPassword.rejected(new Error('Неверный код'), '', arg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Неверный код');
    });

    it('должен использовать дефолтное сообщение при ошибке сброса пароля', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        resetPassword.rejected(errorWithoutMessage, '', arg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Не удалось сбросить пароль');
    });
  });

  describe('updateUser', () => {
    const arg = {
      name: 'Updated User',
      email: 'user@example.com',
      password: 'password',
    };

    it('должен устанавливать isLoading при pending', () => {
      const startState = {
        ...initialState,
        user: mockUser,
        error: 'Предыдущая ошибка',
      };

      const result = reducer(startState, updateUser.pending('', arg));

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('при fulfilled должен обновить данные пользователя', () => {
      const startState = {
        ...initialState,
        user: mockUser,
        isLoading: true,
      };

      const result = reducer(
        startState,
        updateUser.fulfilled(mockUserResponse, '', arg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.user).toEqual(mockUserResponse.user);
    });

    it('должен сохранять сообщение об ошибке обновления профиля при rejected', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        updateUser.rejected(new Error('Email уже занят'), '', arg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Email уже занят');
    });

    it('должен использовать дефолтное сообщение при ошибке обновления профиля', () => {
      const startState = {
        ...initialState,
        isLoading: true,
      };

      const result = reducer(
        startState,
        updateUser.rejected(errorWithoutMessage, '', arg)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Не удалось обновить профиль');
    });
  });
});
