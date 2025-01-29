import { comparePassword } from '@/utils/hash';
import { generateTokens } from './generate-tokens';
import { getUserByEmail } from '@/data/auth/get-user';

interface AuthenticateUserParams {
  email: string;
  password: string;
}

export async function authenticateUser({ email, password }: AuthenticateUserParams) {
  const user = await getUserByEmail(email);
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  return generateTokens(user.id_user);
}
