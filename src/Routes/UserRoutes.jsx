import React from 'react';
import useRole from '../Hooks/UseRole';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../Components/Loading/LoadingSpinner';

const UserRoutes = ({ children }) => {
    const navigate = useNavigate(null)
    const { logOut } = useAuth()
    const { role, isLoading } = useRole()
    if (isLoading) {
        return <div className='h-screen grid place-items-center'>
            <LoadingSpinner />
        </div>
    }
    if (role !== 'user') {
        return logOut()
            .then(() => {
                navigate('/auth')
            })
            .catch(error => toast.error(error.code));
    }
    return children
};

export default UserRoutes;