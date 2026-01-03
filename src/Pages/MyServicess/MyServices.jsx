import React, { useEffect, useState } from 'react';
import useSecureAxios from '../../Hooks/useSecureAxios';
import useAuth from '../../Hooks/useAuth';
import { MdDelete, MdEditDocument } from "react-icons/md";
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyServices = () => {
    const { user } = useAuth()
    const instance = useSecureAxios()
    const [myservice, setMyService] = useState([])

    useEffect(() => {
        if (user) {
            instance.get(`my-services?email=${user.email}`)
                .then(data => {
                    setMyService(data.data);
                })
        }

    }, [instance, user])


    // handel Delete
    const handelDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this service?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/services/${id}`)
                    .then(() => {
                        setMyService(myservice.filter(s => s._id !== id))
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your services has been deleted.",
                            icon: "success"
                        });
                    })
            }
        });


    }
    return (
        <div className='max-w-7xl mx-auto px-5 min-h-screen'>



            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-sm md:text-base'>
                        <tr>
                            <th>SL</th>
                            <th>Service Info</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myservice.map((service, i) => <tr key={service._id}>
                            <th>{i + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="h-12 w-16 rounded-sm object-cover">
                                            <img
                                                src={service.image}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium ">{service.title}</h4>
                                    </div>
                                </div>
                            </td>

                            <td>{service.Category}</td>
                            <td className='grid grid-cols-1 md:grid-cols-2 gap-4 ' >

                                <Link to={`/update-service/${service._id}`} className="btn btn-primary px-5 "><span className='text-xl '><MdEditDocument /></span></Link>

                                <button onClick={() => handelDelete(service._id)} className="btn btn-error text-white  px-5"><span className='text-xl'><MdDelete /></span></button>

                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyServices;