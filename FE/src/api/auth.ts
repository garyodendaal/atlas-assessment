import { type User } from '../types';
import type {
  BackendUser,
  LoginPayload,
  RegisterPayload,
  VerifyPayload,
} from './types';
import {
  clearAuthToken,
  onAuthFailure,
  readToken,
  request,
  writeToken,
} from './utils';

let cachedUser: User | null | undefined;

onAuthFailure(() => {
  cachedUser = null;
});

function mapUser(data: BackendUser | null | undefined): User | null {
  if (!data?.id || !data.email) {
    return null;
  }

  const nameParts = [data.first_name, data.last_name].filter((part) =>
    Boolean(part && part.trim())
  );
  return {
    id: String(data.id),
    email: data.email,
    name: nameParts.length > 0 ? nameParts.join(' ') : undefined,
    verified: data.is_archived === undefined ? true : !data.is_archived,
  };
}

export async function getCurrentUser(): Promise<User | null> {
  if (cachedUser !== undefined) {
    return cachedUser;
  }

  const token = readToken();
  if (!token) {
    cachedUser = null;
    return null;
  }

  try {
    const response = await request<BackendUser>({
      url: '/user',
      method: 'GET',
      requiresAuth: true,
    });
    const user = mapUser(response.data ?? null);
    cachedUser = user;
    return user;
  } catch (error) {
    if (error) {
      cachedUser = null;
      return null;
    }
    throw error;
  }
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('You must be signed in to continue.');
  }
  return user;
}

export async function login(credentials: LoginPayload): Promise<User> {
  const response = await request<{
    token?: string;
    user?: { userId?: string | number };
  }>({
    url: '/auth/login',
    method: 'POST',
    data: { ...credentials },
  });

  const token = response.data?.token;
  if (!token) {
    throw new Error('Authentication token was not provided by the server.');
  }

  writeToken(token);
  cachedUser = undefined;

  const user = await getCurrentUser();
  if (!user) {
    clearAuthToken();
    cachedUser = null;
    throw new Error('Unable to load the authenticated user profile.');
  }

  return user;
}

export async function register(payload: RegisterPayload): Promise<User> {
  await request({
    url: '/auth/register',
    method: 'POST',
    data: payload,
  });

  return login({ email: payload.email, password: payload.password });
}

export async function verifyAccount(
  userId: string | number,
  payload: VerifyPayload
): Promise<void> {
  if (!userId) {
    throw new Error('A user id is required to verify the account.');
  }

  const response = await request<{ success?: boolean }>({
    url: `/auth/${userId}/verify`,
    method: 'POST',
    data: payload,
  });

  if (!response.data?.success) {
    throw new Error('Unable to verify your email address.');
  }
}

export async function logout(): Promise<void> {
  clearAuthToken();
  cachedUser = null;
}
