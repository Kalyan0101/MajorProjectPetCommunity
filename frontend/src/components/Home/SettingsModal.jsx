import React from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;  // Don't render if modal is not open

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
        <ul className="space-y-2">
          <li><a href="#" className="text-blue-600 hover:underline">Profile Settings</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Privacy Settings</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Notification Settings</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Security Settings</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Account Settings</a></li>
        </ul>
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
