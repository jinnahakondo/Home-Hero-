import React from "react";

const ServiceSkeleton = () => {
    return (
        <div className="service-card animate-pulse">
            {/* Image Skeleton with Category Badge */}
            <div className="relative h-56 w-full bg-base-300">
                {/* Category Badge Skeleton */}
                <div className="absolute top-3 left-3">
                    <div className="h-6 w-20 bg-base-200 rounded-full"></div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col h-[calc(100%-14rem)]">
                {/* Title - 2 lines */}
                <div className="space-y-2 mb-3">
                    <div className="h-4 w-full bg-base-300 rounded"></div>
                    <div className="h-4 w-4/5 bg-base-300 rounded"></div>
                </div>

                {/* Description - 2 lines */}
                <div className="space-y-2 mb-4">
                    <div className="h-3.5 w-full bg-base-300 rounded"></div>
                    <div className="h-3.5 w-11/12 bg-base-300 rounded"></div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                        {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="h-3.5 w-3.5 bg-base-300 rounded"></div>
                        ))}
                    </div>
                    <div className="h-3 w-10 bg-base-300 rounded"></div>
                </div>

                {/* Spacer to push price and button to bottom */}
                <div className="flex-1"></div>

                {/* Price & Button */}
                <div className="space-y-3">
                    {/* Price */}
                    <div className="h-8 w-32 bg-base-300 rounded"></div>

                    {/* Button */}
                    <div className="h-10 w-full bg-base-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

// Grid Skeleton for multiple cards
export const ServiceGridSkeleton = ({ count = 8 }) => {
    return (
        <div className="service-grid">
            {Array(count).fill(0).map((_, index) => (
                <ServiceSkeleton key={index} />
            ))}
        </div>
    );
};

// List View Skeleton
export const ServiceListSkeleton = () => {
    return (
        <div className="bg-base-100 border border-base-300 rounded-xl overflow-hidden animate-pulse flex flex-col sm:flex-row">
            {/* Image Skeleton */}
            <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-base-300">
                {/* Category Badge Skeleton */}
                <div className="absolute top-3 left-3">
                    <div className="h-6 w-20 bg-base-200 rounded-full"></div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col">
                <div className="flex-1">
                    {/* Title */}
                    <div className="h-5 w-3/4 bg-base-300 rounded mb-2"></div>

                    {/* Description */}
                    <div className="space-y-2 mb-3">
                        <div className="h-3.5 w-full bg-base-300 rounded"></div>
                        <div className="h-3.5 w-5/6 bg-base-300 rounded"></div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                            {Array(5).fill(0).map((_, i) => (
                                <div key={i} className="h-3.5 w-3.5 bg-base-300 rounded"></div>
                            ))}
                        </div>
                        <div className="h-3 w-10 bg-base-300 rounded"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    {/* Price */}
                    <div className="h-8 w-32 bg-base-300 rounded"></div>

                    {/* Button */}
                    <div className="h-10 w-32 bg-base-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

// Dashboard Card Skeleton
export const DashboardCardSkeleton = () => {
    return (
        <div className="bg-base-100 border border-base-300 rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-32 bg-base-300 rounded"></div>
                <div className="h-8 w-8 bg-base-300 rounded-lg"></div>
            </div>
            <div className="h-8 w-20 bg-base-300 rounded mb-2"></div>
            <div className="h-4 w-24 bg-base-300 rounded"></div>
        </div>
    );
};

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 4 }) => {
    return (
        <tr className="animate-pulse">
            {Array(columns).fill(0).map((_, index) => (
                <td key={index} className="px-4 py-3">
                    <div className="h-4 bg-base-300 rounded"></div>
                </td>
            ))}
        </tr>
    );
};

export default ServiceSkeleton;
