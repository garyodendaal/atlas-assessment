import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { buttonClassName } from '../../ui';

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred. Please try again later.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    if (
      error.data &&
      typeof error.data === 'object' &&
      'message' in error.data
    ) {
      const dataMessage = (error.data as { message?: string }).message;
      if (dataMessage) {
        message = dataMessage;
      }
    } else if (typeof error.data === 'string' && error.data.trim().length > 0) {
      message = error.data;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 text-slate-900'>
      <div className='w-full max-w-xl space-y-6 rounded-3xl bg-white p-8 text-center shadow-xl shadow-slate-900/10'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          {title}
        </h1>
        <p className='text-lg text-slate-700'>{message}</p>
        <div className='flex justify-center'>
          <Link className={buttonClassName()} to='/'>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};
