import { Upload, FileSpreadsheet, Copy, Download, Share2, X, Loader2, Check } from "lucide-react";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLazyDownloadFileQuery } from "@/api/apiConfig";
import type { Product } from "@/types/product.types";

interface Props {
  product: Product | null;
}

export function TopActions({ product }: Props) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadFile] = useLazyDownloadFileQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSharedUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "shared");
    return url.toString();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getSharedUrl());
    alert("Link copied to clipboard!");
  };

  const handleDownloadQrCode = async () => {
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getSharedUrl())}`;
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "policy-qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download QR code:", error);
      alert("Failed to download QR code");
    }
  };

  const handleDownloadFlyer = async () => {
    if (!product?.policyFlyer) {
      alert("No flyer available for this product.");
      return;
    }

    try {
      setIsDownloading(true);
      const result = await downloadFile(product.policyFlyer).unwrap();

      if (result?.data) {
        try {
          // Attempt to fetch the file as a blob (allows for custom filename)
          const response = await fetch(result.data);
          if (!response.ok) throw new Error("Network response was not ok");
          const blob = await response.blob();

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;

          const filename = product.policyFlyer.split("/").pop() || "brochure.pdf";
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (fetchError) {
          console.warn("Blob download failed, falling back to direct link:", fetchError);
          // Fallback: Direct download via window.open if CORS/Fetch fails
          window.open(result.data, "_blank");
        }

        // Show success state briefly
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      } else {
        alert("Failed to get download link. Please try again.");
      }
    } catch (error) {
      console.error("Failed to download flyer:", error);
      alert("Failed to download flyer. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const isSharedView = new URL(window.location.href).searchParams.get("view") === "shared";

  return (
    <div className="SectionPaddingTop SectionPaddingBottom">
      <div className="Container HeaderAdjustContainer">
        {!isSharedView && (
          <div>
            <Link to="/">
              <button className="BtnFlex">
                <GoArrowLeft /> Back
              </button>
            </Link>
          </div>
        )}
        {!isSharedView && (
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
              onClick={handleDownloadFlyer}
              disabled={isDownloading || downloadSuccess}
              className={`
          flex items-center justify-center gap-2
          border px-3 sm:px-4 py-2
          rounded-md text-sm whitespace-nowrap transition-all duration-200
          ${downloadSuccess
                  ? "border-green-300 text-green-600 bg-green-50"
                  : "border-orange-300 text-orange-500 bg-orange-50 hover:bg-orange-100"
                }
          ${isDownloading ? "opacity-70 cursor-not-allowed" : ""}
        `}
              aria-label="Download Flyer"
            >
              {isDownloading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : downloadSuccess ? (
                <Check size={18} />
              ) : (
                <Download size={18} />
              )}
              <span className="hidden sm:inline">
                {isDownloading ? "Downloading..." : downloadSuccess ? "Downloaded!" : "Download Flyer"}
              </span>
            </button>
          </div>
        )}
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
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Link Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Page Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getSharedUrl()}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600 focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                  >
                    <Copy size={16} />
                    Copy
                  </button>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(getSharedUrl())}`}
                      alt="QR Code"
                      className="w-40 h-40"
                    />
                  </div>
                  <button
                    onClick={handleDownloadQrCode}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download size={16} />
                    Download QR Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
