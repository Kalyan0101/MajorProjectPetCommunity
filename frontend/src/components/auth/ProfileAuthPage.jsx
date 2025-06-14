import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../backend/auth";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../../store/authSlice.store.js";
import { successAlert } from "../alert/success.alert.js";
import { errorAlert } from "../alert/error.alert.js";

import bgImage from "../../assets/bgimage.jpg";

const ProfileAuthPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    authService
      .login({ id, password })
      .then((res) => {
        if (res.success) {
          dispatch(storeLogin(res.data));
          successAlert(res.message);
          navigate("/");
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      });
  };

  const [signupData, setSignupData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    location: "",
    role: "",
    userAvatar: null,
    petAvatar: null,
    petName: "",
    petType: "",
    breed: "",
    yob: "",
    activity: "",
  });

  const handleSignupChange = (field, value) => {
    setSignupData({ ...signupData, [field]: value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullName", signupData.fullName);
    formData.append("userName", signupData.userName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("location", signupData.location);
    formData.append("role", signupData.role);
    formData.append("userAvatar", signupData.userAvatar);
    formData.append("petAvatar", signupData.petAvatar);
    formData.append("pet[name]", signupData.petName);
    formData.append("pet[animalType]", signupData.petType);
    formData.append("pet[breed]", signupData.breed);
    formData.append("pet[yob]", signupData.yob);
    formData.append("pet[activity]", signupData.activity);

    authService
      .register(formData)
      .then((res) => {
        if (res.success) {
          successAlert(res.message);
          setShowSignup(false); // Go back to login
        }
      })
      .catch((err) => errorAlert(err.message));
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="bg-white bg-opacity-45 p-6 rounded-xl shadow-lg flex flex-col gap-6 max-w-4xl w-full justify-center items-start">

        {/* Login Form */}
        {!showSignup && (
          <form
            onSubmit={handleLogin}
            className="w-xl self-center"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <input
              type="text"
              placeholder="Email or Username"
              required
              className="w-full mb-4 px-4 py-2 border rounded"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full mb-4 px-4 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <div className="text-center mt-4">
              <p className="text-sm">
                New here?{" "}
                <button
                  type="button"
                  className="text-blue-600 underline"
                  onClick={() => setShowSignup(true)}
                >
                  Create an account
                </button>
              </p>
            </div>
          </form>
        )}

        {/* Signup Form */}
        {showSignup && (
          <form
            onSubmit={handleSignupSubmit}
            className="w-full bg-white bg-opacity-50 p-4 rounded-xl max-h-[90vh]"
          >
            <h2 className="text-xl font-bold text-center text-green-700 mb-4">
              Register Your Profile
            </h2>

            <h3 className="font-semibold text-lg mb-2">👤 Owner Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" placeholder="Username" className="input" onChange={(e) => handleSignupChange("userName", e.target.value)} />
              <input type="text" placeholder="Full Name" className="input" onChange={(e) => handleSignupChange("fullName", e.target.value)} />
              <input type="email" placeholder="Email" className="input" onChange={(e) => handleSignupChange("email", e.target.value)} />
              <input type="password" placeholder="Password" className="input" onChange={(e) => handleSignupChange("password", e.target.value)} />
              <input type="text" placeholder="Location" className="input" onChange={(e) => handleSignupChange("location", e.target.value)} />
              <select className="input text-gray-500" onChange={(e) => handleSignupChange("role", e.target.value)}>
                <option value="" disabled>Select Role</option>
                <option value="Vet">Vet</option>
                <option value="Owner">Owner</option>
                <option value="ShopOwner">Shop Owner</option>
              </select>
            </div>

            {/* Owner Avatar Upload */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Choose Owner Display Picture</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700"
                onChange={(e) => handleSignupChange("userAvatar", e.target.files[0])}
              />
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-2">🐾 Pet Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" placeholder="Pet Name" className="input" onChange={(e) => handleSignupChange("petName", e.target.value)} />
              <input type="text" placeholder="Type (Dog, Cat, etc.)" className="input" onChange={(e) => handleSignupChange("petType", e.target.value)} />
              <input type="text" placeholder="Breed" className="input" onChange={(e) => handleSignupChange("breed", e.target.value)} />
              <input type="number" placeholder="Year of Birth" className="input" onChange={(e) => handleSignupChange("yob", e.target.value)} />
              <input type="text" placeholder="Favorite Activities" className="input" onChange={(e) => handleSignupChange("activity", e.target.value)} />
            </div>

            {/* Pet Avatar Upload */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Choose Pet Display Picture</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700"
                onChange={(e) => handleSignupChange("petAvatar", e.target.files[0])}
              />
            </div>

            <button type="submit" className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Create Account
            </button>

            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 underline"
                  onClick={() => setShowSignup(false)}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileAuthPage;
