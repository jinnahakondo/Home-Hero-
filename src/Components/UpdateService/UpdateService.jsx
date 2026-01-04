import React, { useEffect } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import instance from '../../Hooks/useSecureAxios';
import { toast } from 'react-toastify';

const UpdateService = () => {
    const navigate = useNavigate()
    const instance = instance();
    const service = useLoaderData()
    const { id } = useParams()


    // useEffect(() => {
    //     
    // }, [instance, id])

    const handelUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.serviceName.value;
        const image = form.imageUrl.value;
        const description = form.description.value;
        const price = form.price.value;
        const category = form.category.value;
        const newService = { title, image, description, price, category, }
        // console.log(newService);
        instance.patch(`/services/${id}`, newService)
            .then(data => {
                toast.success("service has been updated");
                console.log("data after update", data.data);
            })
    }
    return (
        <div className='max-w-7xl mx-auto my-20 '>
            <div className='max-w-3xl rounded-2xl mx-5 md:mx-auto bg-white mt-20 p-7 ' >
                <h2 className='heading mb-4'>Update Service</h2>
                <form className='space-y-4' onSubmit={handelUpdate}>
                    {/* servece name  */}
                    <div className='flex flex-col gap-2'>
                        <label>Service Name</label>
                        <input type="text"
                            defaultValue={service.title}
                            placeholder='Service Name' name='serviceName' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                    </div>
                    {/*Image URL  */}
                    <div className='flex flex-col gap-2'>
                        <label>Image URL</label>
                        <input type="text"
                            defaultValue={service.image}
                            placeholder='imageUrl' name='imageUrl' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                    </div>
                    {/*Description  */}
                    <div className='flex flex-col gap-2'>
                        <label>Description</label>
                        <textarea
                            defaultValue={service.description}
                            name="description" rows="5" className='border border-gray-300 rounded-lg p-3 outline-0'></textarea>
                    </div>
                    {/*Price */}
                    <div className='flex flex-col gap-2'>
                        <label>Price</label>
                        <input type="number"
                            defaultValue={service.price}
                            placeholder='price' name='price' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                    </div>
                    {/* category */}
                    <div className='flex flex-col gap-2'>
                        <label>Category Name</label>
                        <input type="text"
                            defaultValue={service.category}
                            placeholder='category' name='category' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                    </div>
                    <div className='grid grid-cols-2 gap-5 lg:gap-10 mt-10'>
                        <button onClick={() => { navigate(-1) }} className='btn btn-error text-white'>Cencel</button>
                        <button
                            type='submit' className='btn btn-primary text-white'>Update Service</button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default UpdateService;