import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Service from "../../Components/Service/Service";
import ServiceSkeleton from "../../Components/Skeleton/HomeServiceSkeleton";

const Services = () => {
    const axios = useAxios();
    const [filter, setFilter] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Fetch all services using TanStack Query
    const { data: services = [], isLoading, refetch } = useQuery({
        queryKey: ["services", minPrice, maxPrice],
        queryFn: async () => {
            let url = "/services";
            if (filter === "by min price" && minPrice) url = `/filter-services?min=${minPrice}`;
            else if (filter === "by max price" && maxPrice) url = `/filter-services?max=${maxPrice}`;
            else if (filter === "by min-max price" && minPrice && maxPrice)
                url = `/filter-services?min=${minPrice}&max=${maxPrice}`;

            const res = await axios.get(url);
            return res.data;
        },
        keepPreviousData: true,
    });

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <div className="max-w-7xl mx-auto px-5 mt-40">
            <h2 className="text-3xl font-bold text-center mb-8">All Services</h2>

            {/* Filter Section */}
            <div className="bg-white rounded-xl p-6 mb-10 max-w-3xl mx-auto">
                <form
                    onSubmit={handleFilterSubmit}
                    className="flex flex-col md:flex-row md:items-end md:gap-4 gap-4"
                >
                    {/* Filter Type */}
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Filter Type</label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                            required
                        >
                            <option value="" disabled>
                                Select filter
                            </option>
                            <option value="by min price">By Minimum Price</option>
                            <option value="by max price">By Maximum Price</option>
                            <option value="by min-max price">By Min-Max Price</option>
                        </select>
                    </div>

                    {/* Min Price */}
                    {(filter === "by min price" || filter === "by min-max price") && (
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">Min Price</label>
                            <input
                                type="number"
                                placeholder="Enter minimum price"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                required
                            />
                        </div>
                    )}

                    {/* Max Price */}
                    {(filter === "by max price" || filter === "by min-max price") && (
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">Max Price</label>
                            <input
                                type="number"
                                placeholder="Enter maximum price"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary  text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
                    >
                        Apply Filter
                    </button>
                </form>
            </div>

            {/* Services Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[...Array(10)].map((_, i) => (
                        <ServiceSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {services.length ? (
                        services.map((service) => <Service key={service._id} service={service} />)
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            No services found for this filter.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Services;
