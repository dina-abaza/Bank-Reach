import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import CustomerGroupBadge from './CustomerGroupBadge';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const columns = [
  { key: 'fullName', title: 'الاسم الكامل' },
  { key: 'phoneNumber', title: 'رقم الهاتف' },
  { key: 'guarantorName', title: 'الضامن' },
  { key: 'guarantorPhone', title: 'هاتف الضامن' },
  {
    key: 'dueDate',
    title: 'تاريخ الاستحقاق',
    render: (val) => formatDate(val),
  },
  {
    key: 'overdueDays',
    title: 'أيام التأخير',
    render: (val) => (
      <span className={val > 0 ? 'font-semibold text-red-600' : 'text-slate-500'}>
        {(val ?? 0).toLocaleString('ar-EG')} يوم
      </span>
    ),
  },
  {
    key: 'customerGroup',
    title: 'المجموعة',
    render: (val) => <CustomerGroupBadge group={val} />,
  },
  {
    key: 'tags',
    title: 'العلامات',
    render: (val) =>
      val?.length ? (
        <div className="flex flex-wrap gap-1">
          {val.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-slate-400">—</span>
      ),
  },
  {
    key: 'notes',
    title: 'ملاحظات',
    render: (val) => (
      <span className="max-w-xs truncate block text-slate-500">{val || '—'}</span>
    ),
  },
];

export default function CustomerTable({ customers, pagination, loading, onPageChange }) {
  return (
    <div>
      <Table
        columns={columns}
        data={customers}
        loading={loading}
        emptyMessage="لا يوجد عملاء بهذه المعايير"
      />
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
}
