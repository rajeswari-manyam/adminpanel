import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleSave = () => {
    console.log({ emailNotifications, pushNotifications });
    // TODO: API call to save preferences
    navigate("/settings"); // back to settings
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Notification Settings
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-5">
        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between">
          <span>Push Notifications</span>
          <input
            type="checkbox"
            checked={pushNotifications}
            onChange={() => setPushNotifications(!pushNotifications)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => navigate("/settings")}
            className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
