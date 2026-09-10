import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { PageHero, CtaBand } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t, getUi, formatDate, localePath } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const content = await getContent();
  const post = (content.posts || []).find((p) => p.slug === slug);
  if (!post) return {};
  return { title: t(post.title, locale), description: t(post.excerpt, locale) };
}

export default async function PostDetail({ params }) {
  const { locale, slug } = await params;
  const content = await getContent();
  const post = (content.posts || []).find((p) => p.slug === slug);
  if (!post) notFound();

  const ui = getUi(locale);
  const others = (content.posts || []).filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <PageHero
        title={t(post.title, locale)}
        locale={locale}
        crumbs={[{ label: 'Blog', href: localePath(locale, '/blog') }]}
      />

      <section className="section">
        <div className="container with-sidebar">
          <article>
            <div className="article-hero">
              <img src={post.image} alt={t(post.title, locale)} />
            </div>
            <div className="article-meta">
              <span>
                <Icon name="calendar" size={15} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                {formatDate(post.date, locale)}
              </span>
              {post.author ? (
                <span>
                  <Icon name="user" size={15} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                  {post.author}
                </span>
              ) : null}
            </div>
            <div className="prose">
              <p className="lead">{t(post.excerpt, locale)}</p>
              {t(post.body, locale)
                .split('\n\n')
                .map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
            </div>
          </article>

          <aside>
            <div className="sidebar-card">
              <h4>{ui.latestPosts}</h4>
              {others.map((p) => (
                <Link className="mini-post" key={p.id} href={localePath(locale, `/blog/${p.slug}`)}>
                  <img src={p.image} alt="" loading="lazy" />
                  <span>
                    <b>{t(p.title, locale)}</b>
                    <span>{formatDate(p.date, locale)}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="sidebar-card">
              <h4>{ui.ourServices}</h4>
              <ul className="sidebar-list">
                {(content.services || []).slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <Link href={localePath(locale, `/services/${s.slug}`)}>{t(s.title, locale)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={locale === 'es' ? '¿Preguntas sobre su caso?' : 'Questions about your case?'}
        text={ui.emergencyNote}
      />
    </>
  );
}
