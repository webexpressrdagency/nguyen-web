/**
 * Branded SVG placeholders.
 *
 * Every image field in the seed content points at /placeholder/<key>. They render
 * as gradient artwork built from the clinic's logo colours so the site looks
 * finished before real photography is uploaded from the admin panel. Uploading a
 * photo replaces the path, and these routes stop being used.
 */

const SIZES = {
  hero: [1920, 1080],
  welcome1: [900, 760],
  welcome2: [700, 520],
  about: [900, 760],
  doctor: [760, 940],
  commitment: [900, 740],
  service: [860, 600],
  condition: [760, 570],
  blog: [900, 570],
  gallery: [900, 680],
  portrait: [600, 700],
  avatar: [400, 400],
  product: [800, 800],
};

const INITIALS = {
  'avatar-1': 'DN',
  'avatar-2': 'SK',
  'avatar-3': 'ML',
  'avatar-4': 'ET',
  'avatar-5': 'PJ',
  'avatar-6': 'LF',
  'avatar-7': 'DR',
  'avatar-8': 'AM',
};

const PALETTE = [
  ['#0b2545', '#4285f4'],
  ['#4285f4', '#34a853'],
  ['#34a853', '#4285f4'],
  ['#0b2545', '#34a853'],
  ['#4285f4', '#0b2545'],
  ['#34a853', '#0b2545'],
];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) % 100000;
  return h;
}

function sizeFor(key) {
  if (key === 'hero') return SIZES.hero;
  if (key === 'welcome-1') return SIZES.welcome1;
  if (key === 'welcome-2') return SIZES.welcome2;
  if (key === 'about') return SIZES.about;
  if (key === 'doctor') return SIZES.doctor;
  if (key === 'commitment') return SIZES.commitment;
  if (key.startsWith('service')) return SIZES.service;
  if (key.startsWith('condition')) return SIZES.condition;
  if (key.startsWith('blog')) return SIZES.blog;
  if (key.startsWith('gallery')) return SIZES.gallery;
  if (key.startsWith('product')) return SIZES.product;
  if (/^avatar-[1-4]$/.test(key)) return SIZES.portrait;
  if (key.startsWith('avatar')) return SIZES.avatar;
  return [900, 640];
}

function spine(cx, cy, h, opacity) {
  const top = cy - h / 2;
  const rungs = 9;
  let parts = `<line x1="${cx}" y1="${top}" x2="${cx}" y2="${cy + h / 2}" stroke="#fff" stroke-width="${(h * 0.035).toFixed(1)}" stroke-linecap="round" opacity="${opacity}"/>`;
  for (let i = 0; i < rungs; i += 1) {
    const t = i / (rungs - 1);
    const y = top + t * h;
    const half = h * (0.2 - 0.06 * Math.abs(t - 0.45));
    parts += `<line x1="${(cx - half).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(cx + half).toFixed(1)}" y2="${y.toFixed(1)}" stroke="#fff" stroke-width="${(h * 0.028).toFixed(1)}" stroke-linecap="round" opacity="${opacity}"/>`;
  }
  parts += `<circle cx="${cx}" cy="${(top - h * 0.09).toFixed(1)}" r="${(h * 0.075).toFixed(1)}" fill="none" stroke="#fff" stroke-width="${(h * 0.024).toFixed(1)}" opacity="${opacity}"/>`;
  return parts;
}

export async function GET(_request, { params }) {
  const { key: raw } = await params;
  const key = String(raw || 'image').replace(/\.(jpg|jpeg|png|webp|svg)$/i, '');
  const [w, h] = sizeFor(key);
  const seed = hash(key);
  const [c1, c2] = PALETTE[seed % PALETTE.length];
  const angle = (seed % 40) + 10;
  const initials = INITIALS[key];

  const blobs = Array.from({ length: 5 }, (_, i) => {
    const s = hash(`${key}-${i}`);
    const r = Math.round(Math.min(w, h) * (0.2 + ((s % 45) / 100)));
    const cx = Math.round((s * 7) % w);
    const cy = Math.round((s * 13) % h);
    const o = (0.05 + ((s % 8) / 100)).toFixed(3);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" opacity="${o}"/>`;
  }).join('');

  const motif = initials
    ? `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-family="Fira Sans, Helvetica, Arial, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.3)}" font-weight="700" fill="#ffffff" opacity="0.9">${initials}</text>`
    : spine(w / 2, h / 2, Math.min(w, h) * 0.42, 0.22);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="v" cx="50%" cy="35%" r="80%">
      <stop offset="60%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#071a33" stop-opacity="0.35"/>
    </radialGradient>
    <filter id="b"><feGaussianBlur stdDeviation="${Math.round(Math.min(w, h) * 0.03)}"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g filter="url(#b)">${blobs}</g>
  ${motif}
  <rect width="${w}" height="${h}" fill="url(#v)"/>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
