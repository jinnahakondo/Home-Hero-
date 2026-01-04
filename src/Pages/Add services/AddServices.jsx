import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import useSecureAxios from '../../Hooks/useSecureAxios';

const AddServices = () => {
    const { user } = useAuth()
    const instance = useSecureAxios()

    const handelSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const title = form.serviceName.value;
        const image = form.imageUrl.value;
        const Description = form.description.value;
        const Price = form.price.value;
        const Category = form.category.value;

        const newService = { title, image, Description, Price, Category, provider: user.displayName, Email: user.email, created_at: new Date() }

        instance.post('/services', newService)
            .then(data => {
                if (data.data.insertedId) {
                    toast.success('services added successfully')
                    // console.log("data after add", data.data);
                    e.target.reset()
                }
            })
            .catch(error => console.log(error.code))

    }
    return (
        <div className='max-w-7xl mx-auto mt-40np mb-20 '>
            <div className='max-w-3xl rounded-2xl mx-5 md:mx-auto bg-white mt-20 p-7 ' >
                <h2 className='heading mb-4'>Add Service</h2>
                <form className='space-y-4' onSubmit={handelSubmit}>
                    {/* servece name  */}
                    <div className='flex flex-col gap-2'>
                        <label>Service Name</label>
                        <input type="text" required placeholder='Service Name' name='serviceName' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                    </div>
                    {/*Image URL  */}
                    <div className='flex flex-col gap-2'>
                        <label>Image URL</label>
                        <input type="text" required placeholder='imageUrl' name='imageUrl' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                    </div>
                    {/*Description  */}
                    <div className='flex flex-col gap-2'>
                        <label>Description</label>
                        <textarea name="description" rows="5" required className='border border-gray-300 rounded-lg p-3 outline-0'></textarea>
                    </div>
                    {/*Price */}
                    <div className='flex flex-col gap-2'>
                        <label>Price</label>
                        <input type="number" required placeholder='price' name='price' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                    </div>
                    {/* category */}
                    <div className='flex flex-col gap-2'>
                        <label>Category Name</label>
                        <input type="text" required placeholder='category' name='category' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                    </div>
                    <div className=' mt-10'>
                        <button type='submit' className='btn btn-primary text-white'>Add Service</button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default AddServices;