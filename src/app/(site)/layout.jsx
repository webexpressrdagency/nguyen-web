import { Fira_Sans, Barlow } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollFx from '@/components/ScrollFx';
import ToTop from '@/components/ToTop';
import MobileCta from '@/components/MobileCta';
import { getContent } from '@/lib/store';
import { t, getUi } from '@/lib/i18n';

const head = Fira_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-head',
  display: 'swap',
});

const body = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const content = await getContent();
  const { settings } = content;
  return {
    title: {
      default: t(settings.seo?.title) || settings.siteName,
      template: `%s · ${settings.shortName || settings.siteName}`,
    },
    description: t(settings.seo?.description),
    icons: { icon: settings.logo || '/img/logo.webp' },
    openGraph: {
      title: t(settings.seo?.title) || settings.siteName,
      description: t(settings.seo?.description),
      type: 'website',
      locale: 'en_US',
    },
  };
}

export async function generateViewport() {
  const { settings } = await getContent();
  return { themeColor: settings.colors?.primary || '#4285F4' };
}

export default async function SiteLayout({ children }) {
  const content = await getContent();
  const { settings, nav } = content;
  const ui = getUi();
  const colors = settings.colors || {};

  const themeVars = `:root{
    --brand:${colors.primary || '#4285f4'};
    --green:${colors.secondary || '#34a853'};
    --navy:${colors.dark || '#0b2545'};
    --body:${colors.body || '#55607a'};
    --grad:linear-gradient(118deg, ${colors.secondary || '#34a853'} 0%, ${colors.primary || '#4285f4'} 100%);
  }`;

  const c = settings.contact || {};
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: settings.siteName,
    description: t(settings.seo?.description),
    image: settings.logo || '/img/logo.webp',
    telephone: c.phone,
    email: c.email,
    address: c.address ? { '@type': 'PostalAddress', streetAddress: c.address } : undefined,
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  };

  return (
    <html lang="en" className={`${head.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
        <Header
          brand={{
            name: settings.siteName,
            shortName: settings.shortName,
            logo: settings.logo,
            kicker: 'Chiropractic & Acupuncture',
          }}
          nav={(nav || []).map((item) => ({ label: t(item.label), href: item.href }))}
          contact={settings.contact}
          ctaLabel={ui.bookNow}
          labels={{ menu: ui.menu, close: ui.close }}
        />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer content={content} />
        <ScrollFx />
        <ToTop />
        <MobileCta
          phone={c.phone}
          phoneLink={c.phoneLink}
          callLabel={ui.callUs}
          bookLabel={ui.bookNow}
        />
      </body>
    </html>
  );
}
