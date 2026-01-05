import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/UseRole';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import LoadingSpinner from '../Components/Loading/LoadingSpinner';

const AdminRoutes = ({ children }) => {
    const navigate = useNavigate(null)

    const { loading, logOut, } = useAuth()

    const { role, isLoading } = useRole()

    if (loading || isLoading) {
        return <div className='h-screen grid place-items-center'>
            <LoadingSpinner />
        </div>
    }
    if (role !== 'admin') {
        return logOut()
            .then(() => {
                navigate('/auth')
            })
            .catch(error => toast.error(error.code));
    }
    return children
};

export default AdminRoutes;