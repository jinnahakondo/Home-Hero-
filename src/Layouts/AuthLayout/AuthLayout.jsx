import React from 'react';
import Navbar from '../../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';

const AuthLayout = () => {
    return (
        <div className=' '>
            <header>
                <Navbar />
            </header>
            <main className='max-w-7xl px-5 my-20 mx-auto h-[70vh] flex justify-center items-center'>
                <Outlet></Outlet>
            </main>
            <footer>
                <div className='max-w-7xl mx-auto pl-6'>
                    <Footer />
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;