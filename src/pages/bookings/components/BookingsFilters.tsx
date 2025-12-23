import { FilterStatus } from "../../../types/Bookings.types";

interface BookingsFiltersProps {
    activeFilter: FilterStatus;
    onChange: (filter: FilterStatus) => void;
}

const BookingsFilters = ({ activeFilter, onChange }: BookingsFiltersProps) => {
    const filters: FilterStatus[] = [
        "All Bookings",
        "Today",
        "Upcoming",
    
        "Confirmed",
        "Cancelled",
        "AutoCancelled",
        "Completed"
    ];

    return (
        <div className="mb-6 flex flex-wrap gap-2">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onChange(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === filter
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default BookingsFilters;