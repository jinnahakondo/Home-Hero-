import React from 'react';

const LoadingSpinner = ({
    size = 'md',
    color = 'primary',
    text = '',
    className = '',
    fullScreen = false
}) => {
    const sizeClasses = {
        xs: 'loading-xs',
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg',
        xl: 'loading-xl'
    };

    const colorClasses = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        neutral: 'text-neutral',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error'
    };

    const containerClass = fullScreen
        ? 'fixed inset-0 bg-base-100/80 backdrop-blur-sm z-50 flex items-center justify-center'
        : 'flex items-center justify-center';

    return (
        <div className={`${containerClass} ${className}`}>
            <div className="flex flex-col items-center gap-3">
                <span
                    className={`loading loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`}
                ></span>
                {text && (
                    <p className={`text-sm font-medium ${colorClasses[color]} animate-pulse`}>
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoadingSpinner;