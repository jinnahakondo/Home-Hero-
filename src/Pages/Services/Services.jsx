import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Service from "../../Components/Service/Service";
import { LoadingCardGrid } from "../../Components/Loading/LoadingCard";
import { ErrorState, EmptyState } from "../../Components/Loading/LoadingStates";
import { Search, Filter, SlidersHorizontal, Grid, List, ChevronLeft, ChevronRight } from "lucide-react";

const Services = () => {
    const axios = useAxios();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 12;

    // Mock data fallback
    const mockServices = [
        {
            _id: "1",
            serviceName: "Professional House Cleaning",
            price: 120,
            category: "Cleaning",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
            description: "Complete house cleaning service including all rooms, kitchen, and bathrooms.",
            rating: 4.8
        },
        {
            _id: "2",
            serviceName: "Plumbing Repair Service",
            price: 85,
            category: "Plumbing",
            image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
            description: "Expert plumbing repairs for leaks, clogs, and installations.",
            rating: 4.6
        },
        {
            _id: "3",
            serviceName: "Electrical Installation",
            price: 150,
            category: "Electrical",
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
            description: "Safe and professional electrical work for your home or office.",
            rating: 4.9
        },
        {
            _id: "4",
            serviceName: "Garden Maintenance",
            price: 95,
            category: "Gardening",
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
            description: "Complete garden care including pruning, weeding, and lawn maintenance.",
            rating: 4.7
        },
        {
            _id: "5",
            serviceName: "Interior Painting",
            price: 200,
            category: "Painting",
            image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400",
            description: "Professional interior painting with premium quality paints.",
            rating: 4.5
        },
        {
            _id: "6",
            serviceName: "Carpet Cleaning",
            price: 75,
            category: "Cleaning",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
            description: "Deep carpet cleaning using advanced equipment and eco-friendly products.",
            rating: 4.4
        }
    ];

    // Fetch all services using TanStack Query
    const { data: services = [], isLoading, error, refetch } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            try {
                const res = await axios.get("/services");
                return Array.isArray(res.data) ? res.data : [];
            } catch (error) {
                console.warn("API not available, using mock data");
                return mockServices;
            }
        },
        keepPreviousData: true,
        retry: 2,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });



    const categories = [
        "All Categories",
        "Plumbing",
        "Electrical",
        "Cleaning",
        "Gardening",
        "Painting",
        "Carpentry",
        "HVAC",
        "Roofing"
    ];

    // Filter and sort services
    const filteredAndSortedServices = useMemo(() => {
        // Safety check for services array
        if (!Array.isArray(services)) {
            return [];
        }

        let filtered = services.filter(service => {
            // Safety check for service object
            if (!service) return false;

            const matchesSearch = (service.serviceName || service.title || "")?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (service.description || service.serviceDescription || "")?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = !selectedCategory || selectedCategory === "All Categories" ||
                (service.category || service.Category || "")?.toLowerCase() === selectedCategory.toLowerCase();

            const servicePrice = service.price || service.Price || 0;
            const matchesMinPrice = !minPrice || servicePrice >= parseFloat(minPrice);
            const matchesMaxPrice = !maxPrice || servicePrice <= parseFloat(maxPrice);

            return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
        });

        // Sort services
        filtered.sort((a, b) => {
            // Safety checks for service objects
            if (!a || !b) return 0;

            switch (sortBy) {
                case "price-low":
                    return (a.price || a.Price || 0) - (b.price || b.Price || 0);
                case "price-high":
                    return (b.price || b.Price || 0) - (a.price || a.Price || 0);
                case "rating":
                    return (b.rating || b.ratings || 0) - (a.rating || a.ratings || 0);
                case "name":
                    return (a.serviceName || a.title || a.name || "")?.localeCompare(b.serviceName || b.title || b.name || "");
                case "newest":
                default:
                    return new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0);
            }
        });

        return filtered;
    }, [services, searchTerm, selectedCategory, minPrice, maxPrice, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedServices.length / itemsPerPage);
    const paginatedServices = filteredAndSortedServices.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setMinPrice("");
        setMaxPrice("");
        setSortBy("newest");
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-base-100 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-4">
                        Professional Services
                    </h1>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Find trusted professionals for all your home and business needs
                    </p>
                    {error && (
                        <div className="alert alert-info mt-4 max-w-md mx-auto">
                            <span className="text-sm">Showing demo services (API not connected)</span>
                        </div>
                    )}
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-base-100 border border-base-300 rounded-xl p-6 mb-8 shadow-sm">
                    {/* Search Bar */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn btn-outline gap-2 lg:hidden"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                    </div>

                    {/* Filters */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-2">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full border border-base-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category === "All Categories" ? "" : category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-base-content mb-2">Min Price</label>
                            <input
                                type="number"
                                placeholder="৳0"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full border border-base-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-base-content mb-2">Max Price</label>
                            <input
                                type="number"
                                placeholder="৳1000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full border border-base-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-base-content mb-2">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full border border-base-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="name">Name A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Filter Actions */}
                    <div className={`flex justify-between items-center mt-4 pt-4 border-t border-base-200 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                        <div className="text-sm text-base-content/70">
                            Showing {paginatedServices.length} of {filteredAndSortedServices.length} services
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={clearFilters}
                                className="btn btn-ghost btn-sm"
                            >
                                Clear Filters
                            </button>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`btn btn-sm ${viewMode === "grid" ? "btn-primary" : "btn-ghost"}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`btn btn-sm ${viewMode === "list" ? "btn-primary" : "btn-ghost"}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid/List */}
                {isLoading ? (
                    <LoadingCardGrid count={12} />
                ) : error ? (
                    <ErrorState
                        message="Failed to load services. Please check your connection and try again."
                        onRetry={refetch}
                    />
                ) : filteredAndSortedServices.length === 0 ? (
                    <EmptyState
                        title="No services found"
                        description="Try adjusting your search criteria or filters to find what you're looking for."
                        action={
                            <button onClick={clearFilters} className="btn btn-primary">
                                Clear All Filters
                            </button>
                        }
                        icon={
                            <div className="text-6xl">🔍</div>
                        }
                    />
                ) : (
                    <>
                        <div className={viewMode === "grid" ? "service-grid" : "space-y-4"}>
                            {paginatedServices.map((service) => (
                                service && service._id ? (
                                    <Service key={service._id} service={service} viewMode={viewMode} />
                                ) : null
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="btn btn-ghost btn-sm"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>

                                <div className="flex gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`btn btn-sm ${currentPage === pageNum ? "btn-primary" : "btn-ghost"
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="btn btn-ghost btn-sm"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Services;
