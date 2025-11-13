import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { verifyAccount } from '../../api';
import {
  buttonClassName,
  buttonGroupCenteredClassName,
  feedbackErrorClassName,
  panelClassName,
} from '../../ui';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const userId = searchParams.get('userId') ?? '';

  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const runVerification = async () => {
      if (!token || !userId) {
        setStatus('error');
        setError('This verification link is invalid or incomplete.');
        return;
      }

      setStatus('pending');
      setError(null);

      try {
        await verifyAccount(userId, { token });
        if (!isMounted) return;
        setStatus('success');
      } catch (err) {
        if (!isMounted) return;
        const message =
          err instanceof Error
            ? err.message
            : 'Unable to verify your email address.';
        setStatus('error');
        setError(message);
      }
    };

    runVerification();

    return () => {
      isMounted = false;
    };
  }, [token, userId]);

  return (
    <section className={panelClassName}>
      <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
        Verify your email
      </h1>

      {(status === 'idle' || status === 'pending') && (
        <div className='space-y-4 text-center'>
          <div className='mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500/40 border-t-blue-600' />
          <p className='text-base text-slate-700'>
            We are confirming your email address. This will only take a moment.
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className='space-y-6 text-center'>
          <p className='text-base text-slate-700'>
            Thank you! Your email has been verified. You can now sign in using
            your credentials.
          </p>
          <div className={buttonGroupCenteredClassName}>
            <Link className={buttonClassName()} to='/login'>
              Continue to sign in
            </Link>
            <Link className={buttonClassName('secondary')} to='/'>
              Return home
            </Link>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className='space-y-4 text-center'>
          <div className={feedbackErrorClassName}>
            {error ??
              'An unexpected error occurred while verifying your email.'}
          </div>
          <div className={buttonGroupCenteredClassName}>
            <Link className={buttonClassName('secondary')} to='/login'>
              Go to login
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Verify;
