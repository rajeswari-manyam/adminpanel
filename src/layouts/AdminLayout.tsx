import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import TopNavbar from "../components/TopNavBar";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Navbar />

            {/* RIGHT SECTION */}
            <div className="flex-1 flex flex-col">

                {/* TOP NAVBAR */}
                <TopNavbar />

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;
