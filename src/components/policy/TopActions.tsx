import { Upload, FileSpreadsheet } from "lucide-react";

export function TopActions() {
  return (
    <div className="max-w-7xl mx-auto  sm:px-6 py-6 flex justify-end gap-3 SectionPaddingTop">
      {/* Upload Excel */}
      <button
        className="
          flex items-center justify-center gap-2
          border border-green-600 text-green-600
          px-3 sm:px-4 py-2
          rounded-md text-sm
        "
        aria-label="Upload Excel"
      >
        <Upload size={18} />
        <span className="hidden sm:inline">Upload Excel</span>
      </button>

      {/* Download Template */}
      <button
        className="
          flex items-center justify-center gap-2
          bg-green-700 text-white
          px-3 sm:px-4 py-2
          rounded-md text-sm
        "
        aria-label="Download Template"
      >
        <FileSpreadsheet size={18} />
        <span className="hidden sm:inline">Download Template</span>
      </button>
    </div>
  );
}
