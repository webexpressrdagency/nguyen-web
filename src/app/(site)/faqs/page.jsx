import Accordion from '@/components/Accordion';
import { PageHero, CtaBand } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t } from '@/lib/i18n';

export default async function FaqsPage() {
  const locale = 'en';
  const content = await getContent();
  const page = content.pages?.faqs || {};
  const items = (content.faqs || []).map((f) => ({
    title: t(f.q, locale),
    body: t(f.a, locale),
  }));

  return (
    <>
      <PageHero
        title={t(page.hero?.title, locale)}
        subtitle={t(page.hero?.subtitle, locale)}
        locale={locale}
        crumbs={[{ label: 'FAQ' }]}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <Accordion items={items} withImages={false} />
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={"Didn't find your answer?"}
        text={
          'Send us a message or call and we will answer personally.'
        }
      />
    </>
  );
}
