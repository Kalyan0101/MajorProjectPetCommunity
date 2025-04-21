import React from 'react';

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <p className="text-gray-600">Manage your profile, privacy, and notification preferences.</p>

      <ul className="space-y-2">
        <li><a href="/profile" className="text-blue-600 hover:underline">Profile Settings</a></li>
        <li><a href="/privacy" className="text-blue-600 hover:underline">Privacy Settings</a></li>
        <li><a href="/notifications" className="text-blue-600 hover:underline">Notification Settings</a></li>
        <li><a href="/security" className="text-blue-600 hover:underline">Security Settings</a></li>
      </ul>
    </div>
  );
};

export default Settings;
