import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-1.5 text-sm font-semibold transition ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-slate-100/80 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <header className='bg-slate-900'>
      <div className='mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-white sm:px-6'>
        <div className='text-xl font-bold tracking-tight'>
          <Link to='/' className='transition hover:text-white/80'>
            Atlas
          </Link>
          <NavLink to='/' end className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to='/posts' end className={navLinkClassName}>
            Posts
          </NavLink>
        </div>
        <nav className='flex flex-1 flex-wrap items-center justify-end gap-3 text-sm'>
          {user ? (
            <>
              <span className='rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90'>
                Logged in as {user.fullName}
              </span>
              <NavLink to='/profile' className={navLinkClassName}>
                Profile
              </NavLink>
              <NavLink to='/logout' className={navLinkClassName}>
                Logout
              </NavLink>
              {/* The signed in user should have a link to the login page - Is this correct and what should the behaviour be */}
              <NavLink to='/login' className={navLinkClassName}>
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to='/posts' className={navLinkClassName}>
                Posts
              </NavLink>
              <NavLink to='/login' className={navLinkClassName}>
                Login
              </NavLink>
              <NavLink to='/register' className={navLinkClassName}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
