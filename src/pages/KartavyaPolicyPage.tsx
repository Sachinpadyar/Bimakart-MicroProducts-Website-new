//@ts-nocheck
import { PolicyHero } from "@/components/policy/PolicyHero";
import { TopActions } from "@/components/policy/TopActions";

import { useParams } from "react-router-dom";
import { useGetProductConfigQuery } from "@/api/apiConfig";

export default function KartavyaPolicyPage() {
  const { policyId } = useParams();

  const { data: configData, isLoading } = useGetProductConfigQuery(policyId || "", {
    skip: !policyId
  });

  const product = configData?.data || null;

  return (
    <>
      {/* <Header /> */}
      {/* <main className="bg-gray-50"> */}
      <TopActions product={product} />
      <PolicyHero product={product} isLoading={isLoading} />
      {/* </main> */}
      {/* <Footer /> */}
    </>
  );
}
