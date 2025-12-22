import React, { useState, useEffect, useCallback } from 'react';
import { getPendingVehicles, getVerifiedVehicles, updateVehicleStatus } from '../../services/Api.service';
import type { Vehicle } from '../../types/Vehicle.types';
import VehicleTabs from './VehicleTabs';
import VehicleTable from './VehicleTable';

type VehicleStatus = "All" | "Pending" | "Verified";
type VehicleType = "All" | "Car" | "Bike";

const VehicleManagement: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<VehicleStatus>("All");
  const [activeVehicleType, setActiveVehicleType] = useState<VehicleType>("All");
  const [vehicles, setVehicles] = useState<(Vehicle & { type: "Car" | "Bike" })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch vehicles whenever filters change
  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching vehicles:', { activeStatus, activeVehicleType });

      let allVehicles: (Vehicle & { type: "Car" | "Bike" })[] = [];

      // Determine which vehicle types to fetch
      const typesToFetch: ("Car" | "Bike")[] =
        activeVehicleType === "All" ? ["Car", "Bike"] : [activeVehicleType];

      // Fetch vehicles based on status and type filters
      for (const vType of typesToFetch) {
        // Fetch Pending vehicles
        if (activeStatus === "Pending" || activeStatus === "All") {
          const pendingVehicles = await getPendingVehicles(vType);
          if (pendingVehicles.success) {
            allVehicles.push(...pendingVehicles.data.map(v => ({ ...v, type: vType })));
          }
        }

        // Fetch Verified vehicles
        if (activeStatus === "Verified" || activeStatus === "All") {
          try {
            const verifiedVehicles = await getVerifiedVehicles(vType);
            if (verifiedVehicles.success) {
              allVehicles.push(...verifiedVehicles.data.map(v => ({ ...v, type: vType })));
            }
          } catch (err) {
            console.warn(`Verified ${vType} endpoint not available`);
          }
        }
      }

      console.log('Fetched vehicles:', allVehicles);
      setVehicles(allVehicles);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error fetching vehicles. Please try again.';
      setError(errorMessage);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [activeStatus, activeVehicleType]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleStatusUpdate = async (
    vehicleId: string,
    vehicleType: "Car" | "Bike",
    newStatus: "Verified" | "Rejected"
  ) => {
    try {
      const response = await updateVehicleStatus(vehicleType, vehicleId, newStatus);

      if (response.success) {
        // Refresh the vehicle list after successful update
        await fetchVehicles();
        alert(`Vehicle ${newStatus.toLowerCase()} successfully!`);
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update vehicle status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Management</h1>
        <p className="text-gray-600">Manage pending and verified vehicles</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter Vehicles</h2>
        <VehicleTabs
          activeStatus={activeStatus}
          activeVehicleType={activeVehicleType}
          setActiveStatus={setActiveStatus}
          setActiveVehicleType={setActiveVehicleType}
        />
      </div>

   

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={fetchVehicles}
            className="text-red-600 hover:text-red-800 font-medium underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Vehicle Table */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <VehicleTable
            vehicles={vehicles}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;