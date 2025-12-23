// src/pages/vehicleScreen/components/VehicleSummary.tsx

import React from 'react';
import { VehicleData } from '../../types/UserDetails.types';

interface Props {
    vehicles: VehicleData[];
}

const VehicleSummary: React.FC<Props> = ({ vehicles }) => {
    const carCount = vehicles.filter(v => v.vehicleType === 'Car').length;
    const bikeCount = vehicles.filter(v => v.vehicleType === 'Bike').length;
    const autoCount = vehicles.filter(v => v.vehicleType === 'Auto').length;

    return (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-3 border-t border-purple-200">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700 font-medium">
                    Total vehicles: <span className="font-bold text-gray-900">{vehicles.length}</span>
                </span>
                <div className="flex gap-4">
                    {carCount > 0 && (
                        <span className="text-gray-700">
                            🚗 Cars: <span className="font-semibold">{carCount}</span>
                        </span>
                    )}
                    {bikeCount > 0 && (
                        <span className="text-gray-700">
                            🏍️ Bikes: <span className="font-semibold">{bikeCount}</span>
                        </span>
                    )}
                    {autoCount > 0 && (
                        <span className="text-gray-700">
                            🛺 Autos: <span className="font-semibold">{autoCount}</span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehicleSummary;