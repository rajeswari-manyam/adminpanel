// src/types/Vehicle.types.ts

export interface Vehicle {
  _id: string;
  userId: string;

  // Car-specific fields
  CarName?: string;
  CarModel?: string;
  CarNumber?: string;
  Carseater?: string;
  carImages?: string[];

  // Bike-specific fields
  bikeName?: string;
  bikeModel?: string;
  bikeNumber?: string;
  bikeImages?: string[];
  pricePerKm?: number;
  InsuranceNo?: string;

  // Common fields
  gps: boolean;
  fuelType?: string;
  transmissionType?: string;
  kmDriven?: number;
  Ac_available?: boolean;
  description?: string;
  RentPerHour?: number;
  RentPerDay?: number;
  contactNumber: string;
  contactName: string;
  drivingLicenseRequired?: boolean;
  AadharCardRequired?: boolean;
  DepositAmount?: number;
  DepositVehicle?: boolean;
  pickupLatitude?: string;
  pickupLongitude?: string;
  pickupArea?: string;
  pickupCity?: string;
  pickupCityPinCode?: string;
  pickupCityState?: string;
  pickupCityCountry?: string;
  latitude?: string;
  longitude?: string;
  Available: boolean;
  status: "Pending" | "Verified" | "Rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VehicleWithType extends Vehicle {
  type: "Car" | "Bike";
}

export interface GetPendingVehiclesResponse {
  success: boolean;
  message: string;
  total: number;
  data: Vehicle[];
}

export interface GetVehiclesResponse {
  success: boolean;
  message: string;
  total: number;
  data: Vehicle[];
}

export interface UpdateVehicleStatusResponse {
  success: boolean;
  message: string;
  data: Vehicle;
}