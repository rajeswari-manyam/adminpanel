// src/types/Vehicle.types.ts

export interface VehicleData {
    _id: string;
    vehicleType: string;

    // Images
    carImages?: string[];
    bikeImages?: string[];
    autoImages?: string[];

    // Names and Models
    CarName?: string;
    bikeName?: string;
    autoName?: string;
    CarModel?: string;
    bikeModel?: string;
    autoModel?: string;

    // Numbers
    CarNumber?: string;
    bikeNumber?: string;
    autoNumber?: string;

    // Status
    Available: boolean;
    status: string;

    // Contact
    contactName: string;
    contactNumber: string;

    // Pricing
    pricePerKm?: number;
    RentPerHour?: number;
    RentPerDay?: number;

    // Documents
    drivingLicenseRequired?: boolean;
    AadharCardRequired?: boolean;

    // Deposit
    DepositAmount?: number;

    // Location
    pickupArea: string;
    pickupCity: string;
    pickupCityPinCode: string;
    pickupCityState?: string;
    pickupCityCountry?: string;
}