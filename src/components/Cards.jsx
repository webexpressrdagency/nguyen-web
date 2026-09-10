import Link from 'next/link';
import Icon from './Icon';
import { t, getUi, formatDate, localePath } from '@/lib/i18n';

export function ServiceCard({ service, locale }) {
  const ui = getUi(locale);
  const href = localePath(locale, `/services/${service.slug}`);
  return (
    <article className="card reveal">
      <div className="card__media">
        <img src={service.image} alt={t(service.title, locale)} loading="lazy" />
        <span className="card__icon">
          <Icon name={service.icon} />
        </span>
      </div>
      <div className="card__body">
        <h3>
          <Link href={href}>{t(service.title, locale)}</Link>
        </h3>
        <p>{t(service.excerpt, locale)}</p>
        <Link href={href} className="link-more">
          {ui.readMore}
          <Icon name="arrowRight" />
        </Link>
      </div>
    </article>
  );
}

export function TeamCard({ member, locale }) {
  return (
    <article className="team-card reveal">
      <div className="team-card__media">
        <img src={member.image} alt={member.name} loading="lazy" />
        {member.social?.length ? (
          <div className="team-card__social">
            {member.social
              .filter((s) => s.url)
              .map((s, i) => (
                <a key={i} href={s.url} aria-label={s.network} target="_blank" rel="noreferrer">
                  <Icon name={s.network} />
                </a>
              ))}
          </div>
        ) : null}
      </div>
      <h4>{member.name}</h4>
      <span>{t(member.role, locale)}</span>
      {member.bio ? <p>{t(member.bio, locale)}</p> : null}
    </article>
  );
}

export function PostCard({ post, locale }) {
  const ui = getUi(locale);
  const href = localePath(locale, `/blog/${post.slug}`);
  return (
    <article className="post-card reveal">
      <Link href={href} className="post-card__media">
        <img src={post.image} alt={t(post.title, locale)} loading="lazy" />
      </Link>
      <span className="post-card__date">{formatDate(post.date, locale)}</span>
      <h3>
        <Link href={href}>{t(post.title, locale)}</Link>
      </h3>
      <p>{t(post.excerpt, locale)}</p>
      <Link href={href} className="link-more">
        {ui.continueReading}
        <Icon name="arrowRight" />
      </Link>
    </article>
  );
}

export function QuoteCard({ item, locale }) {
  return (
    <article className="quote-card">
      <span className="quote-card__mark">
        <Icon name="quote" />
      </span>
      {item.rating ? (
        <div className="quote-card__stars">
          {Array.from({ length: Number(item.rating) || 5 }).map((_, i) => (
            <Icon key={i} name="star" />
          ))}
        </div>
      ) : null}
      <p>{t(item.text, locale)}</p>
      <div className="quote-card__author">
        {item.image ? <img src={item.image} alt={item.name} loading="lazy" /> : null}
        <span>
          <b>{item.name}</b>
          <span>{t(item.role, locale)}</span>
        </span>
      </div>
    </article>
  );
}

export function PageHero({ title, subtitle, locale, crumbs = [] }) {
  const ui = getUi(locale);
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="breadcrumb">
          <Link href={localePath(locale)}>{ui.home}</Link>
          {crumbs.map((c, i) => (
            <span key={i}>
              <span style={{ margin: '0 8px' }}>/</span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ locale, title, text, ctaLabel }) {
  const ui = getUi(locale);
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link href={localePath(locale, '/appointment')} className="btn">
          {ctaLabel || ui.bookNow}
        </Link>
      </div>
    </section>
  );
}
