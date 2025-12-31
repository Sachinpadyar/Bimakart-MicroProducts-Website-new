import { Upload, FileSpreadsheet } from "lucide-react";
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
        {/* Upload Excel */}
        <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
}
