import { verifyRefreshToken, generateTokens } from './generate-tokens';
import { invalidateRefreshToken } from '@/data/auth/invalidate-token';

export async function refreshAccessToken({ refreshToken }: { refreshToken: string }) {
  const userId = verifyRefreshToken(refreshToken);
  await invalidateRefreshToken(refreshToken);
  return generateTokens(userId);
}
