import api from '@/lib/api';

export const campaignsService = {
  async getAll(params = {}) {
    const response = await api.get('/campaigns', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await api.post('/campaigns', data);
    return response.data;
  },

  async update(id, data) {
    const response = await api.patch(`/campaigns/${id}`, data);
    return response.data;
  },

  async trigger(id) {
    const response = await api.post(`/campaigns/${id}/trigger`);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },
};
