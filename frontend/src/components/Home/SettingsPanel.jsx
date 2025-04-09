import React from 'react';

const SettingsPanel = () => (
  <div className="bg-white p-4 shadow rounded">
    <h3 className="text-lg font-semibold mb-2">Settings</h3>
    <button className="text-sm text-blue-600 underline">Change Password</button><br/>
    <button className="text-sm text-blue-600 underline mt-2">Edit Profile</button>
  </div>
);

export default SettingsPanel;
