import Navbar from "./NavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
