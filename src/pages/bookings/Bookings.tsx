import { useEffect, useState } from "react";
import { Booking, FilterStatus } from "../../types/Bookings.types";
import BookingsFilters from "./components/BookingsFilters";
import BookingsTable from "./components/BookingsTable";
import Pagination from "./components/Pagination";
import { getAllBookings } from "../../services/BookingsServices";
import { mapApiBookingToBooking } from "../../utils/Bookings.mapper";
import BookingsCard from "./components/BookingCard";
const PER_PAGE = 3;

const BookingsPage = () => {
    const [filter, setFilter] = useState<FilterStatus>("All Bookings");
    const [page, setPage] = useState(1);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getAllBookings(filter);

                // Map API bookings to UI bookings
                const mappedBookings = response.data.map(mapApiBookingToBooking);
                setBookings(mappedBookings);

                // Reset to page 1 when filter changes
                setPage(1);

                console.log(`Loaded ${mappedBookings.length} bookings for filter: ${filter}`);
            } catch (err) {
                const errorMessage = err instanceof Error
                    ? err.message
                    : "Failed to load bookings";

                console.error("Booking fetch error:", err);
                setError(errorMessage);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [filter]);

    // Calculate pagination
    const totalPages = Math.ceil(bookings.length / PER_PAGE);
    const paginatedData = bookings.slice(
        (page - 1) * PER_PAGE,
        page * PER_PAGE
    );

    // Handle filter change
    const handleFilterChange = (newFilter: FilterStatus) => {
        setFilter(newFilter);
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        // Optional: scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">All Bookings</h1>
                <p className="text-gray-600">
                    {loading ? "Loading..." : `${bookings.length} bookings found`}
                </p>
            </div>

            <BookingsFilters
                activeFilter={filter}
                onChange={handleFilterChange}
            />

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className="mt-4 text-gray-600">Loading bookings...</p>
                    </div>
                ) : error ? (
                    <div className="p-12 text-center">
                        <div className="text-red-600 mb-2">⚠️ Error</div>
                        <p className="text-gray-600">{error}</p>
                        <button
                            onClick={() => setFilter("All Bookings")}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Try Again
                        </button>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <p className="text-lg">No bookings found</p>
                        <p className="text-sm mt-2">Try changing the filter</p>
                    </div>
                ) : (
                    <>

                    {/* MOBILE VIEW */}
<div className="block md:hidden space-y-4">
  {paginatedData.map((booking) => (
    <BookingsCard key={booking.id} booking={booking} />
  ))}
</div>
                        <BookingsTable bookings={paginatedData} />
                        {totalPages > 1 && (
                            <div className="p-4 flex justify-between items-center border-t">
                                <p className="text-sm text-gray-600">
                                    Showing {(page - 1) * PER_PAGE + 1} to{" "}
                                    {Math.min(page * PER_PAGE, bookings.length)} of{" "}
                                    {bookings.length} bookings
                                </p>
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingsPage;