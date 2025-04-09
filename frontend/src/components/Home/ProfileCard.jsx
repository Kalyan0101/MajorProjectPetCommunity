import React from 'react';

const ProfileCard = () => (
  <div className="bg-white rounded shadow p-4">
    <img src="https://placekitten.com/100/100" alt="Profile" className="rounded-full w-24 h-24 mx-auto" />
    <h2 className="text-center text-xl font-semibold mt-2">Debangan</h2>
    <p className="text-center text-gray-500 text-sm">Full Stack Pet Lover 🐾</p>
  </div>
);

export default ProfileCard;
