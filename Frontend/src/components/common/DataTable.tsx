interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode; // ✅ ADD THIS
}

const DataTable = ({ columns, data }: any) => {
  return (
    <table className="w-full border bg-white rounded shadow">
      <thead className="bg-gray-200">
        <tr>
          {columns.map((col: Column) => (
            <th key={col.key} className="p-2 text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row: any, i: number) => (
          <tr key={i} className="border-t">
            {columns.map((col: Column) => (
              <td key={col.key} className="p-2">
                {/* ✅ FIX HERE */}
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;