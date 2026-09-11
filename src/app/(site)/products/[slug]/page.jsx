import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { PageHero, ProductCard } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t, getUi } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const content = await getContent();
  const product = (content.products || []).find((p) => p.slug === slug);
  if (!product) return {};
  return { title: t(product.title), description: t(product.excerpt) };
}

export default async function ProductDetail({ params }) {
  const locale = 'en';
  const { slug } = await params;
  const content = await getContent();
  const product = (content.products || []).find((p) => p.slug === slug);
  if (!product) notFound();

  const ui = getUi();
  const others = (content.products || []).filter((p) => p.slug !== slug).slice(0, 4);
  const contactHref = `/contact?subject=${encodeURIComponent(`Product: ${t(product.title)}`)}`;

  return (
    <>
      <PageHero
        title={t(product.title)}
        locale={locale}
        crumbs={[{ label: ui.ourProducts, href: '/products' }, { label: t(product.title) }]}
      />

      <section className="section">
        <div className="container product-detail">
          <div className="product-detail__media">
            <img src={product.image} alt={t(product.title)} />
            {product.badge ? <span className="product-badge">{t(product.badge)}</span> : null}
          </div>

          <div>
            {product.category ? <span className="eyebrow">{t(product.category)}</span> : null}
            <h2 style={{ marginBottom: 10 }}>{t(product.title)}</h2>

            {product.price ? (
              <div className="product-detail__price">
                <b>{t(product.price)}</b>
                <span>{ui.inClinicPrice}</span>
              </div>
            ) : null}

            <p className="lead">{t(product.excerpt)}</p>

            <div className="prose" style={{ marginTop: 18 }}>
              {t(product.body)
                .split('\n\n')
                .map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
            </div>

            <div className="product-detail__actions">
              <Link href={contactHref} className="btn">
                {ui.askAbout}
              </Link>
              {content.settings.contact?.phone ? (
                <a
                  href={`tel:${content.settings.contact.phoneLink || content.settings.contact.phone}`}
                  className="btn btn--outline"
                >
                  <Icon name="phone" size={16} />
                  {content.settings.contact.phone}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {others.length ? (
        <section className="section section--soft">
          <div className="container">
            <div className="sec-head text-center reveal">
              <span className="eyebrow eyebrow--center">{ui.relatedProducts}</span>
              <h2>You May Also Need</h2>
            </div>
            <div className="grid grid-4">
              {others.map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
