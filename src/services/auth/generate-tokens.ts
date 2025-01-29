import { jwtSign, jwtVerify } from '@/utils/jwt';
import { createRefreshToken } from '@/data/auth/create-refresh-token';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export function generateTokens(userId: string) {
  const accessToken = jwtSign({ userId }, ACCESS_TOKEN_EXPIRY);
  const refreshToken = createRefreshToken(userId, REFRESH_TOKEN_EXPIRY);
  return { access_token: accessToken, refresh_token: refreshToken };
}

export async function verifyRefreshToken(token: string) {
  const payload = await jwtVerify(token);
  return payload.userId;
}
