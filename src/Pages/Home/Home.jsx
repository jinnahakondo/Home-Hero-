import React from 'react';
import Hero from '../../Components/Hero/Hero';
import LatestServices from '../../Components/LatestServices/LatestServices';
import ChooseUs from '../../Components/WhyChooseUs/ChooseUs';
import HowItWorks from '../../Components/Home/HowItsWorks';
import TestimonialSlider from '../../Components/Home/Testimonials';
import ContactSection from '../../Components/Home/ContactSection';
import CTASection from '../../Components/Home/CTASection';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Components/Loader/Loader';

const Home = () => {
    const { loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            {/* Hero should be full width */}
            <Hero />

            {/* Content sections */}
            <div className="max-w-7xl mx-auto px-5">
                <LatestServices />
                <ChooseUs />
                <HowItWorks />
                <TestimonialSlider />
                <ContactSection />
            </div>

            {/* CTA should stand out */}
                <CTASection />
        </div>
    );
};

export default Home;
