import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingsOverview from "./BookingOverView";
import VehicleStatusChart from "./VehicleStatusCharts";
import NewUsersChart from "./NewUsersChart";
import { useUserStore } from "../../../store/UserStore";
import { useStatCards, useBookingCards } from "./DashBoardData";
import { bookings7Days, bookings30Days, newUsersData, vehicleStatus } from "./DashBoardData";
import { ActiveTab } from "./types";
import ApiService from "../../../services/Api.service";

const BOOKING_API_URL = "http://192.168.1.26:3000";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("7days");
  const navigate = useNavigate();

  const statCards = useStatCards();
  const bookingCards = useBookingCards();

  const {
    usersCount,
    pendingVehiclesCount,
    approvedVehiclesCount,
    totalBookingsCount,
    todaysBookingsCount,
    pendingBookingsCount,
    completedBookingsCount,
    setTotalBookingsCount,
    setTodaysBookingsCount,
    setPendingBookingsCount,
    setCompletedBookingsCount,
  } = useUserStore();

  // ✅ Fetch all booking counts when Dashboard loads
  useEffect(() => {
    const fetchAllBookingCounts = async () => {
      try {
        console.log("🔄 Fetching booking counts for dashboard...");

        // ✅ 1. Fetch ALL bookings to get total and status counts
        const allBookingsResponse = await ApiService.getAllBookings("All Bookings");
        console.log("📦 All Bookings Response:", allBookingsResponse);

        let allBookings = [];
        if (Array.isArray(allBookingsResponse)) {
          allBookings = allBookingsResponse;
        } else if (Array.isArray(allBookingsResponse.data)) {
          allBookings = allBookingsResponse.data;
        } else if (Array.isArray(allBookingsResponse.bookings)) {
          allBookings = allBookingsResponse.bookings;
        }

        console.log("📊 All Bookings Array Length:", allBookings.length);
        if (allBookings.length > 0) {
          console.log("📋 First booking structure:", allBookings[0]);
        }

        // ✅ 2. Fetch TODAY's bookings
        const todayResponse = await fetch(`${BOOKING_API_URL}/Today`, {
          method: "GET",
          redirect: "follow"
        });
        const todayResult = await todayResponse.json();
        console.log("📅 Today's Response:", todayResult);
        
        const todayBookings = todayResult.data || [];
        console.log("📊 Today's Bookings Length:", todayBookings.length);

        // ✅ 3. Calculate counts from ALL bookings
        const totalCount = allBookings.length;
        const todayCount = todayBookings.length;

        // Handle both nested and flat booking structures for status
        const pendingCount = allBookings.filter((b: any) => {
          const status = b.booking?.status || b.status || "";
          return status.toLowerCase() === "pending";
        }).length;

        const completedCount = allBookings.filter((b: any) => {
          const status = b.booking?.status || b.status || "";
          return status.toLowerCase() === "completed";
        }).length;

        // ✅ 4. Update Zustand store
        setTotalBookingsCount(totalCount);
        setTodaysBookingsCount(todayCount);
        setPendingBookingsCount(pendingCount);
        setCompletedBookingsCount(completedCount);

        console.log("✅ Dashboard Counts Updated:", {
          "Total Bookings": totalCount,
          "Today's Bookings": todayCount,
          "Pending Bookings": pendingCount,
          "Completed Bookings": completedCount
        });

      } catch (err) {
        console.error("❌ Error fetching booking counts:", err);
        // Reset to 0 on error
        setTotalBookingsCount(0);
        setTodaysBookingsCount(0);
        setPendingBookingsCount(0);
        setCompletedBookingsCount(0);
      }
    };

    fetchAllBookingCounts();
  }, []); // Run once when dashboard loads

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, Admin 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your rental business today
        </p>
      </div>

      {/* ✅ Dynamic Stat Cards with Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            onClick={() => card.path && navigate(card.path)}
            className={`${card.color} rounded-lg shadow-md p-6 text-white cursor-pointer 
              hover:shadow-xl hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white text-sm font-medium mb-2 opacity-90">
                  {card.title}
                </p>
                <p className="text-4xl font-bold">{card.value}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <card.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Dynamic Booking Cards with Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {bookingCards.map((card, index) => (
          <div
            key={index}
            onClick={() => card.path && navigate(card.path)}
            className={`${card.color} rounded-lg shadow-md p-6 text-white cursor-pointer 
              hover:shadow-xl hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white text-sm font-medium mb-2 opacity-90">
                  {card.title}
                </p>
                <p className="text-4xl font-bold">{card.value}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <card.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Overview - Takes 2 columns */}
        <div className="lg:col-span-2">
          <BookingsOverview
            data={activeTab === "7days" ? bookings7Days : bookings30Days}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Side Charts - Takes 1 column */}
        <div className="space-y-6">
          <VehicleStatusChart status={vehicleStatus} />
          <NewUsersChart data={newUsersData} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
