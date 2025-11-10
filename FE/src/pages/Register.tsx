import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '../api/index';
import { useAuth } from '../context/AuthContext';
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
} from '../ui';

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const Register = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    try {
      const user = await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setUser(user);
      navigate('/');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to register.';
      setError(message);
    }
  };

  return (
    <section className={panelClassName}>
      <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
        Create an account
      </h1>
      <form
        className={formClassName}
        onSubmit={handleSubmit(onSubmit)}
        noValidate>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor='firstName'>
            First name
          </label>
          <input
            id='firstName'
            type='text'
            autoComplete='given-name'
            className={inputClassName}
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 1, message: 'First name is required' },
            })}
          />
          {errors.firstName && (
            <p className={errorTextClassName}>{errors.firstName.message}</p>
          )}
        </div>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor='lastName'>
            Last name
          </label>
          <input
            id='lastName'
            type='text'
            autoComplete='family-name'
            className={inputClassName}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 1, message: 'Last name is required' },
            })}
          />
          {errors.lastName && (
            <p className={errorTextClassName}>{errors.lastName.message}</p>
          )}
        </div>
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
            autoComplete='new-password'
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
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor='confirmPassword'>
            Confirm password
          </label>
          <input
            id='confirmPassword'
            type='password'
            autoComplete='new-password'
            className={inputClassName}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('password') ||
                'The confirmation password must match.',
            })}
          />
          {errors.confirmPassword && (
            <p className={errorTextClassName}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {error && <div className={feedbackErrorClassName}>{error}</div>}
        <div className={buttonGroupClassName}>
          <button
            type='submit'
            className={buttonClassName()}
            disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Register'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
