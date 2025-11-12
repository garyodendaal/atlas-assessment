import { Link } from 'react-router-dom';
import {
  buttonClassName,
  buttonGroupClassName,
  panelClassName,
  panelCtaClassName,
} from '../ui';
import { getCurrentUser } from '../api';
import { useEffect, useState } from 'react';
import { type User } from '../types';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
  });

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
