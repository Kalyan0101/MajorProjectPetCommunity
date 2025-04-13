import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-4 shadow-md h-screen sticky top-0">
      <h1 className="text-xl font-bold mb-4">PetConnect</h1>
      <ul className="space-y-2">
        <li className="hover:text-blue-500 cursor-pointer">Home</li>
        <li className="hover:text-blue-500 cursor-pointer">Profile</li>
        <li className="hover:text-blue-500 cursor-pointer">Messages</li>
        <li className="hover:text-blue-500 cursor-pointer">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
