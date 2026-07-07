import type { ReactNode } from 'react';

interface PrintSheetProps {
  children: ReactNode;
  className?: string;
}

/** Группирует блоки лендинга в листы PDF (на экране не влияет на вёрстку). */
export function PrintSheet({ children, className }: PrintSheetProps) {
  const classes = ['print-sheet', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}
