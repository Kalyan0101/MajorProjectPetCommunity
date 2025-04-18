import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  // States for email, password, and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display any error message
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Simulate the API call (replace this with your actual API)
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        // On successful login, navigate to the home page
        navigate("/home");
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        required
        className="w-full mb-4 px-4 py-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state
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
        New here?{" "}
        <a href="/signup" className="text-blue-600 underline">
          Create an account
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
