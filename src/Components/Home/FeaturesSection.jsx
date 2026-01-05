import React from 'react';
import { Shield, Clock, CreditCard, Headphones, MapPin, Award } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Verified Professionals",
            description: "All service providers are background-checked and verified for your safety and peace of mind."
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Flexible Scheduling",
            description: "Book services at your convenience with flexible time slots that fit your busy schedule."
        },
        {
            icon: <CreditCard className="w-8 h-8" />,
            title: "Secure Payments",
            description: "Safe and secure payment processing with multiple payment options for your convenience."
        },
        {
            icon: <Headphones className="w-8 h-8" />,
            title: "24/7 Support",
            description: "Round-the-clock customer support to help you with any questions or concerns."
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "Local Services",
            description: "Connect with trusted local service providers in your area for quick and reliable service."
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Quality Guarantee",
            description: "100% satisfaction guarantee on all services with our quality assurance program."
        }
    ];

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
                    Why Choose HomeHero?
                </h2>
                <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
                    We make it easy to find, book, and manage home services with features designed for your convenience and peace of mind.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="bg-base-100 border border-base-300 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-base-content mb-3">
                            {feature.title}
                        </h3>
                        <p className="text-base-content/70 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;