import React from 'react';
import { Users, Star, CheckCircle, Clock } from 'lucide-react';

const StatsSection = () => {
    const stats = [
        {
            icon: <Users className="w-8 h-8" />,
            number: "50,000+",
            label: "Happy Customers",
            description: "Satisfied customers across the country"
        },
        {
            icon: <Star className="w-8 h-8" />,
            number: "4.9/5",
            label: "Average Rating",
            description: "Based on 10,000+ reviews"
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            number: "100,000+",
            label: "Services Completed",
            description: "Successfully completed projects"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            number: "24/7",
            label: "Support Available",
            description: "Round-the-clock customer support"
        }
    ];

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
                    Trusted by Thousands
                </h2>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                    Join our growing community of satisfied customers and professional service providers
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center group">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            {stat.icon}
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                            {stat.number}
                        </div>
                        <div className="text-lg font-semibold text-base-content mb-1">
                            {stat.label}
                        </div>
                        <p className="text-sm text-base-content/60">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;