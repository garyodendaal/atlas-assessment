import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/index';
import { useAuth } from '../context/AuthContext';
import { panelClassName } from '../ui';

const Logout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      setUser(null);
      navigate('/login', { replace: true });
    };
    performLogout();
  }, [navigate, setUser]);

  return (
    <section className={panelClassName}>
      <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
        Signing out…
      </h1>
      <p className='text-slate-700'>
        You are being signed out and will be redirected shortly.
      </p>
    </section>
  );
};

export default Logout;
