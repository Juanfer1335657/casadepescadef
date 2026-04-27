import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';
import { setSession, clearSession } from '@/lib/auth-server';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'logout') {
      await clearSession();
      return NextResponse.json({ success: true });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    const isValid = await login(email, password);

    if (!isValid) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    await setSession(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Error de autenticación' }, { status: 500 });
  }
}