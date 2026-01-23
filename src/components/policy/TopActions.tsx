import {
  Upload,
  FileSpreadsheet,
  Copy,
  Download,
  Share2,
  X,
  Loader2,
  Check,
} from "lucide-react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLazyDownloadFileQuery, useLazyDownloadTemplateQuery, useValidateExcelMutation, useShareLinkMutation } from "@/api/apiConfig";
import { useRef } from "react";
import type { Product } from "@/types/product.types";

interface Props {
  readonly product: Product | null;
}

export function TopActions({ product }: Props) {
  const [searchParams] = useSearchParams();
  const isSharedView =
    new URL(globalThis.location.href).searchParams.get("view") === "shared" ||
    searchParams.has("ref");

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [isTemplateDownloading, setIsTemplateDownloading] = useState(false);
  const [templateDownloadSuccess, setTemplateDownloadSuccess] = useState(false);

  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    errors?: string[];
  } | null>(null);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [shareData, setShareData] = useState<{ shareUrl: string; qrImage: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [downloadFile] = useLazyDownloadFileQuery();
  const [downloadTemplate] = useLazyDownloadTemplateQuery();
  const [validateExcel, { isLoading: isValidating }] = useValidateExcelMutation();
  const [shareLink] = useShareLinkMutation();

  useEffect(() => {
    globalThis.scrollTo(0, 0);
  }, []);

  // const getSharedUrl = () => {
  //   const url = new URL(globalThis.location.href);
  //   url.searchParams.set("view", "shared");
  //   return url.toString();
  // };

  const handleCopyLink = () => {
    if (shareData?.shareUrl) {
      globalThis.navigator.clipboard.writeText(shareData.shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleDownloadQrCode = () => {
    if (!shareData?.qrImage) return;

    try {
      const link = document.createElement("a");
      link.href = shareData.qrImage;
      link.download = "policy-qr-code.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download QR code:", error);
      alert("Failed to download QR code");
    }
  };

  const handleDownloadTemplate = async () => {
    if (!product?._id) return;

    try {
      setIsTemplateDownloading(true);
      const blob = await downloadTemplate(product._id).unwrap();

      const url = globalThis.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "policy-template.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);

      setTemplateDownloadSuccess(true);
      setTimeout(() => setTemplateDownloadSuccess(false), 3000);
    } catch (error) {
      console.error("Template download failed:", error);
      alert("Template download failed");
    } finally {
      setIsTemplateDownloading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !product?._id) return;

    try {
      setValidationResult(null);
      const result = await validateExcel({ productId: product._id, file }).unwrap();
      setValidationResult(result);
      setIsValidationModalOpen(true);
    } catch (error) {
      console.error("Validation failed:", error);
      setValidationResult({
        valid: false,
        message: "Validation failed. Please try again.",
      });
      setIsValidationModalOpen(true);
    } finally {
      // Clear input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDownloadFlyer = async () => {
    if (!product?.policyFlyer) return;

    try {
      setIsDownloading(true);

      const blob = await downloadFile(product.policyFlyer).unwrap();

      const url = globalThis.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = product.policyFlyer.split("/").pop() || "flyer.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      globalThis.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  /* ---------- Extracted UI state (Sonar S3358 fix) ---------- */
  let downloadIcon = <Download size={18} />;
  let downloadLabel = "Download Flyer";

  if (isDownloading) {
    downloadIcon = <Loader2 size={18} className="animate-spin" />;
    downloadLabel = "Downloading...";
  } else if (downloadSuccess) {
    downloadIcon = <Check size={18} />;
    downloadLabel = "Downloaded!";
  }

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
              onClick={handleDownloadTemplate}
              disabled={isTemplateDownloading || templateDownloadSuccess}
              className={`flex items-center justify-center gap-2 border px-3 sm:px-4 py-2 rounded-md text-sm whitespace-nowrap transition-all duration-200 ${templateDownloadSuccess
                ? "border-green-300 text-green-600 bg-green-50"
                : "border-green-600 text-green-600 hover:bg-green-50"
                } ${isTemplateDownloading ? "opacity-70 cursor-not-allowed" : ""}`}
              aria-label="Download Template"
            >
              {isTemplateDownloading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : templateDownloadSuccess ? (
                <Check size={18} />
              ) : (
                <FileSpreadsheet size={18} />
              )}
              <span className="hidden sm:inline">
                {isTemplateDownloading
                  ? "Downloading..."
                  : templateDownloadSuccess
                    ? "Downloaded!"
                    : "Download Template"}
              </span>
            </button>

            {/* Upload Excel */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls"
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              disabled={isValidating}
              className={`flex items-center justify-center gap-2 bg-green-800 text-white px-3 sm:px-4 py-2 rounded-md text-sm whitespace-nowrap transition-all duration-200 hover:bg-green-900 ${isValidating ? "opacity-70 cursor-not-allowed" : ""}`}
              aria-label="Upload Excel"
            >
              {isValidating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Upload size={18} />
              )}
              <span className="hidden sm:inline">
                {isValidating ? "Validating..." : "Upload Excel"}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={() => {
                if (product?._id) {
                  shareLink({
                    productId: product._id,
                    agentId: "696215554740a67614441441"
                  }).unwrap()
                    .then((res) => {
                      setShareData(res.data);
                      setIsShareModalOpen(true);
                      console.log("Share link tracked successfully");
                    })
                    .catch((err) => console.error("Failed to track share link", err));
                }
              }}
              className="flex items-center justify-center gap-2 border border-sky-300 text-sky-500 bg-sky-50 px-3 sm:px-4 py-2 rounded-md text-sm whitespace-nowrap"
              aria-label="Share"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Download Flyer */}
            <button
              onClick={handleDownloadFlyer}
              disabled={isDownloading || downloadSuccess}
              className={`flex items-center justify-center gap-2 border px-3 sm:px-4 py-2 rounded-md text-sm whitespace-nowrap transition-all duration-200 ${downloadSuccess
                ? "border-green-300 text-green-600 bg-green-50"
                : "border-orange-300 text-orange-500 bg-orange-50 hover:bg-orange-100"
                } ${isDownloading ? "opacity-70 cursor-not-allowed" : ""}`}
              aria-label="Download Flyer"
            >
              {downloadIcon}
              <span className="hidden sm:inline">{downloadLabel}</span>
            </button>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden relative">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Share Policy</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {shareData ? (
                <>
                  <div className="space-y-2">
                    <label htmlFor="page-link" className="text-sm font-medium text-gray-700">
                      Page Link
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareData.shareUrl}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium text-sm"
                      >
                        <Copy size={16} />
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 flex flex-col items-center gap-4">
                    <img
                      src={shareData.qrImage}
                      alt="QR Code"
                      className="w-40 h-40"
                    />
                    <button
                      onClick={handleDownloadQrCode}
                      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      <Download size={16} />
                      Download QR Code
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-center p-8">
                  <Loader2 size={32} className="animate-spin text-sky-500" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Validation Result Modal */}
      {isValidationModalOpen && validationResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden relative">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                {validationResult.valid ? (
                  <Check className="text-green-600" size={20} />
                ) : (
                  <X className="text-red-600" size={20} />
                )}
                Validation {validationResult.valid ? "Successful" : "Failed"}
              </h3>
              <button
                onClick={() => setIsValidationModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {validationResult.valid ? (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Check size={32} />
                  </div>
                  <p className="text-green-700 font-medium">
                    {validationResult.message || "Excel template is perfect!"}
                  </p>
                  <button
                    onClick={() => setIsValidationModalOpen(false)}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-red-600 font-medium">
                    <X size={20} />
                    <span>Excel has errors:</span>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                    {validationResult.errors && validationResult.errors.length > 0 ? (
                      <ul className="list-disc list-inside space-y-2 text-sm text-red-700">
                        {validationResult.errors.map((err, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {err}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-red-700">
                        {validationResult.message || "Something went wrong with the validation."}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setIsValidationModalOpen(false)}
                    className="w-full py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Close & Fix Excel
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