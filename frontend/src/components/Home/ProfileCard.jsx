import React from 'react';

const ProfileCard = () => {
  return (
    <div className="bg-white shadow p-4 rounded-md">
      <img
        src="https://via.placeholder.com/150"
        alt="profile"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-center font-semibold mt-2">Pet Owner Name</h2>
      <p className="text-center text-gray-500 text-sm">Pet Name: Fluffy</p>
    </div>
  );
};

export default ProfileCard;
