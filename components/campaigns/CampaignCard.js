'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CampaignStatusBadge from './CampaignStatusBadge';

function StatItem({ label, value, color = 'text-slate-700' }) {
  return (
    <div className="text-center min-w-0">
      <p className={`text-sm font-bold truncate ${color}`}>{(value ?? 0).toLocaleString('ar-EG')}</p>
      <p className="text-xs text-slate-400 mt-0.5 truncate">{label}</p>
    </div>
  );
}

const groupLabels = {
  COMPLIANT:   'منتظمون',
  LATE:        'متأخرون',
  DEFAULTED:   'متعثرون',
  TRANSFERRED: 'محولون',
};

function formatScheduledAt(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('ar-EG', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

export default function CampaignCard({ campaign, onTrigger, onEdit, onDelete, onViewDetails }) {
  const [triggering, setTriggering] = useState(false);
  const [deleting,   setDeleting]   = useState(false);

  const progress = campaign._progress;
  const pct = progress?.total > 0
    ? Math.round((progress.processed / progress.total) * 100)
    : 0;

  const handleTrigger = async () => {
    setTriggering(true);
    try { await onTrigger(campaign.id); }
    finally { setTriggering(false); }
  };

  const handleDelete = async () => {
    if (!confirm(`هل أنت متأكد من حذف الحملة "${campaign.title}"؟`)) return;
    setDeleting(true);
    try { await onDelete(campaign.id); }
    finally { setDeleting(false); }
  };

  return (
    <Card>
      {/* رأس الكارت: عنوان + badge + مجموعة */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <CampaignStatusBadge status={campaign.status} />
          {campaign.status === 'scheduled' && campaign.scheduledAt && (
            <span className="flex items-center gap-1 text-xs font-medium text-brand-600">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatScheduledAt(campaign.scheduledAt)}
            </span>
          )}
          <p className="text-xs text-slate-400">
            {groupLabels[campaign.targetCustomerGroup] || campaign.targetCustomerGroup}
          </p>
        </div>
        <h3 className="truncate font-semibold text-slate-800">{campaign.title}</h3>
      </div>

      {campaign.template?.name && (
        <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          القالب: {campaign.template.name}
        </p>
      )}

      {/* إحصائيات الرسائل */}
      <div className="mb-4 grid grid-cols-5 gap-1 overflow-hidden rounded-xl bg-slate-50 p-2">
        <StatItem label="الإجمالي" value={campaign.stats?.total} />
        <StatItem label="أُرسل"    value={campaign.stats?.sent}      color="text-brand-700"   />
        <StatItem label="وُصّل"    value={campaign.stats?.delivered}  color="text-green-600"  />
        <StatItem label="قُرئ"     value={campaign.stats?.read}       color="text-purple-600" />
        <StatItem label="فشل"      value={campaign.stats?.failed}     color="text-red-600"    />
      </div>

      {/* شريط التقدم اللحظي */}
      {campaign.status === 'running' && progress && (
        <div className="mb-3 rounded-lg border border-brand-100 bg-brand-50 p-3">
          <div className="mb-1.5 flex justify-between text-xs text-brand-700">
            <span>جارٍ الإرسال...</span>
            <span>{progress.processed?.toLocaleString('ar-EG')} / {progress.total?.toLocaleString('ar-EG')}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-brand-200">
            <div
              className="h-full rounded-full bg-brand-600 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      {/* شريط الأزرار السفلي */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        {/* أزرار الإجراءات */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewDetails(campaign)}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            title="عرض التفاصيل"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            تفاصيل
          </button>

          <button
            onClick={() => onEdit(campaign)}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-slate-500 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            title="تعديل الحملة"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z" />
            </svg>
            تعديل
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
            title="حذف الحملة"
          >
            {deleting ? (
              <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
            حذف
          </button>
        </div>

        {/* زر التشغيل */}
        {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
          <Button onClick={handleTrigger} loading={triggering} variant="success" size="sm">
            تشغيل
          </Button>
        )}
      </div>
    </Card>
  );
}
