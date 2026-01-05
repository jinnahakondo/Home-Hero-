import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "react-toastify";

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      e.target.reset()
      toast.success('Thanks! We received your message. We’ll contact you shortly.')
    }, 3000);
  }
  return (
    <section className="bg-base-100 py-20">
      <div className="container mx-auto md:px-6 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-3 text-base-content">
            Contact Us
          </h2>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Have a question or need a service? Reach out to us and we’ll get back
            to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Contact Info */}
          <div className="space-y-6 shadow-lg rounded-xl p-6 bg-base-100 border border-base-300">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Phone</p>
                <p className="font-semibold text-base-content">
                  +880 1403703441
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Email</p>
                <p className="font-semibold text-base-content wrap-anywhere">
                  mdjinnahakondo@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Location</p>
                <p className="font-semibold text-base-content">
                  Gaibandha, Rangpur, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-base-200 rounded-xl shadow-lg p-8 space-y-6 border border-base-300" onSubmit={(e) => handelSubmit(e)}>

            <div>
              <label className="block text-base-content font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                required
              />
            </div>

            <div>
              <label className="block text-base-content font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                required
              />
            </div>

            <div>
              <label className="block text-base-content font-medium mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Message sending...' : 'Send Message'}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
