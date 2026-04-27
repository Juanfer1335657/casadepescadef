import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'la-casa-de-pesca-secret-key-2024'
);

export interface AdminUser {
  email: string;
  password: string;
}

const ADMIN_CREDENTIALS: AdminUser = {
  email: process.env.ADMIN_EMAIL || 'admin@lacasadelapesca.com',
  password: process.env.ADMIN_PASSWORD || 'admin123',
};

export async function createToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { email: string };
  } catch {
    return null;
  }
}

export async function login(email: string, password: string): Promise<boolean> {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
}