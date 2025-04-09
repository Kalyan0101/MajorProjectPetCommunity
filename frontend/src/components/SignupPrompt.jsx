import React from 'react';
import { Link } from 'react-router-dom';

const SignupPrompt = () => {
  return (
    <div className="text-center mt-6">
      <p className="text-sm text-gray-700">Don't have an account?</p>
      <Link
        to="/signup"
        className="mt-2 inline-block bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition font-semibold"
      >
        Create New Account
      </Link>
    </div>
  );
};

export default SignupPrompt;
