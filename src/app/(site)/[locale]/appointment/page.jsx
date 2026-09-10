import Icon from '@/components/Icon';
import LeadForm from '@/components/LeadForm';
import { PageHero } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t, getUi } from '@/lib/i18n';

export default async function AppointmentPage({ params }) {
  const { locale } = await params;
  const content = await getContent();
  const page = content.pages?.appointment || {};
  const ui = getUi(locale);
  const { settings } = content;

  return (
    <>
      <PageHero
        title={t(page.hero?.title, locale)}
        subtitle={t(page.hero?.subtitle, locale)}
        locale={locale}
        crumbs={[{ label: t(page.hero?.title, locale) }]}
      />

      <section className="section">
        <div className="container with-sidebar with-sidebar--form">
          <div>
            <p className="lead" style={{ marginBottom: 26 }}>
              {t(page.intro, locale)}
            </p>
            <LeadForm
              kind="appointment"
              locale={locale}
              labels={ui}
              services={(content.services || []).map((s) => ({
                value: t(s.title, locale),
                label: t(s.title, locale),
              }))}
            />
          </div>

          <aside className="info-panel">
            <h3 style={{ fontSize: 21 }}>{ui.getInTouch}</h3>
            <ul>
              {settings.contact?.phone ? (
                <li>
                  <Icon name="phone" />
                  <a href={`tel:${settings.contact.phoneLink || settings.contact.phone}`}>
                    {settings.contact.phone}
                  </a>
                </li>
              ) : null}
              {settings.contact?.email ? (
                <li>
                  <Icon name="mail" />
                  <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>
                </li>
              ) : null}
              {settings.contact?.address ? (
                <li>
                  <Icon name="pin" />
                  <span>{settings.contact.address}</span>
                </li>
              ) : null}
            </ul>

            {settings.hours?.length ? (
              <>
                <h3 style={{ fontSize: 19, marginTop: 26 }}>{ui.openingHours}</h3>
                {settings.hours.map((h, i) => (
                  <div className="hours-row" key={i}>
                    <span>{t(h.days, locale)}</span>
                    <b>{t(h.time, locale)}</b>
                  </div>
                ))}
              </>
            ) : null}

            <p className="form-note" style={{ marginTop: 22 }}>
              {ui.emergencyNote}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
