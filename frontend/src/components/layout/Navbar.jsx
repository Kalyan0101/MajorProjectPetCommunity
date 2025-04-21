// Navbar.jsx
import React, { useState } from 'react';
import NotificationsDropdown from '../Home/NotificationsDropdown';
import SettingsModal from '../Home/SettingsModal';
import { Link } from 'react-router-dom';

// Icons from lucide-react
import { Bell, MessageSquare, Settings, Compass } from 'lucide-react';

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
      <Link to="/" className="text-xl font-bold text-blue-600">
        PetCommunity
      </Link>

      <div className="flex gap-6 items-center">
        {/* Discover Icon */}
        <Link to="/discover" className="hover:text-blue-500" title="Discover">
          <Compass className="w-5 h-5" />
        </Link>

        {/* Messages Icon */}
        <button onClick={toggleMessagesPanel} className="hover:text-blue-500" title="Messages">
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Settings Icon */}
        <button onClick={openSettings} className="hover:text-blue-500" title="Settings">
          <Settings className="w-5 h-5" />
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button onClick={toggleNotifications} className="text-gray-700 hover:text-blue-500" title="Notifications">
            <Bell className="w-5 h-5" />
          </button>
          {showNotifications && <NotificationsDropdown />}
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettings} />
    </nav>
  );
};

export default Navbar;
