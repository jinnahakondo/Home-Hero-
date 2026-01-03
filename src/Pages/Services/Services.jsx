import React, { useEffect, useState } from 'react';
import useSecureAxios from '../../Hooks/useSecureAxios';
import useAuth from '../../Hooks/useAuth';
import Service from '../../Components/Service/Service';
import ServiceSkeleton from '../../Components/Skeleton/HomeServiceSkeleton';

const Services = () => {
    const { loading, user } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [services, setServices] = useState([])
    const [filteredService, setFilteredService] = useState([])
    const instance = useSecureAxios();
    const [filter, setFilter] = useState('')

    useEffect(() => {
        if (user) {
            instance.get('/services')
                .then(data => {
                    setServices(data.data)
                    setFilteredService(data.data)
                    setIsLoading(false)
                })
        }
    }, [instance, user])

    const handelMin = (e) => {
        e.preventDefault()
        const min = e.target.min.value;
        // console.log(min);
        instance.get(`/filter-services?min=${min}`)
            .then(data => {

                setFilteredService(data.data)
            })
    }
    const handelMax = (e) => {
        e.preventDefault()
        const max = e.target.max.value;
        // console.log(max);
        instance.get(`/filter-services?max=${max}`)
            .then(data => {
                setFilteredService(data.data)

            })
    }
    const handelMinMax = (e) => {
        e.preventDefault()
        const min = e.target.min.value;
        const max = e.target.max.value;
        // console.log({ min, max });
        instance.get(`/filter-services?min=${min}&&max=${max}`)
            .then(data => {
                setFilteredService(data.data)

            })
    }

    if (loading || isLoading) {
        return <div className='max-w-7xl mx-auto mt-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {
                [...Array(10)].map((i) => <ServiceSkeleton key={i} />)
            }
        </div>
    }

    return (
        <div className='max-w-7xl mx-auto px-5 mt-40'>
            <h2 className='heading text-center mb-5'>All Services</h2>
            {/* filter  */}
            <div className='my-8 grid place-items-center'>
                <div>
                    <select onChange={(e) => { setFilter(e.target.value) }} name="filter" className='btn btn-primary'>
                        <option disabled selected>filter</option>
                        <option> by min price</option>
                        <option> by max price</option>
                        <option> by min-max price</option>
                    </select>
                </div>
            </div>
            <div>
                {filter === "by min price" && <>
                    {/*price min  */}
                    <div className='flex flex-col gap-2 my-8'>

                        <form onSubmit={handelMin}>
                            <div className='max-w-3xl mx-auto mb-5'>
                                <input type='number' onChange={(e) => { if (!e.target.value) { setFilteredService(services) } }} name="min" placeholder='minimum price' required className='border border-gray-300 rounded-lg p-3 outline-0 w-full'></input>
                            </div>
                            <div className='flex justify-center items-center '>
                                <button
                                    className='btn btn-primary px-7'>filter</button></div>
                        </form>
                    </div>
                </>}
                {filter === "by max price" && <>
                    {/*price min  */}
                    <div className='flex flex-col gap-2 my-8'>

                        <form onSubmit={handelMax}>
                            <div className='max-w-3xl mx-auto mb-5'>
                                <input
                                    onChange={(e) => { if (!e.target.value) { setFilteredService(services) } }}
                                    type='number' name="max" placeholder='maximum price' required className='border border-gray-300 rounded-lg p-3 outline-0 w-full'></input>
                            </div>
                            <div className='flex justify-center items-center '>
                                <button

                                    className='btn btn-primary px-7'>filter</button></div>
                        </form>
                    </div>
                </>}
                {filter === "by min-max price" && <>
                    {/*price min  */}
                    <div className='flex flex-col gap-2 my-8'>

                        <form onSubmit={handelMinMax}>
                            <div className='max-w-3xl mx-auto mb-5'>
                                <input
                                    onChange={(e) => { if (!e.target.value) { setFilteredService(services) } }}
                                    type='number' name="min" placeholder='minimum price' required className='border border-gray-300 rounded-lg p-3 outline-0 w-full'></input>
                            </div>
                            <div className='max-w-3xl mx-auto mb-5'>
                                <input
                                    onChange={(e) => { if (!e.target.value) { setFilteredService(services) } }}
                                    type='number' name="max" placeholder='maximum price' required className='border border-gray-300 rounded-lg p-3 outline-0 w-full'></input>
                            </div>

                            <div className='flex justify-center items-center '>
                                <button

                                    className='btn btn-primary px-7'>filter</button></div>
                        </form>
                    </div>
                </>}
            </div>
            <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {filteredService.map(service => <Service key={service._id} service={service} />)}
            </div>
        </div>
    );
};

export default Services;