// src/utils/vehicleHelpers.ts

import { VehicleData } from '../types/UserDetails.types';

/**
 * Get the primary image for a vehicle
 */
export const getVehicleImage = (vehicle: VehicleData): string => {
    if (vehicle.carImages && vehicle.carImages.length > 0) {
        return vehicle.carImages[0];
    }
    if (vehicle.bikeImages && vehicle.bikeImages.length > 0) {
        return vehicle.bikeImages[0];
    }
    if (vehicle.autoImages && vehicle.autoImages.length > 0) {
        return vehicle.autoImages[0];
    }
    return 'https://via.placeholder.com/150?text=No+Image';
};

/**
 * Get the vehicle name based on type
 */
export const getVehicleName = (vehicle: VehicleData): string => {
    return vehicle.CarName || vehicle.bikeName || vehicle.autoName || 'N/A';
};

/**
 * Get the vehicle model based on type
 */
export const getVehicleModel = (vehicle: VehicleData): string => {
    return vehicle.CarModel || vehicle.bikeModel || vehicle.autoModel || 'N/A';
};

/**
 * Get the vehicle number based on type
 */
export const getVehicleNumber = (vehicle: VehicleData): string => {
    return vehicle.CarNumber || vehicle.bikeNumber || vehicle.autoNumber || 'N/A';
};

/**
 * Get pricing information for a vehicle
 */
export const getPricing = (vehicle: VehicleData): string => {
    const parts: string[] = [];

    if (vehicle.pricePerKm) {
        parts.push(`₹${vehicle.pricePerKm}/km`);
    }
    if (vehicle.RentPerHour) {
        parts.push(`₹${vehicle.RentPerHour}/hr`);
    }
    if (vehicle.RentPerDay) {
        parts.push(`₹${vehicle.RentPerDay}/day`);
    }

    return parts.length > 0 ? parts.join(' • ') : 'N/A';
};

/**
 * Get required documents for a vehicle
 */
export const getDocuments = (vehicle: VehicleData): string => {
    const docs: string[] = [];

    if (vehicle.drivingLicenseRequired) {
        docs.push('DL');
    }
    if (vehicle.AadharCardRequired) {
        docs.push('Aadhar');
    }

    return docs.length > 0 ? docs.join(', ') : 'None';
};

/**
 * Get location information for a vehicle
 */
export const getLocation = (vehicle: VehicleData): string => {
    const parts: string[] = [];

    if (vehicle.pickupArea) {
        parts.push(vehicle.pickupArea);
    }
    if (vehicle.pickupCity) {
        parts.push(vehicle.pickupCity);
    }
    if (vehicle.pickupCityPinCode) {
        parts.push(vehicle.pickupCityPinCode);
    }

    return parts.length > 0 ? parts.join(', ') : 'N/A';
};
