export interface User {
  id: string;
  email: string;
  fullName?: string;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
