import RentOnGoLogo from "../assets/icons/RentOnGoLogo.png";
import { Home, Users, Car, Calendar, CreditCard, Settings, LogOut } from "lucide-react";

const Navbar = () => {
    return (
        <aside className="w-64 bg-[#2F3A5A] text-white min-h-screen p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
                <img src={RentOnGoLogo} alt="RentOnGo" className="w-10 h-10" />
                <span className="text-xl font-semibold">RentOnGo</span>
            </div>

            <nav className="space-y-2 flex-1">
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#3d4a6e] rounded-lg transition-colors">
                    <Home size={20} />
                    <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#3d4a6e] rounded-lg transition-colors">
                    <Users size={20} />
                    <span>Users</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#3d4a6e] rounded-lg transition-colors">
                    <Car size={20} />
                    <span>Vehicles</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#3d4a6e] rounded-lg transition-colors">
                    <Calendar size={20} />
                    <span>Bookings</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#3d4a6e] rounded-lg transition-colors">
                    <CreditCard size={20} />
                    <span>Payments</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#3d4a6e] rounded-lg transition-colors">
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
            </nav>

            <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#3d4a6e] rounded-lg transition-colors mt-auto">
                <LogOut size={20} />
                <span>Logout</span>
            </div>
        </aside>
    );
};

export default Navbar;