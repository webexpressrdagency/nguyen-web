import Link from 'next/link';
import { getUi } from '@/lib/i18n';

export default function NotFound() {
  const ui = getUi('en');
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container maxw-640 mx-auto">
        <p
          style={{
            fontFamily: 'var(--font-head)',
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1,
            background: 'var(--grad)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 12,
          }}
        >
          404
        </p>
        <h1>{ui.notFoundTitle}</h1>
        <p>{ui.notFoundText}</p>
        <Link href="/en" className="btn" style={{ marginTop: 24 }}>
          {ui.backHome}
        </Link>
      </div>
    </section>
  );
}
