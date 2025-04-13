import React from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import Body from '../components/shared/Body';
import SignupFormFull from '../components/auth/SignupFormFull';

const Signup = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Body>
        <SignupFormFull />
      </Body>
      <Footer />
    </div>
  );
};

export default Signup;
