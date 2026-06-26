'use client';

import { useState, useCallback, useEffect } from 'react';
import { campaignsService } from '@/services/campaigns.service';
import { parsePaginatedResponse } from '@/lib/api';

export function useCampaigns(initialParams = {}) {
  const [campaigns, setCampaigns] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({ page: 1, limit: 20, ...initialParams });

  const fetchCampaigns = useCallback(async (fetchParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await campaignsService.getAll(fetchParams);
      const { data, pagination: meta } = parsePaginatedResponse(result);
      setCampaigns(data);
      setPagination(meta);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في جلب الحملات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns(params);
  }, []);

  const updateParams = useCallback((newParams) => {
    const merged = { ...params, ...newParams };
    setParams(merged);
    fetchCampaigns(merged);
  }, [params, fetchCampaigns]);

  const createCampaign = useCallback(async (data) => {
    const result = await campaignsService.create(data);
    await fetchCampaigns(params);
    return result;
  }, [params, fetchCampaigns]);

  const triggerCampaign = useCallback(async (id) => {
    const result = await campaignsService.trigger(id);
    await fetchCampaigns(params);
    return result;
  }, [params, fetchCampaigns]);

  return {
    campaigns,
    pagination,
    loading,
    error,
    params,
    updateParams,
    createCampaign,
    triggerCampaign,
    refresh: () => fetchCampaigns(params),
  };
}
