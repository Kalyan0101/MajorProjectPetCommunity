import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import LoginForm from "../components/auth/LoginForm";
import { ProfileAuthPage } from "../components/auth";

const Login = () => (
  <div className="flex flex-col min-h-screen">
    {/* <Header /> */}
    <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      {/* <LoginForm /> */}

      <ProfileAuthPage />
    </main>
    {/* <Footer /> */}
  </div>
);

export default Login;
