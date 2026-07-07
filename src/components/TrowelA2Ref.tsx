import { trowelA2 } from '../data/instruction';

export function TrowelA2Ref() {
  return (
    <div className="trowel-tkb">
      <table className="trowel-tkb__table">
        <thead>
          <tr>
            {trowelA2.headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trowelA2.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="trowel-tkb__caption">{trowelA2.caption}</p>
    </div>
  );
}
