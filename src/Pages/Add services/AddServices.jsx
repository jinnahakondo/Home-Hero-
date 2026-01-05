import { useState } from 'react';
import { Upload, DollarSign, Tag, FileText, Image as ImageIcon, Plus, Check } from 'lucide-react';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import useSecureAxios from '../../Hooks/useSecureAxios';
import LoadingButton from '../../Components/Loading/LoadingButton';

const AddServices = () => {
    const { user } = useAuth();
    const instance = useSecureAxios();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        serviceName: '',
        imageUrl: '',
        description: '',
        price: '',
        category: ''
    });
    const [errors, setErrors] = useState({});

    const categories = [
        'Home Cleaning',
        'Plumbing',
        'Electrical',
        'Gardening',
        'Painting',
        'Carpentry',
        'AC Repair',
        'Appliance Repair',
        'Pest Control',
        'Moving Services',
        'Other'
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.serviceName.trim()) {
            newErrors.serviceName = 'Service name is required';
        } else if (formData.serviceName.length < 3) {
            newErrors.serviceName = 'Service name must be at least 3 characters';
        }

        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = 'Image URL is required';
        } else if (!isValidUrl(formData.imageUrl)) {
            newErrors.imageUrl = 'Please enter a valid URL';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsLoading(true);

        const newService = {
            title: formData.serviceName,
            image: formData.imageUrl,
            Description: formData.description,
            Price: parseFloat(formData.price),
            Category: formData.category,
            provider: user.displayName,
            Email: user.email,
            created_at: new Date()
        };

        try {
            const response = await instance.post('/services', newService);

            if (response.data.insertedId) {
                toast.success('Service added successfully!');
                setFormData({
                    serviceName: '',
                    imageUrl: '',
                    description: '',
                    price: '',
                    category: ''
                });
                setErrors({});
            }
        } catch (error) {
            console.error('Error adding service:', error);
            toast.error('Failed to add service. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                    <Plus className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                    Add New Service
                </h1>
                <p className="text-base-content/70">
                    Create a new service listing to offer your expertise
                </p>
            </div>

            {/* Form */}
            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Service Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Service Name
                            </span>
                        </label>
                        <input
                            type="text"
                            name="serviceName"
                            value={formData.serviceName}
                            onChange={handleInputChange}
                            placeholder="Enter service name (e.g., Professional House Cleaning)"
                            className={`form-input ${errors.serviceName ? 'error' : ''}`}
                        />
                        {errors.serviceName && (
                            <div className="error-message">
                                {errors.serviceName}
                            </div>
                        )}
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                Service Image URL
                            </span>
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/service-image.jpg"
                            className={`form-input ${errors.imageUrl ? 'error' : ''}`}
                        />
                        {errors.imageUrl && (
                            <div className="error-message">
                                {errors.imageUrl}
                            </div>
                        )}
                        {formData.imageUrl && isValidUrl(formData.imageUrl) && (
                            <div className="mt-2">
                                <img
                                    src={formData.imageUrl}
                                    alt="Service preview"
                                    className="w-32 h-24 object-cover rounded-lg border border-base-300"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Category */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Category
                            </span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`form-input ${errors.category ? 'error' : ''}`}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <div className="error-message">
                                {errors.category}
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Price (USD)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className={`form-input ${errors.price ? 'error' : ''}`}
                        />
                        {errors.price && (
                            <div className="error-message">
                                {errors.price}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Description
                            </span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="5"
                            placeholder="Describe your service in detail. Include what's included, duration, and any special features..."
                            className={`form-input resize-none ${errors.description ? 'error' : ''}`}
                        />
                        <div className="flex justify-between items-center mt-1">
                            {errors.description ? (
                                <div className="error-message">
                                    {errors.description}
                                </div>
                            ) : (
                                <div className="text-sm text-base-content/60">
                                    {formData.description.length}/500 characters
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Provider Info (Read-only) */}
                    <div className="bg-base-200 rounded-xl p-4">
                        <h3 className="font-semibold text-base-content mb-3">Service Provider Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-base-content/70">Provider Name</label>
                                <div className="font-medium text-base-content">{user?.displayName || 'N/A'}</div>
                            </div>
                            <div>
                                <label className="text-sm text-base-content/70">Email</label>
                                <div className="font-medium text-base-content">{user?.email || 'N/A'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <LoadingButton
                            type="submit"
                            loading={isLoading}
                            loadingText="Adding Service..."
                            className="flex-1 sm:flex-none sm:px-8"
                            variant="primary"
                        >
                            <Check className="w-5 h-5" />
                            Add Service
                        </LoadingButton>
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    serviceName: '',
                                    imageUrl: '',
                                    description: '',
                                    price: '',
                                    category: ''
                                });
                                setErrors({});
                            }}
                            className="btn btn-outline flex-1 sm:flex-none sm:px-8"
                            disabled={isLoading}
                        >
                            Clear Form
                        </button>
                    </div>
                </form>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-base-200 rounded-xl p-6">
                <h3 className="font-semibold text-base-content mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Tips for a Great Service Listing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-base-content/70">
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                            <span>Use a clear, descriptive service name</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                            <span>Include high-quality images that showcase your work</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                            <span>Write detailed descriptions of what's included</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                            <span>Set competitive and fair pricing</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                            <span>Choose the most appropriate category</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                            <span>Mention any certifications or experience</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddServices;