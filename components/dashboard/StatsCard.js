export default function StatsCard({ title, value, subtitle, icon, color = 'brand' }) {
  const colors = {
    brand: 'bg-brand-50 text-brand-700',
    gold: 'bg-accent-50 text-accent-700',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    slate: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {icon && (
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors[color]}`}>
            {icon}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-slate-900">{value?.toLocaleString('ar-EG') ?? '—'}</p>
      {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
}
