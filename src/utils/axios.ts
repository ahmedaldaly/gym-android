import axios from "axios";
import { useAuthStore } from "../store/UseAuthStore";
const axiosInstance = axios.create({
    baseURL: "https://arabfit.me/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;