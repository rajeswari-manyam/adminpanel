import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Car,
    Bike,
    MapPin,
    Fuel,
    Settings,
    Users,
    Phone,
    CheckCircle,
    XCircle,
} from "lucide-react";

/* ===================== TYPES ===================== */

interface Vehicle {
    _id: string;
    userId: string;
    CarName?: string;
    bikeName?: string;
    CarModel?: string;
    bikeModel?: string;
    CarNumber?: string;
    bikeNumber?: string;
    Carseater?: string;
    gps: boolean;
    fuelType?: string;
    transmissionType?: string;
    kmDriven?: number;
    Ac_available?: boolean;
    description: string;
    RentPerHour?: number;
    RentPerDay?: number;
    pricePerKm?: number;
    contactNumber: string;
    contactName: string;
    drivingLicenseRequired?: boolean;
    AadharCardRequired?: boolean;
    DepositAmount?: number;
    pickupArea: string;
    pickupCity: string;
    pickupCityPinCode: string;
    pickupCityState: string;
    carImages?: string[];
    bikeImages?: string[];
    InsuranceNo?: string;
    Available: boolean;
    status: string;
}

interface VehicleData {
    cars: Vehicle[];
    bikes: Vehicle[];
    autos: Vehicle[];
}

/* ===================== COMPONENT ===================== */

const VehicleListingScreen: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [activeTab, setActiveTab] = useState<"cars" | "bikes" | "autos">("cars");

    /* ===================== MOCK DATA ===================== */

    const vehicleData: VehicleData = {
        autos: [],
        cars: [
            {
                _id: "1",
                userId: "694631e176209ab216a8c521",
                CarName: "Honda City",
                CarModel: "SV",
                CarNumber: "AP39DH5782",
                Carseater: "4",
                gps: false,
                fuelType: "electric",
                transmissionType: "automatic",
                kmDriven: 60000,
                Ac_available: true,
                description: "Good condition",
                RentPerHour: 350,
                RentPerDay: 5000,
                contactNumber: "8008734878",
                contactName: "Charitha",
                DepositAmount: 10000,
                pickupArea: "Benz Circle",
                pickupCity: "Vijayawada",
                pickupCityPinCode: "520010",
                pickupCityState: "AP",
                carImages: [
                    "https://via.placeholder.com/400x300?text=Car+Image",
                ],
                Available: true,
                status: "Verified",
            },
        ],
        bikes: [
            {
                _id: "2",
                userId: "694631e176209ab216a8c521",
                bikeName: "AJS",
                bikeModel: "100 Trail",
                bikeNumber: "AP16GH3780",
                description: "Well maintained",
                pricePerKm: 5,
                contactNumber: "7095652428",
                contactName: "Vamsi",
                pickupArea: "Tadepalli",
                pickupCity: "Guntur",
                pickupCityPinCode: "522501",
                pickupCityState: "AP",
                bikeImages: [
                    "https://via.placeholder.com/400x300?text=Bike+Image",
                ],
                gps: false,
                Available: true,
                status: "Verified",
            },
        ],
    };

    /* ===================== FILTER BY USER ===================== */

    const userCars = vehicleData.cars.filter(v => v.userId === userId);
    const userBikes = vehicleData.bikes.filter(v => v.userId === userId);
    const userAutos = vehicleData.autos.filter(v => v.userId === userId);

    const totalVehicles =
        userCars.length + userBikes.length + userAutos.length;

    /* ===================== RENDER CAR ===================== */

    const renderCarCard = (car: Vehicle) => (
        <div key={car._id} className="bg-white rounded-lg shadow-md">
            <img
                src={car.carImages?.[0]}
                alt={car.CarName}
                className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4">
                <h3 className="text-lg font-bold">{car.CarName}</h3>
                <p className="text-sm text-gray-600">
                    {car.CarModel} • {car.CarNumber}
                </p>

                <div className="flex items-center gap-2 mt-2 text-sm">
                    <Fuel size={14} /> {car.fuelType}
                </div>

                <div className="flex items-center gap-2 mt-1 text-sm">
                    <Users size={14} /> {car.Carseater} Seater
                </div>

                <div className="flex items-center gap-2 mt-1 text-sm">
                    {car.Ac_available ? (
                        <CheckCircle size={14} className="text-green-500" />
                    ) : (
                        <XCircle size={14} className="text-red-500" />
                    )}
                    AC
                </div>

                <div className="mt-3">
                    <p className="font-bold text-blue-600">₹{car.RentPerHour}/hr</p>
                    <p className="text-sm text-gray-600">
                        Deposit: ₹{car.DepositAmount}
                    </p>
                </div>

                <div className="flex items-center gap-2 mt-3 text-sm">
                    <Phone size={14} /> {car.contactNumber}
                </div>

                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded">
                    Book Now
                </button>
            </div>
        </div>
    );

    /* ===================== RENDER BIKE ===================== */

    const renderBikeCard = (bike: Vehicle) => (
        <div key={bike._id} className="bg-white rounded-lg shadow-md">
            <img
                src={bike.bikeImages?.[0]}
                alt={bike.bikeName}
                className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4">
                <h3 className="text-lg font-bold">{bike.bikeName}</h3>
                <p className="text-sm text-gray-600">
                    {bike.bikeModel} • {bike.bikeNumber}
                </p>

                <div className="mt-3">
                    <p className="font-bold text-blue-600">₹{bike.pricePerKm}/km</p>
                </div>

                <div className="flex items-center gap-2 mt-3 text-sm">
                    <Phone size={14} /> {bike.contactNumber}
                </div>

                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded">
                    Book Now
                </button>
            </div>
        </div>
    );

    /* ===================== UI ===================== */

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-1">User Vehicles</h1>
            <p className="text-gray-600 mb-4">
                Total Vehicles: {totalVehicles}
            </p>

            <div className="flex gap-4 border-b mb-6">
                <button
                    onClick={() => setActiveTab("cars")}
                    className={`pb-2 ${activeTab === "cars"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : ""
                        }`}
                >
                    Cars ({userCars.length})
                </button>

                <button
                    onClick={() => setActiveTab("bikes")}
                    className={`pb-2 ${activeTab === "bikes"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : ""
                        }`}
                >
                    Bikes ({userBikes.length})
                </button>

                <button
                    onClick={() => setActiveTab("autos")}
                    className={`pb-2 ${activeTab === "autos"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : ""
                        }`}
                >
                    Autos ({userAutos.length})
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === "cars" && userCars.map(renderCarCard)}
                {activeTab === "bikes" && userBikes.map(renderBikeCard)}
                {activeTab === "autos" && (
                    <p className="text-gray-500">No autos available</p>
                )}
            </div>
        </div>
    );
};

export default VehicleListingScreen;
