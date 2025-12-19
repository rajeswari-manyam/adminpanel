import React, { useState } from "react";

const Vehicle = () => {
  const [activeTab, setActiveTab] = useState("all");

  const vehicles = [
    {
      id: 1,
      icon: "🚗",
      model: "Tesla Model 3",
      type: "Car",
      owner: "Sravan Kumar",
      contact: "9876543210",
      price: "₹2,500",
      location: "Mumbai",
      status: "Verified",
    },
    {
      id: 2,
      icon: "🏍️",
      model: "Harley Davidson",
      type: "Bike",
      owner: "Anjali Sharma",
      contact: "9123456789",
      price: "₹1,800",
      location: "Delhi",
      status: "Pending",
    },
    {
      id: 3,
      icon: "🚙",
      model: "BMW X5",
      type: "Car",
      owner: "Ramesh Patel",
      contact: "9988776655",
      price: "₹3,200",
      location: "Bangalore",
      status: "Verified",
    },
    {
      id: 4,
      icon: "🏍️",
      model: "Ducati Monster",
      type: "Bike",
      owner: "Priya Reddy",
      contact: "9012345678",
      price: "₹2,000",
      location: "Hyderabad",
      status: "Pending",
    },
    {
      id: 5,
      icon: "🚗",
      model: "Audi A4",
      type: "Car",
      owner: "John Smith",
      contact: "9900887766",
      price: "₹2,800",
      location: "Pune",
      status: "Verified",
    },
    {
      id: 6,
      icon: "🏍️",
      model: "Royal Enfield",
      type: "Bike",
      owner: "Karan Mehta",
      contact: "9876501234",
      price: "₹1,200",
      location: "Jaipur",
      status: "Verified",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Vehicle Management
        </h1>
        <p className="text-gray-600">Manage pending and verified vehicles</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            All Vehicles
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Vehicles
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "pending"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("verified")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "verified"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setActiveTab("cars")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "cars"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cars Only
            </button>
            <button
              onClick={() => setActiveTab("bikes")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "bikes"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Bikes Only
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg text-2xl">
                      {vehicle.icon}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vehicle.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vehicle.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vehicle.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vehicle.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vehicle.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vehicle.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vehicle.status === "Verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {vehicle.status === "Verified" ? (
                        <>
                          <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                            View
                          </button>
                          <button className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                            Edit
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing 1 to 6 of 242 vehicles
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              2
            </button>
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              3
            </button>
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;