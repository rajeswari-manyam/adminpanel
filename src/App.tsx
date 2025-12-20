
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import DashBoard from "./pages/users/dashboard/DashBoard";
import AdminLayout from "./layouts/AdminLayout";
import Vehicle from "./pages/vehicles/Vehicle";
import Settings from "./pages/Settings";
import UserManagement from "./pages/users/UserManagement";
import Bookings from "./pages/bookings/Bookings";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login page → NO navbar */}
        <Route path="/" element={<Login />} />

        {/* Dashboard pages → WITH navbar */}
        <Route element={<AdminLayout />}>

          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/password" element={<ChangePassword />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/application-settings" element={<ApplicationSettings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
