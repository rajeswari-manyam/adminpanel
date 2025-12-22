import { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import UserPagination from "./UserPagination";

import { getAllUsers } from "../../services/Api.service";
import { mapApiUserToUI } from "../../utils/User.mapper";
import { UserUI } from "../../types/User.types";

const USERS_PER_PAGE = 3;

const UserManagement = () => {
    const [users, setUsers] = useState<UserUI[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();

            const mappedUsers = data.users.map(mapApiUserToUI);
            setUsers(mappedUsers);
        } catch (err) {
            setError("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(
        u =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const start = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(start, start + USERS_PER_PAGE);

    if (loading) {
        return <p className="p-6 text-center">Loading users...</p>;
    }

    if (error) {
        return <p className="p-6 text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <div className="bg-white rounded-lg shadow p-6">
                <UserHeader />

                <UserSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    resetPage={() => setCurrentPage(1)}
                />

                <UserTable users={paginatedUsers} />

                <UserPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    start={start}
                    total={filteredUsers.length}
                    perPage={USERS_PER_PAGE}
                />
            </div>
        </div>
    );
};

export default UserManagement;
