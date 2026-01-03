import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSecureAxios from '../../Hooks/useSecureAxios';
import Loader from '../Loader/Loader';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Review from '../Review/Review';

const ServiceDetails = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const modalRef = useRef()
    const instance = useSecureAxios()
    const { id } = useParams()
    const [service, setService] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        instance.get(`/services/${id}`)
            .then(data => {
                setService(data.data || [])

            })

        // veryfing is service was created by me ?
        if (user && service) {
            if (user.email === service.Email) {
                setIsDisabled(true)
            }
        }

    }, [instance, id, user, service])

    // for review 
    const handelReview = (e) => {
        e.preventDefault();
        const rating = e.target.rating.value;
        const comment = e.target.comment.value;
        const review = { user: user?.displayName, userImage: user?.photoURL, rating, comment, }
        instance.patch(`/services/reviews/${service._id}`, review)
            .then(() => {
                toast.success('your comment has been saved')
            })

    }


    if (!service) {
        return <Loader />
    }

    const handelSubmit = e => {
        e.preventDefault();
        const serveicId = service._id;
        const serviceName = e.target.serviceName.value;
        const Email = user.email;
        const Price = e.target.price.value;
        const bookingDate = e.target.bookingDate.value;
        const newBooking = { serveicId, serviceName, serviceImage: service.image, Email, Price, bookingDate }

        instance.post('/bookings', newBooking)
            .then(data => {
                if (data.data.insertedId) {
                    toast.success('service has been booked')
                    modalRef.current.close()
                }
            })

    }
    // console.log(service.image);
    return (
        <div className='max-w-7xl mx-auto px-5 mt-20 min-h-screen'>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
                <div>
                    <img src={service.image} alt="" />
                </div>
                <div className='space-y-2'>
                    <h2 className='text-lg  md:text-2xl lg:text-4xl font-bold mb-3'>{service.title}</h2>
                    <p className='font-medium'>BDT {service.Price}</p>
                    <div>
                        <p className='text-gray-500 font-bold'>description:</p>
                        <p className='text-gray-500'>{service.Description}</p>
                    </div>
                    <p className='text-gray-500'>Provider Name: {service.provider}</p>
                    <p className='text-gray-500'>Provider Email: {service.Email}</p>
                    <p className='text-gray-500'>published date: {service.created_at}</p>

                </div>
            </div>
            <div className='mt-10 flex input-accent gap-5'>
                <button onClick={() => navigate(-1)} className='btn py-5 bg-black text-white'>Go Back</button>
                <button onClick={() => { modalRef.current.showModal() }} disabled={isDisabled} className='btn btn-primary px-8'>Book now</button>
            </div>

            {/* <-----reviews section-----> */}

            <div className=''>
                <h2 className='heading mt-10 mb-7 text-center'>Rate this service</h2>
                <form className='space-y-10' onSubmit={handelReview}>
                    <select className='btn bg-amber-500 border border-gray-600 rounded-lg' name='rating'>
                        <option disabled defaultValue={''}>select for rating</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    {/*Description  */}
                    <div className='flex flex-col gap-2'>
                        <textarea name="comment" placeholder='What do you think about this servic?' rows="7" required className='border border-gray-300 rounded-lg p-3 outline-0'></textarea>
                    </div>
                    <div className=''>
                        <button type='submit' className='btn btn-primary'>Comment</button>
                    </div>
                </form>
            </div>


            {/* see review  */}

            <div className='flex flex-col gap-5'>
                <h3 className='text-xl font-bold text-primary mt-20 mb-5'>Reviews</h3>
                {
                    service.serviceReviews &&
                    service?.serviceReviews.map((review, i) => <Review key={i} review={review} />)
                }
            </div>
            {/* </----reviews section-----> */}



            {/* modal  */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-sm:p-0">
                    <div className='max-w-3xl rounded-2xl mx-5 md:mx-auto bg-white  p-7 ' >
                        <div>
                            <div>
                                <img src={service.image} alt={service.title} />
                            </div>
                            <h3 className='text-xl font-semibold mb-3'>{service.title}</h3>
                        </div>
                        <h2 className='heading mb-4 mt-5'>Booking Service</h2>
                        <form className='space-y-4' onSubmit={handelSubmit}>

                            {/* Service title  */}
                            <div className='flex flex-col gap-2'>
                                <label>Service Title</label>
                                <input type="text"
                                    value={service.title}
                                    readOnly
                                    name='serviceName' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                            </div>
                            {/* User Email  */}
                            <div className='flex flex-col gap-2'>
                                <label>User Email</label>
                                <input type="email"
                                    value={user.email}
                                    readOnly
                                    name='userEmail' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                            </div>
                            {/*Price */}
                            <div className='flex flex-col gap-2'>
                                <label>Price</label>
                                <input type="text" defaultValue={service.Price} name='price' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                            </div>
                            {/* Booking Date */}
                            <div className='flex flex-col gap-2'>
                                <label>Booking Date</label>
                                <input type="date" required placeholder='category' name='bookingDate' className='h-12 rounded-lg border px-5 border-gray-300 outline-0' />
                            </div>

                            <div className=' mt-10 flex justify-between items-center'>
                                <button className='btn' onClick={(e) => {
                                    e.preventDefault()
                                    modalRef.current.close()
                                }}>close</button>
                                <button type='submit' className='btn btn-primary text-white'>Book</button>
                            </div>
                        </form>
                    </div>

                </div>
            </dialog>

        </div>
    );
};

export default ServiceDetails;