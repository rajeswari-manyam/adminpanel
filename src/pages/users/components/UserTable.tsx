import React from "react";
import { useNavigate } from "react-router-dom";

/* TYPES */
interface UserUI {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicles: number;
    joinDate: string;
    status: "Active" | "Inactive";
    initials: string;
    color: string;
}

/* USER ROW */
const UserRow = ({ user }: { user: UserUI }) => {
    const navigate = useNavigate();

    return (
        <tr className="border-t">
            <td className="p-3 border-r">
                <div
                    className={`w-10 h-10 rounded-full ${user.color} text-white flex items-center justify-center`}
                >
                    {user.initials}
                </div>
            </td>

            <td className="p-3 border-r">{user.name}</td>
            <td className="p-3 border-r">{user.email}</td>
            <td className="p-3 border-r">{user.phone}</td>

            <td className="p-3 border-r">
                {user.vehicles} {user.vehicles > 1 ? "vehicles" : "vehicle"}
            </td>

            <td className="p-3 border-r">{user.joinDate}</td>

            <td className="p-3 border-r">
                <span
                    className={`px-3 py-1 rounded-full text-sm ${user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                >
                    {user.status}
                </span>
            </td>

            <td className="p-3">
                <button
                    onClick={() => navigate(`/vehicles/${user.id}`)}
                    className="relative z-10 px-3 py-1 bg-purple-500 text-white rounded-lg text-sm"
                >
                    View
                </button>
            </td>
        </tr>
    );
};

/* USER TABLE */
const UserTable = ({ users }: { users: UserUI[] }) => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Users</h2>

            <table className="w-full border-collapse text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border-r">Profile</th>
                        <th className="p-3 border-r">Name</th>
                        <th className="p-3 border-r">Email</th>
                        <th className="p-3 border-r">Phone</th>
                        <th className="p-3 border-r">Vehicles</th>
                        <th className="p-3 border-r">Join Date</th>
                        <th className="p-3 border-r">Status</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <UserRow key={u.id} user={u} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
