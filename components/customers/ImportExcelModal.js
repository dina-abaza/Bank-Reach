'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { ModalFooter } from '@/components/ui/Modal';

export default function ImportExcelModal({ onImport, onCancel }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const response = await onImport(file);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في رفع الملف');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert message={error} />

      {result ? (
        <div className="space-y-3 rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="font-semibold text-green-800">تم الاستيراد بنجاح</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-green-200 bg-white p-3">
              <p className="text-2xl font-bold text-green-700">
                {result.imported?.toLocaleString('ar-EG')}
              </p>
              <p className="mt-1 text-xs text-green-600">تم الاستيراد</p>
            </div>
            <div className="rounded-lg border border-brand-200 bg-white p-3">
              <p className="text-2xl font-bold text-brand-700">
                {result.updated?.toLocaleString('ar-EG')}
              </p>
              <p className="mt-1 text-xs text-brand-600">تم التحديث</p>
            </div>
            <div className="rounded-lg border border-red-200 bg-white p-3">
              <p className="text-2xl font-bold text-red-700">
                {result.failed?.toLocaleString('ar-EG')}
              </p>
              <p className="mt-1 text-xs text-red-600">فشل</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-10 text-center transition-colors hover:border-brand-400 hover:bg-brand-50"
        >
          <svg className="mx-auto mb-3 h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm font-medium text-slate-700">
            {file ? file.name : 'انقر لاختيار ملف Excel'}
          </p>
          <p className="mt-1 text-xs text-slate-400">xlsx, xls</p>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      <ModalFooter>
        <Button variant="secondary" type="button" onClick={onCancel}>
          {result ? 'إغلاق' : 'إلغاء'}
        </Button>
        {!result && (
          <Button type="submit" loading={loading} disabled={!file}>
            رفع الملف
          </Button>
        )}
      </ModalFooter>
    </form>
  );
}
