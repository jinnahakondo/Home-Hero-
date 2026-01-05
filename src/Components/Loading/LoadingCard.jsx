import React from 'react';

const LoadingCard = ({
    className = '',
    showImage = true,
    showTitle = true,
    showDescription = true,
    showButton = true,
    lines = 2
}) => {
    return (
        <div className={`bg-base-100 border border-base-300 rounded-xl p-6 animate-pulse ${className}`}>
            {/* Image Skeleton */}
            {showImage && (
                <div className="h-48 w-full bg-base-300 rounded-lg mb-4"></div>
            )}

            {/* Content */}
            <div className="space-y-3">
                {/* Category Badge */}
                <div className="h-6 w-20 bg-base-300 rounded-full"></div>

                {/* Title */}
                {showTitle && (
                    <div className="h-6 w-3/4 bg-base-300 rounded"></div>
                )}

                {/* Description Lines */}
                {showDescription && (
                    <div className="space-y-2">
                        {Array(lines).fill(0).map((_, i) => (
                            <div
                                key={i}
                                className={`h-4 bg-base-300 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'
                                    }`}
                            ></div>
                        ))}
                    </div>
                )}

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
            {showButton && (
                <div className="h-12 w-full bg-base-300 rounded-lg mt-4"></div>
            )}
        </div>
    );
};

// Grid of loading cards
export const LoadingCardGrid = ({ count = 8, className = '' }) => {
    return (
        <div className={`service-grid ${className}`}>
            {Array(count).fill(0).map((_, index) => (
                <LoadingCard key={index} />
            ))}
        </div>
    );
};

export default LoadingCard;