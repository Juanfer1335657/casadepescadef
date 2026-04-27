import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-server';

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json({ authenticated: !!session, session });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ authenticated: false, session: null }, { status: 500 });
  }
}