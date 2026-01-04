import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://home-hero-server-api.vercel.app',
});
const useAxios = () => {
    return instance;
};

export default useAxios;