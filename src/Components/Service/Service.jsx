import React from "react";
import { Link } from "react-router";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Service = ({ service }) => {
    const rating = service.rating || 0;

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

    return (
        <div className="h-full max-w-[350px] mx-auto">
            <div className="h-full border border-base-300 rounded-lg bg-white hover:shadow-md transition p-4 flex flex-col">

                {/* Image */}
                <figure className="flex justify-center items-center h-56 mb-4">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="h-full object-contain"
                    />
                </figure>

                {/* Content */}
                <div className="space-y-2 grow">
                    <p className="text-sm text-gray-400">
                        {service.Category || "Featured Product"}
                    </p>

                    <h3 className="text-base font-semibold text-gray-800">
                        {service.title}
                    </h3>

                    {/* ⭐ Ratings */}
                    <div className="flex items-center gap-1">
                        {renderStars()}
                        <span className="text-sm text-gray-500 ml-1">
                            ({rating})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                        {service.oldPrice && (
                            <p className="text-gray-400 line-through">
                                ৳{service.oldPrice}
                            </p>
                        )}
                        <p className="text-orange-500 font-bold text-lg">
                            <span className="text-2xl">৳</span>{service.Price}
                        </p>
                    </div>
                </div>

                {/* Action */}
                <Link
                    to={`/service-details/${service._id}`}
                    className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
};

export default Service;
