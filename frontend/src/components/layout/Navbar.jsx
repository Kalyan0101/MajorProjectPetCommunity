import React, { useState } from 'react';
import NotificationsDropdown from '../Home/NotificationsDropdown';
import SettingsModal from '../Home/SettingsModal';
import { Link } from 'react-router-dom';

// Icons from lucide-react
import { Bell, MessageSquare, Settings, Compass, Home, Search } from 'lucide-react';

const Navbar = ({ toggleMessagesPanel }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const openSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          PetCommunity
        </Link>
      </div>

      {/* Center: Search Bar with Icon */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-80">
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
      <div className="flex gap-6 items-center ml-6">
        <Link to="/" className="hover:text-blue-500" title="Home">
          <Home className="w-6 h-6" />
        </Link>

        <Link to="/discover" className="hover:text-blue-500" title="Discover">
          <Compass className="w-5 h-5" />
        </Link>

        <button onClick={toggleMessagesPanel} className="hover:text-blue-500" title="Messages">
          <MessageSquare className="w-5 h-5" />
        </button>

        <button onClick={openSettings} className="hover:text-blue-500" title="Settings">
          <Settings className="w-5 h-5" />
        </button>

        <div className="relative">
          <button onClick={toggleNotifications} className="text-gray-700 hover:text-blue-500" title="Notifications">
            <Bell className="w-5 h-5" />
          </button>
          {showNotifications && <NotificationsDropdown />}
        </div>

        {/* Profile Picture */}
        <Link to="/profile" title="Profile">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300 hover:ring-2 ring-blue-400 transition duration-200"
          />
        </Link>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettings} />
    </nav>
  );
};

export default Navbar;
