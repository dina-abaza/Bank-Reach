'use client';

import { useEffect, useState } from 'react';
import { campaignsService } from '@/services/campaigns.service';
import CampaignStatusBadge from './CampaignStatusBadge';
import TemplateCategoryBadge from '@/components/templates/TemplateCategoryBadge';
import Spinner from '@/components/ui/Spinner';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function StatBox({ label, value, color = 'text-slate-800' }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-slate-50 p-3">
      <span className={`text-xl font-bold ${color}`}>{(value ?? 0).toLocaleString('ar-EG')}</span>
      <span className="mt-1 text-xs text-slate-500">{label}</span>
    </div>
  );
}

const groupLabels = {
  COMPLIANT:   'المنتظمون',
  LATE:        'المتأخرون',
  DEFAULTED:   'المتعثرون',
  TRANSFERRED: 'المحولون',
};

export default function CampaignDetails({ campaign: initial, liveProgress, liveStats }) {
  const [campaign, setCampaign] = useState(initial);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!initial?.id) return;
    campaignsService.getById(initial.id)
      .then((res) => { if (res?.data) setCampaign(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [initial?.id]);

  if (loading) {
    return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  }

  const stats = { ...campaign.stats, ...liveStats };
  const progress = liveProgress || campaign._progress;
  const pct = progress?.total > 0
    ? Math.round((progress.processed / progress.total) * 100)
    : 0;

  const hasTemplate = campaign.template?.name;

  return (
    <div className="space-y-5">
      {/* الرأس */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">{campaign.title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {groupLabels[campaign.targetCustomerGroup] || campaign.targetCustomerGroup}
          </p>
          {campaign.createdBy?.fullName && (
            <p className="text-xs text-slate-400 mt-1">أنشأها: {campaign.createdBy.fullName}</p>
          )}
        </div>
        <CampaignStatusBadge status={campaign.status} />
      </div>

      {/* القالب */}
      {hasTemplate ? (
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="mb-1 text-xs font-medium text-slate-500">القالب المستخدم</p>
          <div className="flex items-center gap-2">
            <p className="font-medium text-slate-700">{campaign.template.name}</p>
            <TemplateCategoryBadge category={campaign.template.category} />
          </div>
          {campaign.template.body && (
            <p className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-600 leading-relaxed">
              {campaign.template.body}
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-400">القالب غير متاح</p>
        </div>
      )}

      {/* إحصائيات الرسائل */}
      <div>
        <p className="mb-3 text-xs font-medium text-slate-500">إحصائيات الرسائل</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          <StatBox label="الإجمالي" value={stats.total} />
          <StatBox label="أُرسل"    value={stats.sent}      color="text-brand-700"   />
          <StatBox label="وُصّل"    value={stats.delivered}  color="text-green-600"  />
          <StatBox label="قُرئ"     value={stats.read}       color="text-purple-600" />
          <StatBox label="فشل"      value={stats.failed}    color="text-red-600"    />
        </div>
      </div>

      {/* شريط التقدم اللحظي */}
      {progress && (
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
          <div className="mb-2 flex justify-between text-sm text-brand-700">
            <span className="font-medium">جارٍ الإرسال...</span>
            <span>{progress.processed?.toLocaleString('ar-EG')} / {progress.total?.toLocaleString('ar-EG')}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-brand-200">
            <div
              className="h-full rounded-full bg-brand-600 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      {/* التواريخ */}
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-slate-400">تاريخ الإنشاء</p>
          <p className="mt-0.5 text-sm font-medium text-slate-700">{formatDate(campaign.createdAt)}</p>
        </div>
        {campaign.scheduledAt && (
          <div>
            <p className="text-xs text-slate-400">موعد الجدولة</p>
            <p className="mt-0.5 text-sm font-medium text-slate-700">{formatDate(campaign.scheduledAt)}</p>
          </div>
        )}
        {campaign.completedAt && (
          <div>
            <p className="text-xs text-slate-400">اكتمل الإرسال</p>
            <p className="mt-0.5 text-sm font-medium text-slate-700">{formatDate(campaign.completedAt)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
