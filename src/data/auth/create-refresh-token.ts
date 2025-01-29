import { db } from '@/db';

export async function createRefreshToken(userId: string, expiresIn: string) {
  const refreshToken = crypto.randomUUID();
  const expiryDate = new Date(Date.now() + parseExpiry(expiresIn));
  await db
    .insertInto('user_sessions')
    .values({ user_id: userId, refresh_token: refreshToken, expires_at: expiryDate })
    .execute();
  return refreshToken;
}

function parseExpiry(expiry: string) {
  const match = expiry.match(/(\d+)([dhms])/);
  if (!match) throw new Error('Invalid expiry format');
  const [, amount, unit] = match;
  const multiplier = { d: 86400000, h: 3600000, m: 60000, s: 1000 }[unit];
  return Number(amount) * multiplier;
}
