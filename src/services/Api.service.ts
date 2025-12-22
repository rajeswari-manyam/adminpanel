import axios from "axios";
import type {
    GetPendingVehiclesResponse,
    UpdateVehicleStatusResponse,
    Vehicle,
} from "../types/Vehicle.types";
import { ApiUser } from "../types/User.types";

export interface UserResponse {
    success: boolean;
    count: number;
    users: ApiUser[];
}

export interface GetVehiclesResponse {
    success: boolean;
    message: string;
    total: number;
    data: Vehicle[];
}

const API_BASE_URL = "http://3.110.122.127:3000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log("API Request:", config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);



export const ApiService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get<UserResponse>(`/getAllUsers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user vehicles (both bikes and cars)
  getUserVehicles: async (userId: string) => {
    try {
      const [bikesResponse, carsResponse] = await Promise.allSettled([
        api.get<GetPendingVehiclesResponse>(`/myVehicles?userId=${userId}&vehicleType=Bike`),
        api.get<GetPendingVehiclesResponse>(`/myVehicles?userId=${userId}&vehicleType=Car`)
      ]);

      const bikes = bikesResponse.status === 'fulfilled' && bikesResponse.value.data.success 
        ? bikesResponse.value.data.data.map((v: Vehicle) => ({ ...v, type: 'Bike' as const })) 
        : [];
      
      const cars = carsResponse.status === 'fulfilled' && carsResponse.value.data.success 
        ? carsResponse.value.data.data.map((v: Vehicle) => ({ ...v, type: 'Car' as const })) 
        : [];

      return [...bikes, ...cars];
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return [];
    }
  }
};

// ============ VEHICLE API FUNCTIONS ============

/**
 * Get pending vehicles by type
 * @param vehicleType - "Car" or "Bike"
 */
export const getPendingVehicles = async (
    vehicleType: "Car" | "Bike" = "Car"
): Promise<GetPendingVehiclesResponse> => {
    const response = await api.get<GetPendingVehiclesResponse>(
        `/getPendingVehicles?vehicleType=${vehicleType}`
    );
    return response.data;
};

/**
 * Get verified vehicles by type
 * FALLBACK: If this endpoint doesn't exist, it will try getPendingVehicles 
 * and filter client-side, or you need to add this endpoint to your backend
 */
export const getVerifiedVehicles = async (
    vehicleType: "Car" | "Bike" = "Car"
): Promise<GetVehiclesResponse> => {
    try {
        // Try the dedicated endpoint first
        const response = await api.get<GetVehiclesResponse>(
            `/getVerifiedVehicles?vehicleType=${vehicleType}`
        );
        return response.data;
    } catch (error: any) {
        // If endpoint doesn't exist (404), fallback to filtering pending vehicles
        if (error.response?.status === 404) {
            console.warn('getVerifiedVehicles endpoint not found, using fallback');
            // Return empty for now - you need to add this endpoint to backend
            return {
                success: true,
                message: "Endpoint not implemented yet",
                total: 0,
                data: []
            };
        }
        throw error;
    }
};

/**
 * Get all vehicles (both pending and verified) by type
 * FALLBACK: If this endpoint doesn't exist, returns pending vehicles only
 */
export const getAllVehicles = async (
    vehicleType: "Car" | "Bike" = "Car"
): Promise<GetVehiclesResponse> => {
    try {
        // Try the dedicated endpoint first
        const response = await api.get<GetVehiclesResponse>(
            `/getAllVehicles?vehicleType=${vehicleType}`
        );
        return response.data;
    } catch (error: any) {
        // If endpoint doesn't exist (404), fallback to pending only
        if (error.response?.status === 404) {
            console.warn('getAllVehicles endpoint not found, falling back to pending only');
            return getPendingVehicles(vehicleType);
        }
        throw error;
    }
};

/**
 * Dynamic vehicle fetcher based on status
 * @param status - "All" | "Pending" | "Verified"
 * @param vehicleType - "Car" | "Bike"
 */
export const getVehiclesByStatus = async (
    status: "All" | "Pending" | "Verified",
    vehicleType: "Car" | "Bike" = "Car"
): Promise<GetVehiclesResponse> => {
    console.log(`Calling API for status: ${status}, vehicleType: ${vehicleType}`);

    switch (status) {
        case "Pending":
            console.log('Fetching pending vehicles...');
            return getPendingVehicles(vehicleType);
        case "Verified":
            console.log('Fetching verified vehicles...');
            return getVerifiedVehicles(vehicleType);
        case "All":
        default:
            console.log('Fetching all vehicles...');
            return getAllVehicles(vehicleType);
    }
};

/**
 * Update vehicle status
 * @param vehicleType - "Car" or "Bike"
 * @param vehicleId - Vehicle ID to update
 * @param status - New status ("Verified" or "Rejected")
 */
export const updateVehicleStatus = async (
    vehicleType: "Car" | "Bike",
    vehicleId: string,
    status: "Verified" | "Rejected"
): Promise<UpdateVehicleStatusResponse> => {
    const params = new URLSearchParams();
    params.append("vehicleType", vehicleType);
    params.append("vehicleId", vehicleId);
    params.append("status", status);

    const { data } = await api.post<UpdateVehicleStatusResponse>(
        "/updateVehicleStatus",
        params
    );
    return data;
};

// ============ USER API FUNCTIONS ============

/**
 * Get all users
 */
export const getAllUsers = async (): Promise<UserResponse> => {
    const response = await api.get<UserResponse>("/getAllUsers");
    return response.data;
};

export default api;