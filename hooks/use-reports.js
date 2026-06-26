'use client';

import { useState, useCallback, useEffect } from 'react';
import { reportsService } from '@/services/reports.service';

export function useReports() {
  const [dashboard, setDashboard] = useState(null);
  const [campaignPerformance, setCampaignPerformance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashResult, perfResult] = await Promise.all([
        reportsService.getDashboard(),
        reportsService.getCampaignPerformance(),
      ]);
      setDashboard(dashResult.data);
      setCampaignPerformance(Array.isArray(perfResult.data) ? perfResult.data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في جلب بيانات التقارير');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, []);

  return { dashboard, campaignPerformance, loading, error, refresh: fetchAll };
}
