import axios from 'axios';
import { V_Global_API } from '../services/system';

const axiosInstance = axios.create({
    baseURL: V_Global_API,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Obtén el token desde localStorage, un store (Pinia/Vuex) u otra fuente
        const token = localStorage.getItem('authToken'); // o asignar system.token
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export default axiosInstance;