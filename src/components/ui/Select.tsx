interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options?: Option[];
  error?: string;
  placeholder?: string;
}

export function Select({ label, options = [], value, onChange, placeholder = "Select an option", error, ...props }: SelectProps) {
  return (
    <div className="w-full">
      <label className="text-xs text-gray-600 block mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        {...props}
        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 bg-white ${error ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-orange-500"
          } ${props.className || ""}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
