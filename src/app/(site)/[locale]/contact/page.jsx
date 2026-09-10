import Icon from '@/components/Icon';
import LeadForm from '@/components/LeadForm';
import { PageHero } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t, getUi } from '@/lib/i18n';

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const content = await getContent();
  const page = content.pages?.contact || {};
  const ui = getUi(locale);
  const { settings } = content;

  const cards = [
    settings.contact?.phone && {
      icon: 'phone',
      title: ui.callUs,
      value: settings.contact.phone,
      href: `tel:${settings.contact.phoneLink || settings.contact.phone}`,
    },
    settings.contact?.email && {
      icon: 'mail',
      title: 'Email',
      value: settings.contact.email,
      href: `mailto:${settings.contact.email}`,
    },
    settings.contact?.address && {
      icon: 'pin',
      title: ui.officeAddress,
      value: settings.contact.address,
    },
  ].filter(Boolean);

  return (
    <>
      <PageHero
        title={t(page.hero?.title, locale)}
        subtitle={t(page.hero?.subtitle, locale)}
        locale={locale}
        crumbs={[{ label: t(page.hero?.title, locale) }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3" style={{ marginBottom: 60 }}>
            {cards.map((c, i) => (
              <div className="card reveal" key={i} style={{ padding: '30px 26px', textAlign: 'center' }}>
                <span
                  className="counter__icon"
                  style={{ background: 'var(--grad)', color: '#fff', borderColor: 'transparent', margin: '0 auto' }}
                >
                  <Icon name={c.icon} />
                </span>
                <h4 style={{ marginTop: 18, marginBottom: 6 }}>{c.title}</h4>
                {c.href ? (
                  <a href={c.href} style={{ fontSize: 16 }}>
                    {c.value}
                  </a>
                ) : (
                  <p style={{ fontSize: 15.5 }}>{c.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="with-sidebar with-sidebar--form">
            <div>
              <h2 style={{ fontSize: 'clamp(24px,2.6vw,34px)' }}>{ui.getInTouch}</h2>
              <p style={{ marginBottom: 26 }}>{t(page.intro, locale)}</p>
              <LeadForm kind="contact" locale={locale} labels={ui} />
            </div>
            <aside className="info-panel">
              <h3 style={{ fontSize: 19 }}>{ui.openingHours}</h3>
              {(settings.hours || []).map((h, i) => (
                <div className="hours-row" key={i}>
                  <span>{t(h.days, locale)}</span>
                  <b>{t(h.time, locale)}</b>
                </div>
              ))}
              <p className="form-note" style={{ marginTop: 20 }}>
                {ui.emergencyNote}
              </p>
            </aside>
          </div>
        </div>
      </section>

      {settings.contact?.mapEmbed ? (
        <section className="mapsec">
          <div className="mapsec__frame" style={{ height: 420 }}>
            <iframe src={settings.contact.mapEmbed} title={ui.officeAddress} loading="lazy" />
          </div>
        </section>
      ) : null}
    </>
  );
}
