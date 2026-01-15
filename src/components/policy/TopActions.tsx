import { Upload, FileSpreadsheet, QrCode, Copy, Download, Share2, X, Link as LinkIcon } from "lucide-react";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function TopActions() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

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

          {/* Share Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="
          flex items-center justify-center gap-2
          border border-sky-300 text-sky-500 bg-sky-50
          px-3 sm:px-4 py-2
          rounded-md text-sm whitespace-nowrap
        "
            aria-label="Share"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline">Share</span>
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

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden relative animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Share Policy</h3>
              <button
                onClick={() => {
                  setIsShareModalOpen(false);
                  setShowQrCode(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {showQrCode ? (
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm mb-4">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}`}
                      alt="QR Code"
                      className="w-40 h-40"
                    />
                  </div>
                  <button
                    onClick={() => setShowQrCode(false)}
                    className="text-sm text-gray-500 hover:text-gray-800 underline"
                  >
                    Back to options
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center w-full gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-100 transition-colors">
                      <Copy size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Copy Link</p>
                      <p className="text-xs text-gray-500">Copy page URL to clipboard</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowQrCode(true)}
                    className="flex items-center w-full gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-full group-hover:bg-purple-100 transition-colors">
                      <QrCode size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Share QR Code</p>
                      <p className="text-xs text-gray-500">Generate a QR code for this page</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
