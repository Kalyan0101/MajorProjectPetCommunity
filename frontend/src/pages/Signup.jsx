import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from '../components/Body';
import SignupFormFull from '../components/SignupFormFull';

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
