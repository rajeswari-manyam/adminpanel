// Filter status includes "All Bookings" for UI, but API only uses the actual statuses
export type FilterStatus =
    | "All Bookings"
  
    | "Confirmed"
    | "Cancelled"
    | "Completed"
    | "Upcoming"
    | "AutoCancelled"
    | "Today"
    | "Upcoming";
// API response structure - matches actual API response
export interface ApiBooking {
    booking: {
        _id: string;
        vechileType: "Car" | "Bike";
        FromDate: string;
        ToDate: string;
        totalPrice: number;
        status: Exclude<FilterStatus, "All Bookings">;
    };
    user: {
        name: string;
        email: string;
        mobilenumber: string;
    } | null; // User can also be null
    vehicle: {
        CarName: string;
        CarNumber: string;
    } | null;
}

// UI-friendly booking structure
export interface Booking {
    id: string;
    user: string;
    email: string;
    phone: string;
    vehicle: string;
    vehicleNumber: string;
    type: "Car" | "Bike";
    start: string;
    end: string;
    days: number;
    amount: string;
    status: Exclude<FilterStatus, "All Bookings">;
}

export const mapApiBookingToBooking = (api: ApiBooking): Booking => {
    // Validate that booking exists
    if (!api || !api.booking) {
        throw new Error("Invalid booking data: missing booking object");
    }

    const booking = api.booking;

    // Calculate days with validation
    let days = 1;
    try {
        const fromDate = new Date(booking.FromDate);
        const toDate = new Date(booking.ToDate);
        if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
            days = Math.max(
                1,
                Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24))
            );
        }
    } catch (err) {
        console.warn("Error calculating days:", err);
    }

    return {
        id: booking._id || "unknown",

        // Safe user access
        user: api.user?.name || "Unknown User",
        email: api.user?.email || "No email",
        phone: api.user?.mobilenumber || "No phone",

        // Safe vehicle access
        vehicle: api.vehicle?.CarName || "Vehicle not available",
        vehicleNumber: api.vehicle?.CarNumber || "N/A",

        type: booking.vechileType || "Bike",
        start: booking.FromDate || "",
        end: booking.ToDate || "",
        days: days,
        amount: `₹${(booking.totalPrice || 0).toLocaleString('en-IN')}`,
        status: booking.status || "Pending",
    };
};