import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import useSecureAxios from '../../Hooks/useSecureAxios';
import Loader from '../Loader/Loader';


const LatestServices = () => {
    const instance = useSecureAxios()
    const [service, setService] = useState([])
    useEffect(() => {
        instance.get('/services/home')
            .then(data => {
                setService(data.data)
                // console.log(data.data);
            })
    }, [instance])
    if (service.length == '0') {
        <Loader />
    }
    return (
        <div className='mt-20'>
            <h3 className='pl-6 mb-3 text-gray-400 font-bold'>Latest Services</h3>
            <h4 className=' pl-6 text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-8'>Our Latest Services</h4>
            <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {service.map(service => <Service key={service._id} service={service} />)}
            </div>
        </div>
    );
};

export default LatestServices;