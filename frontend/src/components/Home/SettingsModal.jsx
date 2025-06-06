import React, { useState } from 'react';
import authService from '../../backend/auth';
import { logout as storeLogout } from '../../store/authSlice.store';
import { useDispatch } from 'react-redux';
import { successAlert } from '../alert/success.alert';
import { useNavigate } from 'react-router-dom';
import { LogOut, PawPrint, User2 } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
    const [isPetDialogOpen, setPetDialogOpen] = useState(false);

    if (!isOpen) return null;

    const logout = () => {
        authService.logout()
            .then(data => {
                successAlert(data.message);
                dispatch(storeLogout());
                onClose();
                navigate("/");
            })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 box-border">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
                <p className="text-gray-600 mb-6">Manage your profile and pet information.</p>

                <div className="space-y-4">
                    {/* <div 
                        className="border p-4 rounded hover:bg-gray-200 cursor-pointer hover:text-blue-600"
                        onClick={() => setProfileDialogOpen(true)}
                    >
                        <User2 className='w-5 inline-block mr-1 mb-2'/>
                        <h3 className="font-semibold inline-block">Profile Settings</h3>
                        <p className="text-sm text-gray-500">Edit your profile information.</p>
                    </div> */}

                    {/* <div 
                        className="border p-4 rounded hover:bg-gray-200 cursor-pointer hover:text-blue-600"
                        onClick={() => setPetDialogOpen(true)}
                    >
                        <PawPrint className='w-5 inline-block mr-1 mb-2' />
                        <h3 className="font-semibold inline-block">Pet Settings</h3>
                        <p className="text-sm text-gray-500">Update your pet's information.</p>
                    </div> */}

                    <div 
                        className="border p-4 rounded cursor-pointer hover:text-red-600 hover:bg-gray-200"
                        onClick={logout}
                    >
                        <LogOut className='w-5 inline-block mr-1 mb-2' />
                        <h3 className="font-semibold inline-block">Logout</h3>
                        <p className="text-sm text-gray-500">Sign out of your account.</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
                >
                    ✕
                </button>

                {/* Profile Dialog */}
                {isProfileDialogOpen && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="Name" className="w-full border rounded px-3 py-2" />
                                <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
                                <input type="text" placeholder="Phone" className="w-full border rounded px-3 py-2" />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setProfileDialogOpen(false)}
                                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Pet Dialog */}
                {isPetDialogOpen && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                            <h3 className="text-xl font-bold mb-4">Edit Pet Details</h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="Pet Name" className="w-full border rounded px-3 py-2" />
                                <input type="text" placeholder="Breed" className="w-full border rounded px-3 py-2" />
                                <input type="number" placeholder="Age" className="w-full border rounded px-3 py-2" />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setPetDialogOpen(false)}
                                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsModal;
