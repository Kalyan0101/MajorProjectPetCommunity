import React from "react";
// import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ProfileAuthPage from "../components/auth/ProfileAuthPage"; // merged login-signup component

const Login = () => (
  <div className="flex flex-col min-h-screen">
    
    <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <ProfileAuthPage />
    </main>
    {/* <Footer /> */}
  </div>
);

export default Login;
