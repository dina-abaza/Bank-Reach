export const metadata = {
  title: 'اتصل بنا - BankReach',
};

export default function ContactPage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">اتصل بنا</h1>
      
      <p className="text-slate-700 leading-relaxed mb-8">
        نحن هنا لمساعدتك والإجابة على أي استفسارات أو تقديم الدعم الفني اللازم. يمكنك التواصل مع فريق الدعم في أي وقت من خلال القنوات التالية:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="border border-slate-100 rounded-xl p-6 bg-slate-50/50 hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">واتساب</h3>
          <p className="text-slate-600 mb-6 text-sm">تواصل معنا عبر رسائل الواتساب للحصول على استجابة سريعة ودعم فوري.</p>
          <a href="https://wa.me/201556299599" dir="ltr" className="text-blue-600 text-lg font-bold hover:underline inline-flex items-center gap-2">
            <span dir="ltr">01556299599</span>
          </a>
        </div>

        <div className="border border-slate-100 rounded-xl p-6 bg-slate-50/50 hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">البريد الإلكتروني</h3>
          <p className="text-slate-600 mb-6 text-sm">أرسل لنا استفساراتك أو طلباتك بالتفصيل عبر الإيميل وسنرد عليك في أقرب وقت.</p>
          <a href="mailto:ramadanmahdy45@gmail.com" className="text-blue-600 text-base font-bold hover:underline inline-flex items-center gap-2 break-all">
            ramadanmahdy45@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}
