export const LoadingScreen = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 text-slate-900'>
      <div className='w-full max-w-sm space-y-3 text-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-blue-500/40 border-t-blue-600 mx-auto' />
        <p className='text-base font-medium text-slate-700'>Loading…</p>
      </div>
    </div>
  );
};
