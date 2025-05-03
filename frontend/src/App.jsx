import React from "react";
import AppRoutes from "./routes/AppRoutes";
import SignupPrompt from "./components/auth/SignupPrompt";

const App = () => {

  return (
    <div className="bg-gray-100 min-h-screen">

      <AppRoutes />
    </div>
  );
};

export default App;
