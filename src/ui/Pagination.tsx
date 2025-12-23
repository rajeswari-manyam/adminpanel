import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  label?: string; // users | bookings | vehicles
  theme?: "blue" | "purple";
  responsive?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  label = "items",
  theme = "blue",
  responsive = true,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems === 0 || totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const activeColor =
    theme === "purple" ? "bg-purple-600" : "bg-blue-600";
  const hoverColor =
    theme === "purple" ? "hover:bg-purple-50" : "hover:bg-blue-50";

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 px-4 py-3 bg-white border-t">
      {/* INFO */}
      <p className="text-sm text-gray-600 text-center md:text-left">
        Showing <span className="font-semibold">{startIndex}</span> to{" "}
        <span className="font-semibold">{endIndex}</span> of{" "}
        <span className="font-semibold">{totalItems}</span> {label}
      </p>

      {/* CONTROLS */}
      <div className="flex items-center justify-center gap-2">
        {/* PREV */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 rounded-md border bg-white text-gray-700 disabled:opacity-50"
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        <div className={`${responsive ? "hidden md:flex" : "flex"} gap-1`}>
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-1 rounded-md text-sm font-medium border transition-colors ${
                  currentPage === page
                    ? `${activeColor} text-white`
                    : `bg-white text-gray-700 ${hoverColor}`
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* NEXT */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 rounded-md border bg-white text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
