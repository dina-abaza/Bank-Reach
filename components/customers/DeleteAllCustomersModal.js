'use client';

import { useState } from 'react';
import Modal, { ModalFooter } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';

const CONFIRM_PHRASE = 'حذف الكل';

export default function DeleteAllCustomersModal({ isOpen, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setConfirmText('');
    setError(null);
    onClose();
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await onConfirm();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في حذف العملاء');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="حذف جميع العملاء">
      <div className="space-y-3">
        <Alert
          variant="warning"
          message="هذا الإجراء سيحذف جميع العملاء نهائيًا ولا يمكن التراجع عنه."
        />
        {error && <Alert variant="error" message={error} />}
        <p className="text-sm text-slate-600">
          للتأكيد، اكتب <span className="font-semibold text-slate-900">&quot;{CONFIRM_PHRASE}&quot;</span> في الحقل بالأسفل.
        </p>
        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={CONFIRM_PHRASE}
        />
      </div>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          إلغاء
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          loading={loading}
          disabled={confirmText !== CONFIRM_PHRASE}
        >
          تأكيد الحذف
        </Button>
      </ModalFooter>
    </Modal>
  );
}
