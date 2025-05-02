import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileCard = () => {
  const [profile, setProfile] = useState(null); // Store profile data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch profile data from backend on component mount
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/profile'); // Replace with your API endpoint
  //       setProfile(response.data); // Assuming the response returns the profile object
  //     } catch (error) {
  //       console.error("Error fetching profile data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  if (loading) {
    return <p>Loading profile...</p>; // Loading indicator while data is being fetched
  }

  return (
    <div className="bg-white shadow p-4 rounded-md">
      <img
        src={profile?.profileImage || "https://via.placeholder.com/150"} // Default image if profileImage is not available
        alt="profile"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-center font-semibold mt-2">{profile?.ownerName || "Pet Owner Name"}</h2>
      <p className="text-center text-gray-500 text-sm">{`Pet Name: ${profile?.petName || "Fluffy"}`}</p>
    </div>
  );
};

export default ProfileCard;
