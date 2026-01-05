import React from "react";
import { ShieldCheck, Clock, Wallet, Users } from "lucide-react";

const WhyChooseUs = () => {
    const points = [
        {
            icon: <ShieldCheck />,
            title: "Verified Professionals",
            desc: "Skilled and background-checked service providers",
        },
        {
            icon: <Clock />,
            title: "On-time Service",
            desc: "We respect your time and always arrive as scheduled",
        },
        {
            icon: <Wallet />,
            title: "Affordable Pricing",
            desc: "Transparent pricing with no hidden charges",
        },
        {
            icon: <Users />,
            title: "Trusted by 100+ Clients",
            desc: "Real customers, real satisfaction",
        },
    ];

    return (
        <section className="bg-base-100 pb-20">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-14">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-base-content">
                        Why Choose Us
                    </h2>
                    <p className="text-base-content/70 mt-3">
                        Reliable service you can trust
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {points.map((item, i) => (
                        <div
                            key={i}
                            className="text-center p-6 rounded-xl border border-base-300 hover:shadow-md transition bg-base-100 hover:bg-base-200"
                        >
                            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full mb-5 bg-primary/10 text-primary">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-lg text-base-content">
                                {item.title}
                            </h3>
                            <p className="text-sm text-base-content/60 mt-2">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
