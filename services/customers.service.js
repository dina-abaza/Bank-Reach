import api from '@/lib/api';

export const customersService = {
  async getAll(params = {}) {
    const response = await api.get('/customers', { params });
    return response.data;
  },

  async create(data) {
    const response = await api.post('/customers', data);
    return response.data;
  },

  async importExcel(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/customers/import-excel', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
