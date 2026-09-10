import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { PageHero, CtaBand } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t, getUi, localePath } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const content = await getContent();
  const service = (content.services || []).find((s) => s.slug === slug);
  if (!service) return {};
  return { title: t(service.title, locale), description: t(service.excerpt, locale) };
}

export default async function ServiceDetail({ params }) {
  const { locale, slug } = await params;
  const content = await getContent();
  const service = (content.services || []).find((s) => s.slug === slug);
  if (!service) notFound();

  const ui = getUi(locale);
  const others = (content.services || []).filter((s) => s.slug !== slug).slice(0, 6);

  return (
    <>
      <PageHero
        title={t(service.title, locale)}
        locale={locale}
        crumbs={[
          { label: ui.ourServices, href: localePath(locale, '/services') },
          { label: t(service.title, locale) },
        ]}
      />

      <section className="section">
        <div className="container with-sidebar">
          <div>
            <div className="article-hero">
              <img src={service.image} alt={t(service.title, locale)} />
            </div>
            <div className="prose">
              <h2>{t(service.title, locale)}</h2>
              <p className="lead">{t(service.excerpt, locale)}</p>
              {t(service.body, locale)
                .split('\n\n')
                .map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
            </div>
          </div>

          <aside>
            <div className="sidebar-card">
              <h4>{ui.relatedServices}</h4>
              <ul className="sidebar-list">
                {others.map((s) => (
                  <li key={s.id}>
                    <Link href={localePath(locale, `/services/${s.slug}`)}>{t(s.title, locale)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebar-card" style={{ background: 'var(--grad)', border: 0, color: '#fff' }}>
              <h4 style={{ color: '#fff' }}>{ui.getInTouch}</h4>
              <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.9)' }}>{ui.emergencyNote}</p>
              <a
                href={`tel:${content.settings.contact?.phoneLink || content.settings.contact?.phone}`}
                style={{ color: '#fff', display: 'inline-flex', gap: 10, alignItems: 'center', fontWeight: 700 }}
              >
                <Icon name="phone" size={18} />
                {content.settings.contact?.phone}
              </a>
              <Link
                href={localePath(locale, '/appointment')}
                className="btn btn--block"
                style={{ background: '#fff', color: 'var(--brand-600)', marginTop: 18 }}
              >
                {ui.bookNow}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={locale === 'es' ? 'Comience su tratamiento' : 'Start your treatment'}
        text={
          locale === 'es'
            ? 'Primera evaluación completa, sin compromiso.'
            : 'A full first evaluation, no commitment required.'
        }
      />
    </>
  );
}
