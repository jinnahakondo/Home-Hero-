import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const FormInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    validation,
    error,
    success,
    disabled = false,
    className = '',
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleBlur = () => {
        setTouched(true);
    };

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const hasError = touched && error;
    const hasSuccess = touched && success && !error;

    return (
        <div className={`form-control ${className}`}>
            {label && (
                <label className="label">
                    <span className="label-text font-medium">
                        {label}
                        {required && <span className="text-error ml-1">*</span>}
                    </span>
                </label>
            )}

            <div className="relative">
                <input
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`form-input ${hasError ? 'error' : hasSuccess ? 'success' : ''
                        } ${isPassword ? 'pr-12' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    {...props}
                />

                {/* Password toggle */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                        disabled={disabled}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}

                {/* Status icon */}
                {(hasError || hasSuccess) && (
                    <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isPassword ? 'right-12' : 'right-3'}`}>
                        {hasError ? (
                            <AlertCircle className="w-5 h-5 text-error" />
                        ) : (
                            <CheckCircle className="w-5 h-5 text-success" />
                        )}
                    </div>
                )}
            </div>

            {/* Error message */}
            {hasError && (
                <div className="error-message">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Success message */}
            {hasSuccess && (
                <div className="success-message">
                    <CheckCircle className="w-4 h-4" />
                    {success}
                </div>
            )}
        </div>
    );
};

export default FormInput;