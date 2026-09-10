import { PageHero, PostCard } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t } from '@/lib/i18n';

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const content = await getContent();
  const page = content.pages?.blog || {};
  const posts = [...(content.posts || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)));

  return (
    <>
      <PageHero
        title={t(page.hero?.title, locale)}
        subtitle={t(page.hero?.subtitle, locale)}
        locale={locale}
        crumbs={[{ label: t(page.hero?.title, locale) }]}
      />

      <section className="section">
        <div className="container grid grid-3">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
