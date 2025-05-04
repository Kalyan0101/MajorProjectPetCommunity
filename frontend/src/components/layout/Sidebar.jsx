import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-54 bg-white p-4 shadow-md h-screen sticky top-0 flex flex-col items-center">
      {/* Profile Image (top) */}
      <Link to="/profile">
        <img
          src="https://place-puppy.com/200x200"
          alt="Pet Profile"
          className="w-20 h-20 rounded-full hover:ring-2 hover:ring-blue-400 transition duration-200 object-cover"
        />
      </Link>
    </div>
  );
};

export default Sidebar;
