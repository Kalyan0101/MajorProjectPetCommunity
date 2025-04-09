import React from 'react';

const SignupFormFull = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Register Your Profile</h2>
      
      {/* Owner Section */}
      <h3 className="section-title">👤 Owner Info</h3>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <label className="flex flex-col items-center cursor-pointer">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-400 shadow-md bg-gray-100">
            <img
              src="https://via.placeholder.com/150"
              alt="Upload Owner DP"
              className="object-cover w-full h-full"
            />
          </div>
          <input type="file" className="hidden" />
          <span className="text-sm text-gray-500 mt-2">Upload Owner DP</span>
        </label>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input type="text" placeholder="Full Name" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <input type="text" placeholder="Phone Number" className="input" />
          <input type="text" placeholder="Location" className="input" />
        </div>
      </div>

      {/* Pet Section */}
      <h3 className="section-title">🐾 Pet Info</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <label className="flex flex-col items-center cursor-pointer">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-md bg-gray-100">
            <img
              src="https://via.placeholder.com/150"
              alt="Upload Pet DP"
              className="object-cover w-full h-full"
            />
          </div>
          <input type="file" className="hidden" />
          <span className="text-sm text-gray-500 mt-2">Upload Pet DP</span>
        </label>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input type="text" placeholder="Pet Name" className="input" />
          <input type="text" placeholder="Type (Dog, Cat, etc.)" className="input" />
          <input type="text" placeholder="Breed" className="input" />
          <input type="number" placeholder="Age" className="input" />
          <input type="text" placeholder="Favorite Activities" className="input" />
        </div>
      </div>

      <button className="btn-secondary mt-10 w-full">Create Account</button>
    </div>
  );
};

export default SignupFormFull;
