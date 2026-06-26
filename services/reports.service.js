import api from '@/lib/api';

export const reportsService = {
  async getDashboard() {
    const response = await api.get('/reports/dashboard');
    return response.data;
  },

  async getCampaignPerformance() {
    const response = await api.get('/reports/campaign-performance');
    return response.data;
  },
};
