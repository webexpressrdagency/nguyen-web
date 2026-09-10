'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

export default function Header({
  locale,
  locales = ['en'],
  brand,
  nav = [],
  contact,
  ctaLabel,
  labels,
}) {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const rest = pathname.replace(/^\/(en|es)/, '') || '';
  const isActive = (href) => {
    const full = `/${locale}${href === '/' ? '' : href}`;
    return href === '/' ? pathname === full || pathname === `${full}/` : pathname.startsWith(full);
  };

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <ul className="topbar__list">
            {contact?.phone ? (
              <li className="topbar__item">
                <Icon name="phone" />
                <a href={`tel:${contact.phoneLink || contact.phone}`}>{contact.phone}</a>
              </li>
            ) : null}
            {contact?.email ? (
              <li className="topbar__item">
                <Icon name="mail" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            ) : null}
          </ul>
          <ul className="topbar__list topbar__list--right">
            {contact?.address ? (
              <li className="topbar__item">
                <Icon name="pin" />
                <span>{contact.address}</span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link href={`/${locale}`} className="brand" aria-label={brand?.name}>
            {brand?.logo ? <img src={brand.logo} alt={brand?.name || 'Logo'} /> : null}
            <span className="brand__name">
              {brand?.shortName || brand?.name}
              <span className="brand__sub">{brand?.kicker}</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            {locales.length > 1 ? (
              <div className="lang-switch" aria-label={labels?.language}>
                {locales.map((l) => (
                  <Link key={l} href={`/${l}${rest}`} data-active={l === locale} hrefLang={l}>
                    {l}
                  </Link>
                ))}
              </div>
            ) : null}

            <Link href={`/${locale}/appointment`} className="btn btn--sm hide-sm">
              {ctaLabel}
            </Link>

            <button
              type="button"
              className="burger"
              aria-label={labels?.menu || 'Menu'}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-panel" data-open={open} onClick={() => setOpen(false)}>
        <div className="mobile-panel__sheet" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="mobile-panel__close"
            aria-label={labels?.close || 'Close'}
            onClick={() => setOpen(false)}
          >
            ×
          </button>

          <Link href={`/${locale}`} className="brand" onClick={() => setOpen(false)}>
            {brand?.logo ? <img src={brand.logo} alt="" /> : null}
            <span className="brand__name">{brand?.shortName || brand?.name}</span>
          </Link>

          <nav className="mobile-nav">
            {nav.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href === '/' ? '' : item.href}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href={`/${locale}/appointment`} className="btn btn--block">
            {ctaLabel}
          </Link>

          <ul className="footer-contact" style={{ marginTop: 28, color: 'var(--body)' }}>
            {contact?.phone ? (
              <li>
                <Icon name="phone" />
                <a href={`tel:${contact.phoneLink || contact.phone}`}>{contact.phone}</a>
              </li>
            ) : null}
            {contact?.email ? (
              <li>
                <Icon name="mail" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            ) : null}
            {contact?.address ? (
              <li>
                <Icon name="pin" />
                <span>{contact.address}</span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}
