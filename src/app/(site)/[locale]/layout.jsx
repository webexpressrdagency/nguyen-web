import { Fira_Sans, Barlow } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollFx from '@/components/ScrollFx';
import ToTop from '@/components/ToTop';
import { getContent } from '@/lib/store';
import { LOCALES, t, getUi } from '@/lib/i18n';

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

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = await getContent();
  const { settings } = content;
  return {
    title: {
      default: t(settings.seo?.title, locale) || settings.siteName,
      template: `%s · ${settings.shortName || settings.siteName}`,
    },
    description: t(settings.seo?.description, locale),
    icons: { icon: settings.logo || '/img/logo.png' },
    openGraph: {
      title: t(settings.seo?.title, locale) || settings.siteName,
      description: t(settings.seo?.description, locale),
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}

export default async function SiteLayout({ children, params }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();

  const content = await getContent();
  const { settings, nav } = content;
  const ui = getUi(locale);
  const colors = settings.colors || {};

  const themeVars = `:root{
    --brand:${colors.primary || '#4285f4'};
    --green:${colors.secondary || '#34a853'};
    --navy:${colors.dark || '#0b2545'};
    --body:${colors.body || '#55607a'};
    --grad:linear-gradient(118deg, ${colors.secondary || '#34a853'} 0%, ${colors.primary || '#4285f4'} 100%);
  }`;

  const enabled = settings.locales?.enabled?.length ? settings.locales.enabled : LOCALES;

  return (
    <html lang={locale} className={`${head.variable} ${body.variable}`}>
      <body>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
        <Header
          locale={locale}
          locales={enabled}
          brand={{
            name: settings.siteName,
            shortName: settings.shortName,
            logo: settings.logo,
            kicker: locale === 'es' ? 'Quiropráctica y Acupuntura' : 'Chiropractic & Acupuncture',
          }}
          nav={(nav || []).map((item) => ({ label: t(item.label, locale), href: item.href }))}
          contact={settings.contact}
          ctaLabel={ui.bookNow}
          labels={{ menu: ui.menu, close: ui.close, language: ui.language }}
        />
        <main>{children}</main>
        <Footer content={content} locale={locale} />
        <ScrollFx />
        <ToTop />
      </body>
    </html>
  );
}
