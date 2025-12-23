import React from "react";

// Types
interface Booking {
    id: string;
    user: string;
    email: string;
    phone: string;
    vehicle: string;
    type: string;
    start: string;
    end: string;
    days: number;
    amount: string;
    status: string;
}

// Status color helper
const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "confirmed":
            return "bg-green-100 text-green-700";
        case "pending":
            return "bg-yellow-100 text-yellow-700";
        case "completed":
            return "bg-blue-100 text-blue-700";
        case "cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

/* =========================
   MOBILE CARD COMPONENT
========================= */
const MobileBookingCard: React.FC<{ booking: Booking }> = ({ booking }) => (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-semibold">{booking.user}</p>
                <p className="text-sm text-gray-500">{booking.email}</p>
            </div>
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    booking.status
                )}`}
            >
                {booking.status}
            </span>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
            <p><b>Vehicle:</b> {booking.vehicle}</p>
            <p><b>Type:</b> {booking.type}</p>
            <p><b>Dates:</b> {booking.start} → {booking.end}</p>
            <p><b>Days:</b> {booking.days}</p>
            <p><b>Amount:</b> {booking.amount}</p>
        </div>


    </div>
);

/* =========================
   DESKTOP TABLE ROW
========================= */
const BookingsRow: React.FC<{ booking: Booking }> = ({ booking }) => (
    <tr className="border-t text-sm">
        <td className="p-3 border-r">{booking.id}</td>
        <td className="p-3 border-r">{booking.user}</td>
        <td className="p-3 border-r break-words">{booking.email}</td>
        <td className="p-3 border-r">{booking.phone}</td>
        <td className="p-3 border-r">{booking.vehicle}</td>
        <td className="p-3 border-r">{booking.type}</td>
<td className="p-3 border-r whitespace-nowrap">{formatDate(booking.start)}</td>
<td className="p-3 border-r whitespace-nowrap">{formatDate(booking.end)}</td>

        <td className="p-3 border-r text-center">{booking.days}</td>
        <td className="p-3 border-r">{booking.amount}</td>
        <td className="p-3 border-r">
            <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    booking.status
                )}`}
            >
                {booking.status}
            </span>
        </td>

    </tr>
);

/* =========================
   MAIN COMPONENT
========================= */
const BookingsTable: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
    const headers = [
        "ID",
        "USER",
        "EMAIL",
        "PHONE",
        "VEHICLE",
        "TYPE",
        "START",
        "END",
        "DAYS",
        "AMOUNT",
        "STATUS",

    ];

    return (
        <>
            {/* 📱 MOBILE */}
            <div className="space-y-4 md:hidden">
                {bookings.map((b) => (
                    <MobileBookingCard key={b.id} booking={b} />
                ))}
            </div>

            {/* 💻 DESKTOP */}
            <div className="hidden md:block w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map((h, i) => (
                                <th
                                    key={h}
                                    className={`p-3 text-xs font-semibold text-gray-500 uppercase ${i !== headers.length - 1 ? "border-r" : ""
                                        }`}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <BookingsRow key={b.id} booking={b} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BookingsTable;
