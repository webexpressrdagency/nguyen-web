import Link from 'next/link';
import Icon from './Icon';
import { t, getUi, localePath } from '@/lib/i18n';

export default function Footer({ content, locale = 'en' }) {
  const { settings, footer, services } = content;
  const ui = getUi(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <Link href={localePath(locale)} className="brand">
              {settings.logo ? <img src={settings.logo} alt={settings.siteName} /> : null}
              <span className="brand__name">
                {settings.shortName}
                <span className="brand__sub">{t(settings.tagline, locale).slice(0, 34)}</span>
              </span>
            </Link>
            <p style={{ marginTop: 20, fontSize: 15.5 }}>{t(footer.about, locale)}</p>
            {settings.social?.length ? (
              <div className="social-row">
                {settings.social
                  .filter((s) => s.url)
                  .map((s) => (
                    <a key={s.network} href={s.url} aria-label={s.network} target="_blank" rel="noreferrer">
                      <Icon name={s.network} />
                    </a>
                  ))}
              </div>
            ) : null}
          </div>

          <div>
            <h4>{t(footer.linksTitle, locale)}</h4>
            <ul className="site-footer__links">
              {footer.links?.map((l, i) => (
                <li key={i}>
                  <Link href={localePath(locale, l.href)}>{t(l.label, locale)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t(footer.servicesTitle, locale)}</h4>
            <ul className="site-footer__links">
              {(services || []).slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={localePath(locale, `/services/${s.slug}`)}>{t(s.title, locale)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t(footer.contactTitle, locale)}</h4>
            <ul className="footer-contact">
              {settings.contact?.phone ? (
                <li>
                  <Icon name="phone" />
                  <a href={`tel:${settings.contact.phoneLink || settings.contact.phone}`}>
                    {settings.contact.phone}
                  </a>
                </li>
              ) : null}
              {settings.contact?.email ? (
                <li>
                  <Icon name="mail" />
                  <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>
                </li>
              ) : null}
              {settings.contact?.address ? (
                <li>
                  <Icon name="pin" />
                  <span>{settings.contact.address}</span>
                </li>
              ) : null}
            </ul>

            {settings.hours?.length ? (
              <div style={{ marginTop: 18 }}>
                <h4 style={{ fontSize: 16 }}>{ui.openingHours}</h4>
                {settings.hours.map((h, i) => (
                  <div className="hours-row" key={i} style={{ borderColor: 'rgba(255,255,255,.12)' }}>
                    <span>{t(h.days, locale)}</span>
                    <b style={{ color: '#fff' }}>{t(h.time, locale)}</b>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {year} {t(footer.copyright, locale)}
          </span>
          <span>
            <Link href="/admin">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
