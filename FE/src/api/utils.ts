import axios, { AxiosHeaders, type AxiosRequestConfig } from 'axios';

type ApiRequestConfig = AxiosRequestConfig & { requiresAuth?: boolean };

export type ApiEnvelope<T> = {
  data?: T;
  count?: number;
  message?: string;
  error?: string;
  errors?: Array<{ message?: string } | string>;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const TOKEN_STORAGE_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: 'application/json' },
});

const authFailureHandlers = new Set<() => void>();

function notifyAuthFailure(): void {
  for (const handler of authFailureHandlers) {
    try {
      handler();
    } catch {
      // ignore handler errors
    }
  }
}

export function onAuthFailure(handler: () => void): () => void {
  authFailureHandlers.add(handler);
  return () => authFailureHandlers.delete(handler);
}

export function readToken(): string | null {
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function writeToken(token: string | null): void {
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function clearAuthToken(): void {
  writeToken(null);
}

function extractErrorMessage(
  payload: ApiEnvelope<unknown> | null | undefined,
  fallback: string
): string {
  if (payload) {
    if (payload.message?.trim()) return payload.message;
    if (payload.error?.trim()) return payload.error;
    if (Array.isArray(payload.errors) && payload.errors.length > 0) {
      const first = payload.errors[0];
      if (typeof first === 'string') return first;
      if (
        first &&
        typeof first === 'object' &&
        typeof first.message === 'string'
      ) {
        return first.message;
      }
    }
  }
  return fallback;
}

export const request = async <T>({
  requiresAuth = false,
  ...config
}: ApiRequestConfig): Promise<ApiEnvelope<T>> => {
  let headers: AxiosHeaders;

  if (!config.headers) {
    headers = new AxiosHeaders();
  } else if (config.headers instanceof AxiosHeaders) {
    headers = config.headers;
  } else {
    // Safely construct a new AxiosHeaders instance
    headers = new AxiosHeaders();

    // Type guard to handle both plain objects and RawAxiosHeaders
    const rawHeaders = config.headers as Record<
      string,
      string | number | boolean
    >;

    for (const [key, value] of Object.entries(rawHeaders)) {
      if (value != null) {
        headers.set(key, String(value));
      }
    }
  }

  if (requiresAuth) {
    const token = readToken();
    if (!token) throw new Error('You must be signed in to continue.');
    headers.set('Authorization', `Bearer ${token}`);
  }

  const requestConfig: AxiosRequestConfig = { ...config, headers };

  if (!requestConfig.url) {
    throw new Error('Request URL is required.');
  }

  try {
    const response = await api.request<ApiEnvelope<T>>(requestConfig);
    return response.data ?? {};
  } catch (error) {
    if (axios.isAxiosError<ApiEnvelope<unknown>>(error) && error.response) {
      const { status, data } = error.response;
      const message = extractErrorMessage(
        data,
        `Request failed with status ${status}`
      );

      if (status === 401 || status === 403) {
        clearAuthToken();
        notifyAuthFailure();
        throw new Error(
          message || 'Your session has expired. Please sign in again.'
        );
      }

      throw new Error(message);
    }

    throw error;
  }
};

export type { ApiRequestConfig };
