
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import DashBoard from "./pages/DashBoard";
import AdminLayout from "./layouts/AdminLayout";
import Vehicle from "./pages/vehicle";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login page → NO navbar */}
        <Route path="/" element={<Login />} />

        {/* Dashboard pages → WITH navbar */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
