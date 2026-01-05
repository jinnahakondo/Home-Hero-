import React from 'react';

const LoadingButton = ({
    children,
    loading = false,
    disabled = false,
    loadingText = 'Loading...',
    className = '',
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const isDisabled = loading || disabled;

    const baseClasses = 'btn transition-all duration-200';
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        ghost: 'btn-ghost',
        outline: 'btn-outline',
        error: 'btn-error',
        success: 'btn-success',
        warning: 'btn-warning',
        info: 'btn-info'
    };

    const sizeClasses = {
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg'
    };

    const buttonClasses = `
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}
        ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''}
    `.trim();

    return (
        <button
            className={buttonClasses}
            disabled={isDisabled}
            {...props}
        >
            {loading && (
                <span className="loading loading-spinner loading-sm mr-2"></span>
            )}
            {loading ? loadingText : children}
        </button>
    );
};

export default LoadingButton;