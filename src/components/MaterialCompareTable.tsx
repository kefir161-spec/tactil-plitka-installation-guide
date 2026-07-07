import type { MaterialCompareRow } from '../data/instruction';

interface MaterialCompareTableProps {
  headers: readonly string[];
  rows: readonly MaterialCompareRow[];
}

export function MaterialCompareTable({ headers, rows }: MaterialCompareTableProps) {
  return (
    <div className="thickness-table-wrap">
      <table className="thickness-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.aspect}>
              <th scope="row">{row.aspect}</th>
              <td>{row.pvc}</td>
              <td>{row.tpu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
