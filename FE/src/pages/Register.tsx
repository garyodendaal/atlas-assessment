import { buttonClassName, buttonGroupClassName, formClassName, formFieldClassName, inputClassName, labelClassName, panelClassName } from "../ui"

export const Component = () => {
    const isSubmitting = false;
    
    return ( <section className={panelClassName}>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create an account</h1>
      <form className={formClassName} noValidate>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            className={inputClassName}
          />
        </div>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            className={inputClassName}
          />
        </div>
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
            autoComplete="new-password"
            className={inputClassName}
          />
        </div>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={inputClassName}
          />
        </div>
        <div className={buttonGroupClassName}>
          <button type="submit" className={buttonClassName()} disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Register'}
          </button>
        </div>
      </form>
    </section>)
}

Component.displayName = 'Register'