import RentOnGoLogo from "../assets/icons/RentOnGoLogo.png";

const Navbar = () => {
    return (
        <aside className="w-64 bg-[#2F3A5A] text-white min-h-screen p-5">
            <div className="flex items-center gap-3 mb-8">
                <img src={RentOnGoLogo} alt="RentOnGo" className="w-10 h-10" />
                <span className="text-xl font-semibold">RentOnGo</span>
            </div>

            <nav className="space-y-4">
                <p className="cursor-pointer hover:text-blue-300">Dashboard</p>
                <p className="cursor-pointer hover:text-blue-300">Users</p>
                <p className="cursor-pointer hover:text-blue-300">Bookings</p>
                <p className="cursor-pointer hover:text-blue-300">Payments</p>
            </nav>
        </aside>
    );
};

export default Navbar;
