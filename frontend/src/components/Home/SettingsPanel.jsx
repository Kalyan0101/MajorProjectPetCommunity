import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingsPanel = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user settings on component mount
  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/settings'); // Replace with your actual API endpoint
  //       setSettings(response.data);
  //     } catch (error) {
  //       console.error("Error fetching settings:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSettings();
  // }, []);

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <div className="bg-white shadow p-4 rounded-md">
      <h3 className="font-semibold mb-2">Settings</h3>
      <p className="text-gray-600">Username: {settings?.username || 'N/A'}</p>
      <p className="text-gray-600">Email: {settings?.email || 'N/A'}</p>
      <button className="text-blue-500 mt-4" onClick={() => window.location.href = "/edit-profile"}>
        Edit Profile
      </button>
    </div>
  );
};

export default SettingsPanel;
