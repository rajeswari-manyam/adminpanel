// src/pages/vehicleScreen/components/VehicleTable.tsx

import React from 'react';
import { VehicleData } from '../../../types/UserDetails.types';
import VehicleRow from './UserDetailsRow';

interface Props {
    vehicles: VehicleData[];
}

const VehicleTable: React.FC<Props> = ({ vehicles }) => {
    if (vehicles.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-2">No vehicles to display</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters or check back later.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-max border-collapse border border-gray-300">
                <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                    <tr>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Type</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Image</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Vehicle Details</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Number</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Status</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Contact</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Pricing</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Documents</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Deposit</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <VehicleRow key={vehicle._id} vehicle={vehicle} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleTable;