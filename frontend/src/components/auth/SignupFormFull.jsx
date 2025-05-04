import React, { useEffect, useState } from 'react';
import authService from '../../backend/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { successAlert } from '../alert/success.alert.js';
import { errorAlert } from '../alert/error.alert.js';


const SignupFormFull = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");

    // Owner Info States
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [userAvatar, setUserAvatar] = useState(null);

    // Pet Info States
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [breed, setBreed] = useState('');
    const [yob, setYob] = useState('');
    const [activity, setActivity] = useState('');
    const [petAvatar, setPetAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

        const formData = {
            fullName,
            userName,
            email,
            password,
            location,
            role,
            userAvatar,
            petAvatar,
            pet: {
                name: petName,
                type: petType,
                breed,
                yob,
                activity,
            },
        };

        // backend call for registration
        authService.register(formData)
            .then((data) => {

                if (data.success) {
                    successAlert(data.message);
                    // force redirection to login page
                    navigate("/login");
                }
            })
            .catch((err) => {
                errorAlert(err.message);
            });
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Register Your Profile</h2>

      {/* Owner Section */}
      <h3 className="section-title">👤 Owner Info</h3>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <label className="flex flex-col items-start cursor-pointer">
          <input id='file' type="file" className="mb-1" accept='image/*' onChange={(e) => setUserAvatar(e.target.files[0])} />
          {userAvatar && (
            <span className="text-sm text-gray-600">
              Selected: <strong>{userAvatar.name}</strong>
            </span>
          )}
        </label>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input type="text" placeholder="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="input" />
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="input" />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="input text-gray-500">
            <option value="" disabled>Select Role</option>
            <option value="Vet">Vet</option>
            <option value="Owner">Owner</option>
            <option value="ShopOwner">Shop Owner</option>
          </select>
        </div>
      </div>

      {/* Pet Section */}
      <h3 className="section-title">🐾 Pet Info</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <label className="flex flex-col items-start cursor-pointer">
          <input type="file" className="mb-1" onChange={(e) => setPetAvatar(e.target.files[0])} />
          {petAvatar && (
            <span className="text-sm text-gray-600">
              Selected: <strong>{petAvatar.name}</strong>
            </span>
          )}
        </label>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input type="text" placeholder="Pet Name" value={petName} onChange={(e) => setPetName(e.target.value)} className="input" />
          <input type="text" placeholder="Type (Dog, Cat, etc.)" value={petType} onChange={(e) => setPetType(e.target.value)} className="input" />
          <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} className="input" />
          <input type="number" placeholder="Year of Birth" value={yob} onChange={(e) => setYob(e.target.value)} className="input" />
          <input type="text" placeholder="Favorite Activities" value={activity} onChange={(e) => setActivity(e.target.value)} className="input" />
        </div>
      </div>

            <button type="submit" className="btn-secondary mt-10 w-full">Create Account</button>

            <p className="text-center mt-3">
                Already have an account?
                <Link 
                    to={"/login"}
                    className='ml-2 text-blue-500 underline'
                >
                    login
                </Link>
            </p>
        </form>
    );
};

export default SignupFormFull;
