import AuthenticationError from '@/errors/authenticationError';
import ClassValidationError from '@/errors/validationError';
import { cleanErrors } from '@/utils/helpers/cleanErrors';
import { validateOrReject, ValidationError } from 'class-validator';
import dayjs from 'dayjs';
import { getUser, updateUser } from '@controllers/user';
import { Verify, VerifyParams, VerificationResponse } from '@models/auth';

const verifyUser = async (
  options: VerifyParams
): Promise<VerificationResponse> => {
  const { id, body } = options;

  if (!id || !body) {
    throw new AuthenticationError('Invalid verification request', 400);
  }

  const data = new Verify(body);
  await validateOrReject(data).catch((errors) => {
    throw new ClassValidationError(
      'An issue Occurred during validation',
      cleanErrors(errors as ValidationError[])
    );
  });

  const userResponse = await getUser(id, [
    'users.id',
    'users.email',
    'users.first_name',
    'users.last_name',
    'users.is_verified',
    'users.verification_token',
    'users.verification_token_expires_at',
  ]);

  const user = userResponse.data;

  if (!user) {
    throw new AuthenticationError('User not found', 404);
  }

  if (user.is_verified) {
    return {
      data: {
        success: true,
      },
    };
  }

  if (!user.verification_token || !user.verification_token_expires_at) {
    throw new AuthenticationError('Invalid or expired verification token', 400);
  }

  if (user.verification_token !== data.token) {
    throw new AuthenticationError('Invalid or expired verification token', 400);
  }

  if (dayjs(user.verification_token_expires_at).isBefore(dayjs())) {
    throw new AuthenticationError('Invalid or expired verification token', 400);
  }

  await updateUser(
    {
      is_verified: true,
      verification_token: null,
      verification_token_expires_at: null,
    },
    id
  );

  return {
    data: {
      success: true,
    },
  };
};

export default verifyUser;
