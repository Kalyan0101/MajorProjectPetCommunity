import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"

const ProfileCard = () => {
  const userData = useSelector(state => state.auth.userData);

  return userData && (
    <div className="bg-white shadow p-4 rounded-md">
      <img
        src={ userData?.avatar.url }
        alt="profile"
        className="w-24 h-24 rounded-full mx-auto object-cover object-center"
      />
      <h2 className="text-center font-semibold mt-2">{ userData?.fullName }</h2>
      <p className="text-center text-gray-500 text-sm">{`Pet Name: ${ "Fluffy"}`}</p>
    </div>
  );
};

export default ProfileCard;
