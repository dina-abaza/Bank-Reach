export default function Select({ label, error, id, options = [], placeholder, className = '', required, ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="mr-1 text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        className={`
          block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 bg-white
          focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent
          disabled:cursor-not-allowed disabled:bg-slate-50
          ${error ? 'border-red-400' : 'border-slate-300'}
        `}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
