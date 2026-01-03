import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "react-toastify";

const ContactSection = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            e.target.reset();
            toast.success(
                "Thanks! We received your message and will contact you shortly."
            );
        }, 3000);
    };

    return (
        <section className="bg-base-100 py-20">

            <div className="max-w-6xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-6 ">
                        <h2 className="text-4xl font-bold mb-4">
                            Get in <span className="text-primary">Touch</span>
                        </h2>
                        <p className="text-base-content/70 max-w-md mb-10">
                            Have a question or want to book a service? Send us a message and
                            we’ll respond as soon as possible.
                        </p>
                        <div className="bg-base-200 rounded-2xl p-8 flex flex-col gap-6">

                            <div className="flex items-center gap-4 ">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Phone />
                                </div>
                                <div>
                                    <p className="text-sm text-base-content/60">Phone</p>
                                    <p className="font-semibold">+880 1403 703 441</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Mail />
                                </div>
                                <div>
                                    <p className="text-sm text-base-content/60">Email</p>
                                    <p className="font-semibold break-all">
                                        mdjinnahakondo@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <MapPin />
                                </div>
                                <div>
                                    <p className="text-sm text-base-content/60">Location</p>
                                    <p className="font-semibold">
                                        Gaibandha, Rangpur, Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-base-200 rounded-2xl p-8 space-y-6"
                    >
                        <div>
                            <label className="block font-medium mb-2">Your Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-base-300
                focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-base-300
                focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message..."
                                required
                                className="w-full px-4 py-3 rounded-lg border border-base-300
                focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full"
                        >
                            {isLoading ? "Sending message..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
