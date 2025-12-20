import api from "./Api.service";
import { ApiBooking, FilterStatus } from "../types/Bookings.types";

interface GetAllBookingsResponse {
    count: number;
    data: ApiBooking[];
}

export const getAllBookings = async (
    filter?: FilterStatus
): Promise<GetAllBookingsResponse> => {
    try {
        // Map "All Bookings" to undefined (no filter)
        // Otherwise use the filter value directly
        const status = filter === "All Bookings" ? undefined : filter;

        // Build URL with query params if status exists
        const url = status
            ? `/getAllBookings?status=${encodeURIComponent(status)}`
            : `/getAllBookings`;

        const { data } = await api.get<GetAllBookingsResponse>(url);

        // Validate response structure
        if (!data || !Array.isArray(data.data)) {
            throw new Error('Invalid response format from API');
        }

        return data;
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        throw error;
    }
};

// Optional: Add individual booking fetch
export const getBookingById = async (id: string): Promise<ApiBooking> => {
    try {
        const { data } = await api.get<ApiBooking>(`/getBooking/${id}`);
        return data;
    } catch (error) {
        console.error(`Failed to fetch booking ${id}:`, error);
        throw error;
    }
};

// Optional: Add booking update
export const updateBookingStatus = async (
    id: string,
    status: FilterStatus
): Promise<void> => {
    try {
        await api.put(`/updateBooking/${id}`, { status });
    } catch (error) {
        console.error(`Failed to update booking ${id}:`, error);
        throw error;
    }
};