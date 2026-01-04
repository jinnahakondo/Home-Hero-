import React from 'react';
import useRole from '../Hooks/UseRole';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const UserRoutes = ({ children }) => {
    const navigate = useNavigate(null)
    const { logOut } = useAuth()
    const { role, isLoading } = useRole()
    if (isLoading) {

        return 'loading'
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