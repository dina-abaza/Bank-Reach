import Button from './Button';

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, totalDocs, limit } = pagination;
  const from = ((page - 1) * limit + 1).toLocaleString('ar-EG');
  const to   = Math.min(page * limit, totalDocs).toLocaleString('ar-EG');
  const total = totalDocs.toLocaleString('ar-EG');

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
      <p className="text-sm text-slate-500">
        عرض {from}–{to} من {total} نتيجة
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          السابق
        </Button>
        <span className="text-sm text-slate-600">
          {page.toLocaleString('ar-EG')} / {totalPages.toLocaleString('ar-EG')}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          التالي
        </Button>
      </div>
    </div>
  );
}
