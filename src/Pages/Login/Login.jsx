import React from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader/Loader';
import useAuth from '../../Hooks/useAuth';
import instance from '../../Hooks/useAxios';

const Login = () => {
    const navigate = useNavigate();
    const { login, setLoading, googleSignIn, loading } = useAuth();
    const axiosSecure = instance();

    // Email/password login
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Password validations
        if (!/^.{6,}$/.test(password)) return toast.error("Password must have at least 6 characters");
        if (!/[A-Z]/.test(password)) return toast.error("Password must have at least one uppercase");
        if (!/[a-z]/.test(password)) return toast.error("Password must have at least one lowercase");

        try {
            setLoading(true);
            const userCredential = await login(email, password);
            const token = userCredential.user.accessToken;

            // Save token for protected routes
            localStorage.setItem("access-token", token);

            toast.success("Login successful");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error?.code || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // Google sign-in
    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            const { user } = await googleSignIn();

            // Save token
            localStorage.setItem("access-token", user.accessToken);

            // Prepare user info
            const userInfo = {
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL,
                role: 'user'
            };

            // Send to backend
            const res = await axiosSecure.post('/users', userInfo);
            console.log(res.data);

            toast.success("Login with Google successful");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.code || "Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className='w-full'>
            <div className='bg-white shadow-md mx-auto max-w-[450px] p-7 rounded-2xl'>
                <h3 className='heading text-center mt-5 mb-3'>Login to account</h3>
                <p className='text-center mb-5'>
                    Access to all our services or service providers
                </p>
                <form className='w-full space-y-2' onSubmit={handleLogin}>
                    {/* Email */}
                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name='email'
                            required
                            className="input w-full"
                            placeholder="example@gmail.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name='password'
                            required
                            className="input w-full"
                            placeholder="password"
                        />
                    </div>

                    {/* Forgot password */}
                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-primary mt-4 w-full">Login</button>
                </form>

                <div className='text-center my-4'>
                    <p>or</p>

                    {/* Google Sign-in */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn w-full py-3 my-3 bg-white text-black border-[#e5e5e5] flex items-center justify-center gap-2"
                    >
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g>
                                <path d="m0 0H512V512H0" fill="#fff"></path>
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                            </g>
                        </svg>
                        Login with Google
                    </button>

                    <Link to={'/auth/register'} className='text-blue-600'>Create new Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
