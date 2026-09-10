import { getContent } from '@/lib/store';
import { LOCALES } from '@/lib/i18n';

const base = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const content = await getContent();
  const root = base();
  const staticPaths = [
    '',
    '/about',
    '/services',
    '/therapists',
    '/gallery',
    '/blog',
    '/faqs',
    '/testimonials',
    '/appointment',
    '/contact',
  ];

  const entries = [];
  const locales = content.settings?.locales?.enabled?.length
    ? content.settings.locales.enabled
    : LOCALES;

  locales.forEach((locale) => {
    staticPaths.forEach((path) => {
      entries.push({
        url: `${root}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
      });
    });
    (content.services || []).forEach((s) => {
      entries.push({ url: `${root}/${locale}/services/${s.slug}`, lastModified: new Date(), priority: 0.6 });
    });
    (content.posts || []).forEach((p) => {
      entries.push({
        url: `${root}/${locale}/blog/${p.slug}`,
        lastModified: new Date(p.date || Date.now()),
        priority: 0.5,
      });
    });
  });

  return entries;
}
