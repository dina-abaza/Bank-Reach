'use client';

import { useState } from 'react';
import { seedAll, seedCustomers, seedTemplates, seedCampaigns } from '@/lib/seed-runner';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import { SEED_CUSTOMERS, SEED_TEMPLATES, SEED_CAMPAIGNS } from '@/lib/seed-data';

export default function SeedPage() {
  const [log, setLog]         = useState([]);
  const [running, setRunning] = useState(false);
  const [done, setDone]       = useState(false);

  function addLog(msg, type = 'info') {
    setLog((prev) => [...prev, { msg, type, time: new Date().toLocaleTimeString('ar-EG') }]);
  }

  function onProgress(event) {
    if (event.step === 'start')          addLog(event.message, 'info');
    else if (event.step === 'customers') addLog(`👤 عميل ${event.current}/${event.total}: ${event.label}`, 'info');
    else if (event.step === 'templates') addLog(`📄 قالب ${event.current}/${event.total}: ${event.label}`, 'info');
    else if (event.step === 'campaigns') addLog(`📢 حملة ${event.current}/${event.total}: ${event.label}`, 'info');
    else if (event.step === 'done-customers') addLog(`✅ عملاء: ${event.success} نجح، ${event.failed} فشل`, event.failed ? 'warn' : 'success');
    else if (event.step === 'done-templates') addLog(`✅ قوالب: ${event.success} نجح، ${event.failed} فشل`, event.failed ? 'warn' : 'success');
    else if (event.step === 'done-campaigns') addLog(`✅ حملات: ${event.success} نجح، ${event.failed} فشل`, event.failed ? 'warn' : 'success');
    else if (event.step === 'finish')    addLog('🎉 اكتمل الـ seed بنجاح!', 'success');
  }

  async function runAll() {
    setLog([]);
    setDone(false);
    setRunning(true);
    try {
      await seedAll(onProgress);
      setDone(true);
    } catch (err) {
      addLog(`خطأ: ${err.message}`, 'error');
    } finally {
      setRunning(false);
    }
  }

  const logColors = {
    info:    'text-slate-600',
    success: 'text-green-600 font-semibold',
    warn:    'text-amber-600 font-semibold',
    error:   'text-red-600 font-semibold',
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Header
        title="إضافة بيانات تجريبية"
        subtitle="تُضاف البيانات مباشرة إلى الـ API الحقيقي"
      />

      {/* ملخص ما سيُضاف */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'عملاء', count: SEED_CUSTOMERS.length, color: 'bg-blue-50 text-blue-700' },
          { label: 'قوالب', count: SEED_TEMPLATES.length, color: 'bg-purple-50 text-purple-700' },
          { label: 'حملات', count: SEED_CAMPAIGNS.length, color: 'bg-green-50 text-green-700' },
        ].map((item) => (
          <div key={item.label} className={`rounded-xl p-4 text-center ${item.color}`}>
            <p className="text-3xl font-bold">{item.count}</p>
            <p className="text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* أزرار التشغيل */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={runAll} loading={running} disabled={running}>
          {running ? 'جاري الإضافة...' : '🚀 إضافة كل البيانات'}
        </Button>
      </div>

      {/* لوج التنفيذ */}
      {log.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1 max-h-96 overflow-y-auto font-mono text-sm">
          {log.map((entry, i) => (
            <div key={i} className={`flex gap-2 ${logColors[entry.type]}`}>
              <span className="text-slate-400 shrink-0">{entry.time}</span>
              <span>{entry.msg}</span>
            </div>
          ))}
        </div>
      )}

      {done && (
        <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 text-sm font-medium">
          ✅ تمت إضافة البيانات. افتح صفحة العملاء أو الحملات لترى النتيجة.
        </div>
      )}
    </div>
  );
}
