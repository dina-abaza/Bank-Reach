function ProgressBar({ value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const colors = {
    blue:   'bg-blue-500',
    green:  'bg-green-500',
    purple: 'bg-purple-500',
    red:    'bg-red-500',
  };
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${colors[color]}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 text-start text-xs font-medium text-slate-600">
        {pct.toLocaleString('ar-EG')}٪
      </span>
    </div>
  );
}

export default function MessageStatsCard({ stats }) {
  if (!stats) return null;

  const rows = [
    { label: 'أُرسلت',  value: stats.sent,      color: 'blue'   },
    { label: 'وُصّلت',  value: stats.delivered,  color: 'green'  },
    { label: 'قُرئت',   value: stats.read,       color: 'purple' },
    { label: 'فشل',     value: stats.failed,     color: 'red'    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">إحصائيات الرسائل</p>
        <span className="text-2xl font-bold text-slate-900">
          {stats.total?.toLocaleString('ar-EG')}
        </span>
      </div>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-xs text-slate-500">
              <span>{row.label}</span>
              <span>{(row.value ?? 0).toLocaleString('ar-EG')}</span>
            </div>
            <ProgressBar value={row.value} max={stats.total} color={row.color} />
          </div>
        ))}
      </div>
    </div>
  );
}
