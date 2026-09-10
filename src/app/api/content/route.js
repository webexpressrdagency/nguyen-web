import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { getContent, saveContent, hasBlob } from '@/lib/store';

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json({ ok: true, content, storage: hasBlob() ? 'blob' : 'memory' });
}

export async function PUT(request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 });
  }

  if (!payload || typeof payload !== 'object' || !payload.settings) {
    return NextResponse.json({ ok: false, error: 'bad_payload' }, { status: 400 });
  }

  try {
    const result = await saveContent(payload);
    return NextResponse.json({
      ok: true,
      persisted: result.persisted,
      storage: hasBlob() ? 'blob' : 'memory',
    });
  } catch (err) {
    console.error('[api/content] save failed', err);
    return NextResponse.json({ ok: false, error: 'save_failed' }, { status: 500 });
  }
}
