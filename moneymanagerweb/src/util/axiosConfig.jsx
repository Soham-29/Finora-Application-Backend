import axios from "axios";
import {BASE_URL} from "./apiEndpoints.js";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

//list of endpoints that do not require authorization header
const excludeEndpoints = ["/register", "/login", "/activate", "/health", "/status", "/check"];

//request interceptor
axiosConfig.interceptors.request.use(config => {
    const skipToken = excludeEndpoints.some((endpoint) =>
    {
        return config.url?.includes(endpoint)
    });

    if (!skipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            window.location.href = '/login';
        } else if (error.response.status === 500) {
            console.error("Server Error. Please try again later.");
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again later.");
        }
        return Promise.reject(error);
    }
})

export default axiosConfig;