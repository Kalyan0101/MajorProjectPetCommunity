import React from "react";
import AppRoutes from "./routes/App.Routes.jsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router"
import AuthLayout from "./routes/Auth.Routes.jsx";
import { Login, Signup, Home, Settings, ProfilePage } from "./pages/index.js"

const App = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route >
                {/* authentication route */}
                <Route path="auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>

                {/* profile route */}
                <Route path="/" element={<AppRoutes />} >
                    <Route path="" element={<Home />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Route>
        )
    )

    return <RouterProvider router={router} />;
};

export default App;
