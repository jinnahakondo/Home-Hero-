import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import useSecureAxios from '../../Hooks/useSecureAxios';
import ServiceSkeleton from '../Skeleton/HomeServiceSkeleton';



const LatestServices = () => {
    const instance = useSecureAxios()
    const [service, setService] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        instance.get('/services/home')
            .then(data => {
                setService(data.data)
                setLoading(false)
                // console.log(data.data);
            })
    }, [instance])
    if (loading) {
        return <div className='max-w-7xl mx-auto mt-20 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {
                [...Array(5)].map((i) => <ServiceSkeleton key={i} />)
            }
        </div>
    }
    return (
        <div className='my-20'>
            <h3 className='pl-6 mb-3 text-gray-400 font-bold'>Latest Services</h3>
            <h4 className=' pl-6 text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-8'>Our Latest Services</h4>
            <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {service.map(service => <Service key={service._id} service={service} />)}
            </div>
        </div>
    );
};

export default LatestServices;