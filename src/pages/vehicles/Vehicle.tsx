// import React, { useState, useEffect, useCallback } from 'react';
// import ApiService from '../../services/Api.service';
// import type { Vehicle } from '../../types/Vehicle.types';
// import VehicleTable from './VehicleTable';
// import Pagination from '../../ui/Pagination';
// import { useUserStore } from "../../store/UserStore";

// const ITEMS_PER_PAGE = 3;
// const VERIFIED_API_URL = "http://192.168.1.26:3000";

// const VehicleManagement: React.FC = () => {
//   const [vehicles, setVehicles] = useState<(Vehicle & { type: "Car" | "Bike" })[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [vehicleType, setVehicleType] = useState<"Car" | "Bike">("Bike");
//   const [viewMode, setViewMode] = useState<"pending" | "verified">("pending");

//   const {
//     setPendingVehiclesCount,
//     setApprovedVehiclesCount,
//   } = useUserStore();

//   // ✅ NEW: Fetch TOTAL counts (Bikes + Cars) for dashboard
//   const updateDashboardCounts = useCallback(async () => {
//     try {
//       // Fetch pending bikes and cars
//       const pendingBikesRes = await ApiService.getPendingVehicles("Bike");
//       const pendingCarsRes = await ApiService.getPendingVehicles("Car");

//       const pendingBikesCount = pendingBikesRes.success ? pendingBikesRes.data.length : 0;
//       const pendingCarsCount = pendingCarsRes.success ? pendingCarsRes.data.length : 0;
//       const totalPending = pendingBikesCount + pendingCarsCount;

//       // Fetch verified bikes
//       const verifiedBikesUrl = `${VERIFIED_API_URL}/bikesverified`;
//       const bikesResponse = await fetch(verifiedBikesUrl);
//       const bikesResult = await bikesResponse.json();
//       const verifiedBikesCount = Array.isArray(bikesResult.data) ? bikesResult.data.length : 0;

//       // Fetch verified cars
//       const verifiedCarsUrl = `${VERIFIED_API_URL}/carverified`;
//       const carsResponse = await fetch(verifiedCarsUrl);
//       const carsResult = await carsResponse.json();
//       const verifiedCarsCount = Array.isArray(carsResult.data) ? carsResult.data.length : 0;

//       const totalVerified = verifiedBikesCount + verifiedCarsCount;

//       // ✅ Update store with TOTAL counts
//       setPendingVehiclesCount(totalPending);
//       setApprovedVehiclesCount(totalVerified);

//       console.log("Dashboard Counts Updated:", {
//         totalPending,
//         totalVerified,
//         breakdown: {
//           pendingBikes: pendingBikesCount,
//           pendingCars: pendingCarsCount,
//           verifiedBikes: verifiedBikesCount,
//           verifiedCars: verifiedCarsCount
//         }
//       });
//     } catch (err) {
//       console.error("Error updating dashboard counts:", err);
//     }
//   }, [setPendingVehiclesCount, setApprovedVehiclesCount]);

//   const fetchPendingVehicles = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await ApiService.getPendingVehicles(vehicleType);
//       if (res.success) {
//         const vehiclesWithType = res.data.map((v: Vehicle) => ({
//           ...v,
//           type: vehicleType,
//         }));

//         setVehicles(vehiclesWithType);
//         setCurrentPage(1);

//         // ✅ Update dashboard counts after fetching
//         await updateDashboardCounts();
//       } else {
//         setVehicles([]);
//       }
//     } catch (err: any) {
//       setError(err?.message || "Failed to fetch pending vehicles");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [vehicleType, updateDashboardCounts]);

//   const fetchVerifiedVehicles = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const endpoint = vehicleType === "Car" ? "carverified" : "bikesverified";
//       const url = `${VERIFIED_API_URL}/${endpoint}`;

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       if (Array.isArray(result.data)) {
//         const vehiclesWithType = result.data.map((v: Vehicle) => ({
//           ...v,
//           type: vehicleType,
//         }));

//         setVehicles(vehiclesWithType);
//         setCurrentPage(1);

//         // ✅ Update dashboard counts after fetching
//         await updateDashboardCounts();
//       } else {
//         setVehicles([]);
//       }
//     } catch (err: any) {
//       setError(err?.message || "Failed to fetch verified vehicles");
//       console.error(err);
//       setVehicles([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [vehicleType, updateDashboardCounts]);

//   // Fetch based on view mode
//   useEffect(() => {
//     if (viewMode === "pending") {
//       fetchPendingVehicles();
//     } else if (viewMode === "verified") {
//       fetchVerifiedVehicles();
//     }
//   }, [viewMode, fetchPendingVehicles, fetchVerifiedVehicles]);

//   // Update vehicle status
//   const handleStatusUpdate = async (
//     vehicleId: string,
//     vehicleType: "Car" | "Bike",
//     newStatus: "Verified" | "Rejected"
//   ) => {
//     if (viewMode !== "pending") {
//       alert("Cannot update status of verified vehicles");
//       return;
//     }

//     try {
//       const res = await ApiService.updateVehicleStatus(vehicleType, vehicleId, newStatus);
//       if (res.success) {
//         alert(`Vehicle ${newStatus.toLowerCase()} successfully!`);
//         fetchPendingVehicles();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update vehicle status");
//     }
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(vehicles.length / ITEMS_PER_PAGE);
//   const currentVehicles = vehicles.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">
//           {viewMode === "pending" ? "Pending" : "Verified"} Vehicles
//         </h1>

//         <div className="flex gap-4">
//           {/* View Mode Toggle */}
//           <div className="flex gap-2 bg-white rounded-lg shadow p-1">
//             <button
//               onClick={() => setViewMode("pending")}
//               className={`px-6 py-2 rounded-md font-medium transition-colors ${viewMode === "pending"
//                 ? "bg-green-600 text-white"
//                 : "bg-transparent text-gray-600 hover:text-green-600"
//                 }`}
//             >
//               Pending
//             </button>
//             <button
//               onClick={() => setViewMode("verified")}
//               className={`px-6 py-2 rounded-md font-medium transition-colors ${viewMode === "verified"
//                 ? "bg-green-600 text-white"
//                 : "bg-transparent text-gray-600 hover:text-green-600"
//                 }`}
//             >
//               Verified
//             </button>
//           </div>

//           {/* Vehicle Type Toggle */}
//           <div className="flex gap-2 bg-white rounded-lg shadow p-1">
//             <button
//               onClick={() => setVehicleType("Bike")}
//               className={`px-6 py-2 rounded-md font-medium transition-colors ${vehicleType === "Bike"
//                 ? "bg-blue-600 text-white"
//                 : "bg-transparent text-gray-600 hover:text-blue-600"
//                 }`}
//             >
//               Bikes
//             </button>
//             <button
//               onClick={() => setVehicleType("Car")}
//               className={`px-6 py-2 rounded-md font-medium transition-colors ${vehicleType === "Car"
//                 ? "bg-blue-600 text-white"
//                 : "bg-transparent text-gray-600 hover:text-blue-600"
//                 }`}
//             >
//               Cars
//             </button>
//           </div>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//           <p className="text-red-800">{error}</p>
//           <button
//             onClick={viewMode === "pending" ? fetchPendingVehicles : fetchVerifiedVehicles}
//             className="text-red-600 hover:text-red-800 font-medium underline"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow">
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : vehicles.length === 0 ? (
//           <div className="p-12 text-center text-gray-500">
//             No {viewMode} {vehicleType.toLowerCase()}s found.
//           </div>
//         ) : (
//           <>
//             <VehicleTable
//               vehicles={currentVehicles}
//               onStatusUpdate={handleStatusUpdate}
//             />

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="p-4 flex justify-center">
//                 <Pagination
//                   currentPage={currentPage}
//                   totalItems={vehicles.length}
//                   itemsPerPage={ITEMS_PER_PAGE}
//                   onPageChange={handlePageChange}
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VehicleManagement;








import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../../services/Api.service';
import type { Vehicle } from '../../types/Vehicle.types';
import VehicleTable from './VehicleTable';
import Pagination from '../../ui/Pagination';
import { useUserStore } from "../../store/UserStore";

const ITEMS_PER_PAGE = 3;
const VERIFIED_API_URL = "http://192.168.1.26:3000";

const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<(Vehicle & { type: "Car" | "Bike" })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicleType, setVehicleType] = useState<"Car" | "Bike">("Bike");
  const [viewMode, setViewMode] = useState<"pending" | "verified">("pending");

  const {
    setPendingVehiclesCount,
    setApprovedVehiclesCount,
  } = useUserStore();

  // ✅ FIXED: Fetch TOTAL counts (Bikes + Cars) for dashboard
  const updateDashboardCounts = useCallback(async () => {
    try {
      console.log("🔄 Updating dashboard vehicle counts...");

      // ✅ Fetch pending bikes
      const pendingBikesRes = await ApiService.getPendingVehicles("Bike");
      const pendingBikesData = pendingBikesRes.success ? pendingBikesRes.data : [];
      const pendingBikesCount = pendingBikesData.length;
      
      console.log("🏍️ Pending Bikes Response:", pendingBikesRes);
      console.log("🏍️ Pending Bikes Count:", pendingBikesCount);

      // ✅ Fetch pending cars
      const pendingCarsRes = await ApiService.getPendingVehicles("Car");
      const pendingCarsData = pendingCarsRes.success ? pendingCarsRes.data : [];
      const pendingCarsCount = pendingCarsData.length;
      
      console.log("🚗 Pending Cars Response:", pendingCarsRes);
      console.log("🚗 Pending Cars Count:", pendingCarsCount);

      // ✅ Calculate total pending
      const totalPending = pendingBikesCount + pendingCarsCount;
      console.log("📊 Total Pending Vehicles:", totalPending);

      // ✅ Fetch verified bikes
      const verifiedBikesUrl = `${VERIFIED_API_URL}/bikesverified`;
      const bikesResponse = await fetch(verifiedBikesUrl);
      const bikesResult = await bikesResponse.json();
      const verifiedBikesData = Array.isArray(bikesResult.data) ? bikesResult.data : [];
      const verifiedBikesCount = verifiedBikesData.length;
      
      console.log("🏍️ Verified Bikes Response:", bikesResult);
      console.log("🏍️ Verified Bikes Count:", verifiedBikesCount);

      // ✅ Fetch verified cars
      const verifiedCarsUrl = `${VERIFIED_API_URL}/carverified`;
      const carsResponse = await fetch(verifiedCarsUrl);
      const carsResult = await carsResponse.json();
      const verifiedCarsData = Array.isArray(carsResult.data) ? carsResult.data : [];
      const verifiedCarsCount = verifiedCarsData.length;
      
      console.log("🚗 Verified Cars Response:", carsResult);
      console.log("🚗 Verified Cars Count:", verifiedCarsCount);

      // ✅ Calculate total verified
      const totalVerified = verifiedBikesCount + verifiedCarsCount;
      console.log("📊 Total Verified Vehicles:", totalVerified);

      // ✅ Update store with TOTAL counts
      setPendingVehiclesCount(totalPending);
      setApprovedVehiclesCount(totalVerified);

      console.log("✅ Dashboard Vehicle Counts Updated:", {
        "Pending Vehicles": totalPending,
        "Verified Vehicles": totalVerified,
        breakdown: {
          pendingBikes: pendingBikesCount,
          pendingCars: pendingCarsCount,
          verifiedBikes: verifiedBikesCount,
          verifiedCars: verifiedCarsCount
        }
      });
    } catch (err) {
      console.error("❌ Error updating dashboard counts:", err);
      setPendingVehiclesCount(0);
      setApprovedVehiclesCount(0);
    }
  }, [setPendingVehiclesCount, setApprovedVehiclesCount]);

  const fetchPendingVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ApiService.getPendingVehicles(vehicleType);
      if (res.success) {
        const vehiclesWithType = res.data.map((v: Vehicle) => ({
          ...v,
          type: vehicleType,
        }));

        setVehicles(vehiclesWithType);
        setCurrentPage(1);

        // ✅ Update dashboard counts after fetching
        await updateDashboardCounts();
      } else {
        setVehicles([]);
        await updateDashboardCounts();
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch pending vehicles");
      console.error(err);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }, [vehicleType, updateDashboardCounts]);

  const fetchVerifiedVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = vehicleType === "Car" ? "carverified" : "bikesverified";
      const url = `${VERIFIED_API_URL}/${endpoint}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (Array.isArray(result.data)) {
        const vehiclesWithType = result.data.map((v: Vehicle) => ({
          ...v,
          type: vehicleType,
        }));

        setVehicles(vehiclesWithType);
        setCurrentPage(1);

        // ✅ Update dashboard counts after fetching
        await updateDashboardCounts();
      } else {
        setVehicles([]);
        await updateDashboardCounts();
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch verified vehicles");
      console.error(err);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }, [vehicleType, updateDashboardCounts]);

  // Fetch based on view mode
  useEffect(() => {
    if (viewMode === "pending") {
      fetchPendingVehicles();
    } else if (viewMode === "verified") {
      fetchVerifiedVehicles();
    }
  }, [viewMode, fetchPendingVehicles, fetchVerifiedVehicles]);

  // Update vehicle status
  const handleStatusUpdate = async (
    vehicleId: string,
    vehicleType: "Car" | "Bike",
    newStatus: "Verified" | "Rejected"
  ) => {
    if (viewMode !== "pending") {
      alert("Cannot update status of verified vehicles");
      return;
    }

    try {
      const res = await ApiService.updateVehicleStatus(vehicleType, vehicleId, newStatus);
      if (res.success) {
        alert(`Vehicle ${newStatus.toLowerCase()} successfully!`);
        fetchPendingVehicles();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update vehicle status");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(vehicles.length / ITEMS_PER_PAGE);
  const currentVehicles = vehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {viewMode === "pending" ? "Pending" : "Verified"} Vehicles
        </h1>

        <div className="flex gap-4">
          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setViewMode("pending")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${viewMode === "pending"
                ? "bg-green-600 text-white"
                : "bg-transparent text-gray-600 hover:text-green-600"
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => setViewMode("verified")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${viewMode === "verified"
                ? "bg-green-600 text-white"
                : "bg-transparent text-gray-600 hover:text-green-600"
                }`}
            >
              Verified
            </button>
          </div>

          {/* Vehicle Type Toggle */}
          <div className="flex gap-2 bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setVehicleType("Bike")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${vehicleType === "Bike"
                ? "bg-blue-600 text-white"
                : "bg-transparent text-gray-600 hover:text-blue-600"
                }`}
            >
              Bikes
            </button>
            <button
              onClick={() => setVehicleType("Car")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${vehicleType === "Car"
                ? "bg-blue-600 text-white"
                : "bg-transparent text-gray-600 hover:text-blue-600"
                }`}
            >
              Cars
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={viewMode === "pending" ? fetchPendingVehicles : fetchVerifiedVehicles}
            className="text-red-600 hover:text-red-800 font-medium underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No {viewMode} {vehicleType.toLowerCase()}s found.
          </div>
        ) : (
          <>
            <VehicleTable
              vehicles={currentVehicles}
              onStatusUpdate={handleStatusUpdate}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalItems={vehicles.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;