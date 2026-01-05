import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import useAuth from '../../Hooks/useAuth';
import instance from '../../Hooks/useAxios';
import LoadingButton from '../../Components/Loading/LoadingButton';

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const { login, googleSignIn } = useAuth();
    const axiosSecure = instance();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const demoCredentials = {
        admin: { email: "admin@gmail.com", password: "Asdf@1234" },
        user: { email: "user@gmail.com", password: "Asdf@1234" }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!/^.{6,}$/.test(password)) return toast.error("Min 6 characters required");

        try {
            setIsLoading(true);
            const userCredential = await login(email, password);
            localStorage.setItem("access-token", userCredential.user.accessToken);
            toast.success("Welcome Back!");
            navigate('/');
        } catch (error) {
            toast.error(error?.code || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsGoogleLoading(true);
            const { user } = await googleSignIn();
            localStorage.setItem("access-token", user.accessToken);
            const userInfo = {
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL,
                role: 'user'
            };
            await axiosSecure.post('/users', userInfo);
            toast.success("Login Successful");
            navigate('/');
        } catch (error) {
            toast.error("Google Sign-in failed");
        } finally {
            setIsGoogleLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center px-4 py-12 w-full">
            <div className="max-w-lg w-full bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300">
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-base-content mb-2">Welcome Back</h2>
                        <p className="text-sm text-base-content/60">Enter your details to access your account</p>
                    </div>

                    {/* Social Login */}
                    <LoadingButton
                        onClick={handleGoogleSignIn}
                        loading={isGoogleLoading}
                        loadingText="Signing in..."
                        variant="outline"
                        className="w-full rounded-xl flex items-center gap-3 border-base-300 hover:bg-base-200 transition-all font-semibold"
                    >
                        <FcGoogle className="text-2xl" /> Login with Google
                    </LoadingButton>

                    <div className="divider my-8 text-xs text-base-content/40 uppercase tracking-widest">or continue with email</div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="form-control w-full">
                            <label className="label-text font-semibold mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40" />
                                <input
                                    ref={emailRef}
                                    type="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    className="input input-bordered w-full pl-12 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <div className="flex justify-between mb-2 ml-1">
                                <label className="label-text font-semibold">Password</label>
                                <a className="text-xs text-primary hover:underline cursor-pointer">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40" />
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="input input-bordered w-full pl-12 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <LoadingButton
                            type="submit"
                            loading={isLoading}
                            loadingText="Signing in..."
                            className="w-full rounded-xl text-white shadow-lg shadow-primary/30 mt-2"
                            variant="primary"
                        >
                            Sign In
                        </LoadingButton>
                    </form>

                    {/* Demo Logins */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                emailRef.current.value = demoCredentials.admin.email;
                                passwordRef.current.value = demoCredentials.admin.password;
                            }}
                            className="btn btn-sm btn-primary btn-outline rounded-lg text-xs"
                        > Admin Demo </button>
                        <button
                            type="button"
                            onClick={() => {
                                emailRef.current.value = demoCredentials.user.email;
                                passwordRef.current.value = demoCredentials.user.password;
                            }}
                            className="btn btn-primary btn-sm btn-outline rounded-lg text-xs "
                        > User Demo </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center mt-8 text-sm text-base-content/70">
                        Don't have an account?
                        <Link to="/auth/register" className="text-primary font-bold ml-1 hover:underline">Register Now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;