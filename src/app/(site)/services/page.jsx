import { PageHero, CtaBand, ServiceCard } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t, getUi } from '@/lib/i18n';

export default async function ServicesPage() {
  const locale = 'en';
  const content = await getContent();
  const page = content.pages?.services || {};
  const ui = getUi(locale);

  return (
    <>
      <PageHero
        title={t(page.hero?.title, locale)}
        subtitle={t(page.hero?.subtitle, locale)}
        locale={locale}
        crumbs={[{ label: ui.ourServices }]}
      />

      <section className="section">
        <div className="container grid grid-3">
          {(content.services || []).map((s) => (
            <ServiceCard key={s.id} service={s} locale={locale} />
          ))}
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={'Not sure what you need?'}
        text={
          'Book an evaluation and we will tell you exactly what is causing your pain.'
        }
      />
    </>
  );
}
