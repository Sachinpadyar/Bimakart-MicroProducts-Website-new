export function ProductSkeleton() {
    return (
        <div
            className="
        w-full
        bg-white
        rounded-xl
        flex flex-col
        overflow-hidden
        shadow-[0_4px_12px_rgba(0,0,0,0.06)]
        border border-gray-100
      "
        >
            {/* TOP CONTENT */}
            <div className="flex flex-col items-center text-center px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
                {/* Avatar Skeleton */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full animate-pulse mb-3 sm:mb-4" />

                {/* Title Skeleton */}
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />

                {/* Description Skeleton */}
                <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* FOOTER CTA Skeleton */}
            <div className="mt-auto w-full h-10 sm:h-11 bg-gray-200 animate-pulse" />
        </div>
    );
}
