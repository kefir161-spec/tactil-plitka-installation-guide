import type { ProductItem } from '../data/instruction';

interface ProductsGridProps {
  title?: string;
  items: ProductItem[];
}

function ProductCard({ item }: { item: ProductItem }) {
  return (
    <article className="product-card adhesive-product">
      <div className="product-card__image">
        <img src={item.image} alt={item.name} loading="lazy" />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{item.name}</h3>
        <p className="product-card__subtitle">{item.subtitle}</p>
        <dl className="product-card__specs">
          {item.specs.map((spec) => (
            <div key={spec.label} className="spec-row">
              <dt className="spec-label">{spec.label}</dt>
              <dd className="spec-value">{spec.value}</dd>
            </div>
          ))}
        </dl>
        {item.techNote && (
          <p className="product-card__note">
            <strong className="product-card__note-label">Примечание:</strong> {item.techNote}
          </p>
        )}
      </div>
    </article>
  );
}

export function ProductsGrid({ title, items }: ProductsGridProps) {
  return (
    <section className="products-catalog__group">
      {title && <h3 className="products-grid__title">{title}</h3>}
      <div className="products-grid">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

interface ProductsCatalogProps {
  groups: { title: string; items: ProductItem[] }[];
}

export function ProductsCatalog({ groups }: ProductsCatalogProps) {
  return (
    <div className="adhesive-catalog">
      {groups.map((group) => (
        <ProductsGrid key={group.title} title={group.title} items={group.items} />
      ))}
    </div>
  );
}
