import { ApiBooking, Booking } from "../types/Bookings.types";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


export const mapApiBookingToBooking = (api: ApiBooking): Booking => {
  const booking = api.booking;

  return {
    id: booking._id,

    // ✅ SAFE ACCESS
    user: api.user?.name ?? "Unknown User",
    email: api.user?.email ?? "-",
    phone: api.user?.mobilenumber ?? "-",

    // ✅ SAFE VEHICLE
    vehicle: api.vehicle?.CarName ?? "Vehicle not available",
    vehicleNumber: api.vehicle?.CarNumber ?? "-",

    type: booking.vechileType,

  start: formatDate(booking.FromDate),
end: formatDate(booking.ToDate),


    days: Math.max(
      1,
      Math.ceil(
        (new Date(booking.ToDate).getTime() -
          new Date(booking.FromDate).getTime()) /
        (1000 * 60 * 60 * 24)
      )
    ),

    amount: `₹${booking.totalPrice}`,
    status: booking.status,
  };
};
