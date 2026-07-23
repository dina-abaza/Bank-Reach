'use client';

import { useReports } from '@/hooks/use-reports';
import Header from '@/components/layout/Header';
import StatsCard from '@/components/dashboard/StatsCard';
import CampaignStatsRow from '@/components/dashboard/CampaignStatsRow';
import { FullPageSpinner } from '@/components/ui/Spinner';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';

const CustomerIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TemplateIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CampaignIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

function calcRate(part, total) {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

function fmtPct(n) {
  return `${n.toLocaleString('ar-EG')}٪`;
}

export default function DashboardPage() {
  const { dashboard, loading, error, refresh } = useReports();

  if (loading) return <FullPageSpinner />;

  const msgStats = dashboard?.messageStats;
  const deliveryRate = calcRate(msgStats?.delivered, msgStats?.total);
  const readRate    = calcRate(msgStats?.read,       msgStats?.total);
  const failureRate = calcRate(msgStats?.failed,     msgStats?.total);

  return (
    <div className="space-y-6">
      <Header
        title="لوحة التحكم"
        subtitle="ملخص شامل لأداء المنصة"
        actions={
          <Button variant="secondary" size="sm" onClick={refresh}>
            تحديث
          </Button>
        }
      />

      <Alert variant="error" message={error} />

      {/* نظرة عامة على المنصة */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatsCard
          title="إجمالي العملاء"
          value={dashboard?.totalCustomers}
          subtitle={`${(dashboard?.totalGroups ?? 0).toLocaleString('ar-EG')} مجموعات`}
          icon={<CustomerIcon />}
          color="brand"
        />
        <StatsCard
          title="القوالب"
          value={dashboard?.totalTemplates}
          icon={<TemplateIcon />}
          color="gold"
        />
        <StatsCard
          title="الحملات"
          value={dashboard?.totalCampaigns?.total}
          subtitle={`${(dashboard?.totalCampaigns?.completed ?? 0).toLocaleString('ar-EG')} منتهية`}
          icon={<CampaignIcon />}
          color="brand"
        />
      </div>

      {/* معدلات أداء الرسائل */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard
          title="إجمالي الرسائل"
          value={msgStats?.total}
          subtitle="رسالة واتساب"
          icon={<MessageIcon />}
          color="brand"
        />
        <StatsCard
          title="معدل الوصول"
          value={fmtPct(deliveryRate)}
          subtitle={`${msgStats?.delivered?.toLocaleString('ar-EG') ?? 0} رسالة`}
          color="green"
        />
        <StatsCard
          title="معدل القراءة"
          value={fmtPct(readRate)}
          subtitle={`${msgStats?.read?.toLocaleString('ar-EG') ?? 0} رسالة`}
          color="gold"
        />
        <StatsCard
          title="معدل الفشل"
          value={fmtPct(failureRate)}
          subtitle={`${msgStats?.failed?.toLocaleString('ar-EG') ?? 0} رسالة`}
          color="red"
        />
      </div>

      {/* حالات الحملات */}
      <CampaignStatsRow stats={dashboard?.totalCampaigns} />
    </div>
  );
}
