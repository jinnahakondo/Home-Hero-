import React from 'react';
import Navbar from '../../Components/Header/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Outlet } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Components/Loader/Loader';

const MainLayout = () => {
    const { loading } = useAuth()
    if (loading) {
        return <Loader />
    }
    return (
        <div className='min-h-screen bg-base-100 text-base-content'>
            <header>
                <Navbar />
            </header>
            <main className='bg-base-100'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;