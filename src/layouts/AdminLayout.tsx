import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import TopNavbar from "../components/TopNavBar";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">

            {/* LEFT SIDEBAR */}
            <Navbar />

            {/* RIGHT SECTION */}
            <div className="flex-1 flex flex-col">

                {/* TOP NAVBAR */}
                <TopNavbar />

                {/* PAGE CONTENT */}
                <main className="p-6 bg-gray-100 flex-1">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;
