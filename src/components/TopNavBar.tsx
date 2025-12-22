import React from "react";
interface TopNavbarProps {
    title?: string;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ title = "Admin Dashboard" }) => {
    return (
        <header className="h-16 w-full bg-[#3F4F7F] flex items-center justify-between px-6 shadow-md transition-all">

            {/* LEFT: Page Title */}
            <h1 className="text-white text-lg font-semibold tracking-wide">
                {title}
            </h1>

            {/* RIGHT: Notifications + Profile */}
            <div className="flex items-center gap-6">

                {/* Notification */}
                <button className="relative text-white hover:opacity-80">
                    🔔
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">
                        3
                    </span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-white text-[#3F4F7F] flex items-center justify-center font-bold">
                        A
                    </div>
                    <div className="text-white text-sm leading-tight hidden sm:block">
                        <p className="font-medium">Admin</p>
                        <p className="text-xs opacity-80">Super Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
