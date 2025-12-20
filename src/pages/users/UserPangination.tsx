interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    start: number;
    total: number;
    perPage: number;
}

const UserPagination: React.FC<Props> = ({
    currentPage,
    totalPages,
    onPageChange,
    start,
    total,
    perPage,
}) => {
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
            {/* INFO TEXT */}
            <p className="text-gray-600 text-sm text-center md:text-left">
                Showing {start + 1} to {Math.min(start + perPage, total)} of {total} users
            </p>

            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-3 py-1 rounded-md border bg-white text-gray-700 disabled:opacity-50"
                >
                    Prev
                </button>

                {/* PAGE NUMBERS – DESKTOP ONLY */}
                <div className="hidden md:flex gap-2">
                    {getPageNumbers().map((page, index) =>
                        typeof page === "number" ? (
                            <button
                                key={index}
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-1 rounded-md ${currentPage === page
                                    ? "bg-blue-500 text-white"
                                    : "border hover:bg-gray-50"
                                    }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="px-2 text-gray-400">
                                {page}
                            </span>
                        )
                    )}
                </div>

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

export default UserPagination;
