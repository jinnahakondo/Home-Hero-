import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContex';

const useAuth = () => {
    const authinfo = use(AuthContext)
    return authinfo
};

export default useAuth;