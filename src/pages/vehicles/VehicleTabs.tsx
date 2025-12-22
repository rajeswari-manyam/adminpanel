import React from 'react';

type VehicleStatus = "All" | "Pending" | "Verified";
type VehicleType = "All" | "Car" | "Bike";

interface VehicleTabsProps {
  activeStatus: VehicleStatus;
  activeVehicleType: VehicleType;
  setActiveStatus: (status: VehicleStatus) => void;
  setActiveVehicleType: (type: VehicleType) => void;
}

const VehicleTabs: React.FC<VehicleTabsProps> = ({
  activeStatus,
  activeVehicleType,
  setActiveStatus,
  setActiveVehicleType,
}) => {
  const mainTabs = ["All Vehicles", "Pending", "Verified"];
  const vehicleTypes: VehicleType[] = ["Car", "Bike"];
  const [showVehicleTypes, setShowVehicleTypes] = React.useState(false);

  const handleMainTabClick = (tab: string) => {
    setShowVehicleTypes(true);
    if (tab === "All Vehicles") {
      setActiveStatus("All");
      setActiveVehicleType("All");
    } else if (tab === "Pending") {
      setActiveStatus("Pending");
      setActiveVehicleType("All");
    } else if (tab === "Verified") {
      setActiveStatus("Verified");
      setActiveVehicleType("All");
    }
  };

  const handleVehicleTypeClick = (type: VehicleType) => {
    setActiveVehicleType(type);
    // Keep the current status when selecting vehicle type
    // Don't reset to "All"
  };

  const getActiveMainTab = () => {
    if (activeStatus === "All") return "All Vehicles";
    if (activeStatus === "Pending") return "Pending";
    if (activeStatus === "Verified") return "Verified";
    return "All Vehicles";
  };

  return (
    <div className="space-y-4">
      {/* Main Tabs - Always visible */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Category
        </label>
        <div className="flex gap-2 flex-wrap">
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleMainTabClick(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${getActiveMainTab() === tab
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Type Buttons - Show only after clicking a main tab */}
      {showVehicleTypes && activeVehicleType === "All" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Vehicle Type
          </label>
          <div className="flex gap-2 flex-wrap">
            {vehicleTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleVehicleTypeClick(type)}
                className="px-6 py-3 rounded-lg font-medium transition-colors bg-purple-600 text-white shadow-md hover:bg-purple-700"
              >
                {type}s
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Show current selection when vehicle type is selected */}
      {activeVehicleType !== "All" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Viewing Results
            </label>
            <button
              onClick={() => setActiveVehicleType("All")}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Vehicle Types
            </button>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-green-700">{getActiveMainTab()}</span>
              {" → "}
              <span className="font-semibold text-purple-700">{activeVehicleType}s</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTabs;