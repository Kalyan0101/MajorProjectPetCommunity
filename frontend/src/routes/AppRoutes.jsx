import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Route - Home Page */}
      <Route path="/" element={<Home />} />

      {/* Default route */}
      <Route path="/login" element={<Login />} />

      {/* Auth Routes */}
      <Route path="/signup" element={<Signup />} />

      {/* Catch-all: redirect to login or 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
