export default function CampaignStatsRow({ stats }) {
  if (!stats) return null;

  const items = [
    { label: 'الإجمالي', value: stats.total,     color: 'text-slate-700' },
    { label: 'مسودة',    value: stats.draft,      color: 'text-slate-500' },
    { label: 'مجدولة',   value: stats.scheduled,  color: 'text-brand-700' },
    { label: 'جارية',    value: stats.running,    color: 'text-yellow-600' },
    { label: 'منتهية',   value: stats.completed,  color: 'text-green-600' },
    { label: 'فاشلة',    value: stats.failed,     color: 'text-red-600'   },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm font-medium text-slate-500">إحصائيات الحملات</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg bg-slate-50 p-3 text-center">
            <p className={`text-xl font-bold ${item.color}`}>
              {(item.value ?? 0).toLocaleString('ar-EG')}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
