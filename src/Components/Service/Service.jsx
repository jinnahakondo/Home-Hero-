import React from "react";
import { Link } from "react-router";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";

const Service = ({ service }) => {
  // Destructuring based on your data structure + common fields in the image
  const { _id, image, title, Price, ratings } = service || {};

  return (
    <div className="card bg-base-100 transition-all duration-300 hover:shadow-md group rounded-none">
      {/* --- Image Section --- */}
      <figure className="  w-full overflow-hidden bg-gray-100">
        <img
          src={image || "https://via.placeholder.com/400x400?text=Product"}
          alt={title}
          className="h-40 w-full object-cover"
        />
      </figure>

      {/* --- Content Body --- */}
      <div className="card-body p-4">
        {/* Title and Heart Icon */}
        <div className="">
          <h2 className="text-xl font-normal text-base-content leading-snug line-clamp-2">
            {title}
          </h2>
        </div>

        {/* Rating and Sales */}
        <div className="flex items-center gap-2 mt-2">
          <div className="badge badge-primary gap-1 text-white font-bold py-3 px-2 rounded-sm">
            {ratings} <AiFillStar />
          </div>
          <div className="divider divider-horizontal mx-0 h-4 self-center"></div>
          {/* <span className="text-gray-500 italic text-sm">{sold} Sold</span> */}
        </div>

        {/* Pricing Section */}
        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-base-content">
              Tk {Price?.toLocaleString() || "2,150"}
            </span>
          </div>
        </div>
      </div>
      <Link to={`/service-details/${_id}`} className="btn btn-outline mt-auto">
        view Details
      </Link>
    </div>
  );
};

export default Service;
