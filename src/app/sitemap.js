import { getContent } from '@/lib/store';

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
    '/products',
    '/therapists',
    '/gallery',
    '/blog',
    '/faqs',
    '/testimonials',
    '/appointment',
    '/contact',
  ];

  const entries = staticPaths.map((path) => ({
    url: `${root}${path || '/'}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  (content.services || []).forEach((s2) => {
    entries.push({ url: `${root}/services/${s2.slug}`, lastModified: new Date(), priority: 0.6 });
  });
  (content.products || []).forEach((pr) => {
    entries.push({ url: `${root}/products/${pr.slug}`, lastModified: new Date(), priority: 0.6 });
  });
  (content.posts || []).forEach((po) => {
    entries.push({
      url: `${root}/blog/${po.slug}`,
      lastModified: new Date(po.date || Date.now()),
      priority: 0.5,
    });
  });

  return entries;
}
