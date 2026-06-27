'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { authService } from '@/services/auth.service';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.replace('/dashboard');
      return;
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg">
          BR
        </div>
        <h1 className="text-2xl font-bold text-slate-900">BankReach</h1>
        <p className="mt-1 text-sm text-slate-500">سجّل دخولك للمتابعة</p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Alert message={error} />

          <Input
            label="البريد الإلكتروني"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@bankreach.com"
            required
            autoComplete="email"
          />

          <Input
            label="كلمة المرور"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          <Button type="submit" loading={loading} className="w-full" size="lg">
            تسجيل الدخول
          </Button>
        </form>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
        <Link href="/privacy" className="hover:text-blue-600 transition-colors">سياسة الخصوصية</Link>
        <span className="text-slate-300">•</span>
        <Link href="/terms" className="hover:text-blue-600 transition-colors">شروط الخدمة</Link>
        <span className="text-slate-300">•</span>
        <Link href="/data-deletion" className="hover:text-blue-600 transition-colors">حذف البيانات</Link>
        <span className="text-slate-300">•</span>
        <Link href="/contact" className="hover:text-blue-600 transition-colors">اتصل بنا</Link>
      </div>
    </div>
  );
}
