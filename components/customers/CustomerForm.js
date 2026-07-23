'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { ModalFooter } from '@/components/ui/Modal';

function toDateInput(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toISOString().slice(0, 10);
}

export default function CustomerForm({ onSubmit, onCancel, initialData = null }) {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    fullName:            initialData?.fullName            ?? '',
    phoneNumber:         initialData?.phoneNumber         ?? '',
    guarantorName:       initialData?.guarantorName       ?? '',
    guarantorPhone:      initialData?.guarantorPhone      ?? '',
    dueDate:             toDateInput(initialData?.dueDate),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...form,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
      };
      await onSubmit(payload);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء حفظ البيانات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert message={error} />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="الاسم الكامل"
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="أحمد علي محمد"
          required
        />
        <Input
          label="رقم الهاتف"
          id="phoneNumber"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="+201556299599"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="اسم الضامن"
          id="guarantorName"
          name="guarantorName"
          value={form.guarantorName}
          onChange={handleChange}
          placeholder="محمد أحمد"
        />
        <Input
          label="هاتف الضامن"
          id="guarantorPhone"
          name="guarantorPhone"
          value={form.guarantorPhone}
          onChange={handleChange}
          placeholder="+20111222333"
        />
      </div>

      <Input
        label="تاريخ الاستحقاق"
        id="dueDate"
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
        required
      />

      <ModalFooter>
        <Button variant="secondary" type="button" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit" loading={loading}>
          {isEdit ? 'حفظ التعديلات' : 'حفظ العميل'}
        </Button>
      </ModalFooter>
    </form>
  );
}
