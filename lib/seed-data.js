// ============================================================
//  بيانات وهمية للـ seed — تُستخدم فقط للتجربة والعرض
// ============================================================

export const SEED_CUSTOMERS = [
  { fullName: 'أحمد محمد علي',       phoneNumber: '+201012345678', guarantorName: 'محمد علي حسن',      guarantorPhone: '+201112345678', importedOverdueDays: 0,   dueDate: '2025-08-01', notes: 'عميل منتظم', tags: ['VIP'] },
  { fullName: 'سارة عبد الله كمال',  phoneNumber: '+201123456789', guarantorName: 'عبد الله كمال',     guarantorPhone: '+201223456789', importedOverdueDays: 12,  dueDate: '2025-07-15', notes: '',            tags: [] },
  { fullName: 'محمد خالد إبراهيم',   phoneNumber: '+201234567890', guarantorName: 'خالد إبراهيم سعد',  guarantorPhone: '+201534567890', importedOverdueDays: 45,  dueDate: '2025-06-10', notes: 'تأخر متكرر',  tags: ['متأخر'] },
  { fullName: 'نورا حسن محمود',       phoneNumber: '+201345678901', guarantorName: 'حسن محمود عمر',     guarantorPhone: '+201045678901', importedOverdueDays: 0,   dueDate: '2025-09-01', notes: '',            tags: [] },
  { fullName: 'عمر يوسف عبد الرحمن', phoneNumber: '+201456789012', guarantorName: 'يوسف عبد الرحمن',  guarantorPhone: '+201156789012', importedOverdueDays: 90,  dueDate: '2025-05-01', notes: 'تعثر في السداد', tags: ['متعثر'] },
  { fullName: 'هناء سامي فؤاد',      phoneNumber: '+201567890123', guarantorName: 'سامي فؤاد عزيز',   guarantorPhone: '+201267890123', importedOverdueDays: 7,   dueDate: '2025-07-20', notes: '',            tags: [] },
  { fullName: 'كريم طارق مصطفى',     phoneNumber: '+201678901234', guarantorName: 'طارق مصطفى نور',   guarantorPhone: '+201378901234', importedOverdueDays: 30,  dueDate: '2025-06-25', notes: '',            tags: ['متأخر'] },
  { fullName: 'ريم أحمد الشافعي',    phoneNumber: '+201789012345', guarantorName: 'أحمد الشافعي علي',  guarantorPhone: '+201489012345', importedOverdueDays: 0,   dueDate: '2025-10-01', notes: 'عميل مميز',  tags: ['VIP'] },
  { fullName: 'وليد إبراهيم منصور',  phoneNumber: '+201890123456', guarantorName: 'إبراهيم منصور',     guarantorPhone: '+201590123456', importedOverdueDays: 60,  dueDate: '2025-05-15', notes: '',            tags: ['متعثر'] },
  { fullName: 'دينا عصام حلمي',      phoneNumber: '+201901234567', guarantorName: 'عصام حلمي ناصر',   guarantorPhone: '+201001234567', importedOverdueDays: 0,   dueDate: '2025-08-15', notes: '',            tags: [] },
  { fullName: 'مصطفى جمال الدين',    phoneNumber: '+201012348765', guarantorName: 'جمال الدين عبد',    guarantorPhone: '+201112348765', importedOverdueDays: 15,  dueDate: '2025-07-10', notes: '',            tags: [] },
  { fullName: 'آية محمود رضا',       phoneNumber: '+201123459876', guarantorName: 'محمود رضا فتحي',   guarantorPhone: '+201523459876', importedOverdueDays: 0,   dueDate: '2025-09-20', notes: 'تسدد مبكراً', tags: ['VIP'] },
  { fullName: 'حسام علي بكر',        phoneNumber: '+201234560987', guarantorName: 'علي بكر صالح',     guarantorPhone: '+201034560987', importedOverdueDays: 120, dueDate: '2025-04-01', notes: 'قيد المتابعة', tags: ['متعثر'] },
  { fullName: 'منى سعيد الغامدي',    phoneNumber: '+201345671098', guarantorName: 'سعيد الغامدي ناجي', guarantorPhone: '+201145671098', importedOverdueDays: 5,   dueDate: '2025-07-25', notes: '',            tags: [] },
  { fullName: 'تامر رامي عوض',       phoneNumber: '+201456782109', guarantorName: 'رامي عوض حسني',    guarantorPhone: '+201256782109', importedOverdueDays: 0,   dueDate: '2025-11-01', notes: '',            tags: [] },
  { fullName: 'شيماء وليد عثمان',    phoneNumber: '+201567893210', guarantorName: 'وليد عثمان حمزة',  guarantorPhone: '+201367893210', importedOverdueDays: 20,  dueDate: '2025-07-05', notes: '',            tags: ['متأخر'] },
  { fullName: 'أسامة حمدي زكي',     phoneNumber: '+201678904321', guarantorName: 'حمدي زكي نادر',    guarantorPhone: '+201478904321', importedOverdueDays: 0,   dueDate: '2025-08-30', notes: '',            tags: [] },
  { fullName: 'رانيا فتحي الشيخ',   phoneNumber: '+201789015432', guarantorName: 'فتحي الشيخ مبروك', guarantorPhone: '+201589015432', importedOverdueDays: 35,  dueDate: '2025-06-20', notes: '',            tags: ['متأخر'] },
  { fullName: 'أيمن صلاح الدين',    phoneNumber: '+201890126543', guarantorName: 'صلاح الدين نبيل',  guarantorPhone: '+201090126543', importedOverdueDays: 75,  dueDate: '2025-05-10', notes: 'يحتاج متابعة', tags: ['متعثر'] },
  { fullName: 'لمياء كمال راشد',     phoneNumber: '+201901237654', guarantorName: 'كمال راشد هاني',   guarantorPhone: '+201201237654', importedOverdueDays: 0,   dueDate: '2025-09-10', notes: '',            tags: [] },
];

