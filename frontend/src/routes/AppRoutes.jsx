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
      {/* Protected Route - Home Page */}
      <Route path="/" element={<Home />} />

      {/* Default route */}
      <Route path="/login" element={<Login />} />

      {/* Auth Routes */}
      <Route path="/signup" element={<Signup />} />

<<<<<<< HEAD
      {/* Protected Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<ProfilePage />} /> {/* Profile route */}

      {/* Catch-all route */}
=======
      {/* Catch-all: redirect to login or 404 */}
>>>>>>> 626b091b46c3eaf26a5e657d56ed6ec58b78c9a1
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
