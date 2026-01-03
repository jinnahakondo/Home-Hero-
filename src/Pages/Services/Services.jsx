import React, { useEffect, useState } from 'react';
import useSecureAxios from '../../Hooks/useSecureAxios';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Components/Loader/Loader';
import Service from '../../Components/Service/Service';

const Services = () => {
    const { loading, user } = useAuth()
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
    console.log(filter);
    if (loading) return <Loeader />
    return (
        <div className='max-w-7xl mx-auto px-5 mt-20'>
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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {filteredService.map(service => <Service key={service._id} service={service} />)}
            </div>
        </div>
    );
};

export default Services;