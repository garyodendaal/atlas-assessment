import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { getCurrentUser } from './api';
import { useEffect, useState } from 'react';
import { type User } from './types';

export async function loader() {
  const user = await getCurrentUser();
  return { user };
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
  }, [getCurrentUser]);

  return (
    <div>
      <AuthProvider initialUser={user}>
        <Header user={user} />
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;
