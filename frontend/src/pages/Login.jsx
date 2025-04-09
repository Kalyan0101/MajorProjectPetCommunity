import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const Login = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <LoginForm />
    </main>
    <Footer />
  </div>
);

export default Login;
