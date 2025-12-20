import { BookingData } from "./types";

interface Props {
  data: BookingData[];
  activeTab: string;
  setActiveTab: (v: string) => void;
}

const BookingsOverview = ({ data, activeTab, setActiveTab }: Props) => (
  <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
    <div className="flex justify-between mb-6">
      <h2 className="text-xl font-bold">Bookings Overview</h2>
      <div className="flex gap-2">
        {["7days", "30days"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {tab === "7days" ? "7 Days" : "30 Days"}
          </button>
        ))}
      </div>
    </div>

    {/* SVG Chart 그대로 유지 */}
    {/* (same SVG code, just using `data` instead of bookingsData) */}
  </div>
);

export default BookingsOverview;
