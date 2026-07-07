interface ChecklistProps {
  items: readonly string[];
  title?: string;
  compact?: boolean;
}

export function Checklist({ items, title, compact }: ChecklistProps) {
  return (
    <div className={['checklist', compact ? 'checklist--compact' : ''].filter(Boolean).join(' ')}>
      {title && <h3>{title}</h3>}
      <ul className="checklist__list">
        {items.map((item) => (
          <li key={item}>
            <span className="checklist__box" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
