import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <input type="email" placeholder="Email" required className="w-full mb-4 px-4 py-2 border rounded" />
      <input type="password" placeholder="Password" required className="w-full mb-4 px-4 py-2 border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      <p className="text-center mt-4 text-sm">
        New here? <a href="/signup" className="text-blue-600 underline">Create an account</a>
      </p>
    </form>
  );
};

export default LoginForm;
