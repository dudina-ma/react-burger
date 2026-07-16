const PASSWORD_RESET_ALLOWED_KEY = 'passwordResetAllowed';

export const allowPasswordReset = (): void => {
  localStorage.setItem(PASSWORD_RESET_ALLOWED_KEY, 'true');
};

export const isPasswordResetAllowed = (): boolean =>
  localStorage.getItem(PASSWORD_RESET_ALLOWED_KEY) === 'true';

export const clearPasswordResetAllowed = (): void => {
  localStorage.removeItem(PASSWORD_RESET_ALLOWED_KEY);
};