export const SEED_TEMPLATES = [
  {
    name: 'تذكير عام بالسداد',
    body: 'عزيزي {{fullName}}،\nنود تذكيرك بموعد سداد قسطك القادم. يرجى التواصل معنا لأي استفسار.\nشكراً لتعاملكم معنا.',
  },
  {
    name: 'تنبيه التأخر في السداد',
    body: 'عزيزي {{fullName}}،\nنُحيطك علماً بأن قسطك متأخر منذ {{overdueDays}} يوماً. نرجو منك السداد العاجل أو التواصل معنا لترتيب بديل.\nللتواصل: {{phoneNumber}}',
  },
  {
    name: 'رسالة الضامن',
    body: 'السيد {{guarantorName}}،\nنود إحاطتكم علماً بأن المقترض الذي تضمنونه متأخر في سداد أقساطه منذ {{overdueDays}} يوماً.\nيرجى التواصل معنا على الرقم: {{guarantorPhone}}',
  },
  {
    name: 'إشعار آخر موعد',
    body: 'عزيزي {{fullName}}،\nهذا إشعار نهائي بأن موعد سداد قسطك كان {{dueDate}}.\nلتجنب الإجراءات القانونية، يرجى السداد الفوري أو التواصل معنا.',
  },
  {
    name: 'رسالة ترحيب بالعميل الجديد',
    body: 'أهلاً وسهلاً {{fullName}}،\nنشكركم على ثقتكم بنا. سيتواصل معكم فريقنا قريباً لإتمام الإجراءات.\nمعاً نحو مستقبل أفضل.',
  },
];

// ملاحظة: الحملات تحتاج templateId حقيقي يُضاف بعد إنشاء القوالب
export const SEED_CAMPAIGNS = [
  {
    title: 'حملة المتأخرين — يوليو 2025',
    targetCustomerGroup: 'LATE',
    scheduledAt: '2025-07-15T09:00:00.000Z',
  },
  {
    title: 'حملة المتعثرين — يوليو 2025',
    targetCustomerGroup: 'DEFAULTED',
    scheduledAt: '2025-07-16T09:00:00.000Z',
  },
  {
    title: 'تذكير المنتظمين — أغسطس 2025',
    targetCustomerGroup: 'COMPLIANT',
    scheduledAt: '2025-08-01T08:00:00.000Z',
  },
  {
    title: 'حملة المحولين — يوليو 2025',
    targetCustomerGroup: 'TRANSFERRED',
    scheduledAt: '2025-07-20T10:00:00.000Z',
  },
];
