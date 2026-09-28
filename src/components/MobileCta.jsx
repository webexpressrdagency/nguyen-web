import Link from 'next/link';
import Icon from './Icon';

/* Sticky call / book bar shown only on phones (see .mobile-cta in globals.css). */
export default function MobileCta({ phone, phoneLink, callLabel, bookLabel }) {
  return (
    <div className="mobile-cta">
      {phone ? (
        <a className="btn btn--outline" href={`tel:${phoneLink || phone}`}>
          <Icon name="phone" />
          {callLabel}
        </a>
      ) : (
        <span />
      )}
      <Link className="btn" href="/appointment">
        {bookLabel}
      </Link>
    </div>
  );
}
