import React from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader/Loader';

const Register = () => {
    const navigate = useNavigate()
    const { createUser, setLoading, updateUserProfile, googleSignIn, loading } = useAuth();
    const handelCreateUser = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const displayName = e.target.name.value;
        const photoURL = e.target.photo.value;

        if (!/^.{6,}$/.test(password)) {
            return toast.error("Password must have at least 6 characters");
        }
        else if (!/[A-Z]/.test(password)) {
            return toast.error("Password must have at least on uppercase");
        }
        else if (!/[a-z]/.test(password)) {
            return toast.error("Password must have at least on lowercase");
        }
        createUser(email, password)
            .then(result => {
                // console.log(result.user);
                updateUserProfile({ displayName, photoURL })
                    .then(() => {
                        navigate('/')
                        setLoading(false)
                        toast.success('account created successfully')
                    })
            })
            .catch(error => {
               toast.error(error.code);
            })
    }

    //login with google
    const handelGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // console.log(result.user);
                navigate('/')
                setLoading(false)
                toast.success('log in success')
            })
            .catch(error => {
                toast.error(error.code);
            })
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className='w-full '>
            <div className='bg-white shadow-md mx-auto max-w-[450px] p-7 rounded-2xl'>
                <h3 className=' heading text-center mt-5 mb-3'>Create new account</h3>
                <p className='text-center mb-5'>Access to our all services or service
                    providers </p>
                <form className='w-full space-y-2' onSubmit={handelCreateUser}>
                    {/* Name*/}
                    <div className=''>
                        <label className="label">Name</label>
                        <input type="text"
                            required
                            name='name'
                            className="input w-full"
                            placeholder="Jinnah" />
                    </div>
                    {/* Photo  */}
                    <div>
                        <label className="label">Photo</label>
                        <input type="text"
                            name='photo'
                            className="input w-full"
                            placeholder="https://example.com" />
                    </div>
                    {/* email  */}
                    <div>
                        <label className="label">Email</label>
                        <input type="email"
                            required
                            name='email'
                            className="input  w-full"
                            placeholder="example@gmail.com" />
                    </div>
                    {/* password  */}
                    <div>
                        <label className="label">Password</label>
                        <input type="password"
                            required
                            name='password'
                            className="input  w-full"
                            placeholder="password" />
                    </div>
                    <button className="btn btn-primary hover mt-4 w-full"> Sign up</button>
                </form>
                <div className='text-center my-4'>
                    <p>or</p>
                    {/* Google */}
                    <button
                        onClick={handelGoogleSignIn}
                        className="btn w-full py-3 my-3 bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <Link to={'/auth'} className='text-blue-600'>Login</Link>
                </div>

            </div>
        </div>
    );
};

export default Register;