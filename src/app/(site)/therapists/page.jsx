import { PageHero, CtaBand, TeamCard } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t } from '@/lib/i18n';

export default async function TherapistsPage() {
  const locale = 'en';
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
        title={'Choose your therapist'}
        text={
          'Tell us your preference when booking and we will match the schedule.'
        }
      />
    </>
  );
}
