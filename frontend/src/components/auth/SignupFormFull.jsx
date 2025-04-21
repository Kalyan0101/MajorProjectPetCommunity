import React, { useState } from 'react';
import { register } from '../../backend/auth.js';
import { useNavigate } from 'react-router-dom';

const SignupFormFull = () => {
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

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const fromData = {
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

        register(fromData)
        .then((data) => {
            navigate("/login");
        })
        .catch((err) => {
            setError(err.message);
        });

    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-10">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Register Your Profile</h2>

            {/* Owner Section */}
            <h3 className="section-title">👤 Owner Info</h3>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <label className="flex flex-col items-center cursor-pointer">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-400 shadow-md bg-gray-100">
                        {/* {ownerImage ? (
              <img src={URL.createObjectURL(ownerImage)} alt="Owner DP" className="object-cover w-full h-full" />
            ) : (
              <img src="https://via.placeholder.com/150" alt="Upload Owner DP" className="object-cover w-full h-full" />
            )} */}
                    </div>
                    <input id='file' type="file" className="hidden" accept='image/*' onChange={(e) => setUserAvatar(e.target.files[0])} />
                    <span className="text-sm text-gray-500 mt-2">Upload Owner DP</span>
                </label>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <input type="text" placeholder="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="input" />
                    <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="input" />
                    <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} className="input" />
                </div>
            </div>

            {/* Pet Section */}
            <h3 className="section-title">🐾 Pet Info</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <label className="flex flex-col items-center cursor-pointer">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-md bg-gray-100">
                        {/* {petImage ? (
              <img src={URL.createObjectURL(petImage)} alt="Pet DP" className="object-cover w-full h-full" />
            ) : (
              <img src="https://via.placeholder.com/150" alt="Upload Pet DP" className="object-cover w-full h-full" />
            )} */}
                    </div>
                    <input type="file" className="hidden" onChange={(e) => setPetAvatar(e.target.files[0])} />
                    <span className="text-sm text-gray-500 mt-2">Upload Pet DP</span>
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
        </form>
    );
};

export default SignupFormFull;
