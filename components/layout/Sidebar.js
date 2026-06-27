'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { authService } from '@/services/auth.service';

const navItems = [
  {
    href: '/dashboard',
    label: 'لوحة التحكم',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/customers',
    label: 'العملاء',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/templates',
    label: 'قوالب الرسائل',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: '/campaigns',
    label: 'الحملات',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const user = authService.getUser();

  return (
    <aside
      className={`
        flex h-screen w-64 shrink-0 flex-col bg-slate-900 text-white
        fixed right-0 top-0 z-50 transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 md:transition-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="flex items-center gap-3 border-b border-slate-700/50 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
          BR
        </div>
        <div>
          <p className="text-sm font-semibold text-white">BankReach</p>
          <p className="text-xs text-slate-400">منصة التواصل البنكي</p>
        </div>
        {/* زر الإغلاق على الموبايل فقط */}
        <button
          onClick={onClose}
          className="mr-auto flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors md:hidden"
          aria-label="إغلاق القائمة"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-700/50 p-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-200">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{user?.name || 'المستخدم'}</p>
            <p className="truncate text-xs text-slate-400">
              {user?.role === 'admin' ? 'Admin' : 'موظف'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          تسجيل الخروج
        </button>

        <div className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-2 text-[10px] text-slate-500">
          <Link href="/privacy" className="hover:text-white transition-colors">الخصوصية</Link>
          <Link href="/terms" className="hover:text-white transition-colors">الشروط</Link>
          <Link href="/data-deletion" className="hover:text-white transition-colors">حذف البيانات</Link>
          <Link href="/contact" className="hover:text-white transition-colors">اتصل بنا</Link>
        </div>
      </div>
    </aside>
  );
}
