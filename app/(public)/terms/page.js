export const metadata = {
  title: 'شروط الخدمة - BankReach',
};

export default function TermsPage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">شروط الخدمة</h1>
      
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>
          مرحباً بك في منصة BankReach. باستخدامك لمنصتنا، فإنك توافق على الشروط والأحكام التالية التي تنظم علاقتك معنا. يرجى قراءتها بعناية.
        </p>

        <div>
          <h2 className="text-xl font-bold mb-3 text-brand-800">1. التزامات المستخدم</h2>
          <p>
            يجب عليك استخدام المنصة لأغراض قانونية فقط. أنت توافق على الالتزام بسياسات واتساب المعتمدة، وعدم استخدام المنصة لإرسال رسائل مزعجة (Spam) للعملاء، أو أي محتوى يخالف القوانين أو ينتهك حقوق الآخرين.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3 text-brand-800">2. حقوق الملكية</h2>
          <p>
            جميع حقوق الملكية الفكرية في المنصة، بما في ذلك التصميم، والبرمجيات، والنصوص، والشعارات، تعود حصرياً لـ BankReach ولا يجوز نسخها، أو تعديلها، أو استخدامها بدون تصريح كتابي مسبق منا.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3 text-brand-800">3. إخلاء المسؤولية</h2>
          <p>
            نسعى دائماً لضمان استمرارية الخدمة بأعلى جودة ممكنة، ولكننا لا نتحمل المسؤولية عن أي خسائر مباشرة أو غير مباشرة قد تنتج عن انقطاع الخدمة، أو أخطاء تقنية، أو تغيير في سياسات وإجراءات الطرف الثالث (مثل شركة ميتا/واتساب).
          </p>
        </div>
      </div>
    </div>
  );
}
