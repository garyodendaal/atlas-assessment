import { createBrowserRouter } from 'react-router-dom';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, lazy: () => import('./pages/Home') },
      { path: '/login', lazy: () => import('./pages/Login') },
      { path: '/profile', lazy: () => import('./pages/Profile')},
      { path: '/register', lazy: () => import('./pages/Register')},
    ],
  },
]);
