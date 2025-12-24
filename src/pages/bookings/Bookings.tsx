import { useEffect, useState } from "react";
import { Booking, ApiBooking, FilterStatus } from "../../types/Bookings.types";
import { mapApiBookingToBooking } from "../../types/Bookings.types";
import BookingsFilters from "./components/BookingsFilters";
import BookingsTable from "./components/BookingsTable";
import Pagination from "../../ui/Pagination";
import BookingsCard from "./components/BookingCard";
import ApiService from "../../services/Api.service";
import { useUserStore } from "../../store/UserStore"; // ✅ Import store

const PER_PAGE = 3;

const BOOKING_API_URL = "http://192.168.1.26:3000";

// Helper function to transform flat API response to nested structure
const transformFlatBooking = (flatBooking: any): ApiBooking => {
    return {
        booking: {
            _id: flatBooking._id,
            vechileType: flatBooking.vechileType,
            FromDate: flatBooking.FromDate,
            ToDate: flatBooking.ToDate,
            totalPrice: flatBooking.totalPrice,
            status: flatBooking.status
        },
        user: {
            name: flatBooking.contactName || "Unknown User",
            email: flatBooking.email || "No email",
            mobilenumber: flatBooking.contactNumber || "No phone"
        },
        vehicle: {
            CarName: flatBooking.vehicleName || "Vehicle not available",
            CarNumber: flatBooking.vehicleNumber || "N/A"
        }
    };
};

