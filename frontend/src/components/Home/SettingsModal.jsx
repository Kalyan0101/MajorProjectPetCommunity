import React, { useState } from 'react';
import authService from '../../backend/auth';
import { logout as storeLogout } from '../../store/authSlice.store';
import { useDispatch } from 'react-redux';
import { successAlert } from '../alert/success.alert';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, PawPrint, User2 } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const navigateToProfile = () => {
        onClose();
        navigate("/profile");
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 box-border">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
                <p className="text-gray-600 mb-6">Manage your profile and pet information.</p>

                <div className="space-y-4">

                    <div
                        className="border p-4 rounded hover:bg-gray-200 cursor-pointer hover:text-blue-600"
                        onClick={navigateToProfile}
                    >
                        <Settings className="w-5 inline-block mr-1 mb-2" />
                        <h3 className="font-semibold inline-block">Profile Settings</h3>
                        <p className="text-sm text-gray-500">Update your & your pet's information.</p>
                    </div>

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
            </div>
        </div>
    );
};

export default SettingsModal;
