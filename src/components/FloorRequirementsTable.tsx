import type { FloorRequirement } from '../data/instruction';

interface FloorRequirementsTableProps {
  rows: FloorRequirement[];
}

export function FloorRequirementsTable({ rows }: FloorRequirementsTableProps) {
  return (
    <div className="req-table-wrap">
      <table className="req-table">
        <thead>
          <tr>
            <th scope="col">Параметр</th>
            <th scope="col">Допустимое значение</th>
            <th scope="col">Примечание</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.parameter}>
              <th scope="row">{row.parameter}</th>
              <td className="req-table__value">{row.value}</td>
              <td className="req-table__note">
                <p>{row.note}</p>
                {row.detail && <p className="req-table__detail">{row.detail}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
