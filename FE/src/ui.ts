export const appShellClassName =
  'flex min-h-screen flex-col bg-slate-100 text-slate-900'
export const mainClassName = 'flex flex-1 justify-center px-4 py-10 sm:px-8 lg:px-12'

export const panelClassName =
  'mx-auto w-full max-w-4xl space-y-6 rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/10'
export const panelHeaderClassName =
  'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
export const panelCtaClassName = 'flex flex-col gap-4'

export const buttonGroupClassName = 'flex flex-wrap gap-3'
export const buttonGroupCenteredClassName =
  'flex flex-wrap items-center justify-center gap-3'

const buttonBaseClassName =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const buttonVariants = {
  primary:
    'bg-blue-400 text-black shadow-lg shadow-blue-600/30 hover:bg-blue-500 focus-visible:outline-blue-600 text-decoration-none',
  secondary:
    'bg-slate-900 text-white shadow-lg shadow-slate-900/25 hover:bg-slate-800 focus-visible:outline-slate-900',
  danger:
    'bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-500 focus-visible:outline-red-600',
} as const

export type ButtonVariant = keyof typeof buttonVariants

export function buttonClassName(variant: ButtonVariant = 'primary') {
  return `${buttonBaseClassName} ${buttonVariants[variant]}`
}

export const linkButtonClassName =
  'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white transition ' +
  'hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

export const postListClassName = 'flex flex-col gap-6'
export const postItemClassName =
  'flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-slate-900/10 p-6'
export const postMetaClassName = 'text-sm text-slate-600'
export const postDescriptionClassName = 'text-slate-700'
export const postContentClassName =
  'space-y-4 text-base leading-relaxed text-slate-700 [&_strong]:font-semibold [&_a]:text-blue-600 [&_a:hover]:underline'

export const formClassName = 'space-y-6'
export const formFieldClassName = 'flex flex-col gap-2'
export const labelClassName = 'text-sm font-semibold text-slate-700'
export const inputClassName =
  'rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm ' +
  'focus:border-slate-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400'
export const errorTextClassName = 'text-sm font-medium text-red-600'
export const feedbackErrorClassName =
  'rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700'

export const profileListClassName = 'flex flex-col gap-4'
export const profileRowClassName = 'grid gap-4 sm:grid-cols-[120px_1fr]'
