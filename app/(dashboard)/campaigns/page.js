'use client';

import { useState, useMemo } from 'react';
import { useCampaigns } from '@/hooks/use-campaigns';
import { useMetaTemplates } from '@/hooks/use-meta-templates';
import { useCampaignSocket } from '@/hooks/use-campaign-socket';
import Header from '@/components/layout/Header';
import CampaignCard from '@/components/campaigns/CampaignCard';
import CampaignForm from '@/components/campaigns/CampaignForm';
import CampaignDetails from '@/components/campaigns/CampaignDetails';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import Alert from '@/components/ui/Alert';

export default function CampaignsPage() {
  const {
    campaigns, loading, error,
    createCampaign, updateCampaign, deleteCampaign, triggerCampaign,
    applySocketUpdate, applySocketStats,
  } = useCampaigns();
  const { metaTemplates } = useMetaTemplates();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign,  setEditingCampaign]  = useState(null);
  const [detailsCampaign,  setDetailsCampaign]  = useState(null);
  const [actionError,      setActionError]       = useState(null);

  const handleCreate = async (data) => {
    setActionError(null);
    try {
      await createCampaign(data);
      setShowCreateModal(false);
    } catch (err) {
      setActionError(err.response?.data?.message || 'فشل في إنشاء الحملة');
    }
  };

  const handleEdit = async (data) => {
    setActionError(null);
    if (editingCampaign?.status === 'running') {
      setEditingCampaign(null);
      setActionError('لا يمكن تعديل حملة جارية — انتظر حتى تكتمل أولاً');
      return;
    }
    if (editingCampaign?.status === 'completed') {
      setEditingCampaign(null);
      setActionError('لا يمكن تعديل حملة منتهية');
      return;
    }
    try {
      await updateCampaign(editingCampaign.id, data);
      setEditingCampaign(null);
    } catch (err) {
      setActionError(err.response?.data?.message || 'فشل في تعديل الحملة');
    }
  };

  const handleDelete = async (id) => {
    setActionError(null);
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign?.status === 'running') {
      setActionError('لا يمكن حذف حملة جارية — انتظر حتى تكتمل أولاً');
      return;
    }
    if (campaign?.status === 'completed') {
      setActionError('لا يمكن حذف حملة منتهية');
      return;
    }
    try {
      await deleteCampaign(id);
    } catch (err) {
      setActionError(err.response?.data?.message || 'فشل في حذف الحملة');
    }
  };

  const handleTrigger = async (id) => {
    setActionError(null);
    try {
      await triggerCampaign(id);
    } catch (err) {
      setActionError(err.response?.data?.message || 'فشل في تشغيل الحملة');
    }
  };

  // الحملات المعروضة حاليًا — لازم ننضم لغرفة كل واحدة فيهم عشان نستقبل
  // تحديثاتها اللحظية (campaign-stats / message-update بيتبعتوا لغرفة الحملة فقط)
  const campaignIds = useMemo(() => campaigns.map((c) => c.id), [campaigns]);

  // WebSocket — نداء واحد فقط يجمع تحديث القائمة + مودال التفاصيل
  useCampaignSocket({
    campaignIds,
    onUpdate: (data) => {
      const cid = data.campaignId || data.id;
      applySocketUpdate(data);
      setDetailsCampaign((prev) =>
        prev?.id === cid
          ? { ...prev, status: data.status ?? prev.status, _progress: data.progress ?? null }
          : prev
      );
    },
    onStats: (data) => {
      const cid = data.campaignId || data.id;
      applySocketStats(data);
      setDetailsCampaign((prev) =>
        prev?.id === cid
          ? {
              ...prev,
              stats: {
                ...prev.stats,
                total:     data.totalCustomers    ?? data.totalMessages ?? data.total,
                sent:      data.sentMessages      ?? data.sent,
                delivered: data.deliveredMessages ?? data.delivered,
                read:      data.readMessages      ?? data.read,
                failed:    data.failedMessages    ?? data.failed,
              },
            }
          : prev
      );
    },
  });

  return (
    <div className="space-y-5">
      <Header
        title="الحملات"
        subtitle={`${campaigns.length.toLocaleString('ar-EG')} حملة`}
        actions={
          <Button onClick={() => setShowCreateModal(true)}>+ حملة جديدة</Button>
        }
      />

      <Alert variant="error" message={error || actionError} />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-16 text-center">
          <svg className="mb-3 h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          <p className="text-sm font-medium text-slate-500">لا توجد حملات بعد</p>
          <p className="text-xs text-slate-400 mt-1">أنشئ حملتك الأولى لبدء التواصل مع العملاء</p>
          <Button className="mt-4" size="sm" onClick={() => setShowCreateModal(true)}>+ إنشاء حملة</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onTrigger={handleTrigger}
              onEdit={setEditingCampaign}
              onDelete={handleDelete}
              onViewDetails={setDetailsCampaign}
            />
          ))}
        </div>
      )}

      {/* مودال الإنشاء */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="إنشاء حملة جديدة" size="lg">
        <CampaignForm templates={metaTemplates} onSubmit={handleCreate} onCancel={() => setShowCreateModal(false)} />
      </Modal>

      {/* مودال التعديل */}
      <Modal isOpen={!!editingCampaign} onClose={() => setEditingCampaign(null)} title="تعديل الحملة" size="lg">
        <CampaignForm
          templates={metaTemplates}
          initialData={editingCampaign}
          onSubmit={handleEdit}
          onCancel={() => setEditingCampaign(null)}
        />
      </Modal>

      {/* مودال التفاصيل */}
      <Modal isOpen={!!detailsCampaign} onClose={() => setDetailsCampaign(null)} title="تفاصيل الحملة" size="lg">
        {detailsCampaign && (
          <CampaignDetails
            campaign={detailsCampaign}
            liveProgress={detailsCampaign._progress}
            liveStats={detailsCampaign.stats}
          />
        )}
      </Modal>
    </div>
  );
}
