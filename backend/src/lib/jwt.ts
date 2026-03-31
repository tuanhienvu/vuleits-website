import { sign, verify, type Secret, type SignOptions } from 'jsonwebtoken';

function getSecret(): Secret {
  const jwtSecret = process.env.JWT_SECRET?.trim();
  if (!jwtSecret) {
    throw new Error('Missing JWT_SECRET environment variable');
  }
  return jwtSecret;
}

export interface JWTPayload {
  email: string;
  userId: number;
  roleId: number;
}

export function signJWT(payload: JWTPayload, expiresIn: SignOptions['expiresIn'] = '24h'): string {
  return sign(payload, getSecret(), { expiresIn });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return verify(token, getSecret()) as JWTPayload;
  } catch {
    return null;
  }
}
