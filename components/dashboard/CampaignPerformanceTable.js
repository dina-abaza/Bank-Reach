function RateBar({ value }) {
  const pct = Math.round(value || 0);
  const color = pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-slate-600">{pct.toLocaleString('ar-EG')}٪</span>
    </div>
  );
}

export default function CampaignPerformanceTable({ data = [] }) {
  if (!data.length) {
    return (
      <div className="py-10 text-center text-sm text-slate-400">
        لا توجد بيانات أداء متاحة
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead>
          <tr>
            {['اسم الحملة', 'إجمالي الرسائل', 'نسبة الإرسال', 'نسبة الوصول', 'نسبة القراءة'].map((h) => (
              <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-slate-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr key={row.campaignId} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-sm font-medium text-slate-800">{row.title}</td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {row.totalMessages?.toLocaleString('ar-EG')}
              </td>
              <td className="px-4 py-3"><RateBar value={row.successRate} /></td>
              <td className="px-4 py-3"><RateBar value={row.deliveryRate} /></td>
              <td className="px-4 py-3"><RateBar value={row.readRate} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
