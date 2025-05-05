import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../backend/auth";
import { useDispatch } from "react-redux"
import { login as storeLogin } from "../../store/authSlice.store.js"
import { successAlert } from "../alert/success.alert.js";
import { errorAlert } from "../alert/error.alert.js";

const LoginForm = () => {
  // States for email, password, and error
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display any error message
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    authService.login({ id, password })
    .then((res) => {
      
      if(res.success){
        dispatch(storeLogin(res.data))
        successAlert(res.message);
        navigate("/");
      }
    })
    .catch((err) => {
      errorAlert(err.message)
    })
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <input
        type="text"
        placeholder="Email or Username"
        required
        className="w-full mb-4 px-4 py-2 border rounded"
        value={id}
        onChange={(e) => setId(e.target.value)} // Update email state
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="w-full mb-4 px-4 py-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state
      />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message if any */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
      <p className="text-center mt-4 text-sm">
        New here?
        <Link to={"/auth/signup"} className="text-blue-600 underline ml-1" >
          Create an account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
