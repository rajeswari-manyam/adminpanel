import { Booking } from "../../../types/Bookings.types";

const statusColor: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Completed: "bg-blue-100 text-blue-700",
    AutoCancelled: "bg-red-100 text-red-700",
};

const BookingsRow: React.FC<{ booking: Booking }> = ({ booking }) => {
    return (
        <tr className="text-sm text-gray-700 hover:bg-gray-50">
            {/* ID */}
            <td className="px-4 py-3 border-r border-gray-200">
                <div className="truncate font-mono text-xs">
                    {booking.id}
                </div>
            </td>

            {/* User */}
            <td className="px-4 py-3 border-r border-gray-200">
                <div className="truncate">
                    {booking.user}
                </div>
            </td>

            {/* Email */}
            <td className="px-4 py-3 border-r border-gray-200">
                <div className="truncate">
                    {booking.email}
                </div>
            </td>

            {/* Phone */}
            <td className="px-4 py-3 border-r border-gray-200">
                <div className="truncate">
                    {booking.phone}
                </div>
            </td>

            {/* Vehicle */}
            <td className="px-4 py-3 border-r border-gray-200">
                <div className="truncate">
                    {booking.vehicle}
                </div>
            </td>

            {/* Type */}
            <td className="px-4 py-3 border-r border-gray-200">
                {booking.type}
            </td>

            {/* Start */}
            <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                {booking.start}
            </td>

            {/* End */}
            <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                {booking.end}
            </td>

            {/* Days */}
            <td className="px-4 py-3 text-center border-r border-gray-200">
                {booking.days}
            </td>

            {/* Amount */}
            <td className="px-4 py-3 font-semibold border-r border-gray-200">
                {booking.amount}
            </td>

            {/* Status */}
            <td className="px-4 py-3 border-r border-gray-200">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[booking.status]}`}
                >
                    {booking.status}
                </span>
            </td>

         
        </tr>
    );
};

export default BookingsRow;