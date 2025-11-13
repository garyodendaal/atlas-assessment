import { Link } from 'react-router-dom';
import {
  buttonClassName,
  buttonGroupClassName,
  panelClassName,
  panelCtaClassName,
} from '../ui';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <section className={panelClassName}>
      <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
        Atlas
      </h1>
      {user ? (
        <div className={panelCtaClassName}>
          <p className='text-slate-700'>You are signed in as {user.email}.</p>
          <div className={buttonGroupClassName}>
            <Link className={buttonClassName('primary')} to='/posts'>
              View posts
            </Link>
            <Link className={buttonClassName('secondary')} to='/posts/new'>
              Create a post
            </Link>
          </div>
        </div>
      ) : (
        <div className={buttonGroupClassName}>
          <Link className={buttonClassName('primary')} to='/login'>
            Sign in
          </Link>
          <Link className={buttonClassName('secondary')} to='/register'>
            Create account
          </Link>
        </div>
      )}
    </section>
  );
};

export default Home;
