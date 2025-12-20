const VehicleStatusChart = ({ status }: { status: any }) => {
    const total = status.approved + status.pending + status.rejected;

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6">Vehicle Status</h2>
            {/* SVG donut chart code unchanged */}
        </div>
    );
};

export default VehicleStatusChart;
