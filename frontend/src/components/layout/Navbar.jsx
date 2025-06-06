import React, { useState } from 'react';
import NotificationsDropdown from '../Home/NotificationsDropdown';
import SettingsModal from '../Home/SettingsModal';
import { Link } from 'react-router-dom';
import { MessagesPanel } from "../Home"
import dogFootPrint from "../../assets/footprint.jpg"

// Icons from lucide-react
import { Bell, MessageSquare, Settings, Compass, Home, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [showMessages, setShowMessages] = useState(false)

    const user = useSelector(state => state.auth);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const openSettings = () => {
        setIsSettingsModalOpen(true);
    };

    const closeSettings = () => {
        setIsSettingsModalOpen(false);
    };

    const toggleMessagesPanel = () => {
        setShowMessages(pre => !pre)
    }

    return (
        <nav style={{ backgroundImage: `url(${dogFootPrint})` }} className={`shadow-md px-6 py-4 flex justify-between items-center sticky top-0 left-1 z-50`}>
            {/* Left: Logo */}
            <div className="flex items-center gap-4">
                <Link to="/" className="text-3xl font-extrabold text-blue-600">
                    PetCommunity
                </Link>
            </div>

            {/* Center: Search Bar with Icon */}
            <div className="flex-1 flex justify-center">
                <div className="relative w-[40rem] left-16">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <Search className="w-4 h-4" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search PetCommunity..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>

            {/* Right: Icons */}
            <div className="flex gap-6 items-center px-5 py-2 bg-white">
                <Link to="/" className="flex items-center justify-center p-2 bg-white border-2 border-blue-500 rounded-[50%] hover:bg-blue-500 hover:text-white" title="Home">
                    <Home className="w-6 h-6" />
                </Link>

                {/* <Link to="/discover" className="flex items-center justify-center p-2 bg-white border-2 border-blue-500 rounded-[50%] hover:bg-blue-500 hover:text-white" title="Discover">
                    <Compass className="w-5 h-5" />
                </Link> */}

                { user.status &&
                    <button onClick={toggleMessagesPanel} className="flex items-center justify-center p-2 bg-white border-2 border-blue-500 rounded-[50%] hover:bg-blue-500 hover:text-white"title="Messages">
                        <MessageSquare className="w-5 h-5" />
                    </button>
                }

                { user.status &&
                    <button onClick={openSettings} className="flex items-center justify-center p-2 bg-white border-2 border-blue-500 rounded-[50%] hover:bg-blue-500 hover:text-white" title="Settings">
                        <Settings className="w-5 h-5" />
                    </button>
                }

                { user.status &&
                    <div className="relative">
                        <button onClick={toggleNotifications} className="flex items-center justify-center p-2 bg-white border-2 border-blue-500 rounded-[50%] hover:bg-blue-500 hover:text-white" title="Notifications">
                            <Bell className="w-5 h-5" />
                        </button>
                        {showNotifications && <NotificationsDropdown />}
                    </div>
                }

                { user.status &&
                    <Link to="/profile" title="Profile">
                        <img
                            src={ user.userData?.avatar?.url }
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover object-center border-2 border-blue-500 hover:ring-2 ring-blue-400 transition duration-200"
                        />
                    </Link>
                }
            </div>

            {/* Settings Modal */}
            <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettings} />

            {/* Slide-in Messages Panel */}
            {showMessages && (
                <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="font-semibold text-lg">Messages</h3>
                        <button onClick={toggleMessagesPanel} className="text-red-500 font-bold text-xl">&times;</button>
                    </div>
                    <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
                        <MessagesPanel />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
