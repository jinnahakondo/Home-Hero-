import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
    const { user, setLoading, logOut, } = useAuth()
    // useEffect(() => {
    //     const html = document.querySelector("html");
    //     html.setAttribute("data-theme", theme)
    //     localStorage.setItem("theme", theme)
    //     const nav = document.querySelector('nav');
    //     if (theme === 'dark') {
    //         nav.style.backgroundColor = "black"
    //     }
    //     else {
    //         nav.style.backgroundColor = "#fff"
    //     }

    // }, [theme])
    const handelLogOut = () => {
        logOut()
            .then(() => {
                setLoading(false)
                toast.success("signOUt success");
            })
            .catch(error => {
                toast.error(error.code);
            })
    }

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/services'}>Services</NavLink></li>
        <li><NavLink to={'/about'}>About</NavLink></li>
        <li><NavLink to={'/contact'}>Contact</NavLink></li>

        {user &&
            <>
                <li><NavLink to={'/my-services'}>My Services</NavLink></li>
                <li><NavLink to={'/add-services'}>Add Service</NavLink></li>
            </>
        }
    </>
    // dark & light
    const handelTheme = (checked) => {
        setTheme(checked ? 'dark' : 'light')
    }

    return (
        <nav className='fixed w-full 0 z-50 top-0 bg-red bg-white border-b border-base-300 '>
            <div className="navbar h-20 max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3   w-52 p-2 shadow`}>
                            {links}
                        </ul>
                    </div>
                    <a className=" text-xl font-bold ">
                        <span className='text-primary'>Home</span>Hero
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-5 font-medium ">
                        {links}
                    </ul>

                </div>
                <div className="navbar-end">
                    <div className='mr-5 text-xl text-primary'>
                        < FaShoppingCart />
                    </div>
                    <div className="flex-none">
                        {user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="user's image"
                                            src={user?.photoURL} />
                                    </div>
                                </div>

                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow z-10">
                                    <p>{user?.displayName}</p>
                                    <li>
                                        <Link to={'/my-profile'} > Profile</Link>
                                    </li>
                                    <li><Link to={'/my-bookings'}>My Bookings</Link></li>
                                    <div className='ml-3'>
                                        <input type="checkbox"
                                            checked={theme == 'dark' ? true : false}
                                            onChange={(e) => handelTheme(e.target.checked)}
                                            className="toggle theme-controller" />
                                    </div>
                                    <li><button onClick={handelLogOut}>Logout</button></li>
                                </ul>
                            </div>
                            :
                            <>

                                <Link to={'/auth'} className='btn btn-primary hover px-8 py-4 rounded'>Login</Link>
                            </>
                        }

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;



