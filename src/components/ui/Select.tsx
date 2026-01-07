interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options?: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

export function Select({ label, options = [], value, onChange, placeholder = "Select an option" }: SelectProps) {
  return (
    <div>
      <label className="text-xs text-gray-600 block mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
      >
        <option value="" disabled selected>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
