import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/index';
import { useAuth } from '../../context/AuthContext';
import {
  buttonClassName,
  buttonGroupClassName,
  feedbackErrorClassName,
  formClassName,
  formFieldClassName,
  inputClassName,
  labelClassName,
  panelClassName,
  errorTextClassName,
} from '../../ui';

type LoginFormData = {
  email: string;
  password: string;
};

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      const user = await login(data);
      setUser(user);
      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to sign in.';
      setError(message);
      navigate('/login', { replace: true });
    }
  };

  const handleReset = () => {
    reset();
    setError(null);
  };

  return (
    <section className={panelClassName}>
      <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
        Login
      </h1>
      <form
        className={formClassName}
        onSubmit={handleSubmit(onSubmit)}
        noValidate>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            type='email'
            autoComplete='email'
            className={inputClassName}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <p className={errorTextClassName}>{errors.email.message}</p>
          )}
        </div>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor='password'>
            Password
          </label>
          <input
            id='password'
            type='password'
            autoComplete='current-password'
            className={inputClassName}
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: passwordRules,
                message:
                  'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
              },
            })}
          />
          {errors.password && (
            <p className={errorTextClassName}>{errors.password.message}</p>
          )}
        </div>
        {error && <div className={feedbackErrorClassName}>{error}</div>}
        <div className={buttonGroupClassName}>
          <button
            type='submit'
            className={buttonClassName()}
            disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
          <button
            type='button'
            className={buttonClassName('secondary')}
            onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
