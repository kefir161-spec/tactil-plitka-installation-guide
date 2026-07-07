interface InfoCardProps {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}

export function InfoCard({ label, value, note, highlight }: InfoCardProps) {
  return (
    <article className={`info-card card${highlight ? ' info-card--highlight' : ''}`}>
      <p className="card__note">{label}</p>
      <p className="card__value">{value}</p>
      {note && <p className="card__note">{note}</p>}
    </article>
  );
}
