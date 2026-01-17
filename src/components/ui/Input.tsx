interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className="text-xs text-gray-600 block mb-1">{label}</label>
      <input
        {...props}
        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-orange-500"
          } ${props.className || ""}`}
      />
      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
