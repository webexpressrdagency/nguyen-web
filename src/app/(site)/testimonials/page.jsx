import { PageHero, CtaBand, QuoteCard } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t } from '@/lib/i18n';

export default async function TestimonialsPage() {
  const locale = 'en';
  const content = await getContent();
  const page = content.pages?.testimonials || {};

  return (
    <>
      <PageHero
        title={t(page.hero?.title, locale)}
        subtitle={t(page.hero?.subtitle, locale)}
        locale={locale}
        crumbs={[{ label: t(page.hero?.title, locale) }]}
      />

      <section className="section">
        <div className="container grid grid-2">
          {(content.testimonials || []).map((item) => (
            <div className="reveal" key={item.id}>
              <QuoteCard item={item} locale={locale} />
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={'Be the next story'}
        text={
          'Your first visit includes an exam and a treatment plan.'
        }
      />
    </>
  );
}
