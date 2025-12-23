// src/api/axiosFactory.ts
import axios from "axios";

export const createApi = (baseURL: string) => {
    const api = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    api.interceptors.request.use((config) => {
        console.log(
            "🔵 API Request:",
            config.method?.toUpperCase(),
            `${baseURL}${config.url}`
        );
        return config;
    });

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

    return api;
};
