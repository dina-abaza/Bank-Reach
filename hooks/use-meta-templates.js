'use client';

import { useState, useCallback, useEffect } from 'react';
import { templatesService } from '@/services/templates.service';

// قوالب Meta المعتمدة لاستخدامها في الحملات خارج نافذة الـ 24 ساعة.
// الـ endpoint يزامنها من Meta ويحفظها تلقائياً قبل إعادتها.
export function useMetaTemplates() {
  const [metaTemplates, setMetaTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMetaTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await templatesService.getMeta();
      setMetaTemplates(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في جلب قوالب Meta');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetaTemplates();
  }, [fetchMetaTemplates]);

  return {
    metaTemplates,
    loading,
    error,
    refresh: fetchMetaTemplates,
  };
}
