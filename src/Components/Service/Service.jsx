import React from "react";
import { Link } from "react-router";

const Service = ({ service }) => {
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
                        {service.category || "Featured Product"}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800">
                        {service.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                        {service.oldPrice && (
                            <p className="text-gray-400 line-through">
                                ৳{service.oldPrice}
                            </p>
                        )}
                        <p className="text-orange-500 font-bold text-lg">
                            ৳{service.Price}
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
