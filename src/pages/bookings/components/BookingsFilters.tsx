import { FilterStatus } from "../../../types/Bookings.types";

interface Props {
    activeFilter: FilterStatus;
    onChange: (filter: FilterStatus) => void;
}

const filters: FilterStatus[] = [
    "All Bookings",
    "Upcoming",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
    "AutoCancelled",
];

const BookingsFilters: React.FC<Props> = ({ activeFilter, onChange }) => {
    return (
        <div className="flex gap-2 mb-6 flex-wrap">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onChange(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === filter
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default BookingsFilters;