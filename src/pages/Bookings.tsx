import React, { useState } from 'react';

interface Booking {
    id: string;
    user: string;
    vehicle: string;
    type: string;
    startDate: string;
    endDate: string;
    days: number;
    amount: number;
    status: 'Upcoming' | 'Pending' | 'Confirmed' | 'Completed';
}

type FilterStatus = 'All Bookings' | 'Upcoming' | 'Pending' | 'Confirmed' | 'Completed';
const BOOKINGS_PER_PAGE = 2;
const BookingsTable: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<FilterStatus>('All Bookings');
    const [currentPage, setCurrentPage] = useState(1);

    const bookings: Booking[] = [
        {
            id: 'BK001',
            user: 'Ramesh Patel',
            vehicle: 'Honda Activa',
            type: 'Bike',
            startDate: '24/04/2024',
            endDate: '26/04/2024',
            days: 2,
            amount: 500,
            status: 'Upcoming'
        },
        {
            id: 'BK002',
            user: 'Priya Reddy',
            vehicle: 'Honda City',
            type: 'Car',
            startDate: '23/04/2024',
            endDate: '25/04/2024',
            days: 2,
            amount: 1200,
            status: 'Pending'
        },
        {
            id: 'BK003',
            user: 'John Smith',
            vehicle: 'Royal Enfield',
            type: 'Bike',
            startDate: '22/04/2024',
            endDate: '23/04/2024',
            days: 1,
            amount: 800,
            status: 'Confirmed'
        },
        {
            id: 'BK004',
            user: 'Neha Singh',
            vehicle: 'Hyundai i20',
            type: 'Car',
            startDate: '20/04/2024',
            endDate: '22/04/2024',
            days: 2,
            amount: 1000,
            status: 'Completed'
        },
        {
            id: 'BK005',
            user: 'Karan Mehta',
            vehicle: 'Yamaha R15',
            type: 'Bike',
            startDate: '25/04/2024',
            endDate: '26/04/2024',
            days: 1,
            amount: 600,
            status: 'Upcoming'
        }
    ];

    const getStatusColor = (status: string): string => {
        const colors = {
            Upcoming: 'bg-blue-100 text-blue-800',
            Pending: 'bg-yellow-100 text-yellow-800',
            Confirmed: 'bg-green-100 text-green-800',
            Completed: 'bg-gray-100 text-gray-800'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const filteredBookings = activeFilter === 'All Bookings'
        ? bookings
        : bookings.filter(b => b.status === activeFilter);

    // Pagination logic
    const totalPages = Math.ceil(filteredBookings.length / BOOKINGS_PER_PAGE);
    const startIndex = (currentPage - 1) * BOOKINGS_PER_PAGE;
    const endIndex = startIndex + BOOKINGS_PER_PAGE;
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

    const filters: FilterStatus[] = ['All Bookings', 'Upcoming', 'Pending', 'Confirmed', 'Completed'];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">All Bookings</h1>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => {
                                setActiveFilter(filter);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === filter
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Booking ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vehicle
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Start Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        End Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Days
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {booking.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {booking.user}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {booking.vehicle}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {booking.type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {booking.startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {booking.endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {booking.days}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ₹{booking.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex flex-col gap-2">
                                                <button className="px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors font-medium">
                                                    View
                                                </button>
                                                {booking.status === 'Pending' ? (
                                                    <>
                                                        <button className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium">
                                                            Confirm
                                                        </button>
                                                        <button className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium">
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button className="px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors font-medium">
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredBookings.length)} of {filteredBookings.length} bookings
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === index + 1
                                        ? 'bg-indigo-600 text-white'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingsTable;









