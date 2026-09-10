import { PageHero } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t } from '@/lib/i18n';

export default async function GalleryPage({ params }) {
  const { locale } = await params;
  const content = await getContent();
  const page = content.pages?.gallery || {};

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
          <div className="gallery-grid">
            {(content.gallery || []).map((g) => (
              <figure key={g.id} className="reveal">
                <img src={g.image} alt={t(g.caption, locale)} loading="lazy" />
                {g.caption ? <figcaption>{t(g.caption, locale)}</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
