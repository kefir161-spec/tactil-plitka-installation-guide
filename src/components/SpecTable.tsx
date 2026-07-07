interface SpecTableProps {
  headers: string[];
  rows: { cells: string[] }[];
  highlightParams?: string[];
}

export function SpecTable({ headers, rows, highlightParams = [] }: SpecTableProps) {
  return (
    <div className="spec-table-wrap">
      <table className="spec-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isHighlight = highlightParams.some((p) =>
              row.cells[0]?.toLowerCase().includes(p.toLowerCase()),
            );
            return (
              <tr key={i} className={isHighlight ? 'spec-table__row--highlight' : ''}>
                {row.cells.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
