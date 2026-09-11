import { PageHero, CtaBand, ProductCard } from '@/components/Cards';
import { getContent } from '@/lib/store';
import { t, getUi } from '@/lib/i18n';

export const metadata = { title: 'Products' };

export default async function ProductsPage() {
  const locale = 'en';
  const content = await getContent();
  const page = content.pages?.products || {};
  const ui = getUi();
  const products = content.products || [];

  return (
    <>
      <PageHero
        title={t(page.hero?.title) || ui.ourProducts}
        subtitle={t(page.hero?.subtitle)}
        locale={locale}
        crumbs={[{ label: ui.ourProducts }]}
      />

      <section className="section">
        <div className="container">
          {page.intro ? (
            <p className="lead maxw-720 mx-auto text-center" style={{ marginBottom: 56 }}>
              {t(page.intro)}
            </p>
          ) : null}

          {products.length ? (
            <div className="grid grid-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="text-center">Products are coming soon.</p>
          )}
        </div>
      </section>

      <CtaBand
        locale={locale}
        title="Not sure which one you need?"
        text="Ask at your next visit and we will match the product to your treatment plan."
      />
    </>
  );
}