// import BookingsOverview from "./BookingOverView";
// import VehicleStatusChart from "./VehicleStatusCharts";
// import NewUsersChart from "./NewUsersChart";
// import { useUserStore } from "../../../store/UserStore";
// // ✅ Import the custom hooks for dynamic stat and booking cards
// import { useStatCards, useBookingCards } from "./DashBoardData";

// import { bookings7Days, bookings30Days, newUsersData, vehicleStatus } from "./DashBoardData";
// import { ActiveTab } from "./types";

// const DashBoard = () => {
//   const [activeTab, setActiveTab] = useState<ActiveTab>("7days");
//   const navigate = useNavigate(); // ✅ Initialize navigate

//   // ✅ Use hooks to get dynamic cards
//   const statCards = useStatCards();
//   const bookingCards = useBookingCards();
// const {
//   usersCount,
//   pendingVehiclesCount,
//   approvedVehiclesCount,
//   totalBookingsCount,
//   todaysBookingsCount,
//   pendingBookingsCount,
//   completedBookingsCount,
// } = useUserStore();

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Welcome, Admin 👋
//         </h1>
//         <p className="text-gray-600">
//           Here's what's happening with your rental business today
//         </p>
//       </div>

//       {/* ✅ Dynamic Stat Cards with Navigation */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         {statCards.map((card, index) => (
//           <div
//             key={index}
//             onClick={() => card.path && navigate(card.path)} // ✅ Navigate on click
//             className={`${card.color} rounded-lg shadow-md p-6 text-white cursor-pointer 
//               hover:shadow-xl hover:scale-105 transition-all duration-300`} // ✅ Added hover effects
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex-1">
//                 <p className="text-white text-sm font-medium mb-2 opacity-90">
//                   {card.title}
//                 </p>
//                 <p className="text-4xl font-bold">{card.value}</p>
//               </div>
//               <div className="bg-white bg-opacity-20 p-3 rounded-lg">
//                 <card.icon className="w-8 h-8 text-white" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Dynamic Booking Cards with Navigation */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         {bookingCards.map((card, index) => (
//           <div
//             key={index}
//             onClick={() => card.path && navigate(card.path)} // ✅ Navigate on click
//             className={`${card.color} rounded-lg shadow-md p-6 text-white cursor-pointer 
//               hover:shadow-xl hover:scale-105 transition-all duration-300`} // ✅ Added hover effects
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex-1">
//                 <p className="text-white text-sm font-medium mb-2 opacity-90">
//                   {card.title}
//                 </p>
//                 <p className="text-4xl font-bold">{card.value}</p>
//               </div>
//               <div className="bg-white bg-opacity-20 p-3 rounded-lg">
//                 <card.icon className="w-8 h-8 text-white" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Bookings Overview - Takes 2 columns */}
//         <div className="lg:col-span-2">
//           <BookingsOverview
//             data={activeTab === "7days" ? bookings7Days : bookings30Days}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//           />
//         </div>

//         {/* Side Charts - Takes 1 column */}
//         <div className="space-y-6">
//           <VehicleStatusChart status={vehicleStatus} />
//           <NewUsersChart data={newUsersData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;