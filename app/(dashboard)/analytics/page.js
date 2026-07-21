'use client';

import { useReports } from '@/hooks/use-reports';
import Header from '@/components/layout/Header';
import MessageStatsCard from '@/components/dashboard/MessageStatsCard';
import CampaignPerformanceTable from '@/components/dashboard/CampaignPerformanceTable';
import Card, { CardHeader } from '@/components/ui/Card';
import { FullPageSpinner } from '@/components/ui/Spinner';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';

const messageBreakdown = [
  { label: 'أُرسلت بنجاح',      key: 'sent',      color: 'text-brand-700' },
  { label: 'وُصّلت للمستلم',    key: 'delivered',  color: 'text-green-600' },
  { label: 'قُرئت من المستلم',  key: 'read',       color: 'text-purple-600' },
  { label: 'فشل الإرسال',       key: 'failed',     color: 'text-red-600' },
];

export default function AnalyticsPage() {
  const { dashboard, campaignPerformance, loading, error, refresh } = useReports();

  if (loading) return <FullPageSpinner />;

  const msgStats = dashboard?.messageStats;

  return (
    <div className="space-y-6">
      <Header
        title="التحليلات"
        subtitle="تفاصيل أداء الرسائل والحملات"
        actions={
          <Button variant="secondary" size="sm" onClick={refresh}>
            تحديث
          </Button>
        }
      />

      <Alert variant="error" message={error} />

      {/* تفاصيل الرسائل */}
      <div className="grid gap-4 lg:grid-cols-2">
        <MessageStatsCard stats={msgStats} />

        <Card>
          <CardHeader title="ملخص الرسائل" subtitle="توزيع تفصيلي لحالات الإرسال" />
          <div className="space-y-3 mt-4">
            {messageBreakdown.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
              >
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>
                  {msgStats?.[item.key]?.toLocaleString('ar-EG') ?? '—'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* أداء الحملات */}
      <Card padding={false}>
        <div className="p-6">
          <CardHeader
            title="أداء الحملات"
            subtitle="نسب الإرسال والوصول والقراءة لأحدث الحملات"
          />
        </div>
        <CampaignPerformanceTable data={campaignPerformance} />
      </Card>
    </div>
  );
}
