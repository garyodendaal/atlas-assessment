import { createBrowserRouter } from 'react-router-dom';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import App, { loader as appLoader } from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'profile', element: <Profile /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);
