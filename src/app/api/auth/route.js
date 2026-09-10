import { NextResponse } from 'next/server';
import { COOKIE, adminPassword, makeToken, cookieOptions } from '@/lib/auth';

export async function POST(request) {
  let password = '';
  try {
    const body = await request.json();
    password = body?.password || '';
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  if (!password || password !== adminPassword()) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, makeToken(), cookieOptions);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, '', { ...cookieOptions, maxAge: 0 });
  return res;
}
