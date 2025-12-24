import axios from "axios";

/* ================= BASE CONFIG ================= */

const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://3.110.122.127:3000";
  process.env.REACT_APP_API_BASE_URL || "http://192.168.1.26:3000";
console.log("API Base URL:", API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

/* ================= INTERCEPTORS ================= */

api.interceptors.request.use(
    (config) => {
        const method = config.method?.toUpperCase() ?? "UNKNOWN";
        const baseURL = config.baseURL ?? "";
        const url = config.url ?? "";

        console.log("🔵 API Request:", method, baseURL + url);

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        console.log("✅ API Response:", response.status, response.data);
        return response;
    },
    (error) => {
        console.error(
            "❌ API Error:",
            error.response?.status,
            error.response?.data || error.message
        );
        return Promise.reject(error);
    }
);

/* ================= API SERVICE ================= */

const ApiService = {
    /* -------- BOOKINGS -------- */
    getAllBookings: async (status: string) => {
        const endpoint =
            status === "All Bookings"
                ? "/getAllBookings"
                : `/getAllBookings?status=${encodeURIComponent(status)}`;

        const { data } = await api.get(endpoint);
        return data;
    },

    /* -------- USERS -------- */
    getAllUsers: async () => {
        const { data } = await api.get("/getAllUsers");
        return data;
    },

    /* -------- VEHICLES -------- */
    getPendingVehicles: async (vehicleType: "Car" | "Bike") => {
        const { data } = await api.get(
            `/getPendingVehicles?vehicleType=${vehicleType}`
        );
        return data;
    },

    updateVehicleStatus: async (
        vehicleType: "Car" | "Bike",
        vehicleId: string,
        status: "Verified" | "Rejected"
    ) => {
        const body = new URLSearchParams();
        body.append("vehicleType", vehicleType);
        body.append("vehicleId", vehicleId);
        body.append("status", status);

        const { data } = await api.post("/updateVehicleStatus", body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        return data;
    },

    getUserVehicles: async (userId: string) => {
        const { data } = await api.get(`/myVehicles/${userId}`);
        return data;
    },
















};

export default ApiService;
