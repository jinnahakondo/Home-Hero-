import React from 'react';
import Hero from '../../Components/Hero/Hero';
import LatestServices from '../../Components/LatestServices/LatestServices';
import ChooseUs from '../../Components/WhyChooseUs/ChooseUs';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Components/Loader/Loader';

const Home = () => {
    const { loading } = useAuth()
    if(loading){
        return <Loader/>
    }
    return (
        <div>
            <Hero />
            <div className='max-w-7xl mx-auto space-y-20 px-5'>
                <LatestServices />
                <ChooseUs />
            </div>
        </div>
    );
};

export default Home;