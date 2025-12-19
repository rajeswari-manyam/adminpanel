import React, { useState } from "react";
import { Plus } from "lucide-react";

interface User {
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

const USERS_PER_PAGE = 4;

const UserManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const users: User[] = [
        { id: 1, name: "Sravan Kumar", email: "sravan@example.com", phone: "9876543210", vehicles: 3, joinDate: "Jan 15, 2024", status: "Active", initials: "S", color: "bg-indigo-500" },
        { id: 2, name: "Anjali Sharma", email: "anjali@example.com", phone: "9123456789", vehicles: 2, joinDate: "Feb 20, 2024", status: "Active", initials: "A", color: "bg-indigo-400" },
        { id: 3, name: "Ramesh Patel", email: "ramesh@example.com", phone: "9988776655", vehicles: 1, joinDate: "Mar 10, 2024", status: "Inactive", initials: "R", color: "bg-purple-500" },
        { id: 4, name: "Priya Reddy", email: "priya@example.com", phone: "9012345678", vehicles: 4, joinDate: "Apr 05, 2024", status: "Active", initials: "P", color: "bg-indigo-500" },
        { id: 5, name: "John Smith", email: "john@example.com", phone: "9900887766", vehicles: 2, joinDate: "May 12, 2024", status: "Active", initials: "J", color: "bg-indigo-400" },
        { id: 6, name: "Rahul Verma", email: "rahul@example.com", phone: "9898989898", vehicles: 1, joinDate: "Jun 01, 2024", status: "Active", initials: "R", color: "bg-purple-400" },
    ];

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const start = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(start, start + USERS_PER_PAGE);

    return (
        <div className="p-6">
            {/* Card */}
            <div className="bg-white rounded-lg shadow p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">User Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage and monitor all registered users</p>
                    </div>
                    <button className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0]
  text-white px-6 py-2 rounded-lg flex gap-2 items-center">
                        <Plus size={20} /> Add New User
                    </button>
                </div>

                {/* Search */}
                <div className="flex mb-4 gap-2">
                    <input
                        className="flex-1 p-3 border rounded-lg"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                    <button className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0]
 text-white px-6 py-3 rounded-lg">Search</button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3">Profile</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Vehicles</th>
                                <th className="p-3">Join Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map(u => (
                                <tr key={u.id} className="border-t">
                                    <td className="p-3">
                                        <div className={`w-10 h-10 rounded-full ${u.color} text-white flex items-center justify-center`}>
                                            {u.initials}
                                        </div>
                                    </td>
                                    <td className="p-3">{u.name}</td>
                                    <td className="p-3">{u.email}</td>
                                    <td className="p-3">{u.phone}</td>
                                    <td className="p-3">{u.vehicles} {u.vehicles > 1 ? "vehicles" : "vehicle"}</td>
                                    <td className="p-3">{u.joinDate}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 rounded-full text-sm ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">View</button>
                                        <button className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm">Edit</button>
                                        {u.status === "Active" && (
                                            <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm">Block</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <p className="text-gray-600 text-sm">
                        Showing {start + 1} to {Math.min(start + USERS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
                    </p>
                    <div className="flex gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 border rounded disabled:opacity-50">Previous</button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "border"}`}>
                                {i + 1}
                            </button>
                        ))}
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 border rounded disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
