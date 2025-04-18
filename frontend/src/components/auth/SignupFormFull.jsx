import React, { useState } from 'react';
import axios from 'axios';

const SignupFormFull = () => {
  // Owner Info States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);

  // Pet Info States
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [activities, setActivities] = useState('');
  const [petAvatar, setPetAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullName,
      email,
      password,
      location,
      pet: {
        name: petName,
        type: petType,
        breed,
        age,
        activities,
      },
    };

    try {
      const res = await axios.post("http://localhost:5000/api/signup", data);
      console.log("Signup success:", res.data);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Register Your Profile</h2>

      {/* Owner Section */}
      <h3 className="section-title">👤 Owner Info</h3>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <label className="flex flex-col items-center cursor-pointer">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-400 shadow-md bg-gray-100">
            {ownerImage ? (
              <img src={URL.createObjectURL(ownerImage)} alt="Owner DP" className="object-cover w-full h-full" />
            ) : (
              <img src="https://via.placeholder.com/150" alt="Upload Owner DP" className="object-cover w-full h-full" />
            )}
          </div>
          <input type="file" className="hidden" onChange={(e) => setOwnerImage(e.target.files[0])} />
          <span className="text-sm text-gray-500 mt-2">Upload Owner DP</span>
        </label>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="input" />
        </div>
      </div>

      {/* Pet Section */}
      <h3 className="section-title">🐾 Pet Info</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <label className="flex flex-col items-center cursor-pointer">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-md bg-gray-100">
            {petImage ? (
              <img src={URL.createObjectURL(petImage)} alt="Pet DP" className="object-cover w-full h-full" />
            ) : (
              <img src="https://via.placeholder.com/150" alt="Upload Pet DP" className="object-cover w-full h-full" />
            )}
          </div>
          <input type="file" className="hidden" onChange={(e) => setPetImage(e.target.files[0])} />
          <span className="text-sm text-gray-500 mt-2">Upload Pet DP</span>
        </label>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input type="text" placeholder="Pet Name" value={petName} onChange={(e) => setPetName(e.target.value)} className="input" />
          <input type="text" placeholder="Type (Dog, Cat, etc.)" value={petType} onChange={(e) => setPetType(e.target.value)} className="input" />
          <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} className="input" />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="input" />
          <input type="text" placeholder="Favorite Activities" value={activities} onChange={(e) => setActivities(e.target.value)} className="input" />
        </div>
      </div>

      <button type="submit" className="btn-secondary mt-10 w-full">Create Account</button>
    </form>
  );
};

export default SignupFormFull;
