'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.login(email, password);
      const { user, tokens } = result.data;
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    authService.logout();
    router.push('/login');
  }, [router]);

  return { login, logout, loading, error };
}
