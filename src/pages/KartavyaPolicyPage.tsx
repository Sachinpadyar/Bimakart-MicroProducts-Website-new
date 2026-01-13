//@ts-nocheck
import { PolicyHero } from "@/components/policy/PolicyHero";
import { TopActions } from "@/components/policy/TopActions";

import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "@/api/apiConfig";

export default function KartavyaPolicyPage() {
  const { policyName } = useParams();
  const { data, isLoading } = useGetProductsQuery();

  // Find product by name (handling potential encoding issues by simple comparison if name matches)
  const product = data?.data?.find(p => p.name === policyName || p.name.replace(/\s+/g, '-') === policyName) || null;

  return (
    <>
      {/* <Header /> */}
      {/* <main className="bg-gray-50"> */}
      <TopActions />
      <PolicyHero product={product} isLoading={isLoading} />
      {/* </main> */}
      {/* <Footer /> */}
    </>
  );
}
