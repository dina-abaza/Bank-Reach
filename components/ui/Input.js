export default function Input({
  label,
  error,
  id,
  className = '',
  required,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="mr-1 text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        className={`
          block w-full rounded-lg border px-3 py-2 text-sm text-slate-900
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent
          disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400
          ${error ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, id, className = '', required, ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="mr-1 text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        className={`
          block w-full rounded-lg border px-3 py-2 text-sm text-slate-900
          placeholder:text-slate-400 resize-none
          focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent
          ${error ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'}
        `}
        rows={4}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
