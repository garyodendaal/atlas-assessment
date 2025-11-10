import { panelClassName, profileListClassName, profileRowClassName } from '../ui'

export const Component = () => {
    const user = {
        email: 'TODO',
        verified: true
    }

  return (
    <section className={panelClassName}>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your profile</h1>
      <dl className={profileListClassName}>
        <div className={profileRowClassName}>
          <dt className="text-sm font-semibold uppercase tracking-wide text-slate-600">Email</dt>
          <dd className="m-0 text-lg text-slate-800">{user.email}</dd>
        </div>
        <div className={profileRowClassName}>
          <dt className="text-sm font-semibold uppercase tracking-wide text-slate-600">Verified</dt>
          <dd className="m-0 text-lg text-slate-800">{user.verified ? 'Yes' : 'Pending verification'}</dd>
        </div>
      </dl>
    </section>
  )
}

Component.displayName = 'Profile'