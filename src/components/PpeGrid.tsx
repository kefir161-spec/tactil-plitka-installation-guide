import type { PpeItem } from '../data/instruction';

interface PpeGridProps {
  items: readonly PpeItem[];
}

export function PpeGrid({ items }: PpeGridProps) {
  return (
    <div className="grid grid--4 ppe-grid">
      {items.map((item) => (
        <article key={item.id} className="ppe-card card">
          <div className="ppe-card__icon">
            <img src={item.icon} alt={item.label} className="ppe-card__img" width={128} height={128} />
          </div>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
