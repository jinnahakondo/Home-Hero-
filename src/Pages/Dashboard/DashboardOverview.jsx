import React, { useState, useEffect } from 'react';
import {
    Users,
    Calendar,
    DollarSign,
    Star,
    TrendingUp,
    TrendingDown,
    Eye,
    Clock,
    CheckCircle,
    XCircle
} from 'lucide-react';
import useRole from '../../Hooks/UseRole';
import useAuth from '../../Hooks/useAuth';
import { DashboardCardSkeleton, TableRowSkeleton } from '../../Components/Skeleton/HomeServiceSkeleton';

const DashboardOverview = () => {
    const { role } = useRole();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);

    // Simulate data loading
    useEffect(() => {
        const loadDashboardData = () => {
            setTimeout(() => {
                setDashboardData({
                    stats: role === 'admin' ? {
                        totalServices: 156,
                        totalBookings: 1247,
                        totalRevenue: 45680,
                        averageRating: 4.8,
                        activeProviders: 89,
                        completedServices: 1156
                    } : {
                        totalBookings: 12,
                        completedServices: 8,
                        pendingServices: 2,
                        totalSpent: 1250,
                        favoriteServices: 5,
                        averageRating: 4.9
                    },
                    recentActivity: role === 'admin' ? [
                        { id: 1, type: 'booking', user: 'John Doe', service: 'Plumbing Repair', status: 'completed', date: '2024-01-04', amount: '৳120' },
                        { id: 2, type: 'service', user: 'Jane Smith', service: 'House Cleaning', status: 'pending', date: '2024-01-04', amount: '৳80' },
                        { id: 3, type: 'booking', user: 'Mike Johnson', service: 'Electrical Work', status: 'in-progress', date: '2024-01-03', amount: '৳200' },
                        { id: 4, type: 'service', user: 'Sarah Wilson', service: 'Garden Maintenance', status: 'completed', date: '2024-01-03', amount: '৳150' },
                        { id: 5, type: 'booking', user: 'Tom Brown', service: 'AC Repair', status: 'cancelled', date: '2024-01-02', amount: '৳90' }
                    ] : [
                        { id: 1, service: 'Plumbing Repair', provider: 'John\'s Plumbing', status: 'completed', date: '2024-01-04', amount: '৳120' },
                        { id: 2, service: 'House Cleaning', provider: 'CleanPro Services', status: 'completed', date: '2024-01-02', amount: '৳80' },
                        { id: 3, service: 'Electrical Work', provider: 'ElectroFix', status: 'pending', date: '2024-01-06', amount: '৳200' },
                        { id: 4, service: 'Garden Maintenance', provider: 'GreenThumb', status: 'in-progress', date: '2024-01-05', amount: '৳150' }
                    ],
                    chartData: {
                        monthly: [
                            { month: 'Jul', value: role === 'admin' ? 3200 : 180 },
                            { month: 'Aug', value: role === 'admin' ? 3800 : 220 },
                            { month: 'Sep', value: role === 'admin' ? 4200 : 190 },
                            { month: 'Oct', value: role === 'admin' ? 3900 : 250 },
                            { month: 'Nov', value: role === 'admin' ? 4500 : 280 },
                            { month: 'Dec', value: role === 'admin' ? 5200 : 320 }
                        ]
                    }
                });
                setLoading(false);
            }, 1500);
        };

        loadDashboardData();
    }, [role]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-success';
            case 'pending': return 'text-warning';
            case 'in-progress': return 'text-info';
            case 'cancelled': return 'text-error';
            default: return 'text-base-content';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'in-progress': return <Eye className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    if (loading) {
        return (
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6).fill(0).map((_, index) => (
                        <DashboardCardSkeleton key={index} />
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-base-100 border border-base-300 rounded-xl p-6">
                        <div className="h-6 w-32 bg-base-300 rounded mb-4 animate-pulse"></div>
                        <div className="h-64 bg-base-300 rounded animate-pulse"></div>
                    </div>
                    <div className="bg-base-100 border border-base-300 rounded-xl p-6">
                        <div className="h-6 w-32 bg-base-300 rounded mb-4 animate-pulse"></div>
                        <div className="space-y-3">
                            {Array(5).fill(0).map((_, index) => (
                                <div key={index} className="h-12 bg-base-300 rounded animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const adminStats = [
        {
            title: 'Total Services',
            value: dashboardData?.stats?.totalServices || 0,
            icon: <Users className="w-6 h-6" />,
            change: '+12%',
            trend: 'up',
            color: 'text-blue-600 bg-blue-100'
        },
        {
            title: 'Total Bookings',
            value: dashboardData?.stats?.totalBookings || 0,
            icon: <Calendar className="w-6 h-6" />,
            change: '+8%',
            trend: 'up',
            color: 'text-green-600 bg-green-100'
        },
        {
            title: 'Total Revenue',
            value: `৳${(dashboardData?.stats?.totalRevenue || 0).toLocaleString()}`,
            icon: <DollarSign className="w-6 h-6" />,
            change: '+15%',
            trend: 'up',
            color: 'text-purple-600 bg-purple-100'
        },
        {
            title: 'Average Rating',
            value: dashboardData?.stats?.averageRating || 0,
            icon: <Star className="w-6 h-6" />,
            change: '+0.2',
            trend: 'up',
            color: 'text-yellow-600 bg-yellow-100'
        },
        {
            title: 'Active Providers',
            value: dashboardData?.stats?.activeProviders || 0,
            icon: <Users className="w-6 h-6" />,
            change: '+5%',
            trend: 'up',
            color: 'text-indigo-600 bg-indigo-100'
        },
        {
            title: 'Completed Services',
            value: dashboardData?.stats?.completedServices || 0,
            icon: <CheckCircle className="w-6 h-6" />,
            change: '+18%',
            trend: 'up',
            color: 'text-emerald-600 bg-emerald-100'
        }
    ];

    const userStats = [
        {
            title: 'Total Bookings',
            value: dashboardData?.stats?.totalBookings || 0,
            icon: <Calendar className="w-6 h-6" />,
            change: '+3',
            trend: 'up',
            color: 'text-blue-600 bg-blue-100'
        },
        {
            title: 'Completed Services',
            value: dashboardData?.stats?.completedServices || 0,
            icon: <CheckCircle className="w-6 h-6" />,
            change: '+2',
            trend: 'up',
            color: 'text-green-600 bg-green-100'
        },
        {
            title: 'Pending Services',
            value: dashboardData?.stats?.pendingServices || 0,
            icon: <Clock className="w-6 h-6" />,
            change: '-1',
            trend: 'down',
            color: 'text-yellow-600 bg-yellow-100'
        },
        {
            title: 'Total Spent',
            value: `৳${dashboardData?.stats?.totalSpent || 0}`,
            icon: <DollarSign className="w-6 h-6" />,
            change: '+৳200',
            trend: 'up',
            color: 'text-purple-600 bg-purple-100'
        },
        {
            title: 'Favorite Services',
            value: dashboardData?.stats?.favoriteServices || 0,
            icon: <Star className="w-6 h-6" />,
            change: '+1',
            trend: 'up',
            color: 'text-pink-600 bg-pink-100'
        },
        {
            title: 'Average Rating Given',
            value: dashboardData?.stats?.averageRating || 0,
            icon: <Star className="w-6 h-6" />,
            change: '+0.1',
            trend: 'up',
            color: 'text-orange-600 bg-orange-100'
        }
    ];

    const statsToShow = role === 'admin' ? adminStats : userStats;

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
                <h1 className="text-2xl font-bold text-base-content mb-2">
                    Welcome back, {user?.displayName}!
                </h1>
                <p className="text-base-content/70">
                    {role === 'admin'
                        ? 'Here\'s an overview of your platform performance and recent activity.'
                        : 'Here\'s a summary of your bookings and service history.'
                    }
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statsToShow.map((stat, index) => (
                    <div key={index} className="bg-base-100 border border-base-300 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>
                                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-base-content mb-1">
                            {stat.value}
                        </div>
                        <div className="text-sm text-base-content/60">
                            {stat.title}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts and Tables */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Simple Bar Chart */}
                <div className="bg-base-100 border border-base-300 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-base-content mb-6">
                        {role === 'admin' ? 'Monthly Revenue' : 'Monthly Spending'}
                    </h3>
                    <div className="space-y-4">
                        {(dashboardData?.chartData?.monthly || []).map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-8 text-sm text-base-content/70 font-medium">
                                    {item.month}
                                </div>
                                <div className="flex-1 bg-base-200 rounded-full h-6 relative overflow-hidden">
                                    <div
                                        className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${(item.value / Math.max(...(dashboardData?.chartData?.monthly || []).map(d => d.value))) * 100}%`
                                        }}
                                    ></div>
                                </div>
                                <div className="w-16 text-sm font-semibold text-base-content text-right">
                                    ৳{item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="bg-base-100 border border-base-300 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-base-content mb-6">
                        Recent Activity
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-base-200">
                                    <th className="text-left py-3 text-sm font-semibold text-base-content/70">
                                        {role === 'admin' ? 'User' : 'Service'}
                                    </th>
                                    <th className="text-left py-3 text-sm font-semibold text-base-content/70">
                                        {role === 'admin' ? 'Service' : 'Provider'}
                                    </th>
                                    <th className="text-left py-3 text-sm font-semibold text-base-content/70">Status</th>
                                    <th className="text-right py-3 text-sm font-semibold text-base-content/70">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(dashboardData?.recentActivity || []).map((activity) => (
                                    <tr key={activity.id} className="border-b border-base-200 hover:bg-base-50">
                                        <td className="py-3 text-sm text-base-content">
                                            {role === 'admin' ? activity.user : activity.service}
                                        </td>
                                        <td className="py-3 text-sm text-base-content/70">
                                            {role === 'admin' ? activity.service : activity.provider}
                                        </td>
                                        <td className="py-3">
                                            <div className={`flex items-center gap-2 text-sm ${getStatusColor(activity.status)}`}>
                                                {getStatusIcon(activity.status)}
                                                <span className="capitalize">{activity.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-sm font-semibold text-base-content text-right">
                                            {activity.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;