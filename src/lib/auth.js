import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const COOKIE = 'nc_admin';
const MAX_AGE = 60 * 60 * 12; // 12 hours

const secret = () =>
  process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'nguyen-wellness-dev-secret';

export const adminPassword = () => process.env.ADMIN_PASSWORD || 'nguyen2026';
export const usingDefaultPassword = () => !process.env.ADMIN_PASSWORD;

function sign(payload) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

export function makeToken() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  try {
    const expected = sign(exp);
    return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

export async function isAuthed() {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE,
};
