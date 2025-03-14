import axios from 'axios';
import { V_Global_API, system } from '@service/system';

const axiosInstance = axios.create({
    baseURL: V_Global_API,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${system.authToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);
export default axiosInstance;