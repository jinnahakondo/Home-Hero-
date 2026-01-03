import React, { useEffect, useState } from 'react';
import { MdDelete, MdEditDocument } from 'react-icons/md';
import useAuth from '../../Hooks/useAuth';
import useSecureAxios from '../../Hooks/useSecureAxios';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loader/Loader';

const MyBookings = () => {
    const [myBookings, setMyBookings] = useState([]);

    const { user } = useAuth()
    const instance = useSecureAxios()


    useEffect(() => {
        instance.get(`/my-bookings?email=${user.email}`)
            .then(data => {
                setMyBookings(data.data);
            })
    }, [instance, user])

    // console.log(myBookings);

    // booking delete function
    const handelDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/booking/${id}`)
                    .then(() => {
                        setMyBookings(myBookings.filter(s => s._id !== id))
                        Swal.fire({
                            text: "Your booking has been canceled.",
                            icon: "success"
                        });
                    })
            }
        });

    }
    // console.log();
    if (!user) {
        return <Loader />
    }
    return (
        <div className='max-w-7xl mx-auto px-5 min-h-screen'>
            <h2 className='heading text-center my-6'>My Bookings</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-sm md:text-base'>
                        <tr>
                            <th>SL</th>
                            <th>booking Info</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myBookings.map((booking, i) => <tr key={booking._id}>
                            <th>{i + 1}</th>
                            <td>
                                <div className="flex  items-center justify-start gap-3">
                                    <div className="avatar">
                                        <div className="h-12 w-16 rounded-sm object-cover">
                                            <img
                                                src={booking.serviceImage}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium ">{booking.serviceName}</h4>
                                    </div>
                                </div>
                            </td>

                            <td>{booking.Price}</td>
                            <td>{booking.bookingDate}</td>
                            <td className='grid grid-cols-1 md:grid-cols-2 gap-4 ' >
                                <button onClick={() => handelDelete(booking._id)} className="btn btn-error text-white  px-5">cancel</button>
                                <Link to={`/service-details/${booking.serveicId}`} className="btn btn-primary text-white px-5" >Rating</Link>

                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;