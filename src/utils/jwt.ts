import { SignJWT, jwtVerify as joseVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

import { JWTPayload } from 'jose';

export function jwtSign(payload: JWTPayload, expiresIn: string) {
  return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(expiresIn).sign(JWT_SECRET);
}

export function jwtVerify(token: string) {
  return joseVerify(token, JWT_SECRET).then(decoded => decoded.payload);
}
