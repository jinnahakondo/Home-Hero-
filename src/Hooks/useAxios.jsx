import axios from 'axios';
import React from 'react';

const instance = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://b-12-a10-home-hero-server.vercel.app',
});
const useAxios = () => {
    return instance;
};

export default useAxios;