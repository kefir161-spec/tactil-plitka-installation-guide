import type { ReactNode } from 'react';

interface PdfPageProps {
  children: ReactNode;
  className?: string;
  pageBreak?: boolean;
}

export function PdfPage({ children, className = '', pageBreak = false }: PdfPageProps) {
  const classes = ['section', pageBreak ? 'section--page' : '', className].filter(Boolean).join(' ');
  return <section className={classes}>{children}</section>;
}
