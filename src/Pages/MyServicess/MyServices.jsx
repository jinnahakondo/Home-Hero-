import { useEffect, useState } from 'react';
import { Edit3, Trash2, Plus, Eye, Calendar, Package, Search, Filter } from 'lucide-react';
import useSecureAxios from '../../Hooks/useSecureAxios';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import LoadingTable from '../../Components/Loading/LoadingTable';
import { ErrorState, EmptyState } from '../../Components/Loading/LoadingStates';

const MyServices = () => {
    const { user } = useAuth();
    const instance = useSecureAxios();
    const [myServices, setMyServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            instance.get(`my-services?email=${user.email}`)
                .then(data => {
                    setMyServices(data.data);
                })
                .catch(error => {
                    console.error('Error fetching services:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [instance, user]);

    const handleDelete = (id, serviceName) => {
        Swal.fire({
            title: "Delete Service?",
            text: `Are you sure you want to delete "${serviceName}"? This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/services/${id}`)
                    .then(() => {
                        setMyServices(myServices.filter(s => s._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your service has been deleted successfully.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    })
                    .catch(error => {
                        console.error('Error deleting service:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete service. Please try again.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    // Get unique categories for filter
    const categories = ['all', ...new Set(myServices.map(service => service.Category))];

    // Filter services based on search and category
    const filteredServices = myServices.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.Description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || service.Category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (!user) {
        return <Loader />;
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-base-300 rounded w-1/4 mx-auto"></div>
                    <div className="h-12 bg-base-300 rounded"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-80 bg-base-300 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                    My Services
                </h1>
                <p className="text-base-content/70 mb-6">
                    Manage and track your service offerings
                </p>
                <Link to="/dashboard/admin/add-services" className="btn btn-primary">
                    <Plus className="w-5 h-5" />
                    Add New Service
                </Link>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="pl-10 pr-8 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content min-w-[150px]"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mt-4 text-sm text-base-content/60">
                    Showing {filteredServices.length} of {myServices.length} services
                </div>
            </div>

            {/* Services Grid */}
            {filteredServices.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-12 h-12 text-base-content/40" />
                    </div>
                    <h3 className="text-xl font-semibold text-base-content mb-2">
                        {myServices.length === 0 ? 'No services yet' : 'No services found'}
                    </h3>
                    <p className="text-base-content/70 mb-6">
                        {myServices.length === 0
                            ? "Start by creating your first service offering."
                            : "Try adjusting your search or filter criteria."}
                    </p>
                    {myServices.length === 0 && (
                        <Link to="/dashboard/add-services" className="btn btn-primary">
                            <Plus className="w-5 h-5" />
                            Create Your First Service
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden lg:block">
                        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-base-200">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-base-content">Service</th>
                                        <th className="text-left p-4 font-semibold text-base-content">Category</th>
                                        <th className="text-left p-4 font-semibold text-base-content">Price</th>
                                        <th className="text-left p-4 font-semibold text-base-content">Created</th>
                                        <th className="text-left p-4 font-semibold text-base-content">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredServices.map((service, index) => (
                                        <tr key={service._id} className="border-t border-base-200 hover:bg-base-50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-base-200">
                                                        <img
                                                            src={service.image}
                                                            alt={service.title}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/64x48/e2e8f0/64748b?text=Service';
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="font-semibold text-base-content line-clamp-1">
                                                            {service.title}
                                                        </h4>
                                                        <p className="text-sm text-base-content/60 line-clamp-1">
                                                            {service.Description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                    {service.Category}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 font-semibold text-primary">
                                                    <span>৳</span>
                                                    {service.Price}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 text-base-content/70">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {service.created_at ? new Date(service.created_at).toLocaleDateString() : 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        to={`/service-details/${service._id}`}
                                                        className="btn btn-sm btn-outline btn-info"
                                                        title="View Service"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        to={`/update-service/${service._id}`}
                                                        className="btn btn-sm btn-outline btn-primary"
                                                        title="Edit Service"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(service._id, service.title)}
                                                        className="btn btn-sm btn-outline btn-error"
                                                        title="Delete Service"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile/Tablet Card View */}
                    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredServices.map((service) => (
                            <div key={service._id} className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden hover:shadow-lg transition-all duration-300">
                                {/* Service Image */}
                                <div className="h-48 bg-base-200 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x200/e2e8f0/64748b?text=Service+Image';
                                        }}
                                    />
                                </div>

                                {/* Service Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-semibold text-base-content line-clamp-2 flex-1">
                                            {service.title}
                                        </h3>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary ml-2 shrink-0">
                                            {service.Category}
                                        </span>
                                    </div>

                                    <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                                        {service.Description}
                                    </p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1 font-semibold text-primary">
                                            <span>৳</span>
                                            {service.Price}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-base-content/60">
                                            <Calendar className="w-4 h-4" />
                                            {service.created_at ? new Date(service.created_at).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/service-details/${service._id}`}
                                            className="btn btn-sm btn-outline btn-info flex-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </Link>
                                        <Link
                                            to={`/update-service/${service._id}`}
                                            className="btn btn-sm btn-outline btn-primary flex-1"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service._id, service.title)}
                                            className="btn btn-sm btn-outline btn-error flex-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Statistics Footer */}
            {myServices.length > 0 && (
                <div className="mt-12 bg-base-200 rounded-xl p-6">
                    <h3 className="font-semibold text-base-content mb-4">Service Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{myServices.length}</div>
                            <div className="text-sm text-base-content/70">Total Services</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-secondary">{categories.length - 1}</div>
                            <div className="text-sm text-base-content/70">Categories</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-accent">
                                ৳{myServices.reduce((sum, service) => sum + (parseFloat(service.Price) || 0), 0).toFixed(2)}
                            </div>
                            <div className="text-sm text-base-content/70">Total Value</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyServices;