import seed from '../../data/content.json';

const CONTENT_KEY = 'site-content.json';
const INBOX_PREFIX = 'inbox/submissions';

export const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/* ------------------------------------------------------------------ *
 * In-memory layer (used as cache with Blob, and as the only store
 * when no Blob token is configured yet).
 * ------------------------------------------------------------------ */
const mem = globalThis.__ncContentStore || (globalThis.__ncContentStore = {
  content: null,
  fetchedAt: 0,
  inbox: null,
});

const TTL = 10_000;
const clone = (v) => JSON.parse(JSON.stringify(v));

function normalize(data) {
  const base = clone(seed);
  const merged = { ...base, ...(data || {}) };
  merged.settings = { ...base.settings, ...(data?.settings || {}) };
  merged.settings.colors = { ...base.settings.colors, ...(data?.settings?.colors || {}) };
  merged.settings.contact = { ...base.settings.contact, ...(data?.settings?.contact || {}) };
  merged.settings.seo = { ...base.settings.seo, ...(data?.settings?.seo || {}) };
  merged.settings.locales = { ...base.settings.locales, ...(data?.settings?.locales || {}) };
  merged.submissions = {
    appointments: data?.submissions?.appointments || [],
    contacts: data?.submissions?.contacts || [],
  };
  return merged;
}

/* ------------------------------------------------------------------ *
 * Vercel Blob helpers (content is public site copy; the inbox is
 * written to an unguessable path so patient details are not browsable)
 * ------------------------------------------------------------------ */
async function blobRead(prefix) {
  const { list } = await import('@vercel/blob');
  const { blobs } = await list({ prefix, limit: 100 });
  if (!blobs.length) return null;
  const newest = blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
  const res = await fetch(newest.url, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function blobWriteContent(data) {
  const { put } = await import('@vercel/blob');
  await put(CONTENT_KEY, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

async function blobWriteInbox(data) {
  const { put, list, del } = await import('@vercel/blob');
  const { url } = await put(`${INBOX_PREFIX}.json`, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: true,
    cacheControlMaxAge: 0,
  });
  try {
    const { blobs } = await list({ prefix: INBOX_PREFIX, limit: 100 });
    const stale = blobs.filter((b) => b.url !== url).map((b) => b.url);
    if (stale.length) await del(stale);
  } catch {
    /* housekeeping only */
  }
}

/* ------------------------------------------------------------------ *
 * Public API
 * ------------------------------------------------------------------ */
export async function getContent() {
  if (mem.content && Date.now() - mem.fetchedAt < TTL) return mem.content;

  if (!hasBlob()) {
    mem.content = mem.content || normalize(null);
    mem.fetchedAt = Date.now();
    return mem.content;
  }

  try {
    const stored = await blobRead(CONTENT_KEY);
    const inbox = await blobRead(INBOX_PREFIX);
    const merged = normalize(stored);
    if (inbox) merged.submissions = inbox;
    mem.content = merged;
    mem.fetchedAt = Date.now();
    return merged;
  } catch (err) {
    console.error('[store] blob read failed', err);
    mem.content = mem.content || normalize(null);
    mem.fetchedAt = Date.now();
    return mem.content;
  }
}

export async function saveContent(next) {
  const data = normalize(next);
  const submissions = data.submissions;
  const publicDoc = { ...data, submissions: { appointments: [], contacts: [] } };

  mem.content = data;
  mem.fetchedAt = Date.now();

  if (!hasBlob()) return { persisted: false, data };

  await blobWriteContent(publicDoc);
  await blobWriteInbox(submissions);
  return { persisted: true, data };
}

export async function addSubmission(kind, entry) {
  const content = await getContent();
  const key = kind === 'appointment' ? 'appointments' : 'contacts';
  const record = { id: `${Date.now()}`, createdAt: new Date().toISOString(), read: false, ...entry };
  const next = clone(content);
  next.submissions[key] = [record, ...(next.submissions[key] || [])].slice(0, 500);

  mem.content = next;
  mem.fetchedAt = Date.now();

  if (hasBlob()) {
    try {
      await blobWriteInbox(next.submissions);
    } catch (err) {
      console.error('[store] inbox write failed', err);
    }
  }
  await notifyByEmail(kind, record);
  return { persisted: hasBlob(), record };
}

async function notifyByEmail(kind, record) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.NOTIFY_FROM || 'onboarding@resend.dev';
  if (!key || !to) return;
  const rows = Object.entries(record)
    .filter(([k]) => !['id', 'read'].includes(k))
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${String(v ?? '')}</td></tr>`)
    .join('');
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: kind === 'appointment' ? 'New appointment request' : 'New contact message',
        html: `<h2>${kind === 'appointment' ? 'Appointment request' : 'Contact message'}</h2><table>${rows}</table>`,
      }),
    });
  } catch (err) {
    console.error('[store] email notify failed', err);
  }
}
