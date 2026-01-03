import React from 'react';
import useAuth from './useAuth';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://home-hero-server-api.vercel.app',
});
const useSecureAxios = () => {
    const { user } = useAuth()

    // set token in header for all api 
    instance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${user?.accessToken}`
        return config;
    })
    return instance;
};

export default useSecureAxios;