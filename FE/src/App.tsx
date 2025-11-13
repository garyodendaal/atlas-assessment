import { Outlet, useLoaderData } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { getCurrentUser } from './api';
import { type User } from './types';
import { appShellClassName, mainClassName } from './ui';

export async function loader() {
  const user = await getCurrentUser();
  return { user };
}

const App = () => {
  const { user } = useLoaderData() as { user: User | null };

  return (
    <div className={appShellClassName}>
      <AuthProvider initialUser={user}>
        <Header />
        <main className={mainClassName}>
          <Outlet />
        </main>
      </AuthProvider>
    </div>
  );
};

export default App;
