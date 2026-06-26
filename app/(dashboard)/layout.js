'use client';

import { useState } from 'react';
import AuthGuard from '@/components/layout/AuthGuard';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex flex-col flex-1 overflow-hidden">
          {/* شريط التنقل على الموبايل */}
          <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="فتح القائمة"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-xs">
                BR
              </div>
              <span className="text-sm font-semibold text-slate-800">BankReach</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
