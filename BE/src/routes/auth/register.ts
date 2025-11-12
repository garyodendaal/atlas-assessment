import {
  default as AuthenticationError,
  default as Error,
} from '@/errors/authenticationError';
import ClassValidationError from '@/errors/validationError';
import { cleanErrors } from '@/utils/helpers/cleanErrors';
import generateForgotPasswordEmail from '@/utils/mail-templates/forgotPassword';
import generateWelcomeEmail from '@/utils/mail-templates/welcomeEmail';
import { createUser, emailExists } from '@controllers/user';
import { Register, RegisterParams, type AuthResponse } from '@models/auth';
import { sendEmail } from '@utils/mail';
import bcrypt from 'bcryptjs';
import { validateOrReject, type ValidationError } from 'class-validator';
import crypto from 'crypto';
import dayjs from 'dayjs';

/**
 * Login user
 * @param {RegisterParams} options login parameters
 * @returns {Promise<AuthResponse>} the user token
 */
const registerUser = async (options: RegisterParams): Promise<AuthResponse> => {
  const { body } = options;
  // Add VERIFY HERE
  if (!body) {
    throw new Error('Invalid data supplied');
  }

  const data = new Register(body);
  await validateOrReject(data).catch((errors) => {
    throw new ClassValidationError(
      'An issue Occurred during validation',
      cleanErrors(errors as ValidationError[])
    );
  });

  const exist = await emailExists(data.email);

  if (exist) {
    throw new AuthenticationError('Email already exists', 400);
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationExpiresAt = dayjs().add(24, 'hour').toDate();

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    email: data.email,
    password: hashedPassword,
    first_name: data.firstName,
    last_name: data.lastName,
    is_archived: false,
    is_verified: false,
    verification_token: verificationToken,
    verification_token_expires_at: verificationExpiresAt,
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}&userId=${user.id}`;

  const emailTemplate = generateWelcomeEmail({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    url: verificationUrl,
  });

  await sendEmail(
    data.email,
    emailTemplate,
    'Welcome to the Atlas Portal. Please verify your account'
  );

  return {
    data: {
      success: true,
    },
  };
};

export default registerUser;
