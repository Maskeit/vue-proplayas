import axios from 'axios';
import { V_Global_API, system } from '@service/system';

const axiosInstance = axios.create({
    baseURL: V_Global_API,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = system.authToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);
export default axiosInstance;