const BookingsPage = () => {
    const [filter, setFilter] = useState<FilterStatus>("All Bookings");
    const [page, setPage] = useState(1);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ Get setters from store
    const setTotalBookingsCount = useUserStore((state) => state.setTotalBookingsCount);
    const setPendingBookingsCount = useUserStore((state) => state.setPendingBookingsCount);
    const setCompletedBookingsCount = useUserStore((state) => state.setCompletedBookingsCount);
    const setTodaysBookingsCount = useUserStore((state) => state.setTodaysBookingsCount);

    // Fetch Today's bookings
    const fetchTodayBookings = async () => {
        try {
            const response = await fetch(`${BOOKING_API_URL}/Today`, {
                method: "GET",
                redirect: "follow"
            });
            const result = await response.json();
            console.log("Today API Response:", result);

            // Extract data array and transform to nested structure
            const flatBookings = result.data || [];
            return flatBookings.map(transformFlatBooking);
        } catch (err) {
            console.error("Error fetching today's bookings:", err);
            throw err;
        }
    };

    // Fetch Upcoming bookings
    const fetchUpcomingBookings = async () => {
        try {
            const response = await fetch(`${BOOKING_API_URL}/upcoming`, {
                method: "GET",
                redirect: "follow"
            });
            const result = await response.json();
            console.log("Upcoming API Response:", result);

            // Extract data array and transform to nested structure
            const flatBookings = result.data || [];
            return flatBookings.map(transformFlatBooking);
        } catch (err) {
            console.error("Error fetching upcoming bookings:", err);
            throw err;
        }
    };

    // Fetch bookings based on filter
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                let apiBookings: ApiBooking[] = [];

                // Check which filter is selected and call appropriate API
                if (filter === "Today") {
                    apiBookings = await fetchTodayBookings();
                } else if (filter === "Upcoming") {
                    apiBookings = await fetchUpcomingBookings();
                } else {
                    // Use existing getAllBookings API for other filters
                    const response = await ApiService.getAllBookings(filter);
                    console.log("API Response:", response);
                    console.log("Response type:", typeof response);
                    console.log("Response.data:", response.data);

                    // Get the array of API bookings - handle different response structures
                    if (Array.isArray(response)) {
                        apiBookings = response;
                    } else if (Array.isArray(response.data)) {
                        apiBookings = response.data;
                    } else if (Array.isArray(response.bookings)) {
                        apiBookings = response.bookings;
                    } else {
                        console.warn("Unexpected response structure:", response);
                        apiBookings = [];
                    }
                }

                console.log("API Bookings count:", apiBookings.length);
                console.log("First booking:", apiBookings[0]);

                // Transform to UI-friendly format with error handling
                const transformedBookings = apiBookings
                    .map((apiBooking, index) => {
                        try {
                            return mapApiBookingToBooking(apiBooking);
                        } catch (err) {
                            console.error(`Error transforming booking at index ${index}:`, err);
                            console.error("Problematic booking data:", apiBooking);
                            return null;
                        }
                    })
                    .filter((booking): booking is Booking => booking !== null);

                console.log("Transformed bookings count:", transformedBookings.length);
                setBookings(transformedBookings);
                
                // ✅ UPDATE STORE COUNTS
                setTotalBookingsCount(transformedBookings.length);
                
                // Calculate pending and completed counts
                const pendingCount = transformedBookings.filter(b => b.status.toLowerCase() === "pending").length;
                const completedCount = transformedBookings.filter(b => b.status.toLowerCase() === "completed").length;
                
                setPendingBookingsCount(pendingCount);
                setCompletedBookingsCount(completedCount);
                
                // Update today's count if we're on the "Today" filter
                if (filter === "Today") {
                    setTodaysBookingsCount(transformedBookings.length);
                }
                
                setPage(1);
            } catch (err: any) {
                console.error("Fetch error:", err);
                setError(err.message || "Failed to fetch bookings");
                setBookings([]);
                
                // ✅ Reset counts on error
                setTotalBookingsCount(0);
                setPendingBookingsCount(0);
                setCompletedBookingsCount(0);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [filter, setTotalBookingsCount, setPendingBookingsCount, setCompletedBookingsCount, setTodaysBookingsCount]);

    const totalPages = Math.ceil(bookings.length / PER_PAGE);
    const paginatedData = bookings.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">All Bookings</h1>
                <p className="text-gray-600">
                    {loading ? "Loading..." : `${bookings.length} bookings found`}
                </p>
            </div>

            <BookingsFilters activeFilter={filter} onChange={setFilter} />

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className="mt-4 text-gray-600">Loading bookings...</p>
                    </div>
                ) : error ? (
                    <div className="p-12 text-center text-red-600">
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <p>No bookings found</p>
                    </div>
                ) : (
                    <>
                        {/* MOBILE VIEW */}
                        <div className="block md:hidden space-y-4 p-4">
                            {paginatedData.map((b) => (
                                <BookingsCard
                                    key={b.id}
                                    booking={b}
                                />
                            ))}
                        </div>

                        <BookingsTable bookings={paginatedData} />

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalItems={bookings.length}
                                itemsPerPage={PER_PAGE}
                                onPageChange={setPage}
                                label="bookings"
                                theme="blue"
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingsPage;









// import { useEffect, useState } from "react";
// import { Booking, ApiBooking, FilterStatus } from "../../types/Bookings.types";
// import { mapApiBookingToBooking } from "../../types/Bookings.types";
// import BookingsFilters from "./components/BookingsFilters";
// import BookingsTable from "./components/BookingsTable";
// import Pagination from "../../ui/Pagination";
// import BookingsCard from "./components/BookingCard";
// import ApiService from "../../services/Api.service";
// import { useUserStore } from "../../store/UserStore"; // ✅ Import store
// const PER_PAGE = 3;

// const BOOKING_API_URL = "http://192.168.1.26:3000";

// // Helper function to transform flat API response to nested structure
// const transformFlatBooking = (flatBooking: any): ApiBooking => {
//     return {
//         booking: {
//             _id: flatBooking._id,
//             vechileType: flatBooking.vechileType,
//             FromDate: flatBooking.FromDate,
//             ToDate: flatBooking.ToDate,
//             totalPrice: flatBooking.totalPrice,
//             status: flatBooking.status
//         },
//         user: {
//             name: flatBooking.contactName || "Unknown User",
//             email: flatBooking.email || "No email",
//             mobilenumber: flatBooking.contactNumber || "No phone"
//         },
//         vehicle: {
//             CarName: flatBooking.vehicleName || "Vehicle not available",
//             CarNumber: flatBooking.vehicleNumber || "N/A"
//         }
//     };
// };

// const BookingsPage = () => {
//     const [filter, setFilter] = useState<FilterStatus>("All Bookings");
//     const [page, setPage] = useState(1);
//     const [bookings, setBookings] = useState<Booking[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//   // ✅ Get setters from store
//     const setTotalBookingsCount = useUserStore((state) => state.setTotalBookingsCount);
//     const setPendingBookingsCount = useUserStore((state) => state.setPendingBookingsCount);
//     const setCompletedBookingsCount = useUserStore((state) => state.setCompletedBookingsCount);
//     // Fetch Today's bookings
//     const fetchTodayBookings = async () => {
//         try {
//             const response = await fetch(`${BOOKING_API_URL}/Today`, {
//                 method: "GET",
//                 redirect: "follow"
//             });
//             const result = await response.json();
//             console.log("Today API Response:", result);

//             // Extract data array and transform to nested structure
//             const flatBookings = result.data || [];
//             return flatBookings.map(transformFlatBooking);
//         } catch (err) {
//             console.error("Error fetching today's bookings:", err);
//             throw err;
//         }
//     };

//     // Fetch Upcoming bookings
//     const fetchUpcomingBookings = async () => {
//         try {
//             const response = await fetch(`${BOOKING_API_URL}/upcoming`, {
//                 method: "GET",
//                 redirect: "follow"
//             });
//             const result = await response.json();
//             console.log("Upcoming API Response:", result);

//             // Extract data array and transform to nested structure
//             const flatBookings = result.data || [];
//             return flatBookings.map(transformFlatBooking);
//         } catch (err) {
//             console.error("Error fetching upcoming bookings:", err);
//             throw err;
//         }
//     };

//     // Fetch bookings based on filter
//     useEffect(() => {
//         const fetchBookings = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 let apiBookings: ApiBooking[] = [];

//                 // Check which filter is selected and call appropriate API
//                 if (filter === "Today") {
//                     apiBookings = await fetchTodayBookings();
//                 } else if (filter === "Upcoming") {
//                     apiBookings = await fetchUpcomingBookings();
//                 } else {
//                     // Use existing getAllBookings API for other filters
//                     const response = await ApiService.getAllBookings(filter);
//                     console.log("API Response:", response);
//                     console.log("Response type:", typeof response);
//                     console.log("Response.data:", response.data);

//                     // Get the array of API bookings - handle different response structures
//                     if (Array.isArray(response)) {
//                         apiBookings = response;
//                     } else if (Array.isArray(response.data)) {
//                         apiBookings = response.data;
//                     } else if (Array.isArray(response.bookings)) {
//                         apiBookings = response.bookings;
//                     } else {
//                         console.warn("Unexpected response structure:", response);
//                         apiBookings = [];
//                     }
//                 }

//                 console.log("API Bookings count:", apiBookings.length);
//                 console.log("First booking:", apiBookings[0]);

//                 // Transform to UI-friendly format with error handling
//                 const transformedBookings = apiBookings
//                     .map((apiBooking, index) => {
//                         try {
//                             return mapApiBookingToBooking(apiBooking);
//                         } catch (err) {
//                             console.error(`Error transforming booking at index ${index}:`, err);
//                             console.error("Problematic booking data:", apiBooking);
//                             return null;
//                         }
//                     })
//                     .filter((booking): booking is Booking => booking !== null);

//                 console.log("Transformed bookings count:", transformedBookings.length);
//                 setBookings(transformedBookings);
//                 setPage(1);
//             } catch (err: any) {
//                 console.error("Fetch error:", err);
//                 setError(err.message || "Failed to fetch bookings");
//                 setBookings([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchBookings();
//     }, [filter]);

//     const totalPages = Math.ceil(bookings.length / PER_PAGE);
//     const paginatedData = bookings.slice((page - 1) * PER_PAGE, page * PER_PAGE);

//     return (
//         <div className="p-8">
//             <div className="mb-6">
//                 <h1 className="text-3xl font-bold mb-2">All Bookings</h1>
//                 <p className="text-gray-600">
//                     {loading ? "Loading..." : `${bookings.length} bookings found`}
//                 </p>
//             </div>

//             <BookingsFilters activeFilter={filter} onChange={setFilter} />

//             <div className="bg-white rounded-lg shadow overflow-hidden">
//                 {loading ? (
//                     <div className="p-12 text-center">
//                         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//                         <p className="mt-4 text-gray-600">Loading bookings...</p>
//                     </div>
//                 ) : error ? (
//                     <div className="p-12 text-center text-red-600">
//                         <p>{error}</p>
//                         <button
//                             onClick={() => window.location.reload()}
//                             className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                         >
//                             Retry
//                         </button>
//                     </div>
//                 ) : bookings.length === 0 ? (
//                     <div className="p-12 text-center text-gray-500">
//                         <p>No bookings found</p>
//                     </div>
//                 ) : (
//                     <>
//                         {/* MOBILE VIEW */}
//                         <div className="block md:hidden space-y-4 p-4">
//                             {paginatedData.map((b) => (
//                                 <BookingsCard
//                                     key={b.id}
//                                     booking={b}
//                                 />
//                             ))}
//                         </div>

//                         <BookingsTable bookings={paginatedData} />

//                         {totalPages > 1 && (
//                             <Pagination
//                                 currentPage={page}
//                                 totalItems={bookings.length}
//                                 itemsPerPage={PER_PAGE}
//                                 onPageChange={setPage}
//                                 label="bookings"
//                                 theme="blue"
//                             />
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BookingsPage;