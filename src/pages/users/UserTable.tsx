// import { UserUI } from "../../types/User.types";
// import UserRow from "./UserRow";

// const UserTable = ({ users }: { users: UserUI[] }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full text-left">
//       <thead className="bg-gray-50">
//         <tr>
//           {["Profile","Name","Email","Phone","Vehicles","Join Date","Status","Actions"]
//             .map(h => <th key={h} className="p-3">{h}</th>)}
//         </tr>
//       </thead>
//       <tbody>
//         {users.map(u => <UserRow key={u.id} user={u} />)}
//       </tbody>
//     </table>
//   </div>
// );

// export default UserTable;

import React from 'react';

// Types
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

// UserRow Component
const UserRow = ({ user }: { user: UserUI }) => (
    <tr className="border-t">
        <td className="p-3 border-r">
            <div className={`w-10 h-10 rounded-full ${user.color} text-white flex items-center justify-center flex-shrink-0`}>
                {user.initials}
            </div>
        </td>
        <td className="p-3 break-words border-r">{user.name}</td>
        <td className="p-3 break-words max-w-xs border-r">{user.email}</td>
        <td className="p-3 break-words border-r">{user.phone}</td>
        <td className="p-3 whitespace-nowrap border-r">{user.vehicles} {user.vehicles > 1 ? "vehicles" : "vehicle"}</td>
        <td className="p-3 whitespace-nowrap border-r">{user.joinDate}</td>
        <td className="p-3 border-r">
            <span className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${user.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}>
                {user.status}
            </span>
        </td>
        <td className="p-3">
            <div className="flex gap-2 flex-wrap">

                <button className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm whitespace-nowrap">Edit</button>
                {user.status === "Active" && (
                    <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm whitespace-nowrap">Block</button>
                )}
            </div>
        </td>
    </tr>
);

// UserTable Component
const UserTable = ({ users }: { users: UserUI[] }) => (
    <div className="w-full">
        <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
                <tr>
                    <th className="p-3 border-r">Profile</th>
                    <th className="p-3 border-r">Name</th>
                    <th className="p-3 border-r">Email</th>
                    <th className="p-3 border-r">Phone</th>
                    <th className="p-3 border-r">Vehicles</th>
                    <th className="p-3 border-r">Join Date</th>
                    <th className="p-3 border-r">Status</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => <UserRow key={u.id} user={u} />)}
            </tbody>
        </table>
    </div>
);


export default UserTable;