import { createBrowserRouter } from 'react-router-dom';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import App, { loader as appLoader } from './App';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Profile from './pages/Profile';
import Register from './pages/Auth/Register';
import Logout from './pages/Auth/Logout';
import Posts from './pages/Posts/Posts';
import PostDetail from './pages/Posts/PostDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'logout', element: <Logout /> },
      { path: 'profile', element: <Profile /> },
      { path: 'register', element: <Register /> },
      { path: 'posts', element: <Posts /> },
      { path: 'posts/:id', element: <PostDetail /> },
    ],
  },
]);
