import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your application settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Profile Settings Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Profile Settings
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Update your profile information and preferences
          </p>
          <button 
          onClick={() => navigate("/edit-profile")}

          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
            Edit Profile
          </button>
        </div>

        {/* Security Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Security</h3>
          <p className="text-gray-600 text-sm mb-6">
            Manage password and security settings
          </p>
          <button onClick={() => navigate("/password")}
           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
            Change Password
          </button>
        </div>

        {/* Notifications Card */}
        <div onClick={() => navigate("/notifications")}
         className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Notifications
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Configure email and push notifications
          </p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
            Configure
          </button>
        </div>

        {/* Application Settings Card */}
        <div onClick={() => navigate("/application-settings")}
        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Application Settings
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            General application configurations
          </p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;