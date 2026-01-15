//@ts-nocheck
import { useGetProductsQuery } from "@/api/apiConfig";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";

export function ProductGrid() {
  // Fetch products from API
  const { data, isLoading, isError } = useGetProductsQuery();

  // Loading state
  if (isLoading) {
    return (
      <section className="Container SectionPaddingBottom">
        <div className="AdjustContainerPosition">
          <div className="ProductCardGridContainer">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <section className="Container SectionPaddingBottom">
        <div className="AdjustContainerPosition">
          <div className="ProductCardGridContainer">
            <p className="text-center text-red-500">Failed to load products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="Container SectionPaddingBottom">
      <div className="AdjustContainerPosition">
        <div className="ProductCardGridContainer">
          {data.data.filter((product) => product.isActive).map((product) => (
            <ProductCard
              key={product._id}
              title={product.name}
              description={product.shortDescription}
              policyIcon={product.policyIcon}
              policyIconUrl={product.policyIconUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
