import React, { useState } from "react";
import { Vehicle } from "../../types/Vehicle.types";

interface VehicleTableProps {
  vehicles: (Vehicle & { type: "Car" | "Bike" })[];
  onStatusUpdate: (
    vehicleId: string,
    vehicleType: "Car" | "Bike",
    status: "Verified" | "Rejected"
  ) => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  onStatusUpdate,
}) => {
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (vehicles.length === 0) {
    return (
      <div className="p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-500 text-lg">No vehicles found</p>
      </div>
    );
  }

  const toggleExpand = (vehicleId: string) => {
    setExpandedVehicle(expandedVehicle === vehicleId ? null : vehicleId);
  };

  const getImages = (vehicle: Vehicle & { type: "Car" | "Bike" }) => {
    // Return the appropriate images array based on vehicle type
    if (vehicle.type === "Car") {
      return vehicle.carImages || [];
    } else {
      return vehicle.bikeImages || [];
    }
  };

  const getVehicleName = (vehicle: Vehicle & { type: "Car" | "Bike" }) => {
    return vehicle.type === "Car" ? vehicle.CarName : vehicle.bikeName;
  };

  const getVehicleModel = (vehicle: Vehicle & { type: "Car" | "Bike" }) => {
    return vehicle.type === "Car" ? vehicle.CarModel : vehicle.bikeModel;
  };

  const getVehicleNumber = (vehicle: Vehicle & { type: "Car" | "Bike" }) => {
    return vehicle.type === "Car" ? vehicle.CarNumber : vehicle.bikeNumber;
  };

  return (
    <>
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-xl font-bold hover:text-gray-300"
            >
              ✕ Close
            </button>
            <img
              src={selectedImage}
              alt="Vehicle"
              className="max-w-full max-h-screen object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Vehicle Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Pricing
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle) => {
              const images = getImages(vehicle);
              const isExpanded = expandedVehicle === vehicle._id;

              return (
                <React.Fragment key={vehicle._id}>
                  {/* Main Row */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    {/* Vehicle Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {images && images.length > 0 ? (
                          <img
                            src={images[0]}
                            alt={getVehicleName(vehicle) || 'Vehicle'}
                            className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80"
                            onClick={() => setSelectedImage(images[0])}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            {vehicle.type === "Car" ? "🚗" : "🏍️"}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">
                            {getVehicleName(vehicle) || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {getVehicleModel(vehicle) || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getVehicleNumber(vehicle) || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${vehicle.type === "Car"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                        }`}>
                        {vehicle.type}
                      </span>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {vehicle.contactName || "N/A"}
                        </div>
                        <div className="text-gray-600">
                          {vehicle.contactNumber || "N/A"}
                        </div>
                      </div>
                    </td>

                    {/* Pricing */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {vehicle.RentPerDay && (
                          <div className="font-semibold text-green-600">
                            ₹{vehicle.RentPerDay.toLocaleString()}/day
                          </div>
                        )}
                        {vehicle.RentPerHour && (
                          <div className="text-gray-600">
                            ₹{vehicle.RentPerHour}/hr
                          </div>
                        )}
                        {vehicle.pricePerKm && (
                          <div className="text-gray-600">
                            ₹{vehicle.pricePerKm}/km
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        <div>{vehicle.pickupArea || "N/A"}</div>
                        <div className="text-xs text-gray-500">
                          {vehicle.pickupCity}, {vehicle.pickupCityState}
                        </div>
                        <div className="text-xs text-gray-500">
                          {vehicle.pickupCityPinCode}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-lg ${vehicle.status === "Verified"
                          ? "bg-green-100 text-green-800"
                          : vehicle.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {vehicle.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleExpand(vehicle._id)}
                          className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                          {isExpanded ? "Hide" : "Details"}
                        </button>
                        {vehicle.status === "Pending" && (
                          <>
                            <button
                              onClick={() => onStatusUpdate(vehicle._id, vehicle.type, "Verified")}
                              className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                              title="Verify"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => onStatusUpdate(vehicle._id, vehicle.type, "Rejected")}
                              className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                              title="Reject"
                            >
                              ✗
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Details Row */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={7} className="px-6 py-6 bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Images Section */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Vehicle Images</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {images && images.length > 0 ? (
                                images.map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt={`Vehicle ${idx + 1}`}
                                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setSelectedImage(img)}
                                  />
                                ))
                              ) : (
                                <p className="text-gray-500 col-span-2">No images available</p>
                              )}
                            </div>
                          </div>

                          {/* Details Section */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Vehicle Details</h3>
                            <div className="space-y-2 text-sm">
                              <DetailRow label="Description" value={vehicle.description} />
                              <DetailRow label="Fuel Type" value={vehicle.fuelType} />
                              <DetailRow label="Transmission" value={vehicle.transmissionType} />
                              {vehicle.type === "Car" && (
                                <>
                                  <DetailRow label="Seater" value={vehicle.Carseater} />
                                  <DetailRow label="AC Available" value={vehicle.Ac_available ? "Yes" : "No"} />
                                </>
                              )}
                              <DetailRow label="KM Driven" value={vehicle.kmDriven} />
                              <DetailRow label="GPS" value={vehicle.gps ? "Yes" : "No"} />
                              {vehicle.InsuranceNo && <DetailRow label="Insurance No" value={vehicle.InsuranceNo} />}
                              {vehicle.pricePerKm && <DetailRow label="Price per KM" value={`₹${vehicle.pricePerKm}`} />}

                              <div className="pt-3 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-2">Requirements & Deposit</h4>
                                <DetailRow label="Driving License Required" value={vehicle.drivingLicenseRequired ? "Yes" : "No"} />
                                <DetailRow label="Aadhar Card Required" value={vehicle.AadharCardRequired ? "Yes" : "No"} />
                                <DetailRow label="Deposit Amount" value={vehicle.DepositAmount ? `₹${vehicle.DepositAmount.toLocaleString()}` : "N/A"} />
                                <DetailRow label="Deposit Vehicle" value={vehicle.DepositVehicle ? "Yes" : "No"} />
                              </div>

                              <div className="pt-3 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-2">Location Details</h4>
                                <DetailRow label="Latitude" value={vehicle.pickupLatitude || vehicle.latitude} />
                                <DetailRow label="Longitude" value={vehicle.pickupLongitude || vehicle.longitude} />
                                <DetailRow label="Area" value={vehicle.pickupArea} />
                                <DetailRow label="City" value={vehicle.pickupCity} />
                                <DetailRow label="State" value={vehicle.pickupCityState} />
                                <DetailRow label="Pin Code" value={vehicle.pickupCityPinCode} />
                                <DetailRow label="Country" value={vehicle.pickupCityCountry} />
                              </div>

                              <div className="pt-3 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-2">System Info</h4>
                                <DetailRow label="Vehicle ID" value={vehicle._id} />
                                <DetailRow label="User ID" value={vehicle.userId} />
                                <DetailRow label="Available" value={vehicle.Available ? "Yes" : "No"} />
                                <DetailRow label="Created At" value={new Date(vehicle.createdAt).toLocaleString()} />
                                <DetailRow label="Updated At" value={new Date(vehicle.updatedAt).toLocaleString()} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Helper component for detail rows
const DetailRow: React.FC<{ label: string; value: any }> = ({ label, value }) => {
  if (value === undefined || value === null || value === "") return null;

  return (
    <div className="flex justify-between py-1">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
};

export default VehicleTable;