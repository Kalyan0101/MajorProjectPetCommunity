import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser, faLock, faBell, faShield } from '@fortawesome/free-solid-svg-icons'
import authService from '../../backend/auth';
import { logout as storeLogout } from '../../store/authSlice.store';
import { useDispatch } from 'react-redux';
import { successAlert } from '../alert/success.alert';
import { useNavigate } from 'react-router-dom';

const SettingsModal = ({ isOpen, onClose }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    if (!isOpen) return null;  // Don't render if modal is not open

    const logout = () => {
        authService.logout()
            .then(data => {
                successAlert(data.message);
                dispatch(storeLogout());
                navigate("/");
            })
    }

    const list = [
        {
            name: "Profile Settings",
            link: "#",
            icon: faUser
        },
        {
            name: "Privacy Settings",
            link: "#",
            icon: faLock
        },
        {
            name: "Notification Settings",
            link: "#",
            icon: faBell
        },
        {
            name: "Security Settings",
            link: "#",
            icon: faShield
        },
        {
            name: "Account Settings",
            link: "#"
        }
    ]

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white px-3 py-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

                <ul className="cursor-pointer">
                    {
                        list.map((item, index) =>
                            <li
                                key={index}
                                className="text-blue-600 hover:bg-gray-200 text-lg py-2 px-3 rounded-lg flex items-center"
                            ><FontAwesomeIcon icon={item.icon} className='p-2 bg-gray-300 rounded-[50%]' />
                                <a className='ml-3' href={item.link}>{item.name}</a>
                            </li>
                        )
                    }
                </ul>

                <button
                    className="text-blue-600 hover:bg-gray-200 text-lg py-1 px-3 rounded-lg flex items-center w-full"
                    onClick={logout}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className='p-2 bg-gray-300 rounded-[50%] mr-3' />
                    Logout
                </button>

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-red-500 text-white p-2 rounded-md"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SettingsModal;
