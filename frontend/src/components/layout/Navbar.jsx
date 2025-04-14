import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationsDropdown from '../Home/NotificationsDropdown';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        PetCommunity
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/discover" className="hover:text-blue-500">Discover</Link>
        <Link to="/messages" className="hover:text-blue-500">Messages</Link>
        <Link to="/settings" className="hover:text-blue-500">Settings</Link>
        <div className="relative">
          <button onClick={toggleNotifications} className="text-gray-700 hover:text-blue-500">
            🔔
          </button>
          {showNotifications && <NotificationsDropdown />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
