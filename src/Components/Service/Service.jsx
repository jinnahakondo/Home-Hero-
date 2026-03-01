import React from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";

const Service = ({ service }) => {
  return (
    <div className="h-full">
      <div className="bg-base-100 shadow rounded-2xl p-4 h-full flex flex-col">
        {/* Image */}
        <div className="rounded-xl overflow-hidden">
          <img
            src={service?.image}
            alt={service?.title}
            className="h-52 w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="mt-4 flex flex-col flex-grow justify-between">
          {/* Title + Rating */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-semibold text-gray-800 leading-snug">
              {service?.title}
            </h3>

            <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
              <FaStar />
              <span>{service?.rating || 4.8}</span>
            </div>
          </div>

          {/* Price + Button */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-2xl font-bold text-gray-900">
              ${service?.Price}
            </p>

            <Link
              to={`/service-details/${service?._id}`}
              className="btn btn-ghost rounded-full text-base-content/80 font-medium shadow-sm hover:shadow-md transition duration-300"
            >
              Book now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
