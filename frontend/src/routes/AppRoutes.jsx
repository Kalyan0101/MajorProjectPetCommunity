// AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import ProfilePage from "../pages/ProfilePage"; // Import ProfilePage

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Login />} />

      {/* Auth Routes */}
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<ProfilePage />} /> {/* Profile route */}

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
