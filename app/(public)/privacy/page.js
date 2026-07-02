export const metadata = {
  title: 'سياسة الخصوصية - BankReach',
};

export default function PrivacyPage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">سياسة الخصوصية</h1>
      
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>
          في BankReach، نولي أهمية كبرى لخصوصية بياناتك. تشرح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام منصتنا.
        </p>

        <div>
          <h2 className="text-xl font-bold mb-3 text-brand-800">1. جمع البيانات</h2>
          <p>
            نقوم بجمع المعلومات الضرورية فقط لتقديم خدماتنا، مثل بيانات الحساب (الاسم، البريد الإلكتروني) وبيانات استخدام المنصة من أجل تحسين تجربة المستخدم وتقديم خدمة أفضل.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3 text-brand-800">2. استخدام البيانات</h2>
          <p>
            نستخدم بياناتك لتوفير خدمات المنصة، تحسين تجربة الاستخدام، إرسال التنبيهات الضرورية المتعلقة بحسابك، والرد على استفساراتك. نحن لا نقوم ببيع أو تأجير بياناتك لأطراف خارجية تحت أي ظرف.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3 text-brand-800">3. حماية البيانات</h2>
          <p>
            نطبق معايير أمنية صارمة وتشفير متقدم لحماية بياناتك الشخصية من الوصول غير المصرح به، التعديل، أو الإفشاء. يتم تخزين البيانات في خوادم آمنة وفقاً لأفضل ممارسات الصناعة.
          </p>
        </div>
      </div>
    </div>
  );
}
