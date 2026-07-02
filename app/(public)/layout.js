import Link from 'next/link';

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-white font-bold text-sm">
              BR
            </div>
            BankReach
          </Link>
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-brand-700 transition-colors">
            تسجيل الدخول
          </Link>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-4xl p-6 md:p-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-sm font-medium text-slate-500 md:flex-row md:gap-6">
          <Link href="/privacy" className="hover:text-brand-700 transition-colors">سياسة الخصوصية</Link>
          <span className="hidden md:inline text-slate-300">•</span>
          <Link href="/terms" className="hover:text-brand-700 transition-colors">شروط الخدمة</Link>
          <span className="hidden md:inline text-slate-300">•</span>
          <Link href="/data-deletion" className="hover:text-brand-700 transition-colors">حذف البيانات</Link>
          <span className="hidden md:inline text-slate-300">•</span>
          <Link href="/contact" className="hover:text-brand-700 transition-colors">اتصل بنا</Link>
        </div>
        <div className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} BankReach. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}
