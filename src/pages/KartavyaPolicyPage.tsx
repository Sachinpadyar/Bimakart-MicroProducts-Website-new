//@ts-nocheck
import { PolicyHero } from "@/components/policy/PolicyHero";
import { TopActions } from "@/components/policy/TopActions";

import { useParams, useSearchParams } from "react-router-dom";
import { useGetProductConfigQuery, useValidateShareLinkMutation } from "@/api/apiConfig";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function KartavyaPolicyPage() {
  const { policyId } = useParams();
  const [searchParams] = useSearchParams();
  const [validateShareLink] = useValidateShareLinkMutation();
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data: configData, isLoading } = useGetProductConfigQuery(policyId || "", {
    skip: !policyId
  });

  const product = configData?.data || null;

  useEffect(() => {
    const validateLink = async () => {
      const ref = searchParams.get("ref");
      const ts = searchParams.get("ts");
      const sig = searchParams.get("sig");

      if (ref && ts && sig && policyId) {
        try {
          await validateShareLink({
            productId: policyId,
            ref,
            ts,
            sig,
          }).unwrap();
        } catch (error: any) {
          console.error("Validation failed:", error);
          setValidationError(error?.data?.message || "Invalid or expired link");
        }
      }
    };

    validateLink();
  }, [searchParams, policyId, validateShareLink]);

  return (
    <>
      {/* <Header /> */}
      {/* <main className="bg-gray-50"> */}
      <TopActions product={product} />
      <PolicyHero product={product} isLoading={isLoading} />
      {/* </main> */}
      {/* <Footer /> */}

      {/* Validation Error Modal */}
      {validationError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden relative">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-red-600 flex items-center gap-2">
                <X size={20} />
                Link Error
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-center mb-4">{validationError}</p>
              <a
                href="/"
                className="block w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors text-center"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
