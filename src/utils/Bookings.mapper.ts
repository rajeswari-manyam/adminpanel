import { ApiBooking, Booking, FilterStatus } from "../types/Bookings.types";

/**
 * Maps API booking response to UI booking model
 */


  // Calculate days difference (minimum 1 day)
  
export const mapApiBookingToBooking = (apiBooking: ApiBooking): Booking => {
  // Calculate days
  const fromDate = new Date(apiBooking.booking.FromDate);
  const toDate = new Date(apiBooking.booking.ToDate);
  const days = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;

  return {
    id: apiBooking.booking._id,
    user: apiBooking.user.name,
    email: apiBooking.user.email,
    phone: apiBooking.user.mobilenumber,
    vehicle: apiBooking.vehicle?.CarName || 'N/A',
    vehicleNumber: apiBooking.vehicle?.CarNumber || 'N/A',
    type: apiBooking.booking.vechileType,
    start: new Date(apiBooking.booking.FromDate).toLocaleDateString('en-GB'),  // Changed from startDate
    end: new Date(apiBooking.booking.ToDate).toLocaleDateString('en-GB'),      // Changed from endDate
    days: days,
    amount: `₹${apiBooking.booking.totalPrice.toLocaleString('en-IN')}`,       // Format as string
    status: apiBooking.booking.status,
  };
};

/**
 * Returns Tailwind CSS classes for status badges
 */
export const getStatusColor = (status: Exclude<FilterStatus, "All Bookings">): string => {
  const statusColors: Record<Exclude<FilterStatus, "All Bookings">, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
    Completed: "bg-green-100 text-green-800",
    Upcoming: "bg-purple-100 text-purple-800",
    AutoCancelled: "bg-red-100 text-red-800",
  };

  return statusColors[status] || "bg-gray-100 text-gray-800";
};

/**
 * Formats currency in Indian Rupees
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats date in readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};