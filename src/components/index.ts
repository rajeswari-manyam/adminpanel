export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    vehicles: number;
    joinDate: string;
    status: "Active" | "Inactive";
    initials: string;
    color: string;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}