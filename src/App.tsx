
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import DashBoard from "./pages/DashBoard";
import AdminLayout from "./layouts/AdminLayout";
import Vehicle from "./pages/vehicle";
import Settings from "./pages/Settings";
import UserManagement from "./pages/Users";
import BookingsTable from "./pages/Bookings";
import EditProfile from "./pages/Edit";
import ChangePassword from "./pages/Password";
import Notifications from "./pages/Notifications";
import ApplicationSettings from "./pages/Application";
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
          <Route path="/bookings"  element={<BookingsTable/>}/>
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
