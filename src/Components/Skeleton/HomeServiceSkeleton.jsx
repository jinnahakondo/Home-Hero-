import React from "react";

const ServiceSkeleton = () => {
    return (
        <div className="h-full w-full border border-base-300 rounded-xl bg-base-100 p-5 flex flex-col animate-pulse">

            {/* Image Skeleton */}
            <div className="h-40 w-full bg-gray-200 rounded mb-4"></div>

            {/* Content */}
            <div className="space-y-3 grow">

                {/* Category */}
                <div className="h-3 w-24 bg-gray-200 rounded"></div>

                {/* Title */}
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>

                {/* Rating */}
                <div className="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="h-4 w-4 bg-gray-200 rounded"></div>
                    ))}
                </div>

                {/* Price */}
                <div className="flex gap-3 items-center">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Button */}
            <div className="h-4 w-28 bg-gray-200 rounded mt-4"></div>

        </div>
    );
};

export default ServiceSkeleton;
