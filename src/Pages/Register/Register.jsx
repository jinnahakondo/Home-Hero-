import React from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlinePhotograph } from "react-icons/hi";
import Loader from '../../Components/Loader/Loader';
import useAuth from '../../Hooks/useAuth';
import instance from '../../Hooks/useAxios';

const Register = () => {
    const navigate = useNavigate();
    const { createUser, updateUserProfile, googleSignIn, setLoading, loading } = useAuth();
    const axiosSecure = instance();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        // Validation logic
        if (password.length < 6) return toast.error("Password must be at least 6 characters");
        if (!/[A-Z]/.test(password)) return toast.error("Need at least one uppercase letter");
        if (!/[a-z]/.test(password)) return toast.error("Need at least one lowercase letter");

        try {
            setLoading(true);
            const result = await createUser(email, password);
            await updateUserProfile(name, photo);

            const userInfo = {
                userName: name,
                userEmail: email,
                userImage: photo,
                role: 'user'
            };

            const res = await axiosSecure.post('/users', userInfo);
            if (res.data.insertedId || res.data.message) {
                toast.success("Account created successfully!");
                navigate('/');
            }
        } catch (error) {
            toast.error(error.code || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            const { user } = await googleSignIn();
            const userInfo = {
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL,
                role: 'user'
            };
            await axiosSecure.post('/users', userInfo);
            toast.success("Signed up with Google!");
            navigate('/');
        } catch (error) {
            toast.error("Google sign-up failed");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-lg w-full bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300">
                <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-base-content mb-2">Create Account</h2>
                        <p className="text-sm text-base-content/60">Join us to access all services</p>
                    </div>

                    {/* Social Sign Up */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full rounded-xl flex items-center gap-3 border-base-300 hover:bg-base-200 transition-all font-semibold"
                    >
                        <FcGoogle className="text-2xl" /> Sign up with Google
                    </button>

                    <div className="divider my-8 text-xs text-base-content/40 uppercase tracking-widest">or register with email</div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="form-control w-full">
                                <label className="label-text font-semibold mb-2 ml-1 text-xs">Full Name</label>
                                <div className="relative">
                                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40" />
                                    <input type="text" name="name" placeholder="John Doe" className="input input-bordered w-full pl-11 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" required />
                                </div>
                            </div>
                            {/* Photo URL */}
                            <div className="form-control w-full">
                                <label className="label-text font-semibold mb-2 ml-1 text-xs">Photo URL</label>
                                <div className="relative">
                                    <HiOutlinePhotograph className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40" />
                                    <input type="text" name="photo" placeholder="https://image.link" className="input input-bordered w-full pl-11 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" required />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label-text font-semibold mb-2 ml-1 text-xs">Email Address</label>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40" />
                                <input type="email" name="email" placeholder="name@example.com" className="input input-bordered w-full pl-11 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" required />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control w-full">
                            <label className="label-text font-semibold mb-2 ml-1 text-xs">Password</label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40" />
                                <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full pl-11 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" required />
                            </div>
                        </div>

                        <button className="btn btn-primary w-full rounded-xl text-white shadow-lg shadow-primary/30 mt-4 h-12">
                            Create Free Account
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center mt-8 text-sm text-base-content/70">
                        Already have an account?
                        <Link to="/auth" className="text-primary font-bold ml-1 hover:underline text-md">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;