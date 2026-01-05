import React from 'react';
import Hero from '../../Components/Hero/Hero';
import LatestServices from '../../Components/LatestServices/LatestServices';
import ChooseUs from '../../Components/WhyChooseUs/ChooseUs';
import HowItWorks from '../../Components/Home/HowItsWorks';
import TestimonialSlider from '../../Components/Home/Testimonials';
import ContactSection from '../../Components/Home/ContactSection';
import CTASection from '../../Components/Home/CTASection';
import StatsSection from '../../Components/Home/StatsSection';
import FeaturesSection from '../../Components/Home/FeaturesSection';
import CategoriesSection from '../../Components/Home/CategoriesSection';
import NewsletterSection from '../../Components/Home/NewsletterSection';
import FAQSection from '../../Components/Home/FAQSection';
import PartnersSection from '../../Components/Home/PartnersSection';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Components/Loader/Loader';

const Home = () => {
    const { loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            {/* 1. Hero Section - Full width */}
            <Hero />

            {/* Content sections with proper spacing */}
            <div className="space-y-20">
                {/* 2. Latest Services */}
                <div className="max-w-7xl mx-auto px-4">
                    <LatestServices />
                </div>

                {/* 3. Features Section */}
                <div className="bg-base-200 py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <FeaturesSection />
                    </div>
                </div>

                {/* 4. Categories Section */}
                <div className="max-w-7xl mx-auto px-4">
                    <CategoriesSection />
                </div>

                {/* 5. Statistics Section */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <StatsSection />
                    </div>
                </div>

                {/* 6. Why Choose Us */}
                <div className="max-w-7xl mx-auto px-4">
                    <ChooseUs />
                </div>

                {/* 7. How It Works */}
                <div className="bg-base-200 py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <HowItWorks />
                    </div>
                </div>

                {/* 8. Testimonials */}
                <div className="max-w-7xl mx-auto px-4">
                    <TestimonialSlider />
                </div>

                {/* 9. Partners Section */}
                <div className="bg-base-200 py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <PartnersSection />
                    </div>
                </div>

                {/* 10. FAQ Section */}
                <div className="max-w-7xl mx-auto px-4">
                    <FAQSection />
                </div>

                {/* 11. Newsletter Section */}
                <NewsletterSection />

                {/* 12. Contact Section */}
                <div className="max-w-7xl mx-auto px-4">
                    <ContactSection />
                </div>
            </div>

            {/* 13. CTA Section - Full width */}
            <CTASection />
        </div>
    );
};

export default Home;
