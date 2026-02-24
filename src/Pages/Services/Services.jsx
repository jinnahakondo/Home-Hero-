import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Service from "../../Components/Service/Service";
import { LoadingCardGrid } from "../../Components/Loading/LoadingCard";
import { ErrorState, EmptyState } from "../../Components/Loading/LoadingStates";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight } from "lucide-react";

const Services = () => {
    const axios = useAxios();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Handle URL parameters for category filtering
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
            // Show a notification that category filter is applied
            const categoryName = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
            // You could add a toast notification here if desired
        }
    }, [searchParams]);

    // Update URL when category changes
    const updateCategoryInUrl = (category) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (category && category !== "All Categories") {
            newSearchParams.set('category', category);
        } else {
            newSearchParams.delete('category');
        }
        setSearchParams(newSearchParams);
    };

    // Fetch all services using TanStack Query
    const { data: services = [], isLoading, error, refetch } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await axios.get("/services");
            return Array.isArray(res.data) ? res.data : [];
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

            return matchesSearch && matchesCategory;
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
    }, [services, searchTerm, selectedCategory, sortBy]);

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

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); 
        updateCategoryInUrl(category);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setSortBy("newest");
        setCurrentPage(1);
        // Clear URL parameters
        setSearchParams({});
    };

    return (
        <div className="min-h-screen bg-base-100 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: 'Services', href: '/services' },
                        ...(selectedCategory ? [{ label: `${selectedCategory} Services` }] : [])
                    ]}
                />

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-4">
                        Professional Services
                        {selectedCategory && (
                            <span className="block text-2xl text-primary mt-2">
                                {selectedCategory} Services
                            </span>
                        )}
                    </h1>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        {selectedCategory
                            ? `Find trusted ${selectedCategory.toLowerCase()} professionals for your needs`
                            : "Find trusted professionals for all your home and business needs"
                        }
                    </p>
                    {selectedCategory && (
                        <div className="mt-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                <Filter className="w-4 h-4" />
                                Filtered by: {selectedCategory}
                                <button
                                    onClick={() => handleCategoryChange("")}
                                    className="ml-1 hover:bg-primary/20 rounded-full p-1 transition-colors"
                                    title="Clear category filter"
                                >
                                    ×
                                </button>
                            </span>
                        </div>
                    )}
                </div>

                {/* Quick Category Filters */}
                {!selectedCategory && (
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-base-content mb-3">Quick Filters:</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.slice(1).map(category => ( // Skip "All Categories"
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className="px-3 py-1 text-sm bg-base-200 hover:bg-primary hover:text-white rounded-full transition-all duration-200"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Ultra-Simplified Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content text-sm"
                        />
                    </div>

                    {/* Category */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full sm:w-40 border border-base-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                    >
                        {categories.map(category => (
                            <option key={category} value={category === "All Categories" ? "" : category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full sm:w-32 border border-base-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Low Price</option>
                        <option value="price-high">High Price</option>
                        <option value="rating">Top Rated</option>
                        <option value="name">A-Z</option>
                    </select>

                   
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
