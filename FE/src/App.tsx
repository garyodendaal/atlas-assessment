import { Outlet, useLoaderData } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { getCurrentUser } from './api';
import { type User } from './types';

export async function loader() {
  const user = await getCurrentUser();
  return { user };
}

function App() {
  const { user } = useLoaderData() as { user: User | null };

  return (
    <div>
      <AuthProvider initialUser={user}>
        <Header />
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;
