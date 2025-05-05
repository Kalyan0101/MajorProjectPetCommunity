import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPrompt = () => {

  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="w-full flex items-center justify-between px-5 py-3">
        <h1 className="text-xl font-semibold text-blue-700">Login to make your opinion.</h1>
        <div className="flex gap-3">
          <button 
            className="bg-blue-500 px-5 py-2 rounded-lg text-white font-semibold"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </button>

          <button 
            className="bg-blue-500 px-5 py-2 rounded-lg text-white font-semibold"
            onClick={() => navigate("/auth/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPrompt;
