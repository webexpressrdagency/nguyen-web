import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { hasBlob } from '@/lib/store';

const MAX_BYTES = 6 * 1024 * 1024;
const OK_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml', 'image/gif'];

export async function POST(request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  if (!hasBlob()) {
    return NextResponse.json(
      { ok: false, error: 'no_storage', message: 'Connect a Vercel Blob store to upload images.' },
      { status: 501 }
    );
  }

  let file;
  try {
    const form = await request.formData();
    file = form.get('file');
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_form' }, { status: 400 });
  }

  if (!file || typeof file === 'string') {
    return NextResponse.json({ ok: false, error: 'no_file' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 });
  }
  if (file.type && !OK_TYPES.includes(file.type)) {
    return NextResponse.json({ ok: false, error: 'bad_type' }, { status: 415 });
  }

  try {
    const { put } = await import('@vercel/blob');
    const safe = (file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '-').slice(-60);
    const { url } = await put(`media/${Date.now()}-${safe}`, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type || 'application/octet-stream',
    });
    return NextResponse.json({ ok: true, url });
  } catch (err) {
    console.error('[api/upload] failed', err);
    return NextResponse.json({ ok: false, error: 'upload_failed' }, { status: 500 });
  }
}
