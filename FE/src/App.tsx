import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { getCurrentUser } from './api';

export async function loader() {
  const user = await getCurrentUser();
  return { user };
}

function App() {
  return (
    <div>
      <AuthProvider initialUser={null}>
        <Header />
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;
