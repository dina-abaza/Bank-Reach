'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CampaignStatusBadge from './CampaignStatusBadge';

function StatItem({ label, value, color = 'text-slate-700' }) {
  return (
    <div className="text-center">
      <p className={`text-lg font-bold ${color}`}>{(value ?? 0).toLocaleString('ar-EG')}</p>
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

const groupLabels = {
  COMPLIANT: 'منتظمون',
  LATE: 'متأخرون',
  DEFAULTED: 'متعثرون',
  TRANSFERRED: 'محولون',
};

export default function CampaignCard({ campaign, onTrigger }) {
  const [triggering, setTriggering] = useState(false);

  const handleTrigger = async () => {
    setTriggering(true);
    try {
      await onTrigger(campaign.id);
    } finally {
      setTriggering(false);
    }
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-800 truncate">{campaign.title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {groupLabels[campaign.targetCustomerGroup] || campaign.targetCustomerGroup}
          </p>
        </div>
        <CampaignStatusBadge status={campaign.status} />
      </div>

      {campaign.template && (
        <p className="text-xs text-slate-500 mb-4 bg-slate-50 rounded-lg px-3 py-2">
          القالب: {campaign.template.name}
        </p>
      )}

      <div className="grid grid-cols-4 gap-2 mb-4 rounded-xl bg-slate-50 p-3">
        <StatItem label="الإجمالي" value={campaign.stats?.total} />
        <StatItem label="أُرسل" value={campaign.stats?.sent} color="text-blue-600" />
        <StatItem label="وُصّل" value={campaign.stats?.delivered} color="text-green-600" />
        <StatItem label="فشل" value={campaign.stats?.failed} color="text-red-600" />
      </div>

      {campaign.status === 'draft' && (
        <Button
          className="w-full"
          onClick={handleTrigger}
          loading={triggering}
          variant="success"
          size="sm"
        >
          تشغيل الحملة الآن
        </Button>
      )}
    </Card>
  );
}
