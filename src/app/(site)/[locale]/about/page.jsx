import Icon from '@/components/Icon';
import { PageHero, CtaBand, TeamCard } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t, getUi } from '@/lib/i18n';

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const content = await getContent();
  const page = content.pages?.about || {};
  const ui = getUi(locale);
  const counters = content.home?.sections?.find((s) => s.type === 'counters')?.data?.items || [];

  return (
    <>
      <PageHero
        title={t(page.hero?.title, locale)}
        subtitle={t(page.hero?.subtitle, locale)}
        locale={locale}
        crumbs={[{ label: t(page.hero?.title, locale) }]}
      />

      <section className="section">
        <div className="container split">
          <div className="figure-duo reveal">
            <div className="figure-duo__main">
              <img src={page.story?.image} alt={t(page.story?.title, locale)} loading="lazy" />
            </div>
            {counters[0] ? (
              <div className="figure-duo__badge">
                <b>
                  {counters[3]?.value || 15}
                  {counters[3]?.suffix || '+'}
                </b>
                <span>{t(counters[3]?.label, locale)}</span>
              </div>
            ) : null}
          </div>
          <div className="reveal">
            <span className="eyebrow">{t(page.story?.eyebrow, locale)}</span>
            <h2>{t(page.story?.title, locale)}</h2>
            {t(page.story?.body, locale)
              .split('\n\n')
              .map((par, i) => (
                <p key={i}>{par}</p>
              ))}
          </div>
        </div>
      </section>

      {page.values?.length ? (
        <section className="section section--soft">
          <div className="container grid grid-3">
            {page.values.map((v, i) => (
              <div className="card reveal" key={i} style={{ padding: '34px 28px' }}>
                <span
                  className="counter__icon"
                  style={{ background: 'var(--grad)', color: '#fff', borderColor: 'transparent' }}
                >
                  <Icon name={v.icon} />
                </span>
                <h3 style={{ marginTop: 22, fontSize: 21 }}>{t(v.title, locale)}</h3>
                <p style={{ fontSize: 15.5 }}>{t(v.body, locale)}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="sec-head text-center maxw-720 mx-auto reveal">
            <span className="eyebrow eyebrow--center">{locale === 'es' ? 'Equipo Dedicado' : 'Dedicated Team'}</span>
            <h2>{locale === 'es' ? 'Nuestro Equipo' : 'Our Team'}</h2>
          </div>
          <div className="grid grid-4">
            {(content.team || []).map((m) => (
              <TeamCard key={m.id} member={m} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={locale === 'es' ? '¿Listo para sentirse mejor?' : 'Ready to feel better?'}
        text={ui.emergencyNote}
      />
    </>
  );
}
