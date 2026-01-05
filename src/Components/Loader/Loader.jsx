import React from 'react';

const Loader = ({
    size = 'xl',
    message = 'Loading...',
    fullScreen = true,
    className = ''
}) => {
    const sizeClasses = {
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg',
        xl: 'loading-xl'
    };

    const containerClass = fullScreen
        ? 'fixed inset-0 bg-base-100/90 backdrop-blur-sm z-50 flex items-center justify-center'
        : 'grid place-items-center min-h-screen';

    return (
        <div className={`${containerClass} ${className}`}>
            <div className="text-center">
                <div className="mb-4">
                    <span className={`loading loading-ring ${sizeClasses[size]} text-primary`}></span>
                </div>
                {message && (
                    <p className="text-base-content/70 font-medium animate-pulse">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Loader;