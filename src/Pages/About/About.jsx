import React from 'react';
import AboutHero from './AboutHero';
import WhoWeAre from './WhoWeAre';
import OurValues from './OurValus';
import AboutCTA from './AboutCta';

const About = () => {
    return (
        <div className='space-y-20'>
            <AboutHero />
            <WhoWeAre />
            <OurValues />
            <AboutCTA />
        </div>
    );
};

export default About;

