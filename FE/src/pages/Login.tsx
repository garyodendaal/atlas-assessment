import { buttonClassName, buttonGroupClassName, formClassName, formFieldClassName, inputClassName, labelClassName, panelClassName } from "../ui";

export const Component = () => {
  const isSubmitting = false // TODO

  return (
    <section className={panelClassName}>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Login</h1>
      <form className={formClassName} noValidate>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClassName}
          />
        </div>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className={inputClassName}
          />
        </div>
        <div className={buttonGroupClassName}>
          <button type="submit" className={buttonClassName()} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
          <button type="button" className={buttonClassName('secondary')} >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

Component.displayName = 'Login';
