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
            .catch(() => {
                // Fallback to mock data if API fails
                setService([
                    {
                        _id: "1",
                        serviceName: "Professional House Cleaning",
                        price: 120,
                        category: "Cleaning",
                        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
                        description: "Complete house cleaning service including all rooms, kitchen, and bathrooms.",
                        rating: 4.8
                    },
                    {
                        _id: "2",
                        serviceName: "Plumbing Repair Service",
                        price: 85,
                        category: "Plumbing",
                        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
                        description: "Expert plumbing repairs for leaks, clogs, and installations.",
                        rating: 4.6
                    },
                    {
                        _id: "3",
                        serviceName: "Electrical Installation",
                        price: 150,
                        category: "Electrical",
                        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
                        description: "Safe and professional electrical work for your home or office.",
                        rating: 4.9
                    },
                    {
                        _id: "4",
                        serviceName: "Garden Maintenance",
                        price: 95,
                        category: "Gardening",
                        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
                        description: "Complete garden care including pruning, weeding, and lawn maintenance.",
                        rating: 4.7
                    }
                ]);
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