import './globals.css';

export const metadata = {
  title: 'BankReach — منصة التواصل البنكي',
  description: 'منصة إدارة حملات الواتساب للعملاء البنكيين',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
