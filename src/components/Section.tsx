import type { ReactNode } from 'react';
import { PdfPage } from './PdfPage';

interface SectionProps {
  id?: string;
  number?: string;
  title: string;
  lead?: string;
  children: ReactNode;
  muted?: boolean;
  pageBreak?: boolean;
  className?: string;
}

export function Section({ id, number, title, lead, children, muted, pageBreak, className }: SectionProps) {
  const pageClass = [muted ? 'section--muted' : '', className].filter(Boolean).join(' ');

  return (
    <PdfPage className={pageClass || undefined} pageBreak={pageBreak}>
      <div className="container" id={id}>
        <h2 className="section__heading">
          {number ? <span className="section__heading-num">{number}.</span> : null}
          <span className="section__heading-text">{title}</span>
        </h2>
        {lead && <p className="section__lead">{lead}</p>}
        {children}
      </div>
    </PdfPage>
  );
}
