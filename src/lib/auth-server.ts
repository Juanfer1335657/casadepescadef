import { cookies } from 'next/headers';
import { createToken, verifyToken } from './auth';

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setSession(email: string) {
  const token = await createToken(email);
  const cookieStore = await cookies();
  cookieStore.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin-token');
}