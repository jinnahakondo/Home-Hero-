import { useEffect, useState } from 'react';
import { Calendar, Star, X, Eye, Clock, CheckCircle } from 'lucide-react';
import useAuth from '../../Hooks/useAuth';
import useSecureAxios from '../../Hooks/useSecureAxios';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import LoadingTable from '../../Components/Loading/LoadingTable';
import { SectionLoading, ErrorState, EmptyState } from '../../Components/Loading/LoadingStates';

const MyBookings = () => {
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    const { user } = useAuth();
    const instance = useSecureAxios();

    const fetchBookings = async () => {
        if (!user?.email) return;

        try {
            setLoading(true);
            setError(null);
            const response = await instance.get(`/my-bookings?email=${user.email}`);
            setMyBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError('Failed to load bookings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Cancel Booking?",
            text: "Are you sure you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Cancel",
            cancelButtonText: "Keep Booking"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/booking/${id}`)
                    .then(() => {
                        setMyBookings(myBookings.filter(s => s._id !== id));
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your booking has been cancelled successfully.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    })
                    .catch(error => {
                        console.error('Error cancelling booking:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to cancel booking. Please try again.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const getStatusBadge = (status = 'pending') => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pending' },
            confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Confirmed' },
            completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, text: 'Completed' },
            cancelled: { color: 'bg-red-100 text-red-800', icon: X, text: 'Cancelled' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const IconComponent = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                <IconComponent className="w-3 h-3" />
                {config.text}
            </span>
        );
    };

    const filteredBookings = myBookings.filter(booking => {
        if (filter === 'all') return true;
        return (booking.status || 'pending') === filter;
    });

    if (!user) {
        return <Loader />;
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                        My Bookings
                    </h1>
                    <p className="text-base-content/70">
                        Manage and track your service bookings
                    </p>
                </div>

                {/* Filter Tabs Skeleton */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="h-10 w-20 bg-base-300 rounded-lg animate-pulse"></div>
                    ))}
                </div>

                {/* Desktop Table Loading */}
                <div className="hidden lg:block">
                    <LoadingTable
                        columns={5}
                        rows={5}
                        headers={['Service', 'Price', 'Date', 'Status', 'Actions']}
                    />
                </div>

                {/* Mobile Cards Loading */}
                <div className="lg:hidden space-y-4">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-base-100 rounded-xl border border-base-300 p-4 animate-pulse">
                            <div className="flex gap-3 mb-4">
                                <div className="w-16 h-12 bg-base-300 rounded-lg"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-base-300 rounded w-3/4"></div>
                                    <div className="h-3 bg-base-300 rounded w-1/2"></div>
                                </div>
                                <div className="h-6 w-16 bg-base-300 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="h-4 bg-base-300 rounded"></div>
                                <div className="h-4 bg-base-300 rounded"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-8 bg-base-300 rounded flex-1"></div>
                                <div className="h-8 bg-base-300 rounded flex-1"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                        My Bookings
                    </h1>
                </div>
                <ErrorState
                    message={error}
                    onRetry={fetchBookings}
                />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                    My Bookings
                </h1>
                <p className="text-base-content/70">
                    Manage and track your service bookings
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${filter === status
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-base-200 text-base-content hover:bg-base-300'
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        {status === 'all' && (
                            <span className="ml-2 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                                {myBookings.length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
                <EmptyState
                    title="No bookings found"
                    description={
                        filter === 'all'
                            ? "You haven't made any bookings yet."
                            : `No ${filter} bookings found.`
                    }
                    action={
                        <Link to="/services" className="btn btn-primary">
                            Browse Services
                        </Link>
                    }
                    icon={
                        <Calendar className="w-8 h-8 text-base-content/40" />
                    }
                />
            ) : (
                <div className="space-y-4">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block">
                        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-base-200">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-base-content">Service</th>
                                        <th className="text-left p-4 font-semibold text-base-content">Price</th>
                                        <th className="text-left p-4 font-semibold text-base-content">Date</th>
                                        <th className="text-left p-4 font-semibold text-base-content">Status</th>
                                        <th className="text-left p-4 font-semibold text-base-content">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking, index) => (
                                        <tr key={booking._id} className="border-t border-base-200 hover:bg-base-50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-base-200">
                                                        <img
                                                            src={booking.serviceImage}
                                                            alt={booking.serviceName}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/64x48/e2e8f0/64748b?text=Service';
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-base-content line-clamp-1">
                                                            {booking.serviceName}
                                                        </h4>
                                                        <p className="text-sm text-base-content/60">
                                                            Booking #{index + 1}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 font-semibold text-primary">
                                                    <span>৳</span>
                                                    {booking.Price}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 text-base-content/70">
                                                    <Calendar className="w-4 h-4" />
                                                    {booking.bookingDate}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {getStatusBadge(booking.status)}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        to={`/service-details/${booking.serveicId}`}
                                                        className="btn btn-sm btn-outline btn-primary"
                                                        title="View Details & Rate"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span className="hidden sm:inline">View</span>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(booking._id)}
                                                        className="btn btn-sm btn-outline btn-error"
                                                        title="Cancel Booking"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        <span className="hidden sm:inline">Cancel</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                        {filteredBookings.map((booking, index) => (
                            <div key={booking._id} className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-base-200 shrink-0">
                                        <img
                                            src={booking.serviceImage}
                                            alt={booking.serviceName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/64x48/e2e8f0/64748b?text=Service';
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-base-content line-clamp-2 mb-1">
                                            {booking.serviceName}
                                        </h4>
                                        <p className="text-sm text-base-content/60">
                                            Booking #{index + 1}
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        {getStatusBadge(booking.status)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary">৳</span>
                                        <span className="font-semibold text-primary">{booking.Price}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-base-content/70" />
                                        <span className="text-sm text-base-content/70">{booking.bookingDate}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        to={`/service-details/${booking.serveicId}`}
                                        className="btn btn-sm btn-outline btn-primary flex-1"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View & Rate
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        className="btn btn-sm btn-outline btn-error flex-1"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;