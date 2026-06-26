export default function Table({ columns, data, loading, emptyMessage = 'لا توجد بيانات' }) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="animate-pulse">
          <div className="h-12 bg-slate-50 border-b border-slate-200" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 px-6 py-4 border-b border-slate-100">
              {columns.map((_, j) => (
                <div key={j} className="h-4 flex-1 rounded bg-slate-200" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-xl border border-slate-200 py-16 text-center">
        <p className="text-sm text-slate-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-right text-xs font-semibold text-slate-500"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((row, rowIdx) => (
              <tr key={row.id || rowIdx} className="hover:bg-slate-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
