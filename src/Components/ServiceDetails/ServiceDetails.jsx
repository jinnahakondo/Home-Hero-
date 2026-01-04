import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // TanStack Query
import useSecureAxios from '../../Hooks/useSecureAxios';
import Loader from '../Loader/Loader';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Review from '../Review/Review';
import { HiArrowLeft, HiCalendar, HiCurrencyBangladeshi, HiUser } from "react-icons/hi";

const ServiceDetails = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const modalRef = useRef();
    const instance = useSecureAxios();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const [userRating, setUserRating] = useState(5);

    // useQuery
    const { data: service, isLoading, error } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await instance.get(`/services/${id}`);
            return res.data;
        },
    });

    // ২. useMutation
    const reviewMutation = useMutation({
        mutationFn: async (newReview) => {
            return await instance.patch(`/services/reviews/${service._id}`, newReview);
        },
        onSuccess: () => {
            toast.success('Review shared successfully!');
            queryClient.invalidateQueries(['service', id]);
            setUserRating(5);
        }
    });

    // ৩. useMutation
    const bookingMutation = useMutation({
        mutationFn: async (newBooking) => {
            return await instance.post('/bookings', newBooking);
        },
        onSuccess: (res) => {
            if (res.data.insertedId) {
                toast.success('Service booked successfully!');
                modalRef.current.close();
            }
        }
    });

    const handleReview = (e) => {
        e.preventDefault();
        const form = e.target;
        const reviewData = {
            user: user?.displayName,
            userImage: user?.photoURL,
            rating: userRating,
            comment: form.comment.value,
        };
        reviewMutation.mutate(reviewData);
        form.reset();
    };

    const handleBooking = e => {
        e.preventDefault();
        const bookingData = {
            serviceId: service._id,
            serviceName: service.title,
            serviceImage: service.image,
            customerEmail: user?.email,
            price: e.target.price.value,
            bookingDate: e.target.bookingDate.value
        };
        bookingMutation.mutate(bookingData);
    };

    if (isLoading) return <Loader />;
    if (error || !service) return <div className="text-center mt-20 text-error font-bold">Something went wrong or Service not found.</div>;

    const { title, Price, Description, image, Email, created_at, created_by, serviceReviews } = service;
    const isDisabled = user?.email === Email;

    return (
        <div className='max-w-6xl mx-auto px-5 py-12 mt-30'>
            <button onClick={() => navigate(-1)} className='btn btn-ghost mb-6 gap-2'>
                <HiArrowLeft /> Back to Services
            </button>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
                {/* Left: Image */}
                <div className='lg:col-span-7'>
                    <div className='rounded-3xl overflow-hidden shadow-2xl bg-base-300'>
                        <img src={image} alt={title} className='w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500' />
                    </div>
                </div>

                {/* Right: Info */}
                <div className='lg:col-span-5 space-y-6'>
                    <div>
                        <div className="badge badge-primary mb-2 capitalize">{service.Category || 'Service'}</div>
                        <h1 className='text-3xl md:text-4xl font-extrabold text-base-content'>{title}</h1>
                    </div>

                    <div className='flex items-center gap-2 text-2xl font-bold text-primary'>
                        <HiCurrencyBangladeshi />
                        <span>{Price} BDT</span>
                    </div>

                    <div className='p-6 bg-base-200 rounded-2xl space-y-4 border border-base-300'>
                        <p className='text-base-content/70 leading-relaxed'>
                            <span className='font-bold text-base-content block mb-1'>Description:</span>
                            {Description}
                        </p>

                        <div className='divider'></div>

                        <div className='space-y-2 text-sm'>
                            <div className='flex items-center gap-2'><HiUser className='text-primary' /> <span>Provider: <strong>{created_by}</strong></span></div>
                            <div className='flex items-center gap-2 text-base-content/60 italic'><span>{Email}</span></div>
                            <div className='flex items-center gap-2 text-base-content/60'><HiCalendar /> <span>Published: {new Date(created_at).toLocaleDateString()}</span></div>
                        </div>
                    </div>

                    <button
                        onClick={() => user ? modalRef.current.showModal() : navigate('/auth')}
                        disabled={isDisabled}
                        className='btn btn-primary btn-lg w-full shadow-lg shadow-primary/20 rounded'
                    >
                        {isDisabled ? "You own this service" : "Book Service Now"}
                    </button>
                </div>
            </div>

            {/* Review Section */}
            <div className='mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16'>
                <div className='card bg-base-100 shadow-xl border border-base-200 p-8 h-fit'>
                    <h2 className='text-2xl font-bold mb-6'>Give a Rating</h2>
                    <form className='space-y-4' onSubmit={handleReview}>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold mr-3">
                                Rating Score</span></label>
                            <div className="rating rating-lg gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <input
                                        key={star}
                                        type="radio"
                                        name="rating-star"
                                        className="mask mask-star-2 bg-orange-400"
                                        checked={userRating === star}
                                        onChange={() => setUserRating(star)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold mr-3">
                                Your Comment</span></label>
                            <textarea name="comment" placeholder='Share your experience...' rows="4" required className='textarea textarea-bordered text-base'></textarea>
                        </div>
                        <button type='submit' className='btn btn-primary w-full' disabled={!user || reviewMutation.isPending}>
                            {reviewMutation.isPending ? 'Posting...' : 'Post Review'}
                        </button>
                        {!user && <p className='text-xs text-error mt-2 text-center'>Please login to give a review.</p>}
                    </form>
                </div>

                <div>
                    <h3 className='text-2xl font-bold mb-6 flex items-center gap-3'>
                        Customer Reviews
                        <div className="badge badge-ghost">{serviceReviews?.length || 0}</div>
                    </h3>
                    <div className='space-y-4 max-h-[500px] overflow-y-auto pr-2'>
                        {serviceReviews?.length > 0 ? (
                            serviceReviews.map((rev, i) => <Review key={i} review={rev} />)
                        ) : (
                            <div className="bg-base-200 p-10 rounded-2xl text-center text-base-content/50">No reviews yet.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl mb-4 text-primary text-center">Confirm Booking</h3>
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase">Service</label>
                            <input type="text" value={title} readOnly className='input input-bordered bg-base-200 cursor-not-allowed' />
                        </div>
                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase">Your Email</label>
                            <input type="email" value={user?.email} readOnly className='input input-bordered bg-base-200 cursor-not-allowed' />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase">Price (BDT)</label>
                                <input type="text" defaultValue={Price} name='price' className='input input-bordered' />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase">Date</label>
                                <input type="date" required name='bookingDate' className='input input-bordered' />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary w-full mt-6 uppercase' disabled={bookingMutation.isPending}>
                            {bookingMutation.isPending ? 'Processing...' : 'Confirm Purchase'}
                        </button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ServiceDetails;