import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationSettings: React.FC = () => {
  const navigate = useNavigate();

  // Example application settings (you can expand as needed)
  const [siteTitle, setSiteTitle] = useState("RentOnGo Admin Panel");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    console.log({ siteTitle, maintenanceMode });
    // TODO: API call to save application settings
    navigate("/settings"); // back to settings page
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Application Settings
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-5">
        {/* Site Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Title
          </label>
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Maintenance Mode */}
        <div className="flex items-center justify-between">
          <span>Maintenance Mode</span>
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={() => setMaintenanceMode(!maintenanceMode)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
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

export default ApplicationSettings;
