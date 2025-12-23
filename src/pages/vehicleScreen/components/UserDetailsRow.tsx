// src/pages/vehicleScreen/components/VehicleRow.tsx

import React from 'react';
import { VehicleData } from '../../../types/UserDetails.types';
import {
    getVehicleImage,
    getVehicleName,
    getVehicleModel,
    getVehicleNumber,
    getPricing,
    getDocuments,
    getLocation
} from '../../../utils/UserDetailsHelper';

interface Props {
    vehicle: VehicleData;
}

const VehicleRow: React.FC<Props> = ({ vehicle }) => {
    return (
        <tr className="hover:bg-purple-50 transition-colors">
            {/* Type */}
            <td className="p-3 border border-gray-300">
                <span className="font-semibold text-purple-600">
                    {vehicle.vehicleType}
                </span>
            </td>

            {/* Image */}
            <td className="p-3 border border-gray-300">
                <img
                    src={getVehicleImage(vehicle)}
                    alt={getVehicleName(vehicle)}
                    className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                />
            </td>

            {/* Vehicle Details (Name + Model) */}
            <td className="p-3 border border-gray-300">
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">
                        {getVehicleName(vehicle)}
                    </span>
                    <span className="text-sm text-gray-600">
                        {getVehicleModel(vehicle)}
                    </span>
                </div>
            </td>

            {/* Number */}
            <td className="p-3 border border-gray-300">
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {getVehicleNumber(vehicle)}
                </span>
            </td>

            {/* Status (Available + Verification) */}
            <td className="p-3 border border-gray-300">
                <div className="flex flex-col gap-1">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium text-center ${vehicle.Available
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        {vehicle.Available ? 'Available' : 'Unavailable'}
                    </span>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium text-center ${vehicle.status === 'Verified'
                            ? 'bg-green-100 text-green-800'
                            : vehicle.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {vehicle.status}
                    </span>
                </div>
            </td>

            {/* Contact (Name + Number) */}
            <td className="p-3 border border-gray-300">
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                        {vehicle.contactName}
                    </span>
                    <span className="text-sm text-gray-600">
                        {vehicle.contactNumber}
                    </span>
                </div>
            </td>

            {/* Pricing */}
            <td className="p-3 border border-gray-300">
                <div className="text-sm text-gray-700 whitespace-nowrap">
                    {getPricing(vehicle)}
                </div>
            </td>

            {/* Documents Required */}
            <td className="p-3 border border-gray-300">
                <span className="text-sm text-gray-700">
                    {getDocuments(vehicle)}
                </span>
            </td>

            {/* Deposit Amount */}
            <td className="p-3 border border-gray-300">
                <span className="font-semibold text-green-700">
                    ₹{vehicle.DepositAmount || 0}
                </span>
            </td>

            {/* Location */}
            <td className="p-3 border border-gray-300">
                <div className="text-sm text-gray-700 max-w-xs">
                    {getLocation(vehicle)}
                </div>
            </td>
        </tr>
    );
};

export default VehicleRow;