import React from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import useSecureAxios from '../../Hooks/useSecureAxios';
import { toast } from 'react-toastify';
import LoadingButton from '../Loading/LoadingButton';
import { useState } from 'react';

const UpdateService = () => {
    const navigate = useNavigate();
    const instance = useSecureAxios();
    const service = useLoaderData();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.serviceName.value;
        const image = form.imageUrl.value;
        const description = form.description.value;
        const price = form.price.value;
        const category = form.category.value;
        const newService = { title, image, description, price, category };

        try {
            setIsLoading(true);
            const response = await instance.patch(`/services/${id}`, newService);
            toast.success("Service has been updated successfully!");
            navigate(-1);
        } catch (error) {
            console.error("Error updating service:", error);
            toast.error("Failed to update service. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <div className='max-w-3xl rounded-2xl mx-5 md:mx-auto bg-base-100 mt-20 p-7 border border-base-300'>
                <h2 className='text-2xl font-bold mb-4 text-base-content'>Update Service</h2>
                <form className='space-y-4' onSubmit={handleUpdate}>
                    {/* Service name */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-medium text-base-content'>Service Name</label>
                        <input
                            type="text"
                            defaultValue={service?.title || service?.serviceName}
                            placeholder='Service Name'
                            name='serviceName'
                            className='input input-bordered w-full'
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-medium text-base-content'>Image URL</label>
                        <input
                            type="url"
                            defaultValue={service?.image}
                            placeholder='Image URL'
                            name='imageUrl'
                            className='input input-bordered w-full'
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-medium text-base-content'>Description</label>
                        <textarea
                            defaultValue={service?.description || service?.Description}
                            name="description"
                            rows="5"
                            className='textarea textarea-bordered w-full'
                            placeholder='Service description...'
                            required
                        ></textarea>
                    </div>

                    {/* Price */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-medium text-base-content'>Price (৳)</label>
                        <input
                            type="number"
                            defaultValue={service?.price || service?.Price}
                            placeholder='Price in BDT'
                            name='price'
                            className='input input-bordered w-full'
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-medium text-base-content'>Category</label>
                        <select
                            name='category'
                            defaultValue={service?.category || service?.Category}
                            className='select select-bordered w-full'
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="Gardening">Gardening</option>
                            <option value="Painting">Painting</option>
                            <option value="Carpentry">Carpentry</option>
                            <option value="HVAC">HVAC</option>
                            <option value="Roofing">Roofing</option>
                        </select>
                    </div>

                    <div className='grid grid-cols-2 gap-5 lg:gap-10 mt-10'>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className='btn btn-error text-white'
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <LoadingButton
                            type='submit'
                            loading={isLoading}
                            loadingText="Updating..."
                            className='text-white'
                            variant='primary'
                        >
                            Update Service
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateService;