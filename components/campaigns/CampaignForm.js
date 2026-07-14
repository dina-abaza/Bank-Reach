'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Badge from '@/components/ui/Badge';
import TemplateCategoryBadge from '@/components/templates/TemplateCategoryBadge';
import { ModalFooter } from '@/components/ui/Modal';

const GROUP_OPTIONS = [
  { value: 'COMPLIANT',   label: 'المنتظمون'  },
  { value: 'LATE',        label: 'المتأخرون'  },
  { value: 'DEFAULTED',   label: 'المتعثرون'  },
  { value: 'TRANSFERRED', label: 'المحولون'   },
];

function toDatetimeLocal(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toISOString().slice(0, 16);
}

export default function CampaignForm({ templates = [], onSubmit, onCancel, initialData = null }) {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    title:               initialData?.title               ?? '',
    templateId:          initialData?.template?.id        ?? '',
    targetCustomerGroup: initialData?.targetCustomerGroup ?? '',
    scheduledAt:         toDatetimeLocal(initialData?.scheduledAt),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const categoryLabels = { MARKETING: 'تسويقي', UTILITY: 'خدمي' };
  const templateOptions = templates.map((t) => ({
    value: t.id,
    label: categoryLabels[t.category] ? `${t.name} (${categoryLabels[t.category]})` : t.name,
  }));
  const selectedTemplate = templates.find((t) => t.id === form.templateId) || null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.templateId || !form.targetCustomerGroup) {
      setError('يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = {
        title:               form.title,
        templateId:          form.templateId,
        targetCustomerGroup: form.targetCustomerGroup,
        scheduledAt:         form.scheduledAt ? new Date(form.scheduledAt).toISOString() : null,
      };
      await onSubmit(payload);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء حفظ الحملة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert message={error} />

      <Input
        label="عنوان الحملة"
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="حملة المتأخرين - شهر يونيو"
        required
      />

      <Select
        label="قالب الرسالة"
        id="templateId"
        name="templateId"
        value={form.templateId}
        onChange={handleChange}
        options={templateOptions}
        placeholder="اختر قالباً..."
        required
      />

      {selectedTemplate && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <p className="text-xs font-medium text-slate-500">معاينة الرسالة (قالب Meta)</p>
            <TemplateCategoryBadge category={selectedTemplate.category} />
          </div>
          <p className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-700">
            {selectedTemplate.body}
          </p>
          {selectedTemplate.variables?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedTemplate.variables.map((v) => (
                <Badge key={v} variant="blue">{`{{${v}}}`}</Badge>
              ))}
            </div>
          )}
        </div>
      )}

      <Select
        label="الفئة المستهدفة"
        id="targetCustomerGroup"
        name="targetCustomerGroup"
        value={form.targetCustomerGroup}
        onChange={handleChange}
        options={GROUP_OPTIONS}
        placeholder="اختر الفئة..."
        required
      />

      <Input
        label="تاريخ الجدولة (اختياري)"
        id="scheduledAt"
        name="scheduledAt"
        type="datetime-local"
        value={form.scheduledAt}
        onChange={handleChange}
      />
      <p className="text-xs text-slate-400 -mt-3">اتركه فارغاً لحفظ الحملة كمسودة وتشغيلها يدوياً لاحقاً</p>

      <ModalFooter>
        <Button variant="secondary" type="button" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit" loading={loading}>
          {isEdit ? 'حفظ التعديلات' : 'إنشاء الحملة'}
        </Button>
      </ModalFooter>
    </form>
  );
}
