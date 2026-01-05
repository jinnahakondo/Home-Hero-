import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import useRole from '../../Hooks/UseRole';
import { useTheme } from '../../Components/ThemeProvider/ThemeProvider';
import { LogOut, Menu, X, Sun, Moon, User, Settings, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, setLoading, logOut } = useAuth();
    const { role } = useRole();
    const { theme, toggleTheme } = useTheme();

    const handelLogOut = () => {
        logOut()
            .then(() => {
                setLoading(false)
                toast.success("Signed out successfully");
            })
            .catch(error => {
                toast.error(error.code);
            })
    }

    const publicLinks = [
        { to: '/', label: 'Home' },
        { to: '/services', label: 'Services' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
        { to: '/help', label: 'Help' }
    ]

    const protectedLinks = user ? [
        { to: '/my-bookings', label: 'My Bookings' },
        { to: '/favorites', label: 'Favorites' },
        ...(role === 'admin' ? [{ to: '/dashboard/admin', label: 'Dashboard' }] : []),
        ...(role === 'user' ? [{ to: '/dashboard/user', label: 'Dashboard' }] : [])
    ] : []

    const allLinks = [...publicLinks, ...protectedLinks]

    const handelTheme = () => {
        toggleTheme();
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <nav className='fixed w-full z-50 top-0 bg-base-100/95 backdrop-blur-md border-b border-base-300 shadow-sm'>
            <div className="navbar h-20 max-w-7xl mx-auto px-4">
                {/* Mobile menu button */}
                <div className="navbar-start">
                    <button
                        className="btn btn-ghost lg:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Logo */}
                    <Link to={'/'} className="text-xl font-bold ml-2 lg:ml-0">
                        <span className='text-primary'>Home</span>Hero
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2 font-medium">
                        {publicLinks.map(link => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-primary/10 hover:text-primary'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right side actions */}
                <div className="navbar-end gap-3">
                    {/* Theme toggle */}
                    <button
                        onClick={handelTheme}
                        className="btn btn-ghost btn-circle"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="avatar hover:opacity-80 transition-opacity">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=ff6251&color=fff`}
                                        alt="Profile"
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-xl bg-base-100 rounded-2xl w-64 border border-base-200">
                                <div className="px-4 py-3 border-b border-base-200 mb-2">
                                    <p className="text-sm font-bold truncate">{user?.displayName}</p>
                                    <p className="text-xs opacity-60 truncate">{user?.email}</p>
                                    <span className="badge badge-primary badge-xs mt-1 capitalize">{role}</span>
                                </div>

                                {role === 'admin' && (
                                    <li><Link to={'/dashboard/admin'}><Settings size={16} /> Admin Dashboard</Link></li>
                                )}
                                {role === 'user' && (
                                    <li><Link to={'/dashboard/user'}><Settings size={16} /> User Dashboard</Link></li>
                                )}

                                <li className="mt-2 pt-2 border-t border-base-200">
                                    <button onClick={handelLogOut} className="text-error">
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to={'/auth'} className='btn btn-ghost'>Login</Link>
                            <Link to={'/auth/register'} className='btn btn-primary'>Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-base-100 border-t border-base-200 shadow-lg">
                    <div className="px-4 py-4 space-y-2">
                        {allLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    `block px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-primary/10 hover:text-primary'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}

                        {!user && (
                            <div className="pt-4 border-t border-base-200 space-y-2">
                                <Link
                                    to="/auth"
                                    onClick={closeMobileMenu}
                                    className="block w-full btn btn-ghost"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/auth/register"
                                    onClick={closeMobileMenu}
                                    className="block w-full btn btn-primary"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;



