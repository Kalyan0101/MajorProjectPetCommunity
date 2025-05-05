import React from 'react';

const ProfileCard = (userData ) => {  

  console.log(userData);
  

  return userData && (
    <div className="bg-white shadow p-4 rounded-md">
      <img
        src={ userData?.avatar?.url }
        alt="profile"
        className="w-14 h-14 mx-auto rounded-full object-cover object-center"
      />
      <h2 className="text-center font-semibold mt-2">{ userData?.fullName }</h2>
      <p className="text-center text-gray-500 text-sm">{`Pet Name: ${ "Fluffy"}`}</p>
    </div>
  );
};

export default ProfileCard;
