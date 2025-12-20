import axios from "axios";
import { ApiUser } from "../types/User.types";

const API_BASE_URL = "http://3.110.122.127:3000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// Add request interceptor for debugging (optional)
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// User-related API calls
interface GetAllUsersResponse {
    message: string;
    count: number;
    users: ApiUser[];
}

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
    const response = await api.get<GetAllUsersResponse>('/getAllUsers');
    return response.data;
};

export default api;