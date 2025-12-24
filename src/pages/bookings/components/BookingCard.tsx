// import { Booking } from "../../../types/Bookings.types";

// const statusColor: Record<string, string> = {
//   "Pending": "bg-yellow-100 text-yellow-700",
//   "Confirmed": "bg-green-100 text-green-700",
//   "Cancelled": "bg-red-100 text-red-700",
//   "AutoCancelled": "bg-red-100 text-red-700",
//   "Completed": "bg-blue-100 text-blue-700",
// };

// const BookingsCard: React.FC<{ booking: Booking }> = ({ booking }) => {
//   return (
//     <div className="bg-white rounded-xl shadow p-4 space-y-2">
//      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 md:flex-wrap">

//         <div>
//           <p className="font-semibold">{booking.user}</p>
//           <p className="text-sm text-gray-500">{booking.email}</p>
//         </div>
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[booking.status]}`}
//         >
//           {booking.status}
//         </span>
//       </div>

//       <div className="text-sm text-gray-600">
//         <p><b>Vehicle:</b> {booking.vehicle}</p>
//         <p><b>Dates:</b> {booking.start} → {booking.end}</p>
//         <p><b>Days:</b> {booking.days}</p>
//         <p><b>Amount:</b> {booking.amount}</p>
//       </div>

//       <button className="w-full mt-2 py-2 bg-indigo-600 text-white rounded-lg text-sm">
//         View Details
//       </button>
//     </div>
//   );
// };

// export default BookingsCard;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Booking } from "../../../types/Bookings.types";

const statusColor: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  AutoCancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
};

interface BookingsCardProps {
  booking: Booking;
  onViewDetails?: (booking: Booking) => void; // Optional handler
}

const BookingsCard: React.FC<BookingsCardProps> = ({ booking, onViewDetails }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <p className="font-semibold">{booking.user}</p>
          <p className="text-sm text-gray-500">{booking.email}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[booking.status]}`}
        >
          {booking.status}
        </span>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p><b>Vehicle:</b> {booking.vehicle}</p>
        <p><b>Dates:</b> {booking.start} → {booking.end}</p>
        <p><b>Days:</b> {booking.days}</p>
        <p><b>Amount:</b> {booking.amount}</p>
      </div>

      <button
        onClick={() =>
          onViewDetails
            ? onViewDetails(booking)
            : navigate(`/bookings/${booking.id}`)
        }
        className="w-full mt-2 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default BookingsCard;
