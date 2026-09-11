import Link from 'next/link';
import Icon from './Icon';
import Carousel from './Carousel';
import Counter from './Counter';
import Accordion from './Accordion';
import ProgressBars from './ProgressBars';
import { ServiceCard, TeamCard, PostCard, QuoteCard, ProductCard } from './Cards';
import { t, getUi, localePath } from '@/lib/i18n';

export default function Section({ section, content, locale }) {
  const d = section.data || {};
  const ui = getUi(locale);
  const { settings } = content;

  switch (section.type) {
    /* ---------------------------------------------------------------- */
    case 'hero':
      return (
        <section className="hero">
          {d.image ? (
            <div className="hero__media">
              <img src={d.image} alt="" />
            </div>
          ) : null}
          <div className="container hero__inner">
            {d.sideText ? <span className="hero__side">{t(d.sideText, locale)}</span> : null}
            <div className="hero__content">
              <h1>{t(d.title, locale)}</h1>
              <p className="hero__sub">{t(d.subtitle, locale)}</p>
              <div className="hero__meta">
                <Link href={localePath(locale, d.ctaHref || '/appointment')} className="btn">
                  {t(d.ctaLabel, locale) || ui.bookNow}
                </Link>
                {settings.contact?.phone ? (
                  <a
                    className="hero__phone"
                    href={`tel:${settings.contact.phoneLink || settings.contact.phone}`}
                  >
                    <span>
                      <Icon name="phone" />
                    </span>
                    <span>
                      <small>{ui.callUs}</small>
                      <b>{settings.contact.phone}</b>
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      );

    /* ---------------------------------------------------------------- */
    case 'welcome':
      return (
        <section className="section">
          <div className="container split">
            <div className="figure-duo reveal">
              <div className="figure-duo__main">
                <img src={d.image} alt={t(d.title, locale)} loading="lazy" />
              </div>
              {d.imageSmall ? (
                <div className="figure-duo__mini">
                  <img src={d.imageSmall} alt="" loading="lazy" />
                </div>
              ) : null}
            </div>

            <div className="reveal">
              <span className="eyebrow">{t(d.eyebrow, locale)}</span>
              <h2>{t(d.title, locale)}</h2>
              {d.lead ? <p className="lead">{t(d.lead, locale)}</p> : null}
              <p style={{ marginTop: 16 }}>{t(d.body, locale)}</p>

              {d.features?.length ? (
                <ul className="feature-list">
                  {d.features.map((f, i) => (
                    <li key={i}>
                      <Icon name={f.icon || 'check'} />
                      <span>{t(f.label, locale)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {settings.contact?.phone ? (
                <div className="callout">
                  {d.doctorImage ? <img src={d.doctorImage} alt="" loading="lazy" /> : null}
                  <div>
                    <small>{t(d.callLabel, locale) || ui.callUs}</small>
                    <a href={`tel:${settings.contact.phoneLink || settings.contact.phone}`}>
                      <b>{settings.contact.phone}</b>
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );

    /* ---------------------------------------------------------------- */
    case 'services': {
      const items = (content.services || []).slice(0, Number(d.limit) || 6);
      return (
        <section className="section section--soft">
          <div className="container">
            <div className="sec-head text-center maxw-720 mx-auto reveal">
              <span className="eyebrow eyebrow--center">{t(d.eyebrow, locale)}</span>
              <h2>{t(d.title, locale)}</h2>
              {d.text ? <p>{t(d.text, locale)}</p> : null}
            </div>
            <Carousel perView={3}>
              {items.map((s) => (
                <ServiceCard key={s.id} service={s} locale={locale} />
              ))}
            </Carousel>
          </div>
        </section>
      );
    }

    /* ---------------------------------------------------------------- */
    case 'products': {
      const items = (content.products || []).slice(0, Number(d.limit) || 4);
      if (!items.length) return null;
      return (
        <section className="section">
          <div className="container">
            <div
              className="sec-head reveal"
              style={{ display: 'flex', gap: 28, alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap' }}
            >
              <div className="maxw-640">
                <span className="eyebrow">{t(d.eyebrow, locale)}</span>
                <h2>{t(d.title, locale)}</h2>
                {d.text ? <p>{t(d.text, locale)}</p> : null}
              </div>
              <Link href={localePath(locale, '/products')} className="link-more">
                {t(d.ctaLabel, locale) || ui.viewAll}
                <Icon name="arrowRight" />
              </Link>
            </div>
            <div className="grid grid-4">
              {items.map((pr) => (
                <ProductCard key={pr.id} product={pr} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      );
    }

    /* ---------------------------------------------------------------- */
    case 'doctor':
      return (
        <section className="section doctor">
          <div className="container doctor__grid">
            <div className="doctor__photo reveal">
              <img src={d.image} alt={t(d.name, locale)} loading="lazy" />
            </div>
            <div className="reveal">
              <span className="eyebrow">{t(d.eyebrow, locale)}</span>
              <h2>{t(d.name, locale)}</h2>
              <p className="doctor__role">{t(d.role, locale)}</p>
              <p>{t(d.body, locale)}</p>
              {d.ctaLabel ? (
                <Link
                  href={localePath(locale, d.ctaHref || '/appointment')}
                  className="btn"
                  style={{ marginTop: 28 }}
                >
                  {t(d.ctaLabel, locale)}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      );

    /* ---------------------------------------------------------------- */
    case 'team':
      return (
        <section className="section">
          <div className="container">
            <div
              className="sec-head reveal"
              style={{ display: 'flex', gap: 28, alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap' }}
            >
              <div className="maxw-640">
                <span className="eyebrow">{t(d.eyebrow, locale)}</span>
                <h2>{t(d.title, locale)}</h2>
                {d.text ? <p>{t(d.text, locale)}</p> : null}
              </div>
              {d.linkLabel ? (
                <Link href={localePath(locale, d.linkHref || '/therapists')} className="link-more">
                  {t(d.linkLabel, locale)}
                  <Icon name="arrowRight" />
                </Link>
              ) : null}
            </div>
            <div className="grid grid-4">
              {(content.team || []).slice(0, 4).map((m) => (
                <TeamCard key={m.id} member={m} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      );

    /* ---------------------------------------------------------------- */
    case 'counters':
      return (
        <section className="section--tight counters">
          <div className="container grid grid-4">
            {(d.items || []).map((item, i) => (
              <div className="counter reveal" key={i}>
                <span className="counter__icon">
                  <Icon name={item.icon || 'award'} />
                </span>
                <span>
                  <Counter value={item.value} suffix={item.suffix || ''} />
                  <span>{t(item.label, locale)}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      );

    /* ---------------------------------------------------------------- */
    case 'conditions': {
      const items = (d.items || []).map((it) => ({
        title: t(it.title, locale),
        body: t(it.body, locale),
        image: it.image,
      }));
      return (
        <section className="section section--soft">
          <div className="container">
            <div className="sec-head text-center maxw-720 mx-auto reveal">
              <span className="eyebrow eyebrow--center">{t(d.eyebrow, locale)}</span>
              <h2>{t(d.title, locale)}</h2>
              {d.text ? <p>{t(d.text, locale)}</p> : null}
            </div>
            <Accordion items={items} />
          </div>
        </section>
      );
    }

    /* ---------------------------------------------------------------- */
    case 'commitment': {
      const bars = (d.bars || []).map((b) => ({ label: t(b.label, locale), value: Number(b.value) || 0 }));
      return (
        <section className="section">
          <div className="container split">
            <div className="reveal">
              <span className="eyebrow">{t(d.eyebrow, locale)}</span>
              <h2>{t(d.title, locale)}</h2>
              <p>{t(d.body, locale)}</p>
              <ProgressBars bars={bars} />
              {d.ctaLabel ? (
                <Link href={localePath(locale, d.ctaHref || '/services')} className="link-more">
                  {t(d.ctaLabel, locale)}
                  <Icon name="arrowRight" />
                </Link>
              ) : null}
            </div>
            <div className="media-frame reveal">
              <img src={d.image} alt={t(d.title, locale)} loading="lazy" />
              {d.badgeLabel ? (
                <div className="badge-float">
                  <Icon name="smile" />
                  <Counter value={d.badgeValue} suffix={d.badgeSuffix || '+'} />
                  <span>{t(d.badgeLabel, locale)}</span>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    }

    /* ---------------------------------------------------------------- */
    case 'testimonials':
      return (
        <section className="section testimonials">
          <div className="container testimonials__grid">
            <div className="reveal">
              <span className="eyebrow">{t(d.eyebrow, locale)}</span>
              <h2>{t(d.title, locale)}</h2>
              {d.text ? <p>{t(d.text, locale)}</p> : null}
              <Link
                href={localePath(locale, '/testimonials')}
                className="link-more"
                style={{ marginTop: 10 }}
              >
                {ui.viewAll}
                <Icon name="arrowRight" />
              </Link>
            </div>
            <Carousel perView={2} navAlign="left">
              {(content.testimonials || []).map((item) => (
                <QuoteCard key={item.id} item={item} locale={locale} />
              ))}
            </Carousel>
          </div>
        </section>
      );

    /* ---------------------------------------------------------------- */
    case 'blog': {
      const posts = (content.posts || []).slice(0, 2);
      return (
        <section className="section">
          <div className="container grid grid-3">
            <div className="reveal">
              <span className="eyebrow">{t(d.eyebrow, locale)}</span>
              <h2 style={{ fontSize: 'clamp(26px,2.6vw,36px)' }}>{t(d.title, locale)}</h2>
              {d.text ? <p>{t(d.text, locale)}</p> : null}
              <Link href={localePath(locale, '/blog')} className="link-more">
                {t(d.ctaLabel, locale) || ui.exploreMore}
                <Icon name="arrowRight" />
              </Link>
            </div>
            {posts.map((p) => (
              <PostCard key={p.id} post={p} locale={locale} />
            ))}
          </div>
        </section>
      );
    }

    /* ---------------------------------------------------------------- */
    case 'map':
      return (
        <section className="mapsec">
          <div className="mapsec__frame">
            {settings.contact?.mapEmbed ? (
              <iframe
                src={settings.contact.mapEmbed}
                title={t(d.title, locale) || ui.officeAddress}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : null}
          </div>
          <div className="mapsec__card">
            <h3>{t(d.title, locale) || ui.officeAddress}</h3>
            <p>{settings.contact?.address}</p>
            {settings.contact?.phone ? (
              <p style={{ marginTop: 12 }}>
                <a href={`tel:${settings.contact.phoneLink || settings.contact.phone}`}>
                  {settings.contact.phone}
                </a>
              </p>
            ) : null}
            {settings.contact?.email ? (
              <p>
                <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>
              </p>
            ) : null}
          </div>
        </section>
      );

    default:
      return null;
  }
}
