import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipcode: '',
            country: ''
        }
    });

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const response = await axios.post(
                backendUrl + '/api/user/profile',
                {},
                { headers: { token } }
            );
            if (response.data.success) {
                setUserData(response.data.user);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setUserData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setUserData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                backendUrl + '/api/user/update-profile',
                userData,
                { headers: { token } }
            );
            if (response.data.success) {
                toast.success('Profile updated successfully');
                setIsEditing(false);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl mb-8'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className='max-w-2xl mx-auto'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Personal Information */}
                    <div className='bg-white p-6 rounded-lg shadow-sm border'>
                        <h2 className='text-xl font-semibold mb-4'>Personal Information</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='w-full px-3 py-2 border rounded-md disabled:bg-gray-50'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='w-full px-3 py-2 border rounded-md disabled:bg-gray-50'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='w-full px-3 py-2 border rounded-md disabled:bg-gray-50'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className='bg-white p-6 rounded-lg shadow-sm border'>
                        <h2 className='text-xl font-semibold mb-4'>Address Information</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Street</label>
                                <input
                                    type="text"
                                    name="address.street"
                                    value={userData.address.street}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='w-full px-3 py-2 border rounded-md disabled:bg-gray-50'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                                <input
                                    type="text"
                                    name="address.city"
                                    value={userData.address.city}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='w-full px-3 py-2 border rounded-md disabled:bg-gray-50'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
                                <input
                                    type="text"
                                    name="address.state"
                                    value={userData.address.state}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='w-full px-3 py-2 border rounded-md disabled:bg-gray-50'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Zipcode</label>
                                <input
                                    type="text"
                                    name="address.zipcode"
                                    value={userData.address.zipcode}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='w-full px-3 py-2 border rounded-md disabled:bg-gray-50'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Country</label>
                                <input
                                    type="text"
                                    name="address.country"
                                    value={userData.address.country}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='w-full px-3 py-2 border rounded-md disabled:bg-gray-50'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex justify-end gap-4'>
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        fetchUserData(); // Reset form
                                    }}
                                    className='px-6 py-2 border rounded-md hover:bg-gray-50'
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className='px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800'
                                >
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className='px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800'
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile; 