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
            })
            .catch(error => {
                console.error('Error loading services:', error);
                setLoading(false);
            })
    }, [instance])

    if (loading) {
        return (
            <div className='max-w-7xl mx-auto mt-20 service-grid'>
                {[...Array(5)].map((_, i) => <ServiceSkeleton key={i} />)}
            </div>
        )
    }

    return (
        <div className='my-20 bg-base-100'>
            <h3 className='pl-6 mb-3 text-primary font-bold'>Latest Services</h3>
            <h4 className='pl-6 text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-8 text-base-content'>
                Our Latest Services
            </h4>
            <div className='service-grid'>
                {service.map(service => <Service key={service._id} service={service} />)}
            </div>
        </div>
    );
};

export default LatestServices;