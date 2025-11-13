import type { Post } from '../types';
import { request } from './utils';

export type BackendPost = {
  id?: string | number;
  title?: string | null;
  content?: string | null;
  user_id?: string | number | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type PostPayload = {
  title: string;
  content: string;
};

const normalizePost = (
  entity: BackendPost | BackendPost[] | null | undefined
): BackendPost | null => {
  if (Array.isArray(entity)) {
    return entity[0] ?? null;
  }
  return entity ?? null;
};

const mapPost = (
  entity: BackendPost | BackendPost[] | null | undefined
): Post => {
  const post = normalizePost(entity);
  if (!post?.id) {
    throw new Error('The requested post could not be found.');
  }

  return {
    id: String(post.id),
    title: post.title ?? '',
    content: post.content ?? '',
    userId: post.user_id ? String(post.user_id) : undefined,
    createdAt: post.created_at ?? undefined,
    updatedAt: post.updated_at ?? undefined,
  };
};

export const getPosts = async ({
  page = 1,
  limit = 5,
}: { page?: number; limit?: number } = {}) => {
  const response = await request<BackendPost[]>({
    url: '/posts',
    method: 'GET',
    requiresAuth: true,
    params: { page, limit },
  });

  const posts = (response.data ?? []).map((post) => mapPost(post));
  return {
    posts,
    total: response.count ?? posts.length,
  };
};

export const getPost = async (id: string | number) => {
  if (!id) {
    throw new Error('A post id is required.');
  }

  const response = await request<BackendPost>({
    url: `/posts/${id}`,
    method: 'GET',
    requiresAuth: true,
  });

  return mapPost(response.data);
};

export const createPost = async (payload: PostPayload) => {
  const response = await request<BackendPost>({
    url: '/posts',
    method: 'POST',
    requiresAuth: true,
    data: payload,
  });

  return mapPost(response.data);
};

export const updatePost = async (id: string | number, payload: PostPayload) => {
  const response = await request<BackendPost>({
    url: `/posts/${id}`,
    method: 'PUT',
    requiresAuth: true,
    data: payload,
  });

  return mapPost(response.data);
};

export const deletePost = async (id: string | number) => {
  const response = await request<BackendPost>({
    url: `/posts/${id}`,
    method: 'DELETE',
    requiresAuth: true,
  });

  return mapPost(response.data);
};
