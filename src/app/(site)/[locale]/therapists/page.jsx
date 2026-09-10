import { PageHero, CtaBand, TeamCard } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t } from '@/lib/i18n';

export default async function TherapistsPage({ params }) {
  const { locale } = await params;
  const content = await getContent();
  const page = content.pages?.therapists || {};

  return (
    <>
      <PageHero
        title={t(page.hero?.title, locale)}
        subtitle={t(page.hero?.subtitle, locale)}
        locale={locale}
        crumbs={[{ label: t(page.hero?.title, locale) }]}
      />

      <section className="section">
        <div className="container grid grid-4">
          {(content.team || []).map((m) => (
            <TeamCard key={m.id} member={m} locale={locale} />
          ))}
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={locale === 'es' ? 'Elija a su terapeuta' : 'Choose your therapist'}
        text={
          locale === 'es'
            ? 'Indique su preferencia al agendar y coordinamos el horario.'
            : 'Tell us your preference when booking and we will match the schedule.'
        }
      />
    </>
  );
}
