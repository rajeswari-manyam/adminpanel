import { Plus } from "lucide-react";

const UserHeader = () => (
  <div className="flex justify-between items-center mb-4">
    <div>
      <h1 className="text-2xl font-bold">User Management</h1>
      <p className="text-gray-500 text-sm mt-1">
        Manage and monitor all registered users
      </p>
    </div>

    <button className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-2 rounded-lg flex gap-2 items-center">
      <Plus size={20} /> Add New User
    </button>
  </div>
);

export default UserHeader;
