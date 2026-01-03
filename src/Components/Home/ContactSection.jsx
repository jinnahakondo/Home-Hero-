import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto md:px-6 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-3">
            Contact Us
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a question or need a service? Reach out to us and we’ll get back
            to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Contact Info */}
          <div className="space-y-6 shadow rounded-md p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[color:rgba(255,98,81,0.1)]">
                <Phone className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-800">
                  +880 1403703441
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[color:rgba(255,98,81,0.1)]">
                <Mail className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-800 wrap-anywhere">
                  mdjinnahakondo@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[color:rgba(255,98,81,0.1)]">
                <MapPin className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold text-gray-800">
                  Gaibandha,Rangpur, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-gray-50 rounded-md shadow-md p-8 space-y-6">

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] text-white font-semibold py-3 rounded-lg
              hover:opacity-90 transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
