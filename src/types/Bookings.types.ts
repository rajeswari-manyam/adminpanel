// Filter status includes "All Bookings" for UI, but API only uses the actual statuses
export type FilterStatus =
    | "All Bookings"
    | "Pending"
    | "Confirmed"
    | "Cancelled"
    | "Completed"
    | "Upcoming"
    | "AutoCancelled";

// API response structure - matches actual API response
export interface ApiBooking {
    booking: {
        _id: string;
        vechileType: "Car" | "Bike"; // Note: API uses 'vechileType' (typo in backend)
        FromDate: string;
        ToDate: string;
        totalPrice: number;
        status: Exclude<FilterStatus, "All Bookings">; // API never returns "All Bookings"
    };
    user: {
        name: string;
        email: string;
        mobilenumber: string;
    };
    vehicle: {
        CarName: string; // API returns CarName, not VehicleName
        CarNumber: string; // API returns CarNumber, not VehicleNumber
    } | null; // Vehicle can be null for cancelled/deleted bookings
}

// UI-friendly booking structure
// UI-friendly booking structure
export interface Booking {
    id: string;
    user: string;
    email: string;
    phone: string;
    vehicle: string;
    vehicleNumber: string;
    type: "Car" | "Bike";
    start: string;        // Changed from startDate
    end: string;          // Changed from endDate
    days: number;
    amount: string;       // Also change to string to match "₹2,500" format
    status: Exclude<FilterStatus, "All Bookings">;
}