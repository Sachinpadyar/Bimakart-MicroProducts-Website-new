import { Upload, FileSpreadsheet, QrCode, Copy, Download } from "lucide-react";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export function TopActions() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="SectionPaddingTop SectionPaddingBottom">
      <div className="Container HeaderAdjustContainer">
        <div>
          <Link to="/">
            <button className="BtnFlex">
              <GoArrowLeft /> Back
            </button>
          </Link>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {/* Download Template */}
          <button
            className="
          flex items-center justify-center gap-2
          border border-green-600 text-green-600
          px-3 sm:px-4 py-2
          rounded-md text-sm whitespace-nowrap
        "
            aria-label="Download Template"
          >
            <FileSpreadsheet size={18} />
            <span className="hidden sm:inline">Download Template</span>
          </button>

          {/* Upload Excel */}
          <button
            className="
          flex items-center justify-center gap-2
          bg-green-800 text-white
          px-3 sm:px-4 py-2
          rounded-md text-sm whitespace-nowrap
        "
            aria-label="Upload Excel"
          >
            <Upload size={18} />
            <span className="hidden sm:inline">Upload Excel</span>
          </button>

          {/* Generate QR Code */}
          <button
            className="
          flex items-center justify-center gap-2
          bg-[#5EA0B2] text-white
          px-3 sm:px-4 py-2
          rounded-md text-sm whitespace-nowrap
        "
            aria-label="Generate QR Code"
          >
            <QrCode size={18} />
            <span className="hidden sm:inline">Generate QR Code</span>
          </button>

          {/* Copy Link */}
          <button
            className="
          flex items-center justify-center gap-2
          border border-sky-300 text-sky-500 bg-sky-50
          px-3 sm:px-4 py-2
          rounded-md text-sm whitespace-nowrap
        "
            aria-label="Copy Link"
          >
            <Copy size={18} />
            <span className="hidden sm:inline">Copy Link</span>
          </button>

          {/* Download Flyer */}
          <button
            className="
          flex items-center justify-center gap-2
          border border-orange-300 text-orange-500 bg-orange-50
          px-3 sm:px-4 py-2
          rounded-md text-sm whitespace-nowrap
        "
            aria-label="Download Flyer"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download Flyer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
