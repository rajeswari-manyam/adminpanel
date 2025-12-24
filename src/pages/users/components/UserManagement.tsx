// import { useEffect, useState, useMemo } from "react";
// import UserHeader from "./UserHeader";
// import UserSearch from "./UserSearch";
// import UserTable from "./UserTable";
// import Pagination from "../../../ui/Pagination";

// import ApiService from "../../../services/Api.service";
// import { mapApiUserToUI } from "../../../utils/User.mapper";
// import { UserUI } from "../../../types/User.types";
// import { useUserStore } from "../../../store/UserStore";

// const USERS_PER_PAGE = 2;

// const UserManagement = () => {
//     const [users, setUsers] = useState<UserUI[]>([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const setUsersCount = useUserStore(state => state.setUsersCount);

//     useEffect(() => {
//         fetchUsers();
//     }, []);
//     const fetchUsers = async () => {
//         try {
//             setLoading(true);
//             const data = await ApiService.getAllUsers();
//             const mappedUsers = data.users.map(mapApiUserToUI);

//             setUsers(mappedUsers);
//             setUsersCount(mappedUsers.length); // ✅ TOTAL USERS SET HERE
//         } catch (err: any) {
//             setError(err?.message || "Failed to fetch users");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredUsers = useMemo(
//         () =>
//             users.filter(
//                 u =>
//                     u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     u.email.toLowerCase().includes(searchQuery.toLowerCase())
//             ),
//         [users, searchQuery]
//     );

//     const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

//     const paginatedUsers = useMemo(() => {
//         const start = (currentPage - 1) * USERS_PER_PAGE;
//         return filteredUsers.slice(start, start + USERS_PER_PAGE);
//     }, [filteredUsers, currentPage]);

//     if (loading) return <p className="p-6 text-center">Loading users...</p>;
//     if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

//     return (
//         <div className="p-6">
//             <div className="bg-white rounded-lg shadow p-6">
//                 <UserHeader />

//                 <UserSearch
//                     searchQuery={searchQuery}
//                     setSearchQuery={setSearchQuery}
//                     resetPage={() => setCurrentPage(1)}
//                 />

//                 {filteredUsers.length === 0 ? (
//                     <p className="p-6 text-center text-gray-500">No users found.</p>
//                 ) : (
//                     <>
//                         <UserTable users={paginatedUsers} />

//                         <Pagination
//                             currentPage={currentPage}
//                             totalItems={filteredUsers.length}
//                             itemsPerPage={USERS_PER_PAGE}
//                             onPageChange={setCurrentPage}
//                             label="users"
//                             theme="blue"
//                         />
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserManagement;

import { useEffect, useMemo, useState } from "react";
import ApiService from "../../../services/Api.service";
import UserTable from "./UserTable";
import Pagination from "../../../ui/Pagination";
import UserSearch from "./UserSearch";
import UserHeader from "./UserHeader";
import { useUserStore } from "../../../store/UserStore";
import { mapApiUserToUI } from "../../../utils/User.mapper";
import { UserUI } from "../../../types/User.types";

const USERS_PER_PAGE = 5;

const UserManagement = () => {
  const [users, setUsers] = useState<UserUI[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setUsersCount = useUserStore((state) => state.setUsersCount);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getAllUsers();

      const mappedUsers = data.users.map(mapApiUserToUI);

      setUsers(mappedUsers);
      setUsersCount(mappedUsers.length);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  /* SEARCH FILTER */
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const start = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    start,
    start + USERS_PER_PAGE
  );

  if (loading) return <p className="p-6 text-center">Loading users...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

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

        <Pagination
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={USERS_PER_PAGE}
          onPageChange={setCurrentPage}
          label="users"
          theme="purple"
        />
      </div>
    </div>
  );
};

export default UserManagement;
