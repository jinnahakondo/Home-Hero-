import React from 'react';

const PartnersSection = () => {
    const partners = [
        {
            name: "TechCorp",
            logo: "https://via.placeholder.com/120x60/64748b/ffffff?text=TechCorp",
            description: "Technology Solutions"
        },
        {
            name: "BuildPro",
            logo: "https://via.placeholder.com/120x60/64748b/ffffff?text=BuildPro",
            description: "Construction Services"
        },
        {
            name: "CleanMax",
            logo: "https://via.placeholder.com/120x60/64748b/ffffff?text=CleanMax",
            description: "Cleaning Solutions"
        },
        {
            name: "GreenThumb",
            logo: "https://via.placeholder.com/120x60/64748b/ffffff?text=GreenThumb",
            description: "Landscaping"
        },
        {
            name: "FixIt",
            logo: "https://via.placeholder.com/120x60/64748b/ffffff?text=FixIt",
            description: "Home Repairs"
        },
        {
            name: "ElectroServ",
            logo: "https://via.placeholder.com/120x60/64748b/ffffff?text=ElectroServ",
            description: "Electrical Services"
        }
    ];

    const certifications = [
        "Better Business Bureau",
        "HomeAdvisor Certified",
        "Angie's List Approved",
        "Google Guaranteed"
    ];

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
                    Trusted Partners & Certifications
                </h2>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                    We work with industry-leading partners to provide you with the best service experience
                </p>
            </div>

            {/* Partners Grid */}
            <div className="mb-16">
                <h3 className="text-xl font-semibold text-base-content text-center mb-8">
                    Our Service Partners
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                    {partners.map((partner, index) => (
                        <div key={index} className="group text-center">
                            <div className="bg-base-100 border border-base-300 rounded-lg p-4 hover:shadow-lg transition-all duration-300 group-hover:border-primary/30">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="w-full h-12 object-contain mb-2 opacity-70 group-hover:opacity-100 transition-opacity"
                                />
                                <p className="text-xs text-base-content/60 group-hover:text-base-content transition-colors">
                                    {partner.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div className="bg-base-100 border border-base-300 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-base-content text-center mb-6">
                    Our Certifications & Memberships
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                    {certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">{cert}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h4 className="font-semibold text-base-content mb-2">Insured & Bonded</h4>
                    <p className="text-sm text-base-content/70">All service providers carry comprehensive insurance coverage</p>
                </div>

                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h4 className="font-semibold text-base-content mb-2">Quality Certified</h4>
                    <p className="text-sm text-base-content/70">Rigorous quality standards and regular performance reviews</p>
                </div>

                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h4 className="font-semibold text-base-content mb-2">Satisfaction Guaranteed</h4>
                    <p className="text-sm text-base-content/70">100% satisfaction guarantee on all completed services</p>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;