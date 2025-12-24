




// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
// import BookingsOverview from "./BookingOverView";
// import VehicleStatusChart from "./VehicleStatusCharts";
// import NewUsersChart from "./NewUsersChart";

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
//       <div className="space-y-6">
//   <VehicleStatusChart status={vehicleStatus} />
//   <NewUsersChart data={newUsersData} />
// </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;








// import { useState } from "react";
// import StatCards from "./statCards";
// import BookingCards from "./Bookingcards";
// import BookingsOverview from "./BookinhOverView";
// import VehicleStatusChart from "./VehicleStatusCharts";
// import NewUsersChart from "./NewUsersChart";
// import { statCards, bookingCards, bookings7Days, bookings30Days, newUsersData, vehicleStatus } from "./DashBoardData";

// const DashBoard = () => {
//   const [activeTab, setActiveTab] = useState("7days");

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-2">Welcome, Admin 👋</h1>
//       <p className="text-gray-600 mb-6">
//         Here's what's happening with your rental business today
//       </p>

//       <StatCards cards={statCards} />
//       <BookingCards cards={bookingCards} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <BookingsOverview
//           data={activeTab === "7days" ? bookings7Days : bookings30Days}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//         />

//         <div className="space-y-6">
//           <VehicleStatusChart status={vehicleStatus} />
//           <NewUsersChart data={newUsersData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;




import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import BookingsOverview from "./BookingOverView";
import VehicleStatusChart from "./VehicleStatusCharts";
import NewUsersChart from "./NewUsersChart";
import { useUserStore } from "../../../store/UserStore";

// ✅ Import the custom hooks for dynamic stat and booking cards
import { useStatCards, useBookingCards } from "./DashBoardData";

import { bookings7Days, bookings30Days, newUsersData, vehicleStatus } from "./DashBoardData";
import { ActiveTab } from "./types";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("7days");
  const navigate = useNavigate(); // ✅ Initialize navigate

  // ✅ Use hooks to get dynamic cards
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
} = useUserStore();

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
            onClick={() => card.path && navigate(card.path)} // ✅ Navigate on click
            className={`${card.color} rounded-lg shadow-md p-6 text-white cursor-pointer 
              hover:shadow-xl hover:scale-105 transition-all duration-300`} // ✅ Added hover effects
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
            onClick={() => card.path && navigate(card.path)} // ✅ Navigate on click
            className={`${card.color} rounded-lg shadow-md p-6 text-white cursor-pointer 
              hover:shadow-xl hover:scale-105 transition-all duration-300`} // ✅ Added hover effects
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