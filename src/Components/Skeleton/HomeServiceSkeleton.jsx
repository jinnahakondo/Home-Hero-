import React from "react";

const ServiceSkeleton = () => {
    return (
        <div className="service-card p-6 flex flex-col animate-pulse">
            {/* Image Skeleton */}
            <div className="h-48 w-full bg-base-300 rounded-lg mb-4"></div>

            {/* Content */}
            <div className="space-y-3 flex-grow">
                {/* Category Badge */}
                <div className="h-6 w-20 bg-base-300 rounded-full"></div>

                {/* Title */}
                <div className="h-6 w-3/4 bg-base-300 rounded"></div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-base-300 rounded"></div>
                    <div className="h-4 w-2/3 bg-base-300 rounded"></div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="h-4 w-4 bg-base-300 rounded"></div>
                        ))}
                    </div>
                    <div className="h-4 w-12 bg-base-300 rounded"></div>
                </div>

                {/* Price */}
                <div className="flex gap-3 items-center">
                    <div className="h-4 w-16 bg-base-300 rounded"></div>
                    <div className="h-7 w-24 bg-base-300 rounded-lg"></div>
                </div>
            </div>

            {/* Button */}
            <div className="h-12 w-full bg-base-300 rounded-lg mt-4"></div>
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
