import api from '@/lib/api';
import { disconnectWebSocket } from '@/lib/socket';

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      disconnectWebSocket();
    }
  },

  getUser() {
    if (typeof window === 'undefined') return null;
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  },
};
