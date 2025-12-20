import { useState } from "react";
import StatCards from "./statCards";
import BookingCards from "./Bookingcards";
import BookingsOverview from "./BookinhOverView";
import VehicleStatusChart from "./VehicleStatusCharts";
import NewUsersChart from "./NewUsersChart";
import { statCards, bookingCards, bookings7Days, bookings30Days, newUsersData, vehicleStatus } from "./DashBoardData";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("7days");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome, Admin 👋</h1>
      <p className="text-gray-600 mb-6">
        Here's what's happening with your rental business today
      </p>

      <StatCards cards={statCards} />
      <BookingCards cards={bookingCards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BookingsOverview
          data={activeTab === "7days" ? bookings7Days : bookings30Days}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="space-y-6">
          <VehicleStatusChart status={vehicleStatus} />
          <NewUsersChart data={newUsersData} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
