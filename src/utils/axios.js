import axios from 'axios';
import { config } from '@/config';

const api = axios.create({
    baseURL: config.API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/sign-in';
        }
        return Promise.reject(error);
    }
);

export default api;
