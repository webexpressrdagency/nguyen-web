import { NextResponse } from 'next/server';
import { addSubmission } from '@/lib/store';

const clean = (v, max = 800) =>
  String(v ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 });
  }

  const kind = body?.kind === 'appointment' ? 'appointment' : 'contact';
  const name = clean(body?.name, 120);
  const email = clean(body?.email, 160);
  const phone = clean(body?.phone, 60);

  if (!name || (!email && !phone)) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'bad_email' }, { status: 400 });
  }

  const entry = {
    kind,
    locale: clean(body?.locale, 5) || 'en',
    name,
    email,
    phone,
    service: clean(body?.service, 120),
    date: clean(body?.date, 30),
    time: clean(body?.time, 30),
    subject: clean(body?.subject, 160),
    message: clean(body?.message, 2000),
  };

  try {
    const result = await addSubmission(kind, entry);
    return NextResponse.json({ ok: true, persisted: result.persisted });
  } catch (err) {
    console.error('[api/submit] failed', err);
    return NextResponse.json({ ok: false, error: 'store_failed' }, { status: 500 });
  }
}
