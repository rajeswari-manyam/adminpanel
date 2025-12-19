import React, { useState } from "react";
import { Users, Car, Calendar, CreditCard, CheckCircle, Clock, AlertTriangle, Flag } from "lucide-react";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("7days");

  const statCards = [
    { title: "Total Users", value: "1,248", icon: Users, color: "bg-blue-500", lightColor: "bg-blue-400" },
    { title: "Pending Vehicles", value: "32", icon: Flag, color: "bg-orange-500", lightColor: "bg-orange-400" },
    { title: "Approved Vehicles", value: "210", icon: CheckCircle, color: "bg-green-500", lightColor: "bg-green-400" },
    { title: "Total Bookings", value: "3,540", icon: Calendar, color: "bg-purple-500", lightColor: "bg-purple-400" },
  ];

  const bookingCards = [
    { title: "Today's Bookings", value: "68", icon: Clock, color: "bg-blue-500", lightColor: "bg-blue-400" },
    { title: "Pending Bookings", value: "41", icon: AlertTriangle, color: "bg-orange-500", lightColor: "bg-orange-400" },
    { title: "Completed Bookings", value: "3,112", icon: CheckCircle, color: "bg-green-500", lightColor: "bg-green-400" },
  ];

  const bookingsData7Days = [
    { date: "Apr 16", total: 100, actual: 85, pending: 90 },
    { date: "Apr 22", total: 150, actual: 130, pending: 140 },
    { date: "Apr 23", total: 180, actual: 165, pending: 170 },
    { date: "Apr 24", total: 200, actual: 190, pending: 195 },
  ];

  const bookingsData30Days = [
    { date: "Mar 25", total: 80, actual: 70, pending: 75 },
    { date: "Apr 1", total: 120, actual: 100, pending: 110 },
    { date: "Apr 8", total: 140, actual: 125, pending: 130 },
    { date: "Apr 15", total: 160, actual: 145, pending: 150 },
    { date: "Apr 22", total: 180, actual: 165, pending: 170 },
    { date: "Apr 29", total: 210, actual: 195, pending: 200 },
  ];

  const bookingsData = activeTab === "7days" ? bookingsData7Days : bookingsData30Days;

  const newUsersData = [
    { label: "Today", value: 35, color: "bg-blue-500" },
    { label: "Pending", value: 25, color: "bg-orange-500" },
    { label: "Completed", value: 45, color: "bg-green-500" },
  ];

  const maxUsers = Math.max(...newUsersData.map(d => d.value));

  const vehicleStatus = {
    approved: 65,
    pending: 20,
    rejected: 15,
  };

  const total = vehicleStatus.approved + vehicleStatus.pending + vehicleStatus.rejected;
  const approvedPercentage = (vehicleStatus.approved / total) * 100;
  const pendingPercentage = (vehicleStatus.pending / total) * 100;
  const rejectedPercentage = (vehicleStatus.rejected / total) * 100;

  const approvedAngle = (approvedPercentage / 100) * 360;
  const pendingAngle = (pendingPercentage / 100) * 360;
  const rejectedAngle = (rejectedPercentage / 100) * 360;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Admin 👋</h1>
      <p className="text-gray-600 mb-6">Here's what's happening with your rental business today</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statCards.map((card, index) => (
          <div key={index} className={`${card.color} rounded-xl p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">{card.title}</p>
                <p className="text-4xl font-bold">{card.value}</p>
              </div>
              <div className={`${card.lightColor} p-4 rounded-lg`}>
                <card.icon size={32} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {bookingCards.map((card, index) => (
          <div key={index} className={`${card.color} rounded-xl p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">{card.title}</p>
                <p className="text-4xl font-bold">{card.value}</p>
              </div>
              <div className={`${card.lightColor} p-4 rounded-lg`}>
                <card.icon size={32} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Bookings Overview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("7days")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "7days"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setActiveTab("30days")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "30days"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          <div className="relative h-64">
            <svg className="w-full h-full">
              {/* Grid lines */}
              {[0, 50, 100, 150, 200].map((y, i) => (
                <g key={i}>
                  <line
                    x1="50"
                    y1={240 - (y * 1.1)}
                    x2="95%"
                    y2={240 - (y * 1.1)}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <text x="10" y={245 - (y * 1.1)} className="text-xs fill-gray-500">
                    {y}
                  </text>
                </g>
              ))}

              {/* X-axis labels */}
              {bookingsData.map((point, i) => (
                <text
                  key={i}
                  x={50 + (i * (90 / (bookingsData.length - 1))) + "%"}
                  y="260"
                  className="text-xs fill-gray-500"
                  textAnchor="middle"
                >
                  {point.date}
                </text>
              ))}

              {/* Lines */}
              {/* Total Bookings - Blue */}
              <polyline
                points={bookingsData
                  .map((point, i) => `${50 + (i * (85 / (bookingsData.length - 1)))}%,${240 - point.total * 1.1}`)
                  .join(" ")}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />
              {bookingsData.map((point, i) => (
                <circle
                  key={i}
                  cx={`${50 + (i * (85 / (bookingsData.length - 1)))}%`}
                  cy={240 - point.total * 1.1}
                  r="5"
                  fill="#3b82f6"
                />
              ))}

              {/* Actual Bookings - Orange */}
              <polyline
                points={bookingsData
                  .map((point, i) => `${50 + (i * (85 / (bookingsData.length - 1)))}%,${240 - point.actual * 1.1}`)
                  .join(" ")}
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
              />
              {bookingsData.map((point, i) => (
                <circle
                  key={i}
                  cx={`${50 + (i * (85 / (bookingsData.length - 1)))}%`}
                  cy={240 - point.actual * 1.1}
                  r="5"
                  fill="#f97316"
                />
              ))}

              {/* Pending Bookings - Green */}
              <polyline
                points={bookingsData
                  .map((point, i) => `${50 + (i * (85 / (bookingsData.length - 1)))}%,${240 - point.pending * 1.1}`)
                  .join(" ")}
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
              />
              {bookingsData.map((point, i) => (
                <circle
                  key={i}
                  cx={`${50 + (i * (85 / (bookingsData.length - 1)))}%`}
                  cy={240 - point.pending * 1.1}
                  r="5"
                  fill="#22c55e"
                />
              ))}
            </svg>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Total Bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-600">Actual Bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Pending Bookings</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Vehicle Status - Donut Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Vehicle Status</h2>
            <div className="flex items-center justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="40"
                  strokeDasharray={`${(approvedAngle / 360) * 502.65} 502.65`}
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="40"
                  strokeDasharray={`${(pendingAngle / 360) * 502.65} 502.65`}
                  strokeDashoffset={`-${(approvedAngle / 360) * 502.65}`}
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="40"
                  strokeDasharray={`${(rejectedAngle / 360) * 502.65} 502.65`}
                  strokeDashoffset={`-${((approvedAngle + pendingAngle) / 360) * 502.65}`}
                  transform="rotate(-90 100 100)"
                />
                <circle cx="100" cy="100" r="60" fill="white" />
              </svg>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Approved</span>
                </div>
                <span className="text-sm font-semibold">{vehicleStatus.approved}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="text-sm font-semibold">{vehicleStatus.pending}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Rejected</span>
                </div>
                <span className="text-sm font-semibold">{vehicleStatus.rejected}%</span>
              </div>
            </div>
          </div>

          {/* New Users Analytics - Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">New Users Analytics</h2>
            <div className="flex items-end justify-around h-48 gap-4">
              {newUsersData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full flex items-end justify-center mb-2" style={{ height: "160px" }}>
                    <div
                      className={`${item.color} rounded-t-lg w-full transition-all duration-500`}
                      style={{ height: `${(item.value / maxUsers) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 text-center mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;