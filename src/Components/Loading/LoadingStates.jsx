import React from 'react';
import LoadingSpinner from './LoadingSpinner';

// Page Loading - Full screen with branding
export const PageLoading = ({ message = 'Loading...' }) => {
    return (
        <div className="fixed inset-0 bg-base-100 z-50 flex items-center justify-center">
            <div className="text-center">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-primary mb-2">Home Hero</h1>
                    <div className="w-16 h-1 bg-primary rounded-full mx-auto"></div>
                </div>
                <LoadingSpinner size="lg" color="primary" text={message} />
            </div>
        </div>
    );
};

// Section Loading - For specific sections
export const SectionLoading = ({
    message = 'Loading...',
    height = 'h-64',
    className = ''
}) => {
    return (
        <div className={`${height} flex items-center justify-center ${className}`}>
            <LoadingSpinner size="md" color="primary" text={message} />
        </div>
    );
};

// Inline Loading - Small loading for buttons/actions
export const InlineLoading = ({
    message = '',
    size = 'sm',
    className = ''
}) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <LoadingSpinner size={size} color="primary" />
            {message && <span className="text-sm text-base-content/70">{message}</span>}
        </div>
    );
};

// Content Loading - For replacing content while loading
export const ContentLoading = ({
    lines = 3,
    showAvatar = false,
    className = ''
}) => {
    return (
        <div className={`animate-pulse ${className}`}>
            <div className="flex items-start gap-4">
                {showAvatar && (
                    <div className="w-12 h-12 bg-base-300 rounded-full shrink-0"></div>
                )}
                <div className="flex-1 space-y-3">
                    {Array(lines).fill(0).map((_, i) => (
                        <div
                            key={i}
                            className={`h-4 bg-base-300 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'
                                }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Error State with Retry
export const ErrorState = ({
    message = 'Something went wrong',
    onRetry,
    className = ''
}) => {
    return (
        <div className={`text-center py-12 ${className}`}>
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-base-content mb-2">Oops!</h3>
            <p className="text-base-content/70 mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="btn btn-primary btn-sm"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

// Empty State
export const EmptyState = ({
    title = 'No data found',
    description = 'There are no items to display.',
    action,
    icon,
    className = ''
}) => {
    return (
        <div className={`text-center py-12 ${className}`}>
            <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                {icon || (
                    <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
                    </svg>
                )}
            </div>
            <h3 className="text-lg font-semibold text-base-content mb-2">{title}</h3>
            <p className="text-base-content/70 mb-4">{description}</p>
            {action}
        </div>
    );
};

export default {
    PageLoading,
    SectionLoading,
    InlineLoading,
    ContentLoading,
    ErrorState,
    EmptyState
};