import { useNavigate, useLocation } from "react-router-dom";
import RentOnGoLogo from "../assets/icons/RentOnGoLogo.png";
import { Home, Users, Car, Calendar, CreditCard, Settings, LogOut, X } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const itemClass = (path: string) =>
        `flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition-colors
    ${location.pathname === path ? "bg-[#3d4a6e]" : "hover:bg-[#3d4a6e]"}`;

    return (
        <aside className="w-64 bg-[#2F3A5A] text-white h-screen flex flex-col">
            {/* Logo */}
            <div className="p-5 border-b border-[#3d4a6e] flex justify-center">
                <img src={RentOnGoLogo} alt="RentOnGo" className="h-10" />
            </div>

            {/* Menu */}
            <nav className="flex-1 p-3 space-y-2">
                <div className={itemClass("/dashboard")} onClick={() => navigate("/dashboard")}>
                    <Home size={20} />
                    <span>Dashboard</span>
                </div>
                <div className={itemClass("/users")} onClick={() => navigate("/users")}>
                    <Users size={20} />
                    <span>Users</span>
                </div>
                <div className={itemClass("/vehicles")} onClick={() => navigate("/vehicles")}>
                    <Car size={20} />
                    <span>Vehicles</span>
                </div>
                <div className={itemClass("/bookings")} onClick={() => navigate("/bookings")}>
                    <Calendar size={20} />
                    <span>Bookings</span>
                </div>
                <div className={itemClass("/payments")}>
                    <CreditCard size={20} />
                    <span>Payments</span>
                </div>
                <div className={itemClass("/settings")} onClick={() => navigate("/settings")}>
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
            </nav>

            <div className="px-4 py-3 hover:bg-[#3d4a6e] cursor-pointer flex gap-3">
                <LogOut size={20} />
                Logout
            </div>
        </aside>
    );
};

export default Navbar;