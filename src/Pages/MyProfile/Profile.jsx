import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { Camera, Mail, Phone, User, Calendar, Shield } from 'lucide-react';
import useRole from '../../Hooks/UseRole';

const Profile = () => {
    const { user, updateUserProfile, setLoading } = useAuth();
    const { role } = useRole();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        photo: user?.photoURL || '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateProfile = async (e) => {
        e.preventDefault();

        if (!formData.name && !formData.photo) {
            return toast.error("Please enter your name or photo URL");
        }

        if (formData.name && formData.name.length < 3) {
            return toast.error("Name must be at least 3 characters");
        }

        if (formData.photo && formData.photo.length < 5) {
            return toast.error("Please enter a valid photo URL");
        }

        try {
            setLoading(true);
            const updateData = {};

            if (formData.name) updateData.displayName = formData.name;
            if (formData.photo) updateData.photoURL = formData.photo;

            await updateUserProfile(updateData);
            toast.success("Profile updated successfully");
            setIsEditing(false);
        } catch (error) {
            toast.error(error.code || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-base-content mb-2">My Profile</h1>
                <p className="text-base-content/70">Manage your account information and preferences</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-base-100 border border-base-300 rounded-xl p-6 text-center">
                        <div className="relative inline-block mb-4">
                            <img
                                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=ff6251&color=fff`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                            />
                            <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                                <Camera className="w-4 h-4" />
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-base-content mb-1">
                            {user?.displayName || 'User'}
                        </h2>

                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Shield className="w-4 h-4 text-primary" />
                            <span className="badge badge-primary badge-sm capitalize">{role}</span>
                        </div>

                        <div className="space-y-2 text-sm text-base-content/70">
                            <div className="flex items-center justify-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>{user?.email}</span>
                            </div>

                            {user?.metadata?.lastSignInTime && (
                                <div className="flex items-center justify-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Last login: {formatDate(user.metadata.lastSignInTime)}</span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="btn btn-primary btn-sm mt-4 w-full"
                        >
                            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="lg:col-span-2">
                    <div className="bg-base-100 border border-base-300 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-base-content mb-6">
                            Account Information
                        </h3>

                        <form onSubmit={updateProfile} className="space-y-6">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="input input-bordered w-full"
                                    disabled={!isEditing}
                                />
                            </div>

                            {/* Email (Read-only) */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    className="input input-bordered w-full bg-base-200"
                                    disabled
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/50">
                                        Email cannot be changed
                                    </span>
                                </label>
                            </div>

                            {/* Phone */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Phone Number
                                    </span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+880 1403-703441"
                                    className="input input-bordered w-full"
                                    disabled={!isEditing}
                                />
                            </div>

                            {/* Photo URL */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <Camera className="w-4 h-4" />
                                        Profile Photo URL
                                    </span>
                                </label>
                                <input
                                    type="url"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/photo.jpg"
                                    className="input input-bordered w-full"
                                    disabled={!isEditing}
                                />
                            </div>

                            {/* Account Info */}
                            <div className="bg-base-200 rounded-lg p-4">
                                <h4 className="font-semibold text-base-content mb-3">Account Details</h4>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-base-content/70">Account Type:</span>
                                        <span className="ml-2 font-medium capitalize">{role}</span>
                                    </div>
                                    <div>
                                        <span className="text-base-content/70">Member Since:</span>
                                        <span className="ml-2 font-medium">
                                            {user?.metadata?.creationTime ?
                                                formatDate(user.metadata.creationTime) :
                                                'N/A'
                                            }
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-base-content/70">Email Verified:</span>
                                        <span className={`ml-2 font-medium ${user?.emailVerified ? 'text-success' : 'text-warning'}`}>
                                            {user?.emailVerified ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-base-content/70">Provider:</span>
                                        <span className="ml-2 font-medium">
                                            {user?.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            {isEditing && (
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-1"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="btn btn-ghost flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;