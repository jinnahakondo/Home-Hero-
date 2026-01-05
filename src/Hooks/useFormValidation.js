import { useState, useCallback } from 'react';

const useFormValidation = (initialValues, validationRules) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation functions
    const validators = {
        required: (value) => {
            if (!value || (typeof value === 'string' && !value.trim())) {
                return 'This field is required';
            }
            return null;
        },

        email: (value) => {
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return 'Please enter a valid email address';
            }
            return null;
        },

        minLength: (min) => (value) => {
            if (value && value.length < min) {
                return `Must be at least ${min} characters long`;
            }
            return null;
        },

        maxLength: (max) => (value) => {
            if (value && value.length > max) {
                return `Must be no more than ${max} characters long`;
            }
            return null;
        },

        pattern: (regex, message) => (value) => {
            if (value && !regex.test(value)) {
                return message || 'Invalid format';
            }
            return null;
        },

        match: (fieldName) => (value) => {
            if (value && value !== values[fieldName]) {
                return 'Fields do not match';
            }
            return null;
        },

        min: (min) => (value) => {
            if (value && parseFloat(value) < min) {
                return `Must be at least ${min}`;
            }
            return null;
        },

        max: (max) => (value) => {
            if (value && parseFloat(value) > max) {
                return `Must be no more than ${max}`;
            }
            return null;
        },

        phone: (value) => {
            if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
                return 'Please enter a valid phone number';
            }
            return null;
        },

        url: (value) => {
            if (value && !/^https?:\/\/.+\..+/.test(value)) {
                return 'Please enter a valid URL';
            }
            return null;
        }
    };

    // Validate a single field
    const validateField = useCallback((name, value) => {
        const rules = validationRules[name];
        if (!rules) return null;

        for (const rule of rules) {
            let validator;
            let params = [];

            if (typeof rule === 'string') {
                validator = validators[rule];
            } else if (typeof rule === 'object') {
                const [ruleName, ...ruleParams] = Object.keys(rule).length === 1
                    ? [Object.keys(rule)[0], Object.values(rule)[0]]
                    : [rule.type, ...Object.values(rule).slice(1)];
                validator = validators[ruleName];
                params = Array.isArray(ruleParams) ? ruleParams : [ruleParams];
            } else if (typeof rule === 'function') {
                validator = rule;
            }

            if (validator) {
                const error = params.length > 0
                    ? validator(...params)(value)
                    : validator(value);

                if (error) {
                    return error;
                }
            }
        }
        return null;
    }, [validationRules, values]);

    // Validate all fields
    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationRules).forEach(fieldName => {
            const error = validateField(fieldName, values[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [values, validateField, validationRules]);

    // Handle input change
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setValues(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }

        // Validate field on change if it was touched
        if (touched[name]) {
            const error = validateField(name, newValue);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    }, [errors, touched, validateField]);

    // Handle input blur
    const handleBlur = useCallback((e) => {
        const { name, value } = e.target;

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }, [validateField]);

    // Handle form submission
    const handleSubmit = useCallback((onSubmit) => {
        return async (e) => {
            e.preventDefault();
            setIsSubmitting(true);

            // Mark all fields as touched
            const allTouched = Object.keys(validationRules).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {});
            setTouched(allTouched);

            const isValid = validateForm();

            if (isValid) {
                try {
                    await onSubmit(values);
                } catch (error) {
                    console.error('Form submission error:', error);
                }
            }

            setIsSubmitting(false);
        };
    }, [values, validateForm, validationRules]);

    // Reset form
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    // Set field value programmatically
    const setFieldValue = useCallback((name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // Set field error programmatically
    const setFieldError = useCallback((name, error) => {
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }, []);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        validateForm,
        resetForm,
        setFieldValue,
        setFieldError,
        isValid: Object.keys(errors).length === 0 && Object.keys(touched).length > 0
    };
};

export default useFormValidation;