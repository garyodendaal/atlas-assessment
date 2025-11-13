export type BackendUser = {
  id?: number | string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_archived?: boolean;
};

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const AuthError = (message: string): Error => {
  const error = new Error(message);
  error.name = 'AuthError';
  return error;
};

export type VerifyPayload = {
  token: string;
};
