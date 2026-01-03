import React, { use } from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/AuthContex';

const PrivateRoutes = ({ children }) => {
    const location = useLocation()
    const { user, loading } = use(AuthContext)
    // console.log(user);
    if (loading) {
        return <Loader />
    }
    if (user) {
        return children
    }
    return <Navigate to={'/auth'}></Navigate>
};

export default PrivateRoutes;