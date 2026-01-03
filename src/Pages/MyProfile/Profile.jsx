import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, updateUserProfile, setLoading } = useAuth()
    // console.log(user);

    const updateProfile = (e) => {
        e.preventDefault()
        const displayName = e.target.name.value;
        const photoURL = e.target.photo.value;

        if (displayName || photoURL) {
            if (displayName && !photoURL) {
                if (displayName.length < 3) {
                    return toast.error("name must be at least 3 charecter");
                }
                return updateUserProfile({ displayName })
                    .then(() => {
                        toast.success("profile updated successfully")
                        setLoading(false)
                    })
                    .catch(error => toast.error(error.code))
            }
            else if (!displayName && photoURL) {
                if (photoURL.length < 5) {
                    return toast.error("please enter a valid url");
                }
                return updateUserProfile({ photoURL })
                    .then(() => {
                        toast.success("profile updated successfully")
                        setLoading(false)
                    })
                    .catch(error => toast.error(error.code))
            }

            else if (displayName && photoURL) {
                if (displayName.length < 3 || !displayName) {
                    return toast.error("name must be at least 3 charecter");
                }
                if (photoURL.length < 5) {
                    return toast.error("please enter a valid url");
                }
                updateUserProfile({ displayName, photoURL })
                    .then(() => {
                        toast.success("profile updated successfully")
                        setLoading(false)
                        // console.log("after update");
                    })
                    .catch(error => toast.error(error.code))
            }
        }
        else {
            return toast.error("please enter your valid name or photo url");
        }

    }
    return (
        <div className='max-w-3xl rounded-2xl mx-5 md:mx-auto bg-white mt-20 p-7' >
            {/* user info */}
            <div className='flex gap-4 flex-col md:flex-row items-center mb-4 '>
                <img src={user.photoURL} className='rounded-full h-16 w-16' />
                <div>
                    <h3 className='text-lg font-semibold max-md:text-center'>{user.displayName}</h3>
                    <p className='text-gray-500'>{user.email}</p>
                    <p className='text-gray-500'>last login: {user.metadata.lastSignInTime}</p>
                </div>
            </div>
            <div className='h-0.5 w-full border border-gray-200'></div>
            <form onSubmit={updateProfile}>
                {/* name  */}
                <div className='py-7 '>
                    <h4 className='font-semibold'> Name</h4>
                    <input type="text" name="name" className='border-b border-gray-300 outline-0 w-full text-gray-500' />
                </div>
                {/* phone number  */}
                <div className='py-7 '>
                    <h4 className='font-semibold'> Phone number</h4>
                    <input type="number" name="number" placeholder='+8801********' className='border-b border-gray-300 outline-0 w-full text-gray-500' />
                </div>
                {/* photo  */}
                <div className='pb-7 '>
                    <h4 className='font-semibold'> photo URL</h4>
                    <input type="text" name='photo' className='border-b border-gray-300 outline-0 w-full text-left text-gray-500' />
                </div>
                {/* email  */}
                <div className='pb-7 '>
                    <h4 className='font-semibold'> email</h4>
                    <input type="email" readOnly defaultValue='jinnahakodon@gmail.com' className='border-b border-gray-300 outline-0 w-full text-left text-gray-500' />
                </div>

                <button type='submit' className="btn btn-primary mt-4 hover">Save Change</button>
            </form>
        </div>
    );
};

export default Profile;