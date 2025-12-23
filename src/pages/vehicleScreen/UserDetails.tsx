








import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { VehicleData } from "../../types/UserDetails.types";
import VehicleTable from "./components/UserDetailsTable";
import Pagination from "../../ui/Pagination";
import VehicleSummary from "./UserDetailsSummary";

const VEHICLES_PER_PAGE = 3;

const VehiclePage = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState<VehicleData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchVehicles = async () => {
            if (!userId) {
                setError("User ID is required");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                console.log(`🚗 Fetching vehicles for User ID: ${userId}`);

                const response = await axios.get(
                    `http://3.110.122.127:3000/myVehicles/${userId}`
                );

                console.log("✅ API Response:", response.data);

                if (!response.data || !response.data.data) {
                    setError("Invalid API response structure");
                    setLoading(false);
                    return;
                }

                const { cars = [], bikes = [], autos = [] } = response.data.data;

                const allVehicles: VehicleData[] = [
                    ...cars.map((car: any) => ({ ...car, vehicleType: 'Car' })),
                    ...bikes.map((bike: any) => ({ ...bike, vehicleType: 'Bike' })),
                    ...autos.map((auto: any) => ({ ...auto, vehicleType: 'Auto' }))
                ];

                console.log(`📊 Total vehicles: ${allVehicles.length}`);
                setVehicles(allVehicles);
                setCurrentPage(1); // Reset to first page when data loads
            } catch (err: any) {
                console.error("❌ Error fetching vehicles:", err);
                setError(err.response?.data?.message || err.message || "Failed to load vehicles");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [userId]);

    // Pagination calculations
    const totalPages = Math.ceil(vehicles.length / VEHICLES_PER_PAGE);
    const startIndex = (currentPage - 1) * VEHICLES_PER_PAGE;
    const endIndex = startIndex + VEHICLES_PER_PAGE;
    const currentVehicles = vehicles.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-purple-600 hover:text-purple-800 font-medium transition-colors flex items-center gap-2"
            >
                ← Back to Users
            </button>

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Vehicles of User</h2>
                <p className="text-sm text-gray-600">
                    User ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{userId}</code>
                </p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                        <p className="mt-3 text-gray-600">Loading vehicles...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 px-4">
                        <div className="text-red-600 mb-4 font-semibold">{error}</div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : vehicles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-2">No vehicles found</p>
                        <p className="text-gray-400 text-sm">This user hasn't added any vehicles yet.</p>
                    </div>
                ) : (
                    <>
                        {/* Summary */}
                        <VehicleSummary vehicles={vehicles} />

                        {/* Table */}
                        <VehicleTable vehicles={currentVehicles} />

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalItems={vehicles.length}
                            itemsPerPage={VEHICLES_PER_PAGE}
                            onPageChange={handlePageChange}
                            label="vehicles"
                            theme="purple"
                        />

                    </>
                )}
            </div>
        </div>
    );
};

export default VehiclePage;