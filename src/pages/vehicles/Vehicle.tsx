import { useState } from "react";
import VehicleTabs from "./VehicleTabs";
import VehicleTable from "./VehicleTable";
import { vehicles } from "./VehicleData";

const Vehicle = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredVehicles = vehicles.filter((v) => {
    if (activeTab === "pending") return v.status === "Pending";
    if (activeTab === "verified") return v.status === "Verified";
    if (activeTab === "cars") return v.type === "Car";
    if (activeTab === "bikes") return v.type === "Bike";
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Vehicle Management</h1>
      <p className="text-gray-600 mb-6">
        Manage pending and verified vehicles
      </p>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <VehicleTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <VehicleTable vehicles={filteredVehicles} />
      </div>
    </div>
  );
};

export default Vehicle;
