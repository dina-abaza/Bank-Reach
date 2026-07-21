import Link from 'next/link';

export const metadata = {
  title: 'BizReach — منصة إدارة تحصيل وتواصل العملاء عبر واتساب',
  description:
    'BizReach تساعد فرق التحصيل والمبيعات على تصنيف العملاء تلقائيًا حسب أيام التأخير، وإرسال حملات واتساب جماعية، ومتابعة النتائج لحظيًا من لوحة تحكم واحدة.',
};

const features = [
  {
    title: 'استيراد وتصنيف تلقائي',
    desc: 'ارفع ملف إكسل بعملائك، والنظام يحسب أيام التأخير ويصنّف كل عميل تلقائيًا (منتظم، متأخر، متعثر، محوّل).',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    ),
  },
  {
    title: 'تحديث يومي بدون تدخل',
    desc: 'مهمة مجدولة تعمل كل ليلة لتحديث أيام التأخير ونقل العملاء بين المجموعات تلقائيًا فور تغيّر حالتهم.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'حملات واتساب جماعية',
    desc: 'استهدف أي فئة من العملاء بحملة رسائل واتساب مخصّصة، وتُرسل آلاف الرسائل في الخلفية دون أي بطء في النظام.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    ),
  },
  {
    title: 'تتبع لحظي للحالة',
    desc: 'تعرف فورًا هل وصلت الرسالة، وهل قرأها العميل، أو فشل إرسالها، عبر تحديثات لحظية من واتساب مباشرة.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'لوحة تحكم وتقارير',
    desc: 'إحصائيات مباشرة عن أعداد العملاء وتوزيعهم، ونسب نجاح الحملات ومعدلات القراءة، في شاشة واحدة سهلة القراءة.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 15l4-4 3 3 5-6" />
    ),
  },
  {
    title: 'تحديثات مباشرة عبر Socket.io',
    desc: 'تابع تقدّم كل حملة أثناء إرسالها لحظة بلحظة على الشاشة، من بدء الإرسال وحتى اكتمالها، دون تحديث الصفحة.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
];

const steps = [
  { n: '01', title: 'ارفع بيانات عملائك', desc: 'ملف إكسل واحد يكفي لاستيراد كل العملاء وتصنيفهم فورًا.' },
  { n: '02', title: 'أنشئ حملة واتساب', desc: 'اختر الفئة المستهدفة والقالب، والنظام يتولى الإرسال بالكامل.' },
  { n: '03', title: 'تابع النتائج لحظيًا', desc: 'شاهد حالة كل رسالة ونسب الاستجابة من لوحة التحكم مباشرة.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-bold text-brand-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 text-sm font-bold text-white">
              BR
            </div>
            BizReach
          </div>
          <Link
            href="/login"
            className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
          >
            تسجيل الدخول
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-slate-50 to-slate-50" />
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-12 text-center md:py-16">
            <span className="mb-6 rounded-full border border-accent-300 bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-800">
              منصة إدارة تحصيل وتواصل العملاء
            </span>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              نظّم متابعة عملائك المتأخرين، وتواصل معهم عبر واتساب من مكان واحد
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              يحوّل BizReach ملفات إكسل الخام إلى فئات عملاء منظمة تلقائيًا، ثم يرسل حملات واتساب
              جماعية لآلاف العملاء، ويعرض لك النتائج لحظة بلحظة على لوحة تحكم واحدة.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="rounded-xl bg-brand-700 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
              >
                تسجيل الدخول إلى حسابك
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-accent-400 hover:text-accent-700"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">كل ما تحتاجه لإدارة التحصيل في مكان واحد</h2>
            <p className="mt-3 text-slate-600">من استيراد البيانات إلى إرسال الحملات ومتابعة النتائج.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const shapes = [
                'rounded-2xl rounded-bl-none -rotate-3',
                'rounded-2xl rounded-tr-none rotate-3',
                'rounded-2xl rounded-tl-none -rotate-2',
              ];
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center transition-transform duration-300 hover:rotate-0 ${shapes[i % 3]} ${
                      i % 3 === 2 ? 'bg-accent-100 text-accent-700' : 'bg-brand-100 text-brand-700'
                    }`}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      {f.icon}
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-800">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-slate-200 bg-white py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-slate-900">تعمل في ثلاث خطوات بسيطة</h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="relative rounded-2xl border border-slate-100 bg-slate-50/50 p-8">
                  <span className="text-4xl font-extrabold text-accent-300">{s.n}</span>
                  <h3 className="mt-3 text-lg font-bold text-slate-800">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
          <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl bg-gradient-to-l from-brand-900 to-brand-700 px-8 py-12 text-center md:flex-row md:text-right">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent-500/10" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-white md:text-3xl">جاهز تبدأ متابعة عملائك بذكاء؟</h2>
              <p className="mt-2 text-brand-100">سجّل دخولك الآن وابدأ أول حملة واتساب في دقائق.</p>
            </div>
            <Link
              href="/login"
              className="relative whitespace-nowrap rounded-xl bg-accent-500 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
            >
              تسجيل الدخول
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 text-sm font-medium text-slate-500 md:flex-row md:gap-6">
          <Link href="/privacy" className="transition-colors hover:text-brand-700">سياسة الخصوصية</Link>
          <span className="hidden text-slate-300 md:inline">•</span>
          <Link href="/terms" className="transition-colors hover:text-brand-700">شروط الخدمة</Link>
          <span className="hidden text-slate-300 md:inline">•</span>
          <Link href="/data-deletion" className="transition-colors hover:text-brand-700">حذف البيانات</Link>
          <span className="hidden text-slate-300 md:inline">•</span>
          <Link href="/contact" className="transition-colors hover:text-brand-700">اتصل بنا</Link>
        </div>
        <div className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} BizReach. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}
