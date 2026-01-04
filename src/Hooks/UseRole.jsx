import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useSecureAxios from './useSecureAxios';
import useAuth from './useAuth';

const useRole = () => {
    const { user } = useAuth()
    const instance = useSecureAxios()

    const { data, isLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await instance.get('/users/role')
            return res.data.role
        },
        enabled: !!user
    })

    return { role: data, isLoading }
};

export default useRole;