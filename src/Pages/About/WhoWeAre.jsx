import React from "react";
import aboutImage from '../../assets/aboutImage.jpg'
const WhoWeAre = () => {

    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
                    <p className="text-base-content/70 leading-relaxed">
                        We are a home service platform focused on providing reliable,
                        affordable, and professional services. Our goal is to make everyday
                        home maintenance simple and stress-free.
                    </p>
                </div>
                <div className="h-64 bg-base-300 rounded-xl overflow-hidden" >
                    <img src={aboutImage} alt="who we are" className="w-full" />
                </div>


            </div>
        </section>
    );
};

export default WhoWeAre;
