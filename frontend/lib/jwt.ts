import { sign, verify, type Secret, type SignOptions } from 'jsonwebtoken';

const secret: Secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';

export interface JWTPayload {
  email: string;
  userId: number;
  roleId: number;
}

export function signJWT(payload: JWTPayload, expiresIn: SignOptions['expiresIn'] = '24h'): string {
  return sign(payload, secret, { expiresIn });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return verify(token, secret) as JWTPayload;
  } catch {
    return null;
  }
}
