import React from "react";
import { Link } from "react-router";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Service = ({ service, viewMode = "grid" }) => {
    // Safety check for service object
    if (!service) {
        return null;
    }

    const rating = service.ratings || service.rating || 0;

    const renderStars = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-orange-400" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-orange-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300" />);
            }
        }

        return stars;
    };

    // Handle different property names from API with safety checks
    const serviceName = service.serviceName || service.title || service.name || "Unnamed Service";
    const servicePrice = service.price || service.Price || 0;
    const serviceCategory = service.category || service.Category || "General";
    const serviceImage = service.image || service.serviceImage || "https://via.placeholder.com/400x300?text=Service+Image";
    const serviceDescription = service.description || service.serviceDescription || "";

    if (viewMode === "list") {
        return (
            <div className="bg-base-100 border border-base-300 rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex gap-6">
                {/* Image */}
                <div className="w-32 h-32 shrink-0">
                    <img
                        src={serviceImage}
                        alt={serviceName}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                    <div>
                        <p className="text-sm text-primary font-medium">
                            {serviceCategory || "Service"}
                        </p>
                        <h3 className="text-xl font-semibold text-base-content">
                            {serviceName}
                        </h3>
                    </div>

                    {serviceDescription && (
                        <p className="text-base-content/70 text-sm line-clamp-2">
                            {serviceDescription}
                        </p>
                    )}

                    {/* Ratings */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {renderStars()}
                        </div>
                        <span className="text-sm text-base-content/60">
                            ({(rating || 0).toFixed(1)})
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Price */}
                        <div className="flex items-center gap-3">
                            {service.oldPrice && (
                                <p className="text-base-content/50 line-through text-sm">
                                    ৳{service.oldPrice}
                                </p>
                            )}
                            <p className="text-primary font-bold text-xl">
                                ৳{servicePrice}
                            </p>
                        </div>

                        {/* Action */}
                        <Link
                            to={`/service-details/${service._id}`}
                            className="btn btn-primary btn-sm"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Grid view (default)
    return (
        <div className="service-card p-6 flex flex-col">
            {/* Image */}
            <figure className="flex justify-center items-center h-48 mb-4 bg-base-200 rounded-lg overflow-hidden">
                <img
                    src={serviceImage}
                    alt={serviceName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </figure>

            {/* Content */}
            <div className="space-y-3 grow">
                <div>
                    <p className="text-sm text-primary font-medium">
                        {serviceCategory || "Service"}
                    </p>
                    <h3 className="text-lg font-semibold text-base-content line-clamp-2">
                        {serviceName}
                    </h3>
                </div>

                {serviceDescription && (
                    <p className="text-base-content/70 text-sm line-clamp-3">
                        {serviceDescription}
                    </p>
                )}

                {/* Ratings */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        {renderStars()}
                    </div>
                    <span className="text-sm text-base-content/60">
                        ({(rating || 0).toFixed(1)})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                    {service.oldPrice && (
                        <p className="text-base-content/50 line-through text-sm">
                            ৳{service.oldPrice}
                        </p>
                    )}
                    <p className="text-primary font-bold text-xl">
                        ৳{servicePrice}
                    </p>
                </div>
            </div>

            {/* Action */}
            <Link
                to={`/service-details/${service._id}`}
                className="btn btn-primary w-full mt-4"
            >
                View Details
            </Link>
        </div>
    );
};

export default Service;
