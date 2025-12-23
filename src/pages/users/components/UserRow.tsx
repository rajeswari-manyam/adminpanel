import { UserUI } from "../../../types/User.types";
import { useNavigate } from "react-router-dom";

const UserRow = ({ user }: { user: UserUI }) => {
    const navigate = useNavigate();

    return (
        <tr className="border-t">
            {/* PROFILE */}
            <td className="p-3">{user.initials}</td>

            <td className="p-3">{user.name}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">{user.phone}</td>
            <td className="p-3">
                {user.vehicles} {user.vehicles > 1 ? "vehicles" : "vehicle"}
            </td>
            <td className="p-3">{user.joinDate}</td>

            <td className="p-3">
                <span
                    className={`px-3 py-1 rounded-full text-sm ${user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    {user.status}
                </span>
            </td>

            <td className="p-3 flex gap-2">
                <button
                    onClick={() => navigate(`/vehicles/${user.id}`)}

                    className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm whitespace-nowrap"
                >
                    View
                </button>

                {user.status === "Active" && (
                    <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm">
                        Block
                    </button>
                )}
            </td>
        </tr>
    );
};

export default UserRow;
