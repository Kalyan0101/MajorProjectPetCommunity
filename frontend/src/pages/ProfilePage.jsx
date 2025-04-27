// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostFeed from '../components/Home/PostFeed.jsx'; // Importing PostFeed component

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // Store profile data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch profile data from backend on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile');
        setProfile(response.data); // Assuming the response returns the profile object
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>; // Loading indicator while data is being fetched
  }

  return (
    <div className="p-8">
      {/* User Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center">
          <img
            src={profile?.userAvatar || "https://via.placeholder.com/150"} // Default avatar if not available
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold">{profile?.fullName || "Owner Name"}</h2>
            <p className="text-gray-500">{profile?.location || "Location"}</p>
          </div>
        </div>
        <p className="mt-4 text-gray-600">{profile?.bio || "Bio goes here..."}</p>
      </div>

      {/* Pet Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold">Pet Details</h3>
        <div className="flex items-center mt-4">
          <img
            src={profile?.petAvatar || "https://via.placeholder.com/150"}
            alt="Pet"
            className="w-24 h-24 rounded-full"
          />
          <div className="ml-6">
            <h4 className="text-lg">{profile?.petName || "Pet Name"}</h4>
            <p className="text-gray-500">{profile?.petType || "Pet Type"}</p>
            <p className="text-gray-500">{`Breed: ${profile?.petBreed || "Breed"}`}</p>
            <p className="text-gray-500">{`Age: ${profile?.petAge || "Age"}`}</p>
            <p className="text-gray-500">{`Favorite Activities: ${profile?.petActivities || "Activities"}`}</p>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <PostFeed /> {/* Displaying the user's posts */}
    </div>
  );
};

export default ProfilePage;